import { CLEAR_ALERT, SET_ALERT } from "./constant";

export function setAlert(status, alertType, message) {
  return {
    type: SET_ALERT,
    status,
    alertType,
    message,
  };
}

export function clearAlert() {
  return {
    type: CLEAR_ALERT,
  };
}
