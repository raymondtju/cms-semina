import {
  START_FETCHING_PAYMENTS,
  SUCCESS_FETCHING_PAYMENTS,
  ERROR_FETCHING_PAYMENTS,
} from "./constant";

import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearAlert } from "../alert/action";

let debouncedFetchPayments = debounce(getData, 1000);

export const startFetchingPayments = () => {
  return {
    type: START_FETCHING_PAYMENTS,
  };
};

export const successFetchingPayments = ({ payments }) => {
  return {
    type: SUCCESS_FETCHING_PAYMENTS,
    payments,
  };
};

export const errorFetchingPayments = () => {
  return {
    type: ERROR_FETCHING_PAYMENTS,
  };
};

export const fetchPayments = () => {
  return async (dispatch) => {
    dispatch(startFetchingPayments());

    try {
      setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);

      let res = await debouncedFetchPayments("/payments");

      res.data.data.forEach((res) => {
        res.avatar = res.image.name;
      });

      dispatch(
        successFetchingPayments({
          payments: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingPayments());
    }
  };
};
