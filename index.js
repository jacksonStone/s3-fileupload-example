const express = require('express'),
  https = require('https'),
  fs = require('fs'),
  aws = require('aws-sdk');
  
const credentials = JSON.parse(fs.readFileSync('credentials.json', 'UTF-8')),
  awsSecretKey = credentials.amazon.AWSSecretKey,
  awsAccessKeyId = credentials.amazon.AWSAccessKeyId,
  //AWS requires a credentials object when creating any of its API objects.
  //If none is included, it will check in ~/.aws/credentials for your access key and secret key
  awsCreds = new aws.Credentials(awsAccessKeyId, awsSecretKey);
  S3 = new aws.S3({
    credentials:awsCreds, 
    apiVersion: '2006-03-01',
    //This will need to be set to your particular region
    region: 'us-east-1',
  }),
  bucketName = 'apiwizardry';
  app = express();

//Express Setup
app.set('view engine', 'pug');
app.use('/favicon.ico', express.static('favicon.ico')); //For style!
app.get('/', function (req, res) {
  res.render('index');
});


app.post('/s3/signedurl', function(req,res){
    req.on('data', function(reqBody){
      const body = JSON.parse(reqBody+''),
        requestParams = {
          Key: body.Key,
          ContentType: body.ContentType,
          Expires: body.Expires|0,
          ACL: body.ACL || 'public-read',
          Bucket: bucketName
        };
      
      S3.getSignedUrl('putObject', requestParams, (err, data) => {
        if(err){
          return res.end();
        }
        var body = {signedRequest:data};
        res.send(body);
      });
    });
});

app.listen(1337, function () {
  console.log('Example app listening on port 1337!');
});


// Example of Normal File Tree structure
// {
// 	"root": {
//     "file1":content,
//     "prefix1": {
//       "file2":content,
//       "prefix2": {
//         "file3":content,
//         "file4":content
//       }
//     }
//   },
// }
// Example of S3 structure of objects in bucket
// {
// 	"root": {
//     "file1":content,
//     "prefix1/file2":content,
//     "prefix1/prefix2/file3":content,
//     "prefix1/prefix2/file4":content
//   },
// }

