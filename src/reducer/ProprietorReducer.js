const initState = {
    name: ""
}

const reducer =(state = initState,action) =>{
    
    if(action.type === 'UPDATE_A'){
    return{
        ...state,
        name: action.name
    }
    }
    if(action.type === 'GET_P_USER'){
        return{
            ...state,
            name: action.name
        }
        }
    

    return state;

}

export default reducer;