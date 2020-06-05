# strapi-provider-upload-google-cloud-storage

**Non-Official** Google Cloud Storage Provider for Strapi Upload

Inspired from https://www.npmjs.com/package/strapi-provider-upload-google-cloud-storage

## Installation

Install the package from your app root directory

```
cd /path/to/strapi/
npm install @eltonjosesouza/strapi-provider-upload-google-cloud-storage --save
```

## Setting up Google authentification

1. In the GCP Console, go to the **Create service account key** page..
   - **[Go to the create service account key page](https://console.cloud.google.com/apis/credentials/serviceaccountkey)**
2. From the **Service account** list, select **New service account**.
3. In the **Service account name** field, enter a name.
4. From the **Role** list, select **Storage > Storage Object Admin**.
5. Click **Create**. A JSON file that contains your key downloads to your computer.
6.  Go to https://cloud.google.com/docs/authentication/getting-started and configure your environment variable

## Create Bucket on Google Cloud Storage
1. See https://cloud.google.com/storage/docs/creating-buckets

## Setting up Strapi upload configuration

1. Access your strapi via browser
2. Go to General->Plugins and click on gear to configure your plugin.
3. Set bucket-name
4. Save the configuration
5. Enjoy !

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
