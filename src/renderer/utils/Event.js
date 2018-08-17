import {
  EventEmitter
} from 'events'

const event = new EventEmitter()

event.on("setItem", data => {
  for (let [k, v] of Object.entries(data)) {
    const {
      type,
      val,
      method
    } = v
    let target = JSON.parse(localStorage.getItem(k))

    if (type = "array") {
      if (!target) {
        target = []
      }
      if (method = "add") {
        target = [...target, val]
      }
      if (method = "set") {
        target = val
      }
    }

    localStorage.setItem(k, JSON.stringify(target))
  }
})

export {
  event
}