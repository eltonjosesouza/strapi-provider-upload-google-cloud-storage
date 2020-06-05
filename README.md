# strapi-provider-upload-google-cloud-storage

**Non-Official** Google Cloud Storage Provider for Strapi Upload

Inspired from https://www.npmjs.com/package/strapi-provider-upload-google-cloud-storage

Except:

- removed bucket autocreate
- add support for regional bucket
- add support for Uniform bucket-level access

## Installation

Install the package from your app root directory

```
cd /path/to/strapi/
npm install @nitra/strapi-provider-upload-google-cloud-storage --save
```

## Setting up Google authentification

1. In the GCP Console, go to the **Create service account key** page..
   - **[Go to the create service account key page](https://console.cloud.google.com/apis/credentials/serviceaccountkey)**
2. From the **Service account** list, select **New service account**.
3. In the **Service account name** field, enter a name.
4. From the **Role** list, select **Storage > Storage Object Admin**.
5. Click **Create**. A JSON file that contains your key downloads to your computer.

## Setting up Strapi upload configuration

1. Copy the full content of the downloaded JSON file
2. Paste it into the "Service Account JSON" field in Strapi Upload Settings
3. Set an existing Bucket name
4. Save the configuration
5. Enjoy !

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
