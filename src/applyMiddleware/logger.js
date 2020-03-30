export function logger(flag=false){
    return ({dispatch,getState})=>next=>action=>{
        if(flag){
            console.log('action',action.type)
        }
        next(action)
    }
}