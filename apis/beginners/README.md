### This README file is here to demonstrate how to run your own back-end locally based on db.json file that we worked on on YouTube.

## Prerequisities
- Node.js installed
- npm installed (typically comes along with Node.js)

## Install json-server locally
```
npm install json-server
```

## Open the project in your terminal and run the db.json file with json-server
```
cd yt-courses-public/apis/beginners
json-server --watch db.json
```

## You're all set!
```
// You should see something similar to this:

 \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3000/authors
  http://localhost:3000/posts

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
  Watching...
```

## Fork this specific back-end's documentation to use it and test it in Postman
Link: https://restless-escape-82716.postman.co/workspace/My-Workspace~6de143f1-1497-43ef-80f5-5d307cb62344/collection/17685849-33cdb5fd-169b-400e-a163-1eb03090ebf5?action=share&creator=17685849