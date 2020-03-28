import { created } from './proxy.js';
import { parseDOM,parseDirective } from './parser.js'
import { assert, getElement } from './common.js'

// let a = {
//   a: 1,
//   b: 3,
//   c: 'aaaaa',
//   arr: [1, 2, 3],
//   obj: {
//     a: 3, h: 6, x: 99
//   }
// }

let dom = getElement('#app')

let res = parseDOM(dom)
console.log(res.attrs)

let att = parseDirective(res.attrs)
console.log(att)