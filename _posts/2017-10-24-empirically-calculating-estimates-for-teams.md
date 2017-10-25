---
layout: post
title: Empirically Calculating Estimates for Teams
permalink: /empirically-calculating-estimates-for-teams
---

If you working in an agile software development life cycle then your team is making an estimate on how much work to commit to each sprint. Even if you are not utilizing an agile process it is more than likely that you will need to come up with an estimate for a team of developers or at least collaborate with the team to assist in the estimating process. In this post, I will discuss an empirical approach to constructing more accurate estimates for teams.

### The Variables
When constructing an estimate it is important to determine what variables exist. It is impossible to give an accurate estimate without knowing how many people will be on the team. In conjunction with that, your estimate will be more accurate if you know what each team members' commitment levels are to the project. Will all team members be working full time on this project or will some team members be working part time? Are any of your team members taking time off soon? That too, could change the way you calculate an estimate.

You might be seeing where I am going with this, we are going to utilize the team members and their commitment levels to calculate how much *effort* is available. Measuring effort in hours might not be useful because everyone has a different skill level, so even if you did calculate the total number of hours available for a team I don't think it would be very useful. So if not hours, what units should our total effort be measured in? Points! A nearly arbitrary unit that means exactly what you want it to mean. 

A point is just a reference value, your team will define what __one point__ really means. Ideally, points are measures of task complexity. Find a reference task to associate what a one point task really means. After you have defined what a one point task is the team can then decide on how many points an easy, difficult or very difficult task should be by looking at past and present work. Once you those reference tasks your team will be able to figure out how many points worth of work actually exist to complete the project. This will include breaking down the project into tasks that can be given point values based on the scale the team decided on. Once all of these tasks are completed if nothing comes up the project should be complete.

In addition to that, you should ask for individual velocity estimates for how many points each person feels comfortable committing to for some time period. Although, you may not need to do this, perhaps everyone's individual velocity can be determined from pre-existing data that was already collected via your project management software. 

Velocity is the key part of this formula that abstracts away how many hours someone will be working and exchanges it for how much work they will complete over some time period. Whether you have the data available to simply determine this information for each team member or you are going to estimate it, the important part is being as accurate as you can here, since it can have a more significant impact on your estimate due to it being hardest variable to estimate.

With all that being said here are the variables I have identified so far: project complexity in points, team members, individual commitment, and individual velocity.

### Constructing a Formula
<!-- TODO: Change the story from two weeks to one week throughout. -->
Collecting all that information is only hard the first time you have to do it. If you have to do it again for the same project it will be much easier. Lets go over an example and use that to construct a formula that can be used to calculate the estimate itself.

Imagine, your boss or customer comes to you and asks you how long it is going to take to complete "Epic Project #42"? Well that is a complicated project so you have to think about it. 

You learn that a team of programmers will be working on the project with you, what a relief. Jon, Linus, Dan, Sue and yourself will all be working on the project. Great, a team of five! You will be able to get some real work done.

Although, Jon and Dan are only working on this project half time, and Sue can only spend three quarters of her time on this project because she is finishing up another project that is in need of her expertise.

The team has a quick meeting to decide what one point means. The team collectively compares the work they have completed in the past and comes to the conclusion that an easy task is one point, a difficult task is 2 points and a very difficult task is 4 points. 

After that meeting your team has another meeting to find out all the tasks that need to be completed to get "Epic Project #42" completed. At the meeting the team spends most of the day decomposing the project into 50 different tasks making up 175 points worth of work.

<!-- TODO: Has to be a better way to present this information here. -->
The next day, you gather some information from your teammates and your project management software to determine individual velocities for all teammates relative to a one week period. You learn that all of your team members have different velocities relative to a one week period, as expected. Jon is a new hire so his velocity is 4 points. Linus and Sue have been here for a year so they both have a velocity of 8 points. Dan is a senior developer and he has a velocity of 16 points. You are a rock star so you have a velocity of 32 points.

Now have all the data we need, we can calculate an estimate!

{% highlight javascript %}
const projectComplexity = 175

const teammates = [
  {name: 'Jon', commitment: 0.5, velocity: 4},
  {name: 'Linus', commitment: 1, velocity: 8},
  {name: 'Dan', commitment: 0.5, velocity: 16},
  {name: 'Sue', commitment: 0.75, velocity: 8},
  {name:  'You', commitment: 1, velocity: 32}
]

const totalTeamVelocity = teammates.reduce((estimate, teammate) => {
  return estimate += teammate.commitment * teammate.velocity
}, 0)

const estimate = projectComplexity / totalTeamVelocity
{% endhighlight %}

Since velocities have a time component I hard coded them relative to the previously mentioned one week period to help illustrate how the calculation is done.

For all team members multiply their commitment by their velocity to calculate the total individual velocity and sum them together to get the teams total velocity. Next, if you divide the total project complexity by the total team velocity you get the total number of time periods it would take to complete the project, in this case the calculation was done in reference to a one week time period. 

In this case `totalTeamVelocity` is `56` points which means if we divide `projectComplexity` and `totalTeamVelocity` the value for `estimate` is `3.125` weeks. Which means that the project will be completed in approximately three weeks. A pretty precise estimate that can be tweaked by altering commitment levels, the decomposition of tasks for the project, or by adding and removing team members (adding more people does not always mean a project will be done faster).

### Closing Thoughts
The example I gave is for a short project that will only take a few of weeks. The situation changes if you need to estimate something that might take years. I would think hard before trying to give an estimate that is greater than 7 or 8 months, it will be very hard to be accurate. If the project is just inherently large than perhaps it can be decomposed into milestones that create more obtainable goals and all of those milestones can be individually estimated to create a more accurate estimate with obtainable goals along the way. 

This calculation is not perfect. The unpredictable happens, people get sick, family emergencies come up, and sometimes people take other jobs. In conjunction with that, sometimes we make mistakes and we have to spend time fixing things before we can make forward progress. All of these things are variables we can not estimate very accurately if at all.  

I felt like this was quite a journey. Thanks for taking if with me! The intent was not to enforce a specific algorithm to use to create accurate estimates but rather to demonstrate what some of the valuable data points worth gathering are when constructing estimates for teams.