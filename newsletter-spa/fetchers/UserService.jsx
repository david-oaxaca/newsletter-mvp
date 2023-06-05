import { clientRequest } from "../utils/AxiosClient";

export default class UserService {
  static registerUser(data) {
    return clientRequest({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://localhost:8000/users/create-user",
      data: data,
    });
  }

  static logIn(data) {
    return clientRequest({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://localhost:8000/users/login",
      data: data,
    });
  }
}
