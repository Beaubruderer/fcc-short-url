var mongoose = require('mongoose');
var Url = require('./models/url.model.js');
var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var base58 = require('./base58.js');

var mongo_uri =  process.env.MONGOLAB_URI || 'mongodb://localhost:27017/db';

var app = express();
var db = mongoose.createConnection(mongo_uri);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    //loads homepage 
    res.sendfile(path.join(__dirname, 'public/index.html'))
})

app.get('/shorten/*', (req, res) => {
    //create shortened URL (or return existing entry)
    
    
    //first, check to see if this exists in the database
    var longUrl = req.url.slice(9).toLowerCase();
    console.log(longUrl);
    
    if (((longUrl.indexOf('http://') !== 0 || longUrl.indexOf('https://')) && longUrl.indexOf('.') < 8 )) {
        
        var payload = {
            error: 'Wrong URL format, please pass a valid URL'
        }
        
        res.send(payload);
        
    } else { // is valid URL, creating short URL
    
        Url.findOne({ long_url : longUrl }, (err, doc) => {
            
            if (err) throw err;
            
            if (doc) {
                console.log(doc);
                
                //record exists, return in payload
                var payload = {
                    original_url: longUrl,
                    short_url: 'https://short-url-final-beaubruderer.c9users.io/' + base58.encode(doc._id)
                }
                
                res.send(payload);
                
                
            } else {
                //create new record
                console.log('no record found');
                
                var newUrl = Url({
                    long_url: longUrl
                });
                
                newUrl.save((err, url) => {
                    
                    if (err) throw err;
                    
                    console.log('save successful:');
                    console.log(url);
                    var payload = {
                        original_url: longUrl,
                        short_url: 'https://short-url-final-beaubruderer.c9users.io/' + base58.encode(url._id)
                    }
                    res.send(payload);
                })
            }
        });
    }
})

app.get('/:encoded_id', (req, res) => {
    
    // last but not least, redirect if there's a record
    
    Url.findOne({ _id : base58.decode(req.params.encoded_id) }, (err, doc) => {
      
      if (err) throw err;
      
      if (doc) { // valid encoded index, redirect to long url
          
          console.log('redirecting to ' + doc.long_url);
          res.redirect(doc.long_url);
          
      } else { // no luck, send them home!
          
          res.send('this doesn\'t exist');
      }
        
    })
    
    
})

app.listen(8080, () => {
    console.log('Server listening on port 8080...');
})