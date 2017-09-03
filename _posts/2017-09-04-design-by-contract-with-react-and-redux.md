---
layout: post
title: Design By Contract With React and Redux
permalink: /design-by-contract-with-react-and-redux
---

A large strength of React and Redux is the clear separation between the model layer and the view layer. We can further strengthen this relationship by ensuring that our view layer is contractually obligated to uphold specific pre and post-conditions. Every piece of software wether it be a class, function or a module of some kind has a contract; although, it is up to you to define and enforce these contracts. At minimum, all public APIs should have a contract documented and enforced. In conjunction with that, it is best to fail early, if you can enforce a contract of a private API you should also do so.

### What Does a Contract Look Like?
In this section we will detail what a contract for a software component looks like. Can you spot a good contract? What about a bad one? Good contracts include documentation as well as implementations that enforce the contract.

#### Bad
{% highlight javascript %}
const sum = (array) => {
  return array.reduce((total, current) => {
    return total + current
  }, 0)
}
{% endhighlight %}

What happens if `array` is `null` or `undefined`? What happens if `array` contains elements that are not numbers? What were to happen if someone passed in a type that we were not expecting? There are a lot of things that could go wrong, and none of them are protected against or documented. A simple solution is to enforce some __rules__ on the input value of `array`.

#### Good
{% highlight javascript %}
const sum = (array) => {
  invariant(array === undefined || array === null,
    "array cannot be null or undefined.")

  return array.reduce((total, current) => {
    return total + current
  }, 0)
}  
{% endhighlight %}

The only addition was the `invariant` check. Which simply checks if the first argument is true, if so it throws an `Error`. We are now ensuring that `array` will never reach the function body without being defined. Although, there are still some improvements that can be made.

#### Best
{% highlight javascript %}
/**
 * Calculate the sum of an array of numbers.
 *
 * @param {Array} array The input array of numbers to use in the calculation.
 *                      Cannot be null or undefined.
 * @return {Number} The summation of all elements of array. If am empty array is
 *                  passed in zero is returned. Result is always defined.
 * @throws {Error} If array is null or undefined.
 */
const sum = (array) => {
  invariant(array === undefined || array === null,
    "array cannot be null or undefined.")

  return array.reduce((total, current) => {
    return total + current
  }, 0)
}  
{% endhighlight %}

Not only is the contract being enforced, it is also documented. I no longer have to read the source code to know what `sum`'s contract is. I can clearly determine from the documentation what the expected input values are. From reading the documentation I also know that when I call this function the result is always defined. Which allows me to never need to worry about handling null or undefined return values. The contract is not perfect but it serves to demonstrate the value of contractually obligated software.

### Contracts and The View Layer
The more I work with React, the more the view layer begins to feel sort of polymorphic to me. You define a component, define it's properties, and implement the way it should lay itself out. If you do that in a generic enough way, your view components can begin to take a variety of different shapes based on the props passed into them. It actually reminds me of defining an interface and implementing that interface with a concrete class.

A good interface defines a contract and follows it. Our view components are no exception, we should have a sort of pragmatic paranoia about how our components will be used, or perhaps abused. After all, we may author the component but we may not end up being the only one using it. A prudent software developer should always define and enforce a contract for every view component.

#### Presentational Components
Presentational components are your view layer. You can consider presentational components to be similar to an interface that you are expecting others to implement. I will define a simple presentational component with what I consider to be a pretty thorough contract with regards to what the component is supposed to do and what edge cases may exist.

{% highlight javascript %}
/**
 * A slider used to select a single numerical
 * value given a minimum and a maximum value.
 *
 * @param {Number} minimum The minimum value of the slider. Cannot be null,
 *                         undefined or greater than maximum.
 * @param {Number} maximum The maximum value of the slider. Cannot be null,
 *                         undefined or less than maximum.
 * @param {Number} current The current value of the slider. If no current value
 *                         is passed in, minimum is used as the current value.
 *                         Current must be greater than or equal to minimum and
 *                         must be less than or equal to maximum.
 * @param {Boolean} vertical A boolean value that indicates whether the number
 *                           slider should be displayed vertically or
 *                           horizontally.         
 * @param {function(Number)} onChange The callback that will be invoked with the
 *                                    new current value on change of the sliders
 *                                    position.
 * @throws {Error} If minimum or maximum are undefined, if minimum is greater
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
{% endhighlight %}

If you are familiar with React you are probably familiar with `PropTypes`. Although, the assurances the contract above buys you cannot be achieved with `PropTypes`. You cannot rely on `PropTypes` to make these sorts of assertions for you. By having such a strong contract we know our presentational component will never get into an odd visual state because we know we can't pass in a current value that is less than our minimum value, or a maximum value that is less than or minimum value, who knows how those cases would render.

When your code breaks (and it will), it will break in the first place the incorrect data is being passed into your component not the first place it is being used. In general, it is a better practice to fail as close to the source as possible. By thoroughly defining and enforcing a contract for `Slider` we can ensure that the pre-conditions are true throughout the implementation of `Slider`. By knowing that these pre-conditions are always true we can reason about our code much easier, if there is a problem with the `Slider` component we will already know what the issue is *not* going to be.

Our `invariant` checks may seem like a lot of boiler plate but they do buy us a lot. Being able to nearly instantaneously rule out a plethora of potential problems when debugging is incredibly value. Not only does it save time but it reduces stress because your cognitive load will be lower while trying to figure out what the real problem is; since you can immediately determine that the bug or defect is not the minimum value being greater than the maximum value or any of the other pre-conditions we assert to be true.

#### Container Components
Container components are the bridge between the model layer and the view layer. If we are continuing the OOP analogy from earlier, container components are like concrete classes that implement interfaces. Container components allow you to connect your Redux data store to a presentational component.

{% highlight javascript %}
const mapStateToProps = (state) => ({
  maximum: state.payments.maximum,
  minimum: state.payments.minimum,
  current: state.payments.current
})

const mapDispatchToProps = (dispatch) => ({
  onChange: (newValue) => {
    dispatch(updatePaymentAmount(newValue))
  }
})

const PaymentSlider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider)

PaymentSlider.defaultProps = {
  vertical: true
}
{% endhighlight %}

In the above code sample I use the `connect` function from [react-redux](https://github.com/reactjs/react-redux). If you are not familiar with the library I recommend reading a bit about it before continuing. The code sample illustrates how you would *implement* your view components, remember they are just like interfaces, well the above code sample is the concrete implementation. It passes in all required props to the `Slider` as well as the optional props to construct a new component that is used to adjust the payment amount of our made up application.

If you are not seeing it yet, if I changed out the `mapStateToProps` and `mapDispatchToProps` functions with different functions the `Slider` becomes a different component. You can easily `dispatch` a different action `onChange` or select a different piece of state to use for `minimum`, `maximum`, or any other property for that matter. To me, this feels like *implementing* your presentational components using Redux. React is the view layer that defines the interfaces and Redux is the model layer that defines how the view layer is *implemented*. If you want to implement your presentational components with different pieces of state and different actions it is important to define good contracts and enforce them. As I previously mentioned, you are not always going to be the person using your presentational component and you should be paranoid about the edge cases and invalid data that could be passed in.

### Summary
If Redux is about making your application state predictable then I would say using contracts in your presentational components is about making your view predictable. Write good contracts and enforce them. You coworkers will thank you.
