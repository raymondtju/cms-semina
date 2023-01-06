import { CLEAR_ALERT, SET_ALERT } from "./constant";

let initialState = { status: false, alertType: "", message: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        status: action.status,
        alertType: action.alertType,
        message: action.message,
      };

    case CLEAR_ALERT:
      return { state: initialState };

    default:
      return state;
  }
}
