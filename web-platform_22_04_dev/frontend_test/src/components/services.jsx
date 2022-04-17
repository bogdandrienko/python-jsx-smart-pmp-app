import axios from "axios";

export class Services {
  static async getAll(limit = 10, page = 1) {
    const response = await axios.get("/api/any/post/", {
      params: {
        page: page,
        limit: limit,
      },
    });
    console.log("getAll: ", response.data);
    return response;
  }
  static async getById(id) {
    const response = await axios.get(`/api/any/post/${id}/`);
    console.log("getAll: ", response.data);
    return response;
  }
  static async getCommentById(id) {
    const response = await axios.get(`/api/any/post/${id}/comments/`);
    console.log("getAll: ", response.data);
    return response;
  }
}
