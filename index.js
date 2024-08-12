// const jsonServer = require("json-server"); // importing json-server library
// const server = jsonServer.create();
// const router = jsonServer.router("db.json");
// // const userRouter = jsonServer.router("user.json");
// const middlewares = jsonServer.defaults();
// const port = process.env.PORT || 3001; // you can use any port number here; i chose to use 3001

// server.use(middlewares);
// server.use(router);
// // server.use(userRouter);

// server.listen(port);


const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Combine JSON data from multiple files
const db = {
    ...JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'))),
    ...JSON.parse(fs.readFileSync(path.join(__dirname, 'users_comment.json'))),
    ...JSON.parse(fs.readFileSync(path.join(__dirname, 'featured.json'))),
    ...JSON.parse(fs.readFileSync(path.join(__dirname, 'user.json')))
};

// Create a router with combined data
const router = jsonServer.router(db);

const port = process.env.PORT || 3001; // You can use any port number here

server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log(`JSON Server is running on http://localhost:${port}`);
});
