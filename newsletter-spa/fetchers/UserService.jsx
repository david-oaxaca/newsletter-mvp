import { clientRequest } from "../utils/AxiosClient";

export default class UserService {
  static registerUser(data) {
    return clientRequest({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${process.env.NEXT_PUBLIC_API_URL}/users/create-user`,
      data: data,
    });
  }

  static logIn(data) {
    return clientRequest({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
      data: data,
    });
  }
}
