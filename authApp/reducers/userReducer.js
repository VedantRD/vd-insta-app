export const initialState = null

export const reducer = (state, action) => {
    // console.log('action = ', action.payload)
    if (action.type === 'USER') {
        return action.payload
    }
    if (action.type === 'UPDATE') {
        return {
            ...state,
            followers: action.payload.followers,
            following: action.payload.following
        }
    }
    return state
}