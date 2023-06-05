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

  static retrieveTopics(sender, newsletter_id) {
    return clientRequest({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: `http://localhost:8000/${sender}/newsletter/${newsletter_id}/get-topics`,
    });
  }
}
