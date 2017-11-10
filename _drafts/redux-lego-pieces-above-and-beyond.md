---
layout: post
title: Redux Lego Pieces - Above and Beyond
permalink: /redux-lego-pieces-above-and-beyond
---

In the first post on Redux Lego Pieces we discussed the essential building blocks of Redux and how they fit together. If you already have the basics of Redux down then continue on, otherwise you may want to checkout the [first post](/redux-lego-pieces-the-essentials) in this series. By the end of this post you should have some familiarity with what libraries you will need to pull together to kick Redux into *overdrive*.

### Above and Beyond
#### Lego Piece #5: combineReducers
It is unrealistic for any complex application to have a single reducer that manages the entire application's state. The more idiomatic approach is to have multiple reducers that each manage a specific part of the applications state. Although, `createStore` requires a single reducer as input so if we are intentionally writing multiple reducers we need to be able to still pass in a single reducer to `createStore`. The `combineReducers` function is used to (you guessed it) combine multiple reducers into a single reducer. The input requires a object which has each reducer mapped by the property name you would like that piece of state to be called in your state tree to the reducer that will manage that piece of state. 

{% highlight javascript %}
const posts = (state = [], action) => {
  switch(action.type) {
    // Implementation...
  }
}

const comments = (state = [], action) => {
  switch(action.type) {
    // Implementation...
  }
}

const entitiesReducer = combineReducers({
  posts,
  comments
})
{% endhighlight %}

The structure of your reducers will match the structure of your state since each reducer maps directly to a piece of state. In the example above I used `combineReducers` to create a new reducer that is responsible for managing all of my `post` and `comment` entities. The `entitiesReducer` when called will produce a state object with a `posts` property and `comments` property. If I wanted, I could change the name of the state a reducer is managing by changing the property name in the object you pass into the `combineReducers` function. 

Reducers that are made as a result of `combineReducers` are no different than the reducers you write yourself. The reducers you create with `combineReducers` are going to expect a larger piece of state as input, in fact they will expect the combined pieces of state as input as demonstrated below.

{% highlight javascript %}
const entitiesReducer = (state = {posts: [], comments=[]}, action) => {
  return {
    posts: posts(state.posts, action),
    comments: comments(state.comments, action)
  }
}
{% endhighlight %}

Above is an example of what a 'combined' reducer looks like. Rather than hard coding this behavior `combineReducers` does it dynamically for you so you don't have to statically type out combined reducers. Your combined reducers will ultimately combine into a single reducer that represents your entire application state. 

#### Lego Piece #6: Middleware
Middleware allows for Redux to be extended to support different kinds of functionality that do not ship with Redux by default. What exactly does middleware do in the context of Redux? It can really do anything you would like. Although, a more definitive answer would be that it allows you to take some sort of action in between the moment you dispatch and action and the moment it reaches the stores reducer. 

The `createStore` function supports an `enhancer` argument. Which is used to add functionality to the store such as logging, persistence and async actions (more on that later). Redux ships with a single store enhancer called `applyMiddleware` which takes in a list of middleware to chain together. 

{% highlight javascript %}
const store = createStore(
  rootReducer, 
  applyMiddleware(
    loggingMiddleware,
    anotherMiddleware,
    createThunkMiddleware())
)
{% endhighlight %}

Writing your own middleware is not incredibly complicated but I will not be covering that here for the sake of brevity. The important part to note is that you can utilize middleware to enhance your store and that all middleware are chained together from first to last in the order that they are passed into `applyMiddleware`. The only caveat being that one middleware could do something with the action that results in middleware down the chain not seeing it. 

#### Lego Piece #7: Async Actions
There are a variety of different ways that asynchronous actions can be handled with Redux. One way that I think is very simple is to expand our definition of what an action is defined as. Up until now an action was simply an object. Which is great for updating state synchronously but how would you utilize that to do something that is asynchronous like an HTTP request to obtain data from a server? In short, you can't. Although, if we expanded the definition of what an action is to include objects and *functions* we will be able to do asynchronous actions.

What if we added a middleware to our application that was responsible for checking if an action was either an object or a function. In the event that it is a function we would invoke it and pass in the `dispatch` and `getState` functions allowing us to dispatch other actions and look at values in our state. This is exactly what [redux-thunk](https://github.com/gaearon/redux-thunk/blob/v2.2.0/src/index.js#L4) does.  

{% highlight javascript %}
const store = createStore(
  rootReducer, 
  applyMiddleware(
    createThunkMiddleware())
)
{% endhighlight %}

In the above code snippet we add the thunk middleware to our store using the `applyMiddleware` enhancer that we discussed earlier. The thunk middleware is going to look at every single action and invoke them if they are functions, providing the opportunity for you to do any asynchronous work you would like to do.

Asynchronous actions look different than synchronous actions since they are functions. To define an asynchronous action it is best to define an action creator function that will return the function to be called by redux-thunk. This allows you to pass in any additional arguments you may have at dispatch time which is similar to regular action creators. Below is an example of an async action to fetch a list of posts from an API. 

{% highlight javascript %}
const fetchPosts => () {
  return async (dispatch, getState) => {
    try {
      const response = await fetch('/posts')
      if (response.ok) {
        const json = await response.json()
        dispatch(loadPostsSuccess(json))
      } else {
        throw new Error('Failed to fetch.')
      }
    } catch(error) {
      dispatch(loadPostsFailure(error))
    }
  }
}
{% endhighlight %}

On a 2XX response we will dispatch a `loadPostsSuccess` action to hydrate our store with our newly loaded posts. In the event of a failure we will dispatch a `loadPostsFailure` action that will allow us to inform our users that we were unable to fetch the posts. 

To invoke the async action you simply need to call `dispatch` with the result of `fetchPosts` which would be the function for redux-thunk to invoke.

{% highlight javascript %}
store.dispatch(fetchPosts())
{% endhighlight %}

As you can see, by dispatching the `fetchPosts` async action we were able to attempt to fetch the posts for the application and inform the users of the asynchronous success or failure. All while still allowing the user to perform other actions in the application. 

#### Lego Piece #8: Selectors

