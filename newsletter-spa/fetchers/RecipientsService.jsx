import { clientRequest } from "../utils/AxiosClient";

export default class RecipientsService {
  static getRecipientsList(data) {
    return clientRequest({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: `http://localhost:8000/${data.mail}/recipients`,
      data: data,
    });
  }
}
