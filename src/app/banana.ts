import { EventEmitter } from "@angular/core"
// import { AnyMxRecord } from "dns"

// /** A very hacky decorator to set up a banana-in-box attribute.
//  * @param {any} proto The prototype of the component class.
//  * @param {string} name The attribute's name.
//  */
// export function _banana<T, P extends object>(
//   proto: P,
//   // name: Extract<
//   //   string,
//   //   keyof { [K in keyof P as P[K] extends T ? K : never]: true }
//   // >,
//   name: string
// ) {
//   const _oldConstructor = proto.constructor
//   e = proto
//   proto.constructor = function(...args: any[]) {
//     _oldConstructor.apply(this, args)
//     // @ts-expect-error
//     this[name] = true
//   }
//   Object.defineProperty(proto, name + "Change", {
//     configurable: true,
//     enumerable: false,
//     get() {
//       const emitter = new EventEmitter()
//       Object.defineProperty(proto, name + "Change", {
//         configurable: true,
//         enumerable: false,
//         writable: false,
//         value: emitter,
//       })
//       return emitter
//     },
//   })
//   let internalValue: any
//   Object.defineProperty(proto, name, {
//     configurable: true,
//     enumerable: true,
//     get() {
//       return internalValue
//     },
//     set(newValue: any) {
//       internalValue = newValue
//       this[name + "Change"].emit(newValue)
//     },
//   })
// }

// export function banana() {
//   // return _banana.call.bind(_banana)
//   return (proto: any, name: string) => _banana(proto, name)
// }

export function makeBanana<
  T,
  K extends string extends K ? never : string,
  I extends { [key in K]: T } & { [change in `${K}Change`]: EventEmitter<T> }
>(instance: I, key: K): EventEmitter<T> {
  let slot: T = instance[key]
  // Redirects accesses to instance[key] to an internal variable.
  // Additionally, emits the event when the value is changed.
  // I need to charge my chromebook.
  Object.defineProperty(instance, key, {
    configurable: true,
    enumerable: true,
    set(newValue: T) {
      slot = newValue
      // @ts-expect-error
      instance[`${key}Change`].emit(slot)
    },
    get() {
      return slot
    },
  })
  return new EventEmitter<T>()
}
