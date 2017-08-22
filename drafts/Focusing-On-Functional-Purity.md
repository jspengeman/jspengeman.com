---
layout: post
title: Focusing on Functional Purity
---

A five minute read on why to avoid side effects and how to isolate them.

### Pure Functions and Side Effects
For a function to be considered true two conditions must be met. The function
always produces the same output given the same input and the function does not
cause any side effects to take place. A side effect includes mutation of shared
or internal state as well as I/O such as writing to a database.

### The Bane of Side Effects
Side effects can cause the output of a function to change on subsequent calls.
Further, side effects that mutate objects makes reasoning about your code more
difficult.

#### A Simple Example
```
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
```

The example illustrates an `onClick` event handler that uses a function to mutate
a shared state and then do some calculation on that shared state. This code is
harder to reason about because anyone could mutate the value of `target`. To
make things worse, it is possible that someone mutates the value of `target`
before the calculation is actually done, causing your expected output to change.

A bit of refactoring...

```
const onClick = (event) => {
  doCalculation(event.target)
}

const doCalculation = (target) => {
  return (target.value * 2) / 3
}
```

This is a *very* contrived example, but I have seen a fair amount of production
code that utilizes a setter of some kind and then immediately after operates on
the value that was previously set. The only change I had to make to make
`doCalculation` functionally pure was to have it accept an input value of target
instead of relying on global state.

If your function is `void` and has no return value you may be relying on side
effects for your code to work as expected. Such was the case of `setTarget`.

#### Software Testing
When a function produces different output on each call or maybe worse, seemingly
at random the function under test produces different results on each invocation
using the same input, how would you test that? Well you would probably have to
mock all of side effects so that they return well known values. This takes a
proportional amount of time based on how complicated your code is. Functionally
pure code is easier to test, you simply need a well known input and a well known
output and you can assert that given that input you produce the same output. The
result will always be the same, whether you run the tests once or ten times.

### Isolate side effects
It is impossible to avoid side effects. If your application utilizes a database
or has any sort of persistence layer for that matter, your application undoubtably
has side effects. Although, it is possible to isolate and minimize these side
effects.

// This example could use some work. It is really dense and provides little value.
If at all possible, isolate your side effects to a single location. In example,
a common pattern in object oriented programming is to utilize A data access
object to abstract away retrieval and persistence of objects. The side effects
of retrieving or persisting an object is now all co-located within a single
class/file. Now when you see this class being used somewhere you will know it is
dependent on side effects. As an added benefit, when you are testing functions that
rely on retrieval or persistence of objects you can now mock the DAO class that
has the side effects present and your code is now more easily testable.
