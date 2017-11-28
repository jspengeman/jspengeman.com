---
title: Design By Contract With React and Redux
---

A large strength of React and Redux is the clear separation between the model layer and the view layer. We can further strengthen this relationship by ensuring that our view layer is contractually obligated to uphold specific pre and post-conditions. Every piece of software wether it be a class, function or a module of some kind has a contract; although, it is up to you to define and enforce these contracts. At minimum, all public APIs should have a contract documented and enforced. In conjunction with that, it is best to fail early, if you can enforce a contract on a private API you should also do so.

### What Does a Contract Look Like?
Can you spot a good contract? What about a bad one? In this section we will define what must exist for a contract to be considered good as well as what a bad contract looks like.

#### Bad
```javascript
const sum = (array) => {
  return array.reduce((total, current) => {
    return total + current
  }, 0)
}
```

In the code above I define a function called `sum` with a single parameter named `array`. What happens if `array` is `null` or `undefined`? What happens if `array` contains elements that are not numbers? What were to happen if someone passed in a type that we were not expecting such as an object? There are a lot of things that could go wrong, and none of them are protected against or documented. A simple solution is to enforce some __rules__ on the input value of `array`.

#### Good
```javascript
const sum = (array) => {
  invariant(array === undefined || array === null,
    "array cannot be null or undefined.")

  return array.reduce((total, current) => {
    return total + current
  }, 0)
}  
```

The only addition was the `invariant` check. Which simply checks if the first argument is true, if so it throws an `Error`. We are now ensuring that `array` will never reach the function body without being defined. Although, there are still some improvements to be made.

#### Best
```javascript
/**
 * Calculate the sum of an array of numbers.
 *
 * @param {array} array The input array of numbers to use in the calculation.
 *                      Cannot be null or undefined.
 * @return {number} The summation of all elements of array. If am empty array is
 *                  passed in zero is returned. Result is always defined.
 * @throws {error} If array is null or undefined.
 */
const sum = (array) => {
  invariant(array === undefined || array === null,
    "array cannot be null or undefined.")

  return array.reduce((total, current) => {
    return total + current
  }, 0)
}  
```

Not only is the contract being enforced, it is also documented. I no longer have to read the source code to know what `sum`'s contract is. I can clearly determine from the documentation what the expected parameters are. In conjunction with that, I also know that when I call this function the result is always defined. Which allows me to never need to worry about handling null or undefined return values. The contract is not perfect but it serves to demonstrate the value of contractually obligated software.

### Contracts and The View Layer
The more I work with React, the more the view layer begins to feel sort of polymorphic. You define a component, define it's properties, and implement the way it should lay itself out. If you do that in an abstract enough way, your view components can begin to take a variety of different shapes based on the props passed into them. It actually reminds me of defining an interface and implementing that interface with a concrete class.

A good interface defines a contract and implementors follow it. Our view components are no exception, we should have a sort of pragmatic paranoia about how our components will be used, or perhaps abused. After all, we may author the component, but we may not end up being the only one using it. A prudent software developer should always define and enforce a contract for every view component.

#### Presentational Components
Presentational components are your view layer. You can consider presentational components to be similar to an interface that you are expecting others to implement. In the next code sample I will define a simple presentational component with what I consider to be a pretty thorough contract with regards to what the component is supposed to do and what edge cases may exist.

```javascript
/**
 * A slider used to select a single numerical
 * value given a minimum and a maximum value.
 *
 * @param {number} minimum The minimum value of the slider. Cannot be null,
 *                         undefined or greater than maximum.
 * @param {number} maximum The maximum value of the slider. Cannot be null,
 *                         undefined or less than maximum.
 * @param {number} current The current value of the slider. If no current value
 *                         is passed in, minimum is used as the current value.
 *                         Current must be greater than or equal to minimum and
 *                         must be less than or equal to maximum.
 * @param {boolean} vertical A boolean value that indicates whether the number
 *                           slider should be displayed vertically or
 *                           horizontally.         
 * @param {function(Number)} onChange The callback that will be invoked with the
 *                                    new current value on change of the sliders
 *                                    position.
 * @throws {error} If minimum or maximum are undefined, if minimum is greater
 *                 than maximum, and if current is not inclusively in between
 *                 minimum and maximum.
 */
const Slider = (props) => {
  const {
    minimum,
    maximum,
    current,
    vertical,
    onChange
  } = props
  invariant(minimum === undefined || minimum === null,
    "minimum cannot be null or undefined.")
  invariant(maximum === undefined || maximum === null,
    "maximum cannot be null or undefined.")
  invariant(minimum > maximum,
    "minimum cannot be greater than maximum.")
  invariant(current >= minimum,
    "current cannot be less than minimum.")
  invariant(current <= maximum,
    "current cannot be greater than maximum.")

  return (
    // Insert implementation here.
  )
}  
```

If you are familiar with React you are probably familiar with `PropTypes`. Although, the assurances the contract above buys you cannot be achieved with `PropTypes`. You cannot rely on `PropTypes` to make these sorts of assertions for you because `PropTypes` are mainly concerned with the types of properties not specific assertions with regards to their values (other than required vs not required). By having such a strong contract we know our presentational component will never get into an odd visual state because we know we can't pass in a current value that is less than our minimum value, or a maximum value that is less than or minimum value, who knows how the other erroneous cases would render.

When your code breaks (and it will), it will break in the first place the incorrect property is being passed into your component not the first place it is being used, which is a distinction worth noting. In general, it is a better practice to fail as close to the source as possible. By thoroughly defining and enforcing a contract for `Slider` we can ensure that the pre-conditions are true throughout the implementation of `Slider`. By knowing that these pre-conditions are always true we can reason about our code much easier, if there is a problem with the `Slider` component we will already know what the issue is *not* going to be.

Our `invariant` checks may seem like a lot of boiler plate but they do buy us a lot. Being able to nearly instantaneously rule out a plethora of potential problems when debugging is incredibly value. Not only does it save time but it reduces stress because your cognitive load will be lower while trying to figure out what the real problem is; since you can immediately determine that the bug or defect is not the minimum value being greater than the maximum value or any of the other pre-conditions we make assertions for.

#### Container Components
Container components are the bridge between the model layer and the view layer. If we are continuing the OOP analogy from earlier, container components are like concrete classes that implement interfaces. Container components allow you to connect your Redux data store to a presentational component.

```javascript
const mapStateToProps = (state) => ({
  maximum: state.payments.maximum,
  minimum: state.payments.minimum,
  current: state.payments.current
})

const mapDispatchToProps = (dispatch) => ({
  onChange: (newValue) => {
    dispatch(updateCurrentPaymentAmount(newValue))
  }
})

const PaymentSlider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider)

PaymentSlider.defaultProps = {
  vertical: true
}
```

In the above code sample I use the `connect` function from [react-redux](https://github.com/reactjs/react-redux). If you are not familiar with the library I recommend reading a bit about it before continuing. The code sample demonstrates how you would *implement* your view components, remember that they are just like interfaces, the above code sample is the concrete implementation of the abstract `Slider` interface. It passes in all required props to the `Slider` as well as the optional props to construct a new component that is used to adjust the payment amount of our made up application.

If I changed out the `mapStateToProps` and `mapDispatchToProps` functions with different functions the `Slider` becomes a different component. You can easily `dispatch` a different action `onChange` or select a different piece of state to use for `minimum`, `maximum`, or any other property for that matter. This feels a lot like *implementing* your presentational components using Redux.

React is the view layer that defines the interfaces and Redux is the model layer that defines how the view layer is *implemented*. If you want to implement your presentational components with different pieces of state and different actions it is important to define good contracts and enforce them. If you don't, your component may end up getting used in a way that you did not intend. As I previously mentioned, you are not always going to be the person using your presentational component and you should be paranoid about the edge cases and invalid properties that could be passed in.

### Closing Thoughts
If Redux is about making your application state predictable then using contracts in your presentational components is about making your view predictable. Write good contracts and enforce them. You coworkers will thank you.

The inspiration from the post comes from my current work with React and Redux as well as an awesome book titled [The Pragmatic Programmer: From Journeyman to Master](https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer) which discusses design by contract in depth if you are interested, I highly recommend it. In conjunction with that, I wanted to create an analogy to help my coworkers who primarily work in Java better understand how to create more abstract presentational components and breathe life into them with Redux.

Have you used design by contract before, if so, tell me about how you utilize contracts to create more predictable and reliable software? In conjunction with that, please share your thoughts on my approach to creating more predictable view components.
