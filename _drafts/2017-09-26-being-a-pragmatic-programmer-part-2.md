---
layout: post
title: Being a Pragmatic Programmer - Part 2
permalink: /being-a-pragmatic-programmer-part-2
---

### Design By Contract and Assertive Programming

### Ensure You're Solving the Right Problem
As a software developer it is your job to solve problems. If something feels too challenging or even impossible it is probably because you are solving the wrong problem. Take a step back and consider that there may be another way to solve the current problem. Are you thinking inside or outside of the box? Where is the box exactly defined? A problem may seem difficult because you were unaware of the boundaries of the box. Perhaps, you did not realize that a library was capable of solving a specific problem for you so you rolled your own solution and it was challenging or perhaps, you were unaware that the problem occurs so frequently that someone on your team has already solved it for you. Always consider that a problem may not be impossible but that you may be solving the wrong problem.

Often we find ourselves so far removed from our domain, solving a problem that is a sub-problem of our current task that it causes us to ask for help on questions that don't need to be solved. Imagine you are trying to solve problem X but to solve problem X you need to do Y, although, you get stuck solving Y so you ask for help with regards to problem Y. This is referred to as an [XY problem](https://meta.stackexchange.com/questions/66377/what-is-the-xy-problem). Problem Y was never the problem you needed to solve. 

When *asking* a question I would recommend phrasing your question in a way that mentions both X and Y. One option might be, "I am trying to solve X, I have tried Y but it is not working, any ideas?" This way, you expose the person you are requesting help from to the source problem and the way you are trying to solve it, either they know a better way to solve it or they can help you figure out why what you are trying is not working. When *answering* questions the first thing I would recommend asking would be a clarifying question to ensure you are helping them with the right question. An option for that might look like the following, "What exactly are we trying to achieve by doing X?" They may respond by telling you that they are actually trying to do Y or they clarify their question further.  

### Beware of Evil Wizards
Dont be afraid of reading third party source code.

### Design to Test

### Always Consider Orthogonality