{
  "name": "mern",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "cross-env NODE_ENV=production node app.js",
    "server": "nodemon app.js",
    "client": "npm run start --prefix client",
    "client:install": "npm i --prefix client",
    "client:build": "npm run build --prefix client",
    "dev": "cross-env NODE_ENV=development concurrently \"npm run server\" \"npm run client\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "config": "^3.2.4",
    "connect-flash": "^0.1.1",
    "create-react-app": "^3.3.0",
    "cross-env": "^6.0.3",
    "express": "^4.17.1",
    "express-validator": "^6.3.1",
    "helmet": "^3.21.2",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.5.3",
    "shortid": "^2.2.15"
  },
  "devDependencies": {
    "concurrently": "^5.0.2",
    "nodemon": "^2.0.2"
  }
}
