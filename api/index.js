const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');
var cors = require('cors');

// create express application instance
const app = express();
app.use(cors())
// create and connect redis client to local instance.
const client = redis.createClient(6379);

// echo redis errors to the console
client.on('error', err => {
  console.log('Error ' + err);
});

// get photos list
app.get('/photos', (req, res) => {
  // key to store results in Redis store
  const photosRedisKey = 'user:photos';

  // Try fetching the result from Redis first in case we have it cached
  return client.get(photosRedisKey, (err, photos) => {
    // If that key exists in Redis store
    if (photos) {
      console.log((new Date()).getTime(), 'fetched from cache');
      return res.json({ source: 'cache', data: JSON.parse(photos) });
    } else {
      // Key does not exist in Redis store

      // Fetch directly from remote api
      fetch('https://api.flickr.com/services/feeds/photos_public.gne?tags=abstract&format=json&nojsoncallback=1')
        .then(response => response.json())
        .then(photos => {
          // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
          client.setex(photosRedisKey, 3600, JSON.stringify(photos));
          console.log((new Date()).getTime(), 'read from web');
          // Send JSON response to client
          return res.json({ source: 'api', data: photos });
        })
        .catch(error => {
          // log error message
          console.log(error);
          // send error to the client
          return res.json(error.toString());
        });
    }
  });
});

// start express server at 8000 port
app.listen(8000, () => {
  console.log('Server listening on port: ', 8000);
});
