# OMDb Typescript SDK

Lightweight non official [OMDb](http://www.omdbapi.com/) (Movie database) Typescript SDK

_Contributions are more than welcome_

## Install

```sh
# Using npm
$ npm install @thblt-thlgn/omdb

# Or using yarn
$ yarn add @thblt-thlgn/omdb
```

## How to use ?

```ts
// Import in TypeScript
import OMDb from '@thblt-thlgn/omdb';

// Import in JavaScript
const { OMDb } = require('@thblt-thlgn/omdb');

// Create a new instance
const client = new OMDb('my_api_key'); // Check out http://www.omdbapi.com/apikey.aspx

// Search a movie
client.search('Onward')
  .then(console.log)
  .catch(console.error);

// Get a movie by its title
client.getByTitle('Shrek')
  .then(console.log)
  .catch(console.error);

// Get a movie by its IMDb ID
client.getById('tt2575988')
  .then(console.log)
  .catch(console.error);
```

## Run tests
```sh
$ env API_KEY=my_api_key yarn test
```