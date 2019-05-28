import * as actions from '../action/action'


const initState = {
    name: "",
    token: ""
}

const reducer =(state = initState,action) =>{
    
    switch(action.type)
    {
        case actions.GET_P_USER:
        return{
        ...state,
        name:action.name
        }
        case actions.GET_P_TOKEN:
        {
            return{
                ...state,
                token: action.value
            }
        }
        default:
            return state;
    }
}

export default reducer;