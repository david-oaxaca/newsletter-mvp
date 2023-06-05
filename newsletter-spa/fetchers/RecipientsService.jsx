import { clientRequest } from "../utils/AxiosClient";

export default class RecipientsService {
  static getRecipientsList(mail) {
    return clientRequest({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${process.env.NEXT_PUBLIC_API_URL}/${mail}/recipients`,
    });
  }

  static createRecipientsList(mail, data) {
    return clientRequest({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${process.env.NEXT_PUBLIC_API_URL}/${mail}/recipients/create-list/`,
      data: data,
    });
  }

  static addNewRecipient(mail, recipient) {
    return clientRequest({
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${process.env.NEXT_PUBLIC_API_URL}/${mail}/recipients/add-recipient/${recipient}`,
    });
  }

  static updateRecipientUnsubs(sender, recipient, data) {
    return clientRequest({
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${process.env.NEXT_PUBLIC_API_URL}/${sender}/recipients/${recipient}/unsub`,
      data: data,
    });
  }
}
