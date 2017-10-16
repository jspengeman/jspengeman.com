---
layout: post
title: When It Is Okay Not To Write Tests
permalink: /when-it-is-okay-not-to-write-tests
---

Unit testing is pretty important to me. I could not imagine working without testing my code. The value that software testing adds is immense. You gain an increase in productivity and a decrease in risk with the subtle fee of a small time investment. A tax that I think is almost always worth paying, but when is it not worth investing in? Later on in this post I will discuss a time I found my self in a situation where investing in unit testing was not valuable for my team and I.

I can think of a single example when it is okay not to write tests. You are building a short lived prototype for demonstration purposes and you have less time than you need to complete it. In fact, this happened to me just this last month. My product owner was made aware of an opportunity to demo our product to a large amount of customers. There was a small catch, we had no implemented all the features we would be needing to demo and we had five weeks to complete the feature set. We shifted the entire teams priorities over to completing this feature set in time for the demo.

<!-- TODO: I don't like the term 'cutting corners' prefer to use 'technical debt' -->
We decided very early on that we were going to take a 'prototype' approach to implementing the feature set for the demo. To our team, this meant not writing new unit tests but only maintaining existing ones. As well as, cutting a corner or two as far as implementations went. We had five weeks to get the features done but a seemingly infinite amount of time to go back and fix them after the demo so we were okay with cutting a corner if it bought us a fair amount of time. 

I did do one thing differently that I would recommend anyone who is building a prototype do. I wrote integration tests for full features, rather than writing unit tests which are valuable in almost every scenario, they just were not worth the investment at the time. In the context of building a prototype, integration testing was a better investment of time. They reduced the risk of changing implementations or adding new features because the integration tests were verifying that the application was functioning correctly not that an individual software component was behaving as expected. I could have spent that time writing unit tests but I think what the unit tests bought us were incredibly weak in this case compared to integration tests.

<!-- TODO: This closing thought could use a little work. -->
It is all about trade offs. I knew that investing in integration testing would pay off as we add new features and changed things. Instead of writing integration tests I could have gone off and implemented a new feature. Although, I might argue that doing that could have ended up actually slowing things down. The integration tests were used to confidently make changes that we could not have confidently have made without them.    
