export function AppReducer(state, action){
    switch (action.type) {
        case 'authTrue': {
            const {user} = action.payload
            return {
                userData: user,
                isAuthorized: true
            }
        }
        case 'authFalse': {
            return {
                userData: null,
                isAuthorized: false
            }
        }
        default :
            throw new Error('Unknown action type')
    }
}