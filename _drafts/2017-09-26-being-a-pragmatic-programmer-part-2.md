---
layout: post
title: Being a Pragmatic Programmer - Part 2
permalink: /being-a-pragmatic-programmer-part-2
---

### Design By Contract and Assertive Programming
Design by contract and assertive programming seem to be very orthogonal issues to me. I discuss design by contract a little bit in this [post]() but for those that haven't read it; design by contract is essentially contractual obligations that software components __must__ uphold certain pre and post conditions. I firmly believe that you will see an increase in maintainability if you document a contract for every piece of code you write. In conjunction with that, the maintainability of your product will sky rocket if you are being an assertive programmer with regards to your contract.

Why should you even bother documenting software contracts? Imagine you call a function to calculate the square root of a number, what does that function do if a negative number is passed in as an argument? Does it return an imaginary number or does it throw an error? In the parameter level documentation if would be worth documenting the behavior of this case. Further, it is worth documenting all edge cases of all software components you write. Does this function operate on negative values, what about null values, does it throw an error I need to catch? All of the answers to these question can make up a contract that can be documented that you can refer to when you need to know what behavior you need to be able to handle when you call the function in question.

We alluded to it a bit earlier but it is important to enforce contracts. Enforcing your contract for your software component can be relativity simple. If your contract states something like `throws an Error if parameter number is negative` then enforcing that contract is easy, the first thing your function should do is check if `number` is negative or not, if it is negative then it should throw an error. It is up to you what the result of your edge cases will be but they should be one hundred percent consistent with the contract you documented. Perhaps you thrown an exception or return some well know default value. The practice of assertive programming makes your code more maintainable because people calling your code know exactly what types of return values or side affects they should be able to handle.

### Ensure You're Solving the Right Problem
As a software developer it is your job to solve problems. If something feels too challenging or even impossible it is probably because you are solving the wrong problem. Take a step back and consider that there may be another way to solve the current problem. Are you thinking inside or outside of the box? Where is the box exactly defined? A problem may seem difficult because you were unaware of the boundaries of the box. Perhaps, you did not realize that a library was capable of solving a specific problem for you so you rolled your own solution and it was challenging or perhaps, you were unaware that the problem occurs so frequently that someone on your team has already solved it for you. Always consider that a problem may not be impossible but that you may be solving the wrong problem.

Often we find ourselves so far removed from our domain, solving a problem that is a sub-problem of our current task that it causes us to ask for help on questions that don't need to be solved. Imagine you are trying to solve problem X but to solve problem X you need to do Y, although, you get stuck solving Y so you ask for help with regards to problem Y. This is referred to as an [XY problem](https://meta.stackexchange.com/questions/66377/what-is-the-xy-problem). Problem Y was never the problem you needed to solve. 

When *asking* a question I would recommend phrasing your question in a way that mentions both X and Y. One option might be, "I am trying to solve X, I have tried Y but it is not working, any ideas?" This way, you expose the person you are requesting help from to the source problem and the way you are trying to solve it, either they know a better way to solve it or they can help you figure out why what you are trying is not working. When *answering* questions the first thing I would recommend asking would be a clarifying question to ensure you are helping them with the right question. An option for that might look like the following, "What exactly are we trying to achieve by doing X?" They may respond by telling you that they are actually trying to do Y or they clarify their question further.  

### Beware of Evil Wizards
Dont be afraid of reading third party source code.

### Design to Test

### Always Consider Orthogonality