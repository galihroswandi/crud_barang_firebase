const initialState = {
    popup: false,
    isLogin: false,
    isLoading: false,
    user: '',
    data: [],
    image: [],
    images: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_POPUP':
            return {
                ...state,
                popup: action.value
            }
        case 'CHANGE_LOGIN':
            return {
                ...state,
                isLogin: action.value
            }
        case 'CHANGE_USER':
            return {
                ...state,
                user: action.value
            }
        case 'CHANGE_LOADING':
            return {
                ...state,
                isLoading: action.value
            }
        case 'SET_DATA':
            return {
                ...state,
                data: action.value
            }
        case 'SET_IMAGE':
            return {
                ...state,
                image: action.value
            }
        case 'SET_IMAGES':
            return{
                ...state,
                images : action.value
            }
        default:
            return state;
    }
}

export default reducer;