const initState ={
    isPhotoFinishLoading: false
}

const reducer = (state = initState, action) =>{
    switch(action.type)
    {
        case 'PhotoFinishLoading':
        {
            return{
            ...state,
            isPhotoFinishLoading: true
            }
        }
        default:
        return state;
    }
}
export default reducer