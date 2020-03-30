export function dobounce(fn, time) {
  let timer = ''
  return function () {
      let _this = this ; let args = arguments
      clearTimeout(timer)
      timer = setTimeout(function () {
          fn.apply(_this,args)
      }, time)
  }
}
