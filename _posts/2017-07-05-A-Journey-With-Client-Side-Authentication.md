---
layout: post
title: A Journey With Client Side Authentication
---

If you are building single page applications you will eventually come across the
problem of having to maintain authentication state in your application. The motivation
for this being that you may want to render the application differently when the user
is logged in compared to when they are not logged in. There are a few ways to
implement this functionality.

#### The Wrong Way
You can skip this if you do not care about a novice developer and his mediocere implementation
of client side authentication. Paraphrasing Thomas Edison, he makes a statement
with regards to how he discovered a 1000 ways not to make a lightbulb prior to
the successful invention of the lightbulb. Just because you fail does not mean
that you did not learn anything, this section discusses my failure.

When I was first getting started with web development I wanted to build a single
page application. AngularJS was the obvious choice due to the recommendation of
coworkers and the popularity it was gaining. What I implemented to get client side
authentication state to work was atrocious and I am ashamed. I wrote an AngularJS
service that fetched user information and stored it in the service. But wait,
theres less, if you refreshed the page the user information was requested again.

You may not believe it, but it gets worse. I started writing other services that
were dependent on the state from the user service. I had never heard of a race
condition up until that point, I was only a sophomore in college and had not taken
a concurrency class yet. What I had inadvertently created was a mess of spaghetti
code that sometimes worked correctly when the race conditions resolved in the happy
path. Although, most the time, it simply didn't work correctly. All asynchronous
requests that were dependent on user information were in risk of failing if the
user information was not populated yet from that async request.

In retrospect, I was young (still am) and did not know what I was doing. I learned
valuable lessons about async requests, promises and race conditions. The biggest
take away for me, was simply that I learned one way __not__ to do client side
authentication state. It was mess of unmaintainable spaghetti code. I wish I could
say I fixed it and rewrote it correctly, but I didn't, I changed projects a few
months later.

#### The Correct Way
The correct way to handle authentication state in the client without making any
additional network requests other then the one to log the user in is to utilize
[web storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
or [cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies). I won't
be focusing on the differences of these technologies but if you are interested,
checkout this Stack Overflow [answer](https://stackoverflow.com/a/5523174/8112353).

If you are building a single page application that is reliant on authentication;
then I would imagine you have an API endpoint on your server to allow users to
log in to your application. If so, great, if not, write one. Now when you send
a request to this API endpoint your server can return a token to the client
that can be used to identify the user. You can then take this token and save it
in the browser using web storage. After that, you can retrieve that token and
send it back to the server with requests that the user needs to be authenticated for.
In conjunction with that, you can utilize the existence of the token on the client
side for conditional rendering of UI elements. From a rudimentary stand point,
if the token is saved in web storage then the user is logged in, otherwise
they are logged out.

I left out a great bit of detail. How do you handle user sessions that should
expire after some amount of time? How are the tokens generated on the server
and matched to the correct users? I intentionally, did some hand waving so
that this would be more of an overview of how web storage can be utilized to
store authentication state on the client. In closing, the process can be
summarized in these steps:

  1) Utilize a login API endpoint to return a token that identifies the user.

  2) Cache that token using web storage or cookies.

  3) For requests that require authorization pass the token along with the request
  and validate it on the server.

  4) For conditional rendering, check if the token is cached and consider that
  your logged in state, otherwise if no token is cached the user can be considered
  logged out.

Did I miss anything? Feel free to leave a comment if I missed something or if
I said something that was wrong.
