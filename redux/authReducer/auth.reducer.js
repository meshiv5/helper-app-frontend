import { EDITDETAILS, LOGOUT } from "./auth.actionTypes";

let value;
if (typeof window !== "undefined") {
  value = localStorage.getItem("helperApp");
}

const initState = {
  isAuth: value || false,
  token: "",
  editPostDetails: {}
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGOUT:
      localStorage.removeItem("helperApp");
      return {
        ...state,
        isAuth: false,
      };
    case EDITDETAILS:
      return{
        ...state,
        editPostDetails: action.payload
      }
    default:
      return state;
  }
};
