---
layout: post
title: Earning Value by Not Writing Tests
permalink: /earning-value-by-not-writing-tests
---

Unit testing is pretty important to me. I could not imagine working without testing my code. The value that software testing adds is immense. You gain an increase in productivity and a decrease in risk with the subtle fee of a small time investment. A tax that I think is almost always worth paying, but when is it not worth investing in? Later on in this post I will discuss a time I found my self in a situation where investing in unit testing was not valuable for my team and I.

#### Building a Prototype
I can think of a one case when it is okay not to write tests. You are building a short lived prototype for demonstration purposes and you have less time than you need to complete it. In fact, this happened to me just this last month. My product owner was made aware of an opportunity to demo our product to a large number of customers. There was a small catch, we had not implemented all the features we would need to demo and we had five weeks to complete the feature set. We shifted the entire teams priorities over to aim to complete this feature set in time for the demo.

We decided very early on that we were going to take a 'prototype' approach to implementing the feature set for the demo. To our team, this meant not writing new unit tests and only maintaining existing ones. In conjunction with that, we were also okay with utilizing solutions that introduced more technical debt than we were typically okay with if it meant that we could save some time. We had five weeks to get the features done but plenty of time to go back and take care of technical debt for anything we wanted to bring into the baseline later on.

#### Making Trades Offs
I did do one thing differently that I would recommend anyone who is building a prototype do. I wrote integration tests for full features, rather than writing unit tests which are valuable in almost every scenario, they just were not worth the investment at the time. In the context of building a prototype, integration testing was a better investment of time. They reduced the risk of changing implementations or adding new features because the integration tests were verifying that the application was functioning correctly not that an individual software component was behaving as expected. I could have spent that time writing unit tests but I think what the unit tests would have earn us was incredibly weak in this case compared to integration tests.

It is all about trade offs. I knew that investing in integration testing would earn more value as we add new features and changed implementations. Instead of writing integration tests I could have gone off and implemented a new feature. Although, I might argue that doing that could have ended up earning less value than writing some form of tests. The integration tests were used to confidently make changes that we could not have made as confidently without them. We were rather successful trading time for an increase in risk by not unit testing. While this approach was sustainable for a month I do not predict it would work well for much longer than that and when doing anything but building a prototype. 