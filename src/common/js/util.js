export const shuffle = function(arr) {
  let _arr = [...arr]
  console.log(arr)
  for (let i = _arr.length; i; i--) {
    let j = Math.floor(Math.random() * i)
    let tmp = _arr[i - 1]
    _arr[i - 1] = _arr[j]
    _arr[j] = tmp
  }
  console.log(_arr)
  return _arr
}

export const debounce = function(func, delay) {
  let timer
  return function(...arg) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, arg)
    }, delay)
  }
}

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }

// export function shuffle(arr) {
//   let _arr = arr.slice()
//   for (let i = 0; i < _arr.length; i++) {
//     let j = getRandomInt(0, i)
//     let t = _arr[i]
//     _arr[i] = _arr[j]
//     _arr[j] = t
//   }
//   return _arr
// }

// export function debounce(func, delay) {
//   let timer

//   return function (...args) {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       func.apply(this, args)
//     }, delay)
//   }
// }
