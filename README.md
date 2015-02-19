# Tap Event

Make your `touchstart` event listeners into a `tap` event listener!

What is "correct" behavior? The `tap` event:

- shouldn't be triggered until the user removes his/her finger from the surface of the screen.
- shouldn't be triggered when the user moves his/her finger at all (ie it should not interfere with drag events).
- shouldn't be triggered if there's ever more than a single finger on the surface at all.
- should never trigger the `click` event.

## API

```js
var tap = require('tap-event')

var el = document.querySelector('#container')

// the event you want to handle
function changeLocation(e) {
  // e.preventDefault() is already called!
  location.href = this.href
}

// wrap the listener
var listener = tap(changeLocation)

// listen to `touchstart`
el.addEventListener('touchstart', listener)

// remove the listener
el.removeEventListener('touchstart', listener)
```

or, more succinctly:

```js
document.querySelector('#container').addEventListener('touchstart', tap(function (e) {
  location.href = this.href
}))
```

To set a custom timeout (default is `200ms`), you have two options:

```js
// set globally
tap.timeout = 300

// set per instance
tap(function (e) {

}, {
  timeout: 300
})
```
