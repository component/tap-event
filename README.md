# Tap Event

Make your `touchstart` event listeners into a `tap` event listener!

What is "correct" behavior? The `tap` event:

- shouldn't be triggered until the user removes his/her finger from the surface of the screen.
- shouldn't be triggered when the user moves his/her finger at all (ie it should not interfere with drag events).
- shouldn't be triggered if there's ever more than a single finger on the surface at all.
- should never trigger the `click` event.

Some notes:

- There are no timeouts on tap events - yet.

## API

```js
var tap = require('event-tap')

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

## License

The MIT License (MIT)

Copyright (c) 2013 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
