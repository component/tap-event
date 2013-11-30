var cancelEvents = [
  'touchstart',
  'touchmove',
  'touchcancel',
  'touchenter',
  'touchleave',
]

var endEvents = [
  'touchend',
]

module.exports = Tap

function Tap(callback) {
  // to keep track of the original listener
  listener.handler = callback

  return listener

  // el.addEventListener('touchstart', listener)
  function listener(e1) {
    // tap should only happen with a single finger
    if (e1.touches.length > 1 || e1.defaultPrevented)
      return

    var el = this

    cancelEvents.forEach(function (event) {
      el.addEventListener(event, cleanup)
    })

    endEvents.forEach(function (event) {
      el.addEventListener(event, done)
    })

    function done(e2) {
      cleanup()

      // if handled by some other handler
      if (e1.defaultPrevented || e2.defaultPrevented)
        return
      // make sure a touchstart event didn't occur outside of the element
      if (e2.touches.length > 1)
        return

      var preventDefault = e1.preventDefault
      var stopPropagation = e1.stopPropagation

      e2.stopPropagation = function () {
        stopPropagation.call(e1)
        stopPropagation.call(e2)
      }

      e2.preventDefault = function () {
        preventDefault.call(e1)
        preventDefault.call(e2)
      }

      // calls the handler with the `end` event,
      // but i don't think it matters.
      callback.call(el, e2)
    }

    function cleanup() {
      cancelEvents.forEach(function (event) {
        el.removeEventListener(event, cleanup)
      })

      endEvents.forEach(function (event) {
        el.removeEventListener(event, done)
      })
    }
  }
}