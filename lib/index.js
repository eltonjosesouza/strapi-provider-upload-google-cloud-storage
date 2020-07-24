'use strict'

const _ = require('lodash');
const {Storage} = require('@google-cloud/storage');

/**
 *
 * @type {{init: (function(*=): {upload: (function(*): Promise<any>)}), checkServiceAccount: module.exports.checkServiceAccount, provider: string, auth: {bucketName: {label: string, type: string}, serviceAccount: {label: string, type: string}, baseUrl: {values: string[], label: string, type: string}}}, checkBucket: module.exports.checkBucket, name: string}}
 */
module.exports = {
  provider: 'google-cloud-storage',
  name: 'Google Cloud Storage',
  auth: {
    bucketName: {
      label: 'Bucket Name',
      type: 'text'
    },
    baseUrl: {
      label:
        'Use bucket name as base URL (https://cloud.google.com/storage/docs/domain-name-verification)',
      type: 'enum',
      values: [
        'https://storage.googleapis.com/{bucket-name}',
        'https://{bucket-name}',
        'http://{bucket-name}',
        'gs://{bucket-name}'
      ]
    }
  },
  init: config => {
    const GCS = new Storage();

    return {
      upload: file => {
        return new Promise((resolve, reject) => {
          const backupPath =
            file.related && file.related.length > 0 && file.related[0].ref
              ? `${file.related[0].ref}`
              : `${file.hash}`
          const filePath = file.path ? `${file.path}/` : `${backupPath}/`
          const fileName = file.hash + file.ext.toLowerCase()

          /**
           * Then save file
           */
          GCS.bucket(config.bucketName)
            .file(`${filePath}${fileName}`)
            .save(file.buffer, {
              contentType: file.mime,
              // public: true,
              metadata: {
                contentDisposition: `inline; filename="${file.name}"`
              }
            })
            .then(() => {
              file.url = `${config.baseUrl.replace(
                /{bucket-name}/,
                config.bucketName
              )}/${filePath}${fileName}?authuser=1`
              strapi.log.debug(`File successfully uploaded to ${file.url}`)
              resolve()
            })
            .catch(error => {
              return reject(error)
            })
        })
      },
      delete: file => {
        return new Promise((resolve, reject) => {
          const filePath = file.path ? `${file.path}/` : `${file.hash}/`
          const fileName = file.hash + file.ext.toLowerCase()

          GCS.bucket(config.bucketName)
            .file(`${filePath}${fileName}`)
            .delete()
            .catch(error => {
              if (error.code === 404) {
                return strapi.log.warn(
                  'Remote file was not found, you may have to delete manually.'
                )
              }
              reject(error)
            })

          strapi.log.debug(`File ${file.url} successfully deleted`)
          resolve()
        })
      }
    }
  }
}
