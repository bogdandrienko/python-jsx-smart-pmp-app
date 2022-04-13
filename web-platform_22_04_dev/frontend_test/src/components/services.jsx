import axios from "axios";

export class Services {
  static async getAll(limit = 10, page = 1) {
    const response = await axios.get("/api/any/post/", {
      params: {
        page: page,
        limit: limit,
      },
    });
    // const response = await axios.get(
    //   "https://jsonplaceholder.typicode.com/posts",
    //   {
    //     params: {
    //       _limit: limit,
    //       _page: page,
    //     },
    //   }
    // );
    console.log("getAll: ", response.data);
    return response;
  }
  static async getById(id) {
    // const response = await axios.get(
    //   "https://jsonplaceholder.typicode.com/posts/" + id
    // );
    const response = await axios.get(`/api/any/post/${id}/`);
    return response;
  }
  static async getCommentById(id) {
    // const response = await axios.get(
    //   `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    // );
    const response = await axios.get(`/api/any/post/${id}/comments/`);
    return response;
  }
}
