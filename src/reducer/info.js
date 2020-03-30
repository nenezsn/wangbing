const namespace = 'info'
export function info(state = {
    company:'seentao'
}, action) {
    switch (action.type) {
        case namespace+'/fixInfo':
            return Object.assign(state, action.payload)
            break;
        default:
            return state
    }
}