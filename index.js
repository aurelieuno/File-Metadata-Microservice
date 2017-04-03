/********File Metadata Microservice****
https://aryanj-file-size.herokuapp.com/
1 User Story: I can submit a FormData object that includes a file upload.
2 User Story: When I submit something, I will receive the file size in bytes within the JSON response
{"size":224419}**/


var express        =         require("express");
var app            =         express();
var bodyParser     =         require("body-parser");
//The body-parser module only handles JSON and urlencoded form submissions,
//not multipart (which would be the case if you're uploading files).
var path = require("path");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


app.use(bodyParser.urlencoded({ extended: false }));// for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());// for parsing application/json

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));
app.use(require('stylus').middleware(__dirname));

//This is how to specify path in a typical Express.js app when the
//folder is 'templates'
app.set('views', path.join(__dirname, 'templates'))
//what template engine to use
app.set('view engine', 'pug')

  app.get('/', function(req, res){
      res.sendFile(path.join(__dirname+'/index.html'));
         });

    app.post('/', upload.single("myFile"), function (req, res, next) {
      console.log(req.file);
       res.json({"size":req.file.size})

})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// var express = require('express')
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })

// var app = express()

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })

// app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//   // req.files is array of `photos` files
//   // req.body will contain the text fields, if there were any
// })

// var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
// app.post('/cool-profile', cpUpload, function (req, res, next) {
//   // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//   //
//   // e.g.
//   //  req.files['avatar'][0] -> File
//   //  req.files['gallery'] -> Array
//   //
//   // req.body will contain the text fields, if there were any
// })
// In case you need to handle a text-only multipart form, you can use any of the multer methods (.single(), .array(), fields()). Here is an example using .array():

// var express = require('express')
// var app = express()
// var multer  = require('multer')
// var upload = multer()

// app.post('/profile', upload.array(), function (req, res, next) {
//   // req.body contains the text fields
// })


