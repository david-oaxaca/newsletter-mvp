import { clientRequest } from "../utils/AxiosClient";

export default class RecipientsService {
  static getRecipientsList(mail) {
    return clientRequest({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: `http://localhost:8000/${mail}/recipients`,
    });
  }

  static createRecipientsList(mail, data) {
    return clientRequest({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: `http://localhost:8000/${mail}/recipients/create-list/`,
      data: data,
    });
  }

  static addNewRecipient(mail, recipient) {
    return clientRequest({
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      url: `http://localhost:8000/${mail}/recipients/add-recipient/${recipient}`,
    });
  }
}
