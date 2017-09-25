---
layout: post
title: Top Ten Takeaways From The Pragmatic Programmer
permalink: /top-ten-takeaways-from-the-pragmatic-programmer
---

This post is a little bit different, in the sense that it is more of a reflective piece on my thoughts after reading The Pragmatic Programmer: From Journeyman to Master. If you haven't read the book, I strongly recommend it. While reading the book, I felt like I was teleported to a dimly lit castle with a wise wizard ready to give me all of his sage advice while he stroked his beard. Okay, maybe I took that a bit far, but reading this book felt like if a senior developer sat me down and explained all the things they wished they had known sooner prior to starting their career. If you are looking to create higher quality products and make your life easier then this is a book you should definitely check out. In this post I will be discussing what I think the top ten takeaways from this book were for me, of course yours may be different, I am discussing what tips were most profound to me.

### 10. Use The Right Tools and Use Them Well.
The best developers are the most efficient developers. The most efficient developers use the best tools they can find. For the past four months I have been working exclusively in JavaScript. I am a fan of using free tools as much as possible so I decided I would do most of my development using Atom. I had no way to 'go to definition' which was frustrating but I compensated by getting really good at using Atom's 'find' operation. In conjunction with that, from my experiences, Atom has poor code completion which was making my life more difficult than it should be.

I decided to give Visual Studio Code a try and I can say I'm embarrassed I didn't start using it sooner. I got into the habit of using the wrong tool and I got really good at using it that I didn't consider anything else. Not only does Visual Studio Code provide 'go to definition' and great code completion via IntelliSense it also does a variety of other wonderful things that Atom does not do.

Using your tools well is important. Using the right tools well is more important. Have you ever seen your coworker use a specific tool to solve a problem and wonder why they do it that way? You probably should ask them about it. Two things might happen, you may learn about a more efficient tool you should be using or you can teach them about a more efficient tool they could be using.

### 9. Be a Catalyst for Positive Change
Is a language or framework holding your team back? Maybe it is a specific part of the software development life cycle? Everywhere you work you should look for improvements your team could make to be more effective. Whether it is a development process change or the introduction of a new technology such as a framework, anything that can make an increase in the quality of the product your team produces may be worth making.

Early on in my career, I worked at a company that used git for source control which was great but most teams had no policy on what branching (or forking) model to use. Good source control history is important, and at the time I felt like the "git flow" branching model would produce the highest quality source history for our teams. So I wrote up a formal policy that management could review and hold teams accountable to. In conjunction with that, I evangelized the usages of "git flow" to every developer I worked with. I feel as if this is an example of being a catalyst for positive change because it allows use to have more valuable source history company wide.

At my current place of employment, we collectively don't have a large amount of experience developing modern web applications. We primarily build backend interfaces and other kinds of services without a user interface but occasionally we need to build a web application. I was tasked with building a new user interface and advising what technologies should be used. I surveyed what had been done before and saw no corporate infrastructure for JavaScript dependency management and found most web applications were built with AngularJS and were entirely untested.

I wanted to be different. I was used to using a JavaScript dependency manager such as `npm` so I recommend that we invest in infrastructure for that technology. In conjunction with that, I recommending that we build the user interface using React and Redux, I felt that the clear separation between the model and view layer would lead to a more testable application which will result in a higher quality product. I feel as if this is an example of being a catalyst for change, I feel as if it has been positive but only time will truly tell as we are still actively working. Where ever you work, always consider what improvements you can make to allow you and your team to work more effectively.

### 8. You Can't Write Perfect Software So You Should (not) Refactor Early and Refactor Often

### 7. Programming With Tracer Bullets

### 6. Giving Precise Estimates
At some point in your career you will be asked to give an estimate on how long it will take to complete a specific task or even a whole project. Getting better at estimation is tricky and it is something I am not sure I will ever master but we can get better over time. Something that I find that helps me is considering my past work as a frame of reference. Over time you will solve a variety of problems, that allows you to know what yours strengths and weaknesses are allowing you to better assess how long it will take me to complete a task. Even better, after having spent some time working on a code base you may find your estimations become more accurate. This is because of a couple of factors such as becoming more familiar with the code base as well as the problem domain. Your skills in estimation will increase as you practice.

Estimations for an entire team or a project are slightly different since they are less dependent on your skills. When I have to give an estimate for an entire team it is always based off of our past work respective to how much work every individual completed. If you know how much work every individual can complete in a given amount of time and you know every individuals commitment levels to the current project then you can form a pretty accurate estimate. Expect more on this topic in another post.

It is important to consider the significant figures of your estimate. When giving an estimate consider that 6 weeks and a month and a half are equal but imply different levels of precision. If someone gives an estimate of 6 weeks it is expected to be completed within a couple days relative to the 6 week estimation. Although, when someone gives an estimate of a month and a half it is expected that is completed within a couple of weeks relative to the month and a half estimation. This is similar to when someone says they will pick you up in 5 minutes compared to 7 minutes, the latter feels much more precise. 

As a general rule, The Pragmatic Programmer gives a great reference for what units you should give estimates in. If an estimate is 1 to 15 days consider quoting in terms of days. If an estimate is 3 to 8 weeks consider quoting in weeks. If an estimate is 8 to 30 weeks consider quoting in terms of months. If an estimate is greater than 30 weeks think harder before giving an estimate.

### 5. Design By Contract and Assertive Programming

### 4. Ensure You're Solving the Right Problem
As a software developer it is your job to solve problems. If something feels too challenging or even impossible it is probably because you are solving the wrong problem. Take a step back and consider that there may be another way to solve the current problem. Are you thinking inside or outside of the box? Where is the box exactly defined? A problem may seem difficult because you were unaware of the boundaries of the box. Perhaps, you did not realize that a library was capable of solving a specific problem for you so you rolled your own solution and it was challenging or perhaps, you were unaware that the problem occurs so frequently that someone on your team has already solved it for you. Always consider that a problem may not be impossible but that you may be solving the wrong problem.

Often we find ourselves so far removed from our domain, solving a problem that is a sub-problem of our current task that it causes us to ask for help on questions that don't need to be solved. Imagine you are trying to solve problem X but to solve problem X you need to do Y, although, you get stuck solving Y so you ask for help with regards to problem Y. This is referred to as an [XY problem](https://meta.stackexchange.com/questions/66377/what-is-the-xy-problem). Problem Y was never the problem you needed to solve. 

When *asking* a question I would recommend phrasing your question in a way that mentions both X and Y. One option might be, "I am trying to solve X, I have tried Y but it is not working, any ideas?" This way, you expose the person you are requesting help from to the source problem and the way you are trying to solve it, either they know a better way to solve it or they can help you figure out why what you are trying is not working. When *answering* questions the first thing I would recommend asking would be a clarifying question to ensure you are helping them with the right question. An option for that might look like the following, "What exactly are we trying to achieve by doing X?" They may respond by telling you that they are actually trying to do Y or they clarify their question further.  

### 3. Beware of Evil Wizards

### 2. Design to Test

### 1. Always Consider Orthogonality