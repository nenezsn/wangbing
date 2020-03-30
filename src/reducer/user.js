let userInitState = {
    name: '王冰',
    age: '25',
    sex: '男',
    school: '河北农大'
}
const namespace = 'user'
export function user(state = userInitState, action) {
    switch (action.type) {
        case namespace+'/fixUserInfo':
            return {
                ...state, ...action.payload
            }
            break
        default:
            return state
    }
    return state
}