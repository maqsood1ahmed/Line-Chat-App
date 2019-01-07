

let initialState = {
}

const messagesReducer = (state = initialState, action)=>{
    if(action.type==="ADD_MESSAGES"){
        return{
            ...state,
            messages:action.messages
        }
    } 
    else{
        return{
            ...state
        }
    }
}

export default messagesReducer;