---
layout: post
title: Web Development Is Intimidating
permalink: /web-development-is-intimidating
---

Actually, I lied. Any field is overwhelming when first learning about it. My goal with this article is to help others understand some of the most basic concepts of web development; as well as some of the most common buzzwords you will hear when entering the field. I am by no means an expert but I do remember what confused me when I was learning about web development and perhaps sharing some of that could be helpful to aspiring web developers. I must mention briefly that this article assumes you have basic programming knowledge. Throughout the contents of the article I will italicize keywords that I haven’t defined yet but I will be defining soon, so don’t get scared!

Edit: I wrote this post in January of 2016 on Medium and since then have migrated it to my personal blog as of August 2017. In that time I have learned a lot but I feel as if this article will still have value to some individuals. The only edits I have made are links to newer technologies.

#### Web Applications
A web application consists of quite a few cogs and gears but we will keep our examples trivial for the sake of explanation. A web application consists of a client side and a server side. The client side is typically concerned with implementations that manage how the application is presented to the user and how the user will interact with the application. Although, that is not all the client side can do, we will talk more about it later. The server side is responsible for returning a certain page and the contextual data for that page when you navigate to a specific URL in your browser. The server is not strictly limited to returning a webpage, it could return a variety of file formats, which is great and you’ll see why soon. So we have established that a web application consists of a client and a server which was one of the more confusing concepts, initially.

#### Client/Server Architecture
You might be asking what the client and server are. As I stated earlier, the client is typically responsible for the presentation layer of your application but it is also where all of your JavaScript is going to be running. If you want some fancy animation to occur when you click a button you are typically going to have to write that in JavaScript. Although, that is not the only thing the client is responsible for. The client is also responsible for communicating with the server. It is possible for a developer to write JavaScript that communicates with the server side (more about this later).

The server is responsible for returning web pages and data to a user as well as interfacing with the database. The client and server are not strictly limited to these operations but these are some of the most noteworthy basics. You might be asking yourself how you can actually write code that will run on the client and server. The client’s presentation layer can be implemented in HTML/CSS. Most of the client side development you will do is going to be limited to JavaScript. The server side allows you to construct your applications using quite a few languages such as: Python, Ruby, and PHP. It is also worth mentioning you can write your server side code using JavaScript as well. How neat is that?

#### Communication — HTTP
The client and the server need to be able to communicate but how do they actually do that? When you enter a URL in your browser the server uses something called Hyper Text Transfer Protocol to communicate with the server and return the webpage you requested. HTTP is one of the more complex intricacies of web development and I will only give a brief overview of it, I will leave it to the reader to [research](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) further, but for basic web application development you can skip some of it for a time.

The most important parts worth learning for our purposes are two specific methods: GET and POST. When we navigate to a specific URL in our browser the browser issues a GET request to the server to return that webpage. Now on the other end of the spectrum, when you want to log in to check your email the client sends a POST request to the server to validate your credentials. In summary, GET returns things from the server while as POST sends things to the server. Now that we have a basic understanding of HTTP, we can move on to some more complex topics that surround how the client and server communicate. I urge you to do some more research about HTTP, you will find it to be very helpful as you reach higher competencies levels.

#### Advanced Communication — APIs
A very important concept surrounding how the client and server communicate includes web based Application Programming Interfaces. These are constructed using server side languages and frameworks and they define how software components should interact. When constructing an API you define specific URL routes that map to certain API endpoints. You can think of API endpoints as the function or set of code that is executed when that API endpoint is invoked.

Another important aspect of API development is how these endpoints are actually invoked. API endpoints are invoked by sending an HTTP request to a specific URL. It is also worth noting that a single URL can map to multiple API endpoints. This is possible because a GET request and a POST request to the same URL have the option to use different functions. You can test some API endpoints out by navigating to that URL in the browser but more often then not you want to send an AJAX request using from the client side portion of your application using JavaScript. Asynchronous JavaScript and XML is used to send and receive data from the server asynchronously. For example, you could write some JavaScript that invokes an API endpoint using AJAX when the user hits a button that returns a string of text or some JSON.

We have gone down quite the rabbit hole with our explanation of APIs but lets keep going. JavaScript Object Notation, if you are not familiar, is a structured file format that stores sets of keys and values that correspond to those particular keys. The values can be integers, characters, strings, lists, or other objects. JSON can get quite complex but it makes integrating an API into a web application with an existing client side mostly painless because it can easily use the response from an API endpoint since the API responses can easily be understood by JavaScript.

Lets bring it all together with an example now. Imagine we have a URL `/user/<some_id>` that is one of our API endpoints for our web application. Now when we make a GET request to the URL `/user/1024` we should expect user data to be returned that relates to the user with the id of 1024. Now imagine we send a POST request with some data in the request that contains new profile information to `/user/1024` well we should expect the API endpoint to properly update the user information and return a response letting us know if it correctly updated the user info. In summary, an API defines how portions of the application should interact and when you invoke an API endpoint, specific actions take place, once these actions are completed you can typically expect a HTTP response that is using the JSON file format (but not exclusively JSON, any file format can be used).

APIs are important because they allow for modular application development. They create a clear separation between the presentation layer of your application and the business logic of your application. They also support high amounts of reusability which can speed up the development of an application.

#### Technologies
I am going to throw a ton of links at you right now. Don’t be scared, you don't need to click all of them or even read any of them right now. The goal is to provide you with a list of tools you can use to write code more easily that either runs on the client or the server. The lists will include frameworks that you can peruse. The goal is not for you to go learn them all right now but rather to take a tour of these frameworks and see what types of things are out there.

##### Client Side:
* [React](https://facebook.github.io/react/)
* [Angular](https://angular.io/)
* [Vue](https://vuejs.org/)
* [Ember](https://www.emberjs.com/)

##### Server Side:
* [Django](https://www.djangoproject.com/)
* [Express](https://expressjs.com/)
* [Rails](http://rubyonrails.org/)
* [Laravel](https://laravel.com/)

#### Summary
We spoke about quite a few concepts over the course of this article. Web development may feel even more daunting at this point because we discussed a lot of different terms and you may not fully understand them. Just remember this was supposed to be an tour of a variety of concepts that involve web development. So you got a lot of breadth but no depth. It is the depth you will need to become an expert and by seeking out other resources you will fill those holes.
