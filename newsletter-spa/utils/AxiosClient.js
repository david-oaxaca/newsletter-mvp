import axios from "axios";
import config from "../config";

const client = axios.create();

export const clientRequest = (options) =>
  client(options)
    .then((response) => response.data)
    .catch((error) => error.response);
