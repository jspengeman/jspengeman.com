---
layout: post
title: A Formula For Accurate Team Estimates
permalink: /a-formula-for-accurate-team-estimates
---

<!-- TODO: Decide on name, perhaps Empirically Calculating Estimates for Teams -->
<!-- TODO: Do an initial edit of the existing draft -->

If you working in an agile software development life cycle then your team is making an estimate on how much work to commit to each iteration. Even if you are not utilizing an agile process it is more than likely that you will need to come up with an estimate for a team of developers or at least collaborate with the team to assist in the estimating process. In this post, I will discuss an empirical approach to constructing more accurate estimates for teams.

### The Variables
When constructing an estimate it is important to determine what variables exist. It is impossible to give an accurate estimate without knowing how many people will be on the team. In conjunction with that, your estimate will be more accurate if you know what each team members commitment levels are to the project. Will all team members be working full time on this project or will some team members be working part time? What about time off? Are any of your team members taking time off soon? That too, could change the way you calculate an estimate.

You might be seeing where I am going with this, we are going to utilize the team members and their commitment levels to calculate how much *effort* is available. Measuring effort in hours might not be useful because everyone has a different skill level, so even if you did calculate the total number of hours available for a team I don't think it would be very useful. So if not hours, what units should our total effort be measured in? Points! A nearly arbitrary unit that means exactly what you want it to mean. 

A point is just a reference value, your team will define what __one point__ really means. Ideally, points are measures of complexity. Find a reference task to associate what a one point task really means. Once you have that one point task in mind you will be able to learn how many points worth of work actually exist to complete the project. In addition to that, you should ask for individual velocity estimates for how many points each person feels comfortable committing to for some time period. Although, you may not need to do this, perhaps everyone's individual velocity can be determined from pre-existing data that was already collected via your project management software. 

Velocity is the key part of this formula that abstracts away how many hours someone will be working and exchanges it exchanges it for how much work they will complete over some time period. Whether you have the data available to simply determine this information for each team member or you are going to estimate it, the important part is being as accurate as you can hear, since it can have a more significant impact on your estimate since it is probably the hardest variable to estimate.

With all that being said here are the variables I have identified so far: project complexity in points, team members, individual commitment, and individual velocity.

### Constructing a Formula
<!-- TODO: Change the story from two weeks to one week throughout. -->
Collecting all that information is only hard the first time you have to do it. If you have to do it again for the same project it will be much easier. Lets go over an example and use that to construct a formula that can be used to calculate the estimate itself.

Imagine, your boss or customer comes to you and asks you how long it is going to take to complete "Epic Feature #42!"? Well that is a complicated feature so you have to think about it. 

You learn that a team of programmers will be working on the task with you. Jon, Linus, Dan, Sue and yourself will all be working on the task. Great, a team of five! You will be able to get some real work done.

Although, Jon and Dan are only working on this task half time, and Sue can only spend three quarters of her time on this project because she is finishing up another project that is in need of her expertise.

The team has a quick meeting to decide what one point means and comes to the conclusion that an easy task is one point, a medium difficultly task is 2 points and a hard task is 4 points. 

After that meeting your team has another meeting to find out all the tasks that need to be completed to get "Epic Feature #42" completed. At that meeting you determine that there exists 40 tasks making up 120 points worth of work.

<!-- TODO: Has to be a better way to present this information here. -->
The next day, you gather some information from your teammates and your project management software to determine individual velocities for all teammates relative to a two week period. You learn that Jon is a new intern so he gets 4 points of work done every two week period, Linus and Sue have been here for a year so they each get 8 points of work done every two week period, Dan is a senior developer so he gets 16 points worth of work done very two week period, You are a rock star with tons of experience so you get 32 points worth of work done every two week period.

Now have all the data we need!

<!-- TODO: Rework this to make it more generic to time period if possible. -->
{% highlight javascript %}
const projectComplexity = 120

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

const totalWeeks = projectComplexity / totalTeamVelocity
{% endhighlight %}

Since velocities have a time component I hard coded them relative to the two week period for each team member to help illustrate the point.

For all team members multiply their commitment by their velocity to calculate the total velocity for the entire team for some time period. Next, if you divide the total project complexity by the total team velocity you get the total number of time periods it would take to complete the project. 

In this case `totalTeamVelocity` is 56 points which means that the project will be completed in roughly two weeks, or as my calculator informs me __exactly__ 15 days. Although, it is an estimate so we should plan accordingly. 


### Afterward
<!-- TODO: Complete the summary. -->
* Thanks for taking that journey with me.
* People get sick
* We code ourselves into corners sometimes.
* The unexpected happens.