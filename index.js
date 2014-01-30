var cancelEvents = [
  'touchmove',
  'touchcancel',
  'touchstart',
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
    if (!e1.touches || e1.touches.length > 1)
      return

    var el = this

    cancelEvents.forEach(function (event) {
      document.addEventListener(event, cleanup)
    })

    endEvents.forEach(function (event) {
      document.addEventListener(event, done)
    })

    function done(e2) {
      // since touchstart is added on the same tick
      // and because of bubbling,
      // it'll execute this on the same touchstart.
      // this filters out the same touchstart event.
      if (e1 === e2)
        return

      cleanup()

      // already handled
      if (e2.defaultPrevented)
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

    function cleanup(e2) {
      if (e1 === e2)
        return

      cancelEvents.forEach(function (event) {
        document.removeEventListener(event, cleanup)
      })

      endEvents.forEach(function (event) {
        document.removeEventListener(event, done)
      })
    }
  }
}