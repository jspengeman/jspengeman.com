---
layout: post
title: Redux Lego Pieces - The Essentials
permalink: /redux-lego-pieces-the-essentials
---

Redux is the model layer for client side web applications. Although, it is really just a predictable state container that could be used for anything. It has been an absolute pleasure to work with. This article is assuming the reader has a little bit of familiarity with Redux but is mainly targeted at beginners or those interested in fundamentals.

What I love about redux is once you know what lego pieces you need to construct your lego set, it becomes quite natural to work with. On the other hand, what I don't love about Redux is the initial learning curve. In retrospect, it is not too bad, it was really a lot of googling how to do something specific like asynchronous actions and then learning there was a library for that. The most difficult part was finding out what all the different pieces were and how they all fit together.

#### Lego Piece #1: Actions
Actions are just objects. They are passed to a reducer and used to produce the next state. We will discuss reducers more in detail later on. For now, it is important to note that they must have a `type` property so that reducers can know what type of action it is. In conjunction with that they can optionally, have any other fields. I like to follow the [flux standard action](https://github.com/acdlite/flux-standard-action#actions) schema but it is not required.
It is important to note that any properties you put into an action will be made available in your reducers.

{% highlight javascript %}
const exampleAction = {
  type: 'POST_STATUS',
  payload: {
    status: 'Hello, everyone.'
  }
}
{% endhighlight %}

I will be writing the model layer for an application that displays a list of text based statuses. It is really simple and hopefully less boring then a todo app example. Notice the action above has a `type` property whose value is `'POST_STATUS'`, this is called an `actionType`. They are worth abstracting out into constants as they will be used in multiple places such as your reducers but that is not required for small applications.

#### Lego Piece #2: Action Creators
Action Creators are functions that return objects. They are responsible for creating your actions with the data you provide to them. In the Actions section you saw the structure of an action that had already been created; which is useful, but you will want to be able to create actions with different parameters otherwise the function would just create the same object every single time you call it, and that is not very useful (most of the time).

{% highlight javascript %}
const postStatus = (status) => ({
  type: 'POST_STATUS',
  payload: {
    status
  }
})
{% endhighlight %}

The following example would be equivalent to the example we saw in the action section. Action Creators are essentially factories that pump out objects that are parameterized by the data you pass into them. This becomes really important later on when we discuss reducers.

{% highlight javascript %}
const postStatusAction = postStatus('Hello, everyone.')
{% endhighlight %}

#### Lego Piece #3: Reducers
Reducers are pure functions that take in the current state and the action being processed to produce the next state. If you are not familiar with functional purity check out my [article](/focusing-on-functional-purity) on that subject. Remember when I said Redux is predictable? Good, this is a major aspect of that point. Redux is predictable because all reducers are pure functions, meaning they will always produce the same output given the same input.

##### The Three Golden Rules
There are a few rules for writing correctly functioning reducers. __Rule number one__, every reducer should define a default state. In our example below, I define the default state to be an empty array. __Rule number two__, if a reducer does not handle an action of a specific type it should return its current state. The example code is abiding by rule number two by having a default case that returns the current state which was the value passed in. __Rule number three__, you cannot mutate the state argument that was passed in, you must return a new value or simply not modify the value passed (rule number one and two). That is because mutating an object makes a function impure and an impure function is an unpredictable one, the whole point of Redux is to be predictable. By utilizing `concat` I am creating a shallow copy of the array referenced by `state` and adding `action.payload.status` to it which returns a new array.

{% highlight javascript %}
const posts = (state = [], action) => {
  switch(action.type) {
    case 'POST_STATUS':
      return state.concat(action.payload.status)
    default:
      return state
  }
}
{% endhighlight %}

##### Reducers In The Wild
We know that reducers produce our next state given our current state and some action, but what does that actually look like?

{% highlight javascript %}
const initialState = posts(undefined, {})
const action = postStatus('fancy status')
const nextState = posts(initialState, action)
{% endhighlight %}

In the code sample above we call the reducer without a value for state and the action does not matter, this returns our default state of an empty list. Then on the next line we make a `postStatus` action and on the final line we pass our `initialState` and our `action` to the reducer to quite literally produce our next state. If we log `nextState` it will be `['fancy status']`.

#### Lego Piece #4: Store
The store is an object with a simple interface. It provides three different methods: `getState()`, `dispatch(action)` and `subscribe(listener)`. Each application should have a single store, you can create a Redux store using `createStore(reducer)`. Notice that the `createStore` function has a reducer parameter; that is your applications root reducer that the store should use. When you `dispatch` an action, that action and the current state are then passed to the reducer you originally passed into the `createStore` function. That reducer will then produce the next application state. You can be notified of state changes by subscribing to the store via the `subscribe` function and you can get every updated state change in your store by using `getState` in your listener. Lastly, it is worth noting that there is no `unsubscribe` function on the store object. The `subscribe` method returns a function that can be called to unsubscribe your listeners.

##### Putting It All Together
I am going to create an example using both the previous examples and the store I am defining below to demonstrate how all of these different lego pieces fit together.

{% highlight javascript %}
// pass in the posts reducer.
const store = createStore(posts)

// subscribe our callback function to the store.
const unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

// dispatch three different postStatus actions.
store.dispatch(postStatus('super status'))
store.dispatch(postStatus('fancy status'))
store.dispatch(postStatus('ultra status'))

unsubscribe()
{% endhighlight %}

On each `dispatch` the `posts` reducer will be called, it will see that a `postStatus` action was dispatched and it will add the status to the state and return the new state. The first dispatch call will result in `['super status']` to be logged, the second dispatch will result in `['super status', 'fancy status']` to be logged, and I think you are seeing the pattern here.

As you can see, our state is updating, and it is updating in a predictable way. If I dispatched an action that the `posts` reducer didn't care about our current state gets returned, essentially ignoring the action. By not mutating the state that was passed in we can make better assertions about our code and we know exactly where state modifications have to take place.

##### Summary
In this post we discussed the essential lego pieces of Redux. In the next iteration of this series we will discuss more advanced topics including middleware, asynchronous actions, how to compose reducers, and how to query for data from your store. In this post you should have learned how actions, action creators, reducers and the store are used to create a model layer.

Redux can be used as the model layer for nearly any type of application. I have been thinking a lot lately about applying it to other types of applications such as mobile or desktop apps or even a video game. What have you used Redux to build and what were your thoughts on it, was it a success or a failure?
