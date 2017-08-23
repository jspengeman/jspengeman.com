---
layout: post
title: Focusing on Functional Purity
permalink: /focusing-on-functional-purity
---

### Pure Functions and Side Effects
For a function to be considered pure two conditions must be met. The function
always produces the same output given the same input and the function does not
cause any side effects to take place. A side effect includes mutation of shared
or internal state as well as I/O such as writing to a database.

Side effects can cause the output of a function to change on subsequent calls.
Further, side effects that mutate objects makes reasoning about your code more
difficult.

#### A Simple Example
{% highlight javascript %}
let target = null

const onClick = (event) => {
  setTarget(event)
  doCalculation()
}

const setTarget = (event) => {
  target = event.target
}

const doCalculation() => {
  return (target.value * 2) / 3
}
{% endhighlight %}

The example illustrates an `onClick` event handler that uses a function to mutate
a shared state and then do some calculation on that shared state. This code is
harder to reason about because anyone could mutate the value of `target`. To
make things worse, it is possible that someone mutates the value of `target`
before the calculation is actually done, causing your expected output to change.

A bit of refactoring...

{% highlight javascript %}
const onClick = (event) => {
  doCalculation(event.target)
}

const doCalculation = (target) => {
  return (target.value * 2) / 3
}
{% endhighlight %}

This is a *very* contrived example, but I have seen a fair amount of production
code that utilizes a setter of some kind and then immediately after operates on
the value that was previously set. The only change I had make to `doCalculation` to make it functionally pure was to have it accept an input value of target
instead of relying on global state.

If your function is `void` and has no return value you may be relying on side
effects for your code to work as expected. Such was the case of `setTarget`.

### Isolate Side Effects
It is impossible to avoid side effects. If your application utilizes a database
or has any sort of persistence layer for that matter, your application undoubtably
has side effects. Although, it is possible to isolate and minimize these side
effects.

If you find yourself communicating with a backend application utilizing asynchronous
communication, why not put all of that communication code in a common location.
That way, if you are seeing that class or file being used some where you know
what side effects are going to be present. It is the same concept for reading and
writing to a database, don't intersperse that code throughout an application,
causing your application to be riddled with side effects. Consolidate and isolate
those reads and writes into a common class (there is actually a
[design pattern](http://www.oracle.com/technetwork/java/dataaccessobject-138824.html) for this if you are interested).

You can further minimize code that is reliant of side effects by preferring
parameters and local variables over class or global variables. As I illustrated
in my example, it is generally a bad practice to use a class member variable when
you can simply use a parameter on a function instead.

#### Unit Testing
When a function produces different output on each call or maybe worse, seemingly
at random the function under test produces different results on each invocation
using the same input, how would you unit test that function? Well you would probably
have to mock all of side effects so that they return well known values. This takes a
proportional amount of time based on how complicated your code is. Functionally
pure code is easier to test, you simply need a well known input and a well known
output and you can assert that given that input you produce the same output. The
result will always be the same, whether you run the tests once or ten times.

It is my dream that I can always test pure code. You simply stick something in
and get something out. Unfortunately, you will have to test code that has side
effects. Although, the good news is that when the side effects are correctly
isolated, you can mock the functions with side effects so they return well known
values that allows your testing environments to function the way you'd like. You
will spend far less time mocking functionality when you have to mock less code,
that is one thing isolating your side effects allows you to achieve.

If you don't isolate your side effects, and you intersperse your application
with side effect based code like writing to a file, making an HTTP request, or
any number of things. You will find testing your application to be a nightmare.

### Closing Thoughts
These are not the only approaches to isolating side effects, but rather,
a few examples. If you find you are relying on some side effect for your code to
function correctly, consider changing your approach. It may be easy to understand
when only a one or two side effects exist but as your application grows in
complexity it will crumble if you are relying on side effects.

Did I miss anything or get anything wrong? Let me know in the comments section.
