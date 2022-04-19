import axios from "axios";

export class Services {
  static async getAll(limit = 10, page = 1) {
    // const response = await axios.get("/api/any/post/", {
    //   params: {
    //     page: page,
    //     limit: limit,
    //   },
    // });
    const response = await axios.get("/api/post/", {
      params: {
        page: page,
        limit: limit,
      },
    });
    console.log("getAll: ", response.data);
    return response;
  }
  static async getById(id) {
    // const response = await axios.get(`/api/any/post/${id}/`);
    const response = await axios.get(`/api/post/${id}/`);
    console.log("getById: ", response.data);
    return response;
  }
  static async getCommentById(id) {
    const response = await axios.get(`/api/any/post/${id}/comments/`);
    console.log("getCommentById: ", response.data);
    return response;
  }
  static async createPost(post) {
    const response = await axios.post(`/api/post/`, post);
    console.log("createPost: ", response.data);
    return response;
  }
  static async removePost(id) {
    const response = await axios.delete(`/api/post/${id}/`);
    console.log("createPost: ", response.data);
    return response;
  }
}
