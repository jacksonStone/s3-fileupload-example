# s3-fileupload-example
An Example of uploading files directly to S3 from a browser.

#Installation:
(Assuming you don't have these installed)

Install NodeJS: [Download here] (https://nodejs.org/)

Install Git: [Follow instructions here] (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

clone this project, navigate to its root and NPM install: 
```bash
$ git clone https://github.com/jacksonStone/s3-fileupload-example.git && cd s3-fileupload-example && npm install
```

Create a *Free* AWS account if you do not already have one: [Here] (aws.amazon.com/free)

Create a file in the root of the project to store your AWS credentials
```bash
$ touch credentials.json
```

Get AWS credentials if you do not already have some: [Instructions here] (http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html)

Put them in the credentials.json file, structured like so:
```json
{
  "amazon": {
    "AWSSecretKey":"SECRET_KEY_HERE",
    "AWSAccessKeyId":"ACCESS_KEY_HERE"
  }
}
```


Create a bucket using the AWS S3 console (take note of the region you create the bucket in, and the bucket name): [Here] (https://console.aws.amazon.com/s3/home)

Click on the bucket in the console and select *Edit CORS Configuration* to the right. 
Enter the following into the popup and save: 
```xml
<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

Replace line 16 of index.js like so:
```javascript
region: 'YOUR_BUCKET_REGION'
```
And line 18 of index.js like so:
```javascript
bucketName = 'YOUR_BUCKET_NAME';
```

Boot it up
```bash
$ node index
```

Open a browser to [http://localhost:1337] (http://localhost:1337)

Upload Away!

#Disclaimer

There are (significantly) better ways to handle authorization to your AWS credentials. This is for demo purposes only.
For more in-depth guide to implementing AWS credentials or IAM visit [Here] (http://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html)
