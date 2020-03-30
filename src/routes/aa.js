import ccjson from './cc.json'
import ccjson2 from './cc2.json'
import ccjson3 from './cc3.json'
import ccjson4 from './cc4.json'
import ccjson5 from './cc5.json'
import ccjson6 from './cc6.json'

let total = [
    ...ccjson.userActions,
    ...ccjson2.userActions,
    ...ccjson3.userActions,
    ...ccjson4.userActions,
    ...ccjson5.userActions,
    ...ccjson6.userActions,
]

let arr = total.map(item=>{
   return item.userName
})

let dtc = [...new Set(arr)]
dtc=dtc.map(item=>{
    return {
        '姓名':item
    }
})
console.log(JSON.stringify(dtc))
