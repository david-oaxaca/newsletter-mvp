import { clientRequest } from "../utils/AxiosClient";

export default class NewsletterService {
  static publishNewsletter(mail, data) {
    return clientRequest({
      method: "post",
      headers: {
        "Content-Type": "multipar/form-data",
      },
      url: `http://localhost:8000/${mail}/newsletter/publish/`,
      data: data,
    });
  }
}
