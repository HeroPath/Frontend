import { notify } from "../../functions/utilities";
import axios from "axios";

const API_URL = "http://localhost:8000";

export async function GET(route, headers) {
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

export async function POST(route, objectData, headers) {
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
