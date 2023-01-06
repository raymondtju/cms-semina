import axios from "axios";
import { config } from "../configs";
// import handleError from "./handleError";

export async function getData(url, params) {
  try {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    return await axios.get(`${config.url_dev}${url}`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    return err;
  }
}

export async function postData(url, payload, formData) {
  try {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    return await axios.post(`${config.url_dev}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json",
      },
    });
  } catch (err) {
    return err;
  }
}

export async function updateData(url, payload) {
  try {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    return await axios.put(`${config.url_dev}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    return err;
  }
}

export async function deleteData(url) {
  try {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    return await axios.delete(`${config.url_dev}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    return err;
  }
}
