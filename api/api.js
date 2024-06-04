import axios from "axios";

const api = axios.create({
  baseURL: "https://www.api.msh6545.knowme.sbs/api/v1",
  
});

export default api;


// baseURL: "http://localhost:5000/api/v1",