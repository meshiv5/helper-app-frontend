import { LOGOUT } from "./auth.actionTypes";

let value;
if (typeof window !== 'undefined') {
    value = localStorage.getItem('helperApp')
}

const initState = {
    isAuth: !!value,
    token: ''
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {

        case LOGOUT:
            localStorage.removeItem('helperApp')
            return {
                ...state,
                isAuth: false,
            }


        default:
            return state
    }

}