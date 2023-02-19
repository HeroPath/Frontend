import axios from "axios";
import { notify } from "./utilities";

const API_URL = "http://192.168.18.8:8000";


export async function get(route, headers) {
  try {
    const config = headers ? { headers } : {};
    const response = await axios.get(API_URL + route, config);

    if (response.status === 200) return response;
  } catch (err) {
    if (err.request.status !== 0) {
      notify(err.response.data.message);
    }
  }
}

export async function post(route, objectData, headers) {
  try {
    const data = objectData ? objectData : {};
    const config = headers ? { headers } : {};
    const response = await axios.post(API_URL + route, data, config);

    if (response.status === 200) return response;
  } catch (err) {
    if (err.request.status !== 0) {
      notify(err.response.data.message);
    }
  }
}

export async function deleteRequest(route, headers) {
  try {
    const config = headers ? { headers } : {};
    const response = await axios.delete(API_URL + route, config);

    if (response.status === 200) return response;
  } catch (err) {
    if (err.request.status !== 0) {
      notify(err.response.data.message);
    }
  }
}


