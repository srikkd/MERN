const url = require("url");

const address = "http://localhost:4000/default.html?year=2017&month=february&day=monday";

const parsedURL = url.parse(address, true);
console.log(parsedURL);
console.log(parsedURL.host);
console.log(parsedURL.port);
console.log(parsedURL.hostname);
console.log(parsedURL.query);
console.log(parsedURL.search);