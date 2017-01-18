# Web Servers

When I hear the term 'Full Stack' I think of someone who isn't afraid to approach any layer of the technology stack in order to improve the value of the product. Today we focus on a crucial layer of the stack, Web Servers.

## Project 2 - TinyApp

Over the next 4 days you will work on a project that uses the Express Framework to build a web server that handles requests from a client. This is a cullmination of everything you have learned so far.

## Overview

* What is a server?
* Requests with Node
* Express Framework
* EJS Templates

## Servers?

There are a few common patterns used for client/server communication. The one that is most common is called the Request-Response Model.

In the Request-Response Model a client sends a request to a server. The server then performs some computation and returns a response to the client.

Typically when we visualize servers we think of a rack of hardware with blinking lights and fans spinning. The reality is that without software those machines don't do much. Think of a server as an application on a machine that listens for a connection from a client.

There are a lot of different types of servers that you currently interact with. The performance of these servers is largely dependent on the hardware that they are running on.

* Database Server
* Game Server
* Mail Server
* Media Server
* Print Server
* Web Server

We can connect a machine to a network and run a server application on it, but there has to be a way for clients to find it. In 1981 the Internet Protocol (IP) specification was released. This document described the information necessary for finding a server as:

> A name indicates what we seek. An address indicates where it is. A route indicates how to get there.

In the case of a web server the name would be something like `http://www.lighthouselabs.ca`. The address would be `104.25.75.20`, and the route would be the machines/routers between you and the server.

### Ports

You can run multiple applications on a machine. If we were to run a mail server and a web server on the same machine how would we know which server to hand the request to? We use ports. If a server wants to run on a port between 1 and 1023 then you will need superuser access. Any user can run a server on ports 1024 to 65535.

The reserved ports for the Hypertext Transfer Protocol (HTTP) are **80** for unsecure communication, and **443** for secure communication.

### Applications

Apache, IIS (Microsoft) and nginx account for over 75% of the market share for all of the web servers on the internet.

When you you write an application that understands HTTP then you can configure one of these web servers to pass the requests that they receive to your application on a port you specify.

Today we will build an application using Node and we will run that application on port **3000**.

## Requests with Node

Node considers HTTP to be so important that their 'Hello World' example is an HTTP Server that responds with the string 'Hello World'.

```javascript
var http = require('http');

var hostname = '127.0.0.1';
var port = 3000;
```

We've imported the http module which allows us to create a server. When the server receives a request it calls the function we provide to it. The status code is set to `200 'OK'`, the header that indicates the type of the body is set to `'text/plain'` and then we finish off the response by calling `end()` on the response object with the content `'Hello World\n'`.

```javascript
var server = http.createServer(function(request, response) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World\n');
});
```

If we were to run our application it would not run as expected. A server must listen for connections. We must tell our server to listen on a port.

```javascript
server.listen(port, hostname, function() {
  console.log('Server running at http://' + hostname + ':' + port '/');
});
```

Now when we run the application we see output in our console.

`Server running at http://127.0.0.1:80/`

Please see the `node.js` file for the expanded server that was created during the lecture.

## Express Framework

In order to be more efficient when handling requests we can use a Framework called Express. In order to use the module we need to first install it. We can then create a new express instance.

`npm install --save express`

```javascript
var express = require('express');
var app = express();
```

All `GET` requests with the path `'/'` will be handled by a function that you define. In this case we send back the content 'Hello World\n' back to the client.

```javascript
app.get('/', function(request, response) {
  response.send('Hello World!\n');
});
```

Just like the normal http example we have to tell our server when to start listening. We can specify the port, but by default Express handles the hostname for us.

```javascript
app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
```

Now when we run the application we see output in our console.

`Example app listening on port 3000!`

### Middleware

Express let's you use middleware to generalize behaviour for certain scenarios. If we want to serve static files (images, html, css, javascript) we can put them in a folder, and then tell Express that it should search there for any request and if it matches a path to a static file then return that. In this example we tell Express than any file in the `public/` directory can be served as static.

```javascript
app.use(express.static('public'));
```

With this configuration `public/images/lighthouse-labs.png` would be available at `http://localhost:3000/images/lighthouse-labs.png`.

Please see the `express.js` file for the expanded server that was created during the lecture.

## EJS Templates

Embedded JS (EJS) is one of many templating libraries available for use in Express. EJS is a module so we need to install it with `npm install --save ejs`. In order to inform Express that we want to use EJS we set the value of `view engine` configuration to `ejs`.

```javascript
app.set('view engine', 'ejs');
```

By default EJS template files are found a `views/` directory. We can create a new `index.ejs` file and return it in a response with the `render()` method.

```javascript
app.get('/', function(request, response) {
  response.render('index');
});
```

A basic ejs file could contain only HTML if you wanted.

```HTML
<!DOCTYPE html>
<html>
  <head>
    <title>Index</title>
  </head>
  <body>
    <h1>Index</h1>
  </body>
</html>
```

EJS let's us embed JavaScript. We can use this to create dynamic pages. Let's say we wanted to display the User-Agent based on who makes the request. We need to send an object to the view engine that represents the variables we want to make available to our template. In this case we call it `agent`.

```javascript
app.get('/', function(request, response) {
  response.render('index', {
    agent: request.headers['user-agent']
  });
});
```

We can then use that variable with the `<%= %>` syntax. The template system will read in the ejs file, find 'Embedded JavaScript' and evaluate it. When it is done the content is sent back to the client.

```HTML
<!DOCTYPE html>
<html>
  <head>
    <title>Index</title>
  </head>
  <body>
    <h1>Using <%= agent %></h1>
  </body>
</html>
```

In the case that you want to only evaluate JavaScript and not print out the return value to the template you can use the tag `<% %>`. This would be more commonly used for looping or conditionals.

```HTML
<!DOCTYPE html>
<html>
  <head>
    <title>Index</title>
  </head>
  <body>
    <ul>
    <% for(var i = 0; i < 10; i++) { %>
      <li><%= i %></li>
    <% } %>
    </ul>
  </body>
</html>
```

Please see the `views/index.ejs` and `views/about.ejs` files for the templates that were created during the lecture.

## Bonus

If you are sick of restarting your Node Express server everytime you update your server.js file there is a tool available on npm called `nodemon`. Node Monitor will reload the server automatically when it detects changes to the JavaScript file that it is watching. I understand that `nodemon` doesn't work out of the box in vagrant and may need to be run with `nodemon -L server.js`. You'll have to look up with `-L` does, or not. Up to you.
