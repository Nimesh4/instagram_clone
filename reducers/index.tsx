import { combineReducers } from 'redux'

const user = (state = {}, action: { type: any; payload: any }) => {
    switch (action.type){
        case 'LOGIN':
            return action.payload
        case 'UPDATE_EMAIL':
            return { ...state, email:action.payload }
        case 'UPDATE_PASSWORD':
            return { ...state, password:action.payload }
        case 'UPDATE_USERNAME':
            return { ...state, username:action.payload.toUpperCase().replace('','_')}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user
})

export default rootReducer