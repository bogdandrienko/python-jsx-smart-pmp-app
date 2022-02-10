import Home1Page from "./Home1Page";
import React, { useState, useEffect } from "react";
import PrivateRoute from "./PrivateRoute";
import axios from "axios";

const TestPage = () => {
  let getNotes = async () => {
    try {
      const axiosRequest = await axios.get(`/api/users/profile/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQzNTI1NzI5LCJpYXQiOjE2NDM0MzkzMjksImp0aSI6ImViZjVhZTQ3MzQwMTQ3ZDE5MWRhYTFlMTVkNmMxY2M1IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJCb2dkYW4ifQ._V-7TLJkbfX-GnYvHkTD23mjFvDZZl02eMO7546mbgI",
        },
        body: {
          username: "Bogdan",
          password: "31284Bogdan",
        },
      });
      const axiosResponce = await axiosRequest.data;
      console.log("axios: ", axiosResponce);
    } catch (error) {
      console.log("error:", error);
    }

    // try {
    //   const axiosRequest = await axios.post(`/api/users/register/`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization:
    //         "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQzNDc2Njk4LCJpYXQiOjE2NDMzOTAyOTgsImp0aSI6IjAyMjgzNjY5MDhjZjRlZGQ5ZTRkNjJlYzgyNzc5ZDc1IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJCb2dkYW4ifQ.4IXUmOsV8XeDIPZWOLZWzZSuZogv-BY7xxwyqOlEcHA",
    //     },
    //     body: {
    //       username: "bogdan3",
    //       password: "31284bogdan",
    //     },
    //   });
    //   const axiosResponce = await axiosRequest.data;
    //   console.log("axios: ", axiosResponce);
    // } catch (error) {
    //   console.log("error:", error);
    // }

    // try {
    //   const axiosRequest = await axios.get(`/api/users/`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization:
    //         "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQzNDc2Njk4LCJpYXQiOjE2NDMzOTAyOTgsImp0aSI6IjAyMjgzNjY5MDhjZjRlZGQ5ZTRkNjJlYzgyNzc5ZDc1IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJCb2dkYW4ifQ.4IXUmOsV8XeDIPZWOLZWzZSuZogv-BY7xxwyqOlEcHA",
    //     },
    //   });
    //   const axiosResponce = await axiosRequest.data;
    //   console.log("axios: ", axiosResponce);
    // } catch (error) {
    //   console.log("error:", error);
    // }

    // try {
    //   const fetchRequest = await fetch(`/api/users/`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization:
    //         "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQzNDc0NzU1LCJpYXQiOjE2NDMzODgzNTUsImp0aSI6ImVlOTNhZmQ1YWNmYjQ5ZjZiN2U4MGVmNGEzMGFlYTc1IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJCb2dkYW4ifQ._ZDFTHl6GyX6loZs8_t2zaJy13gBDfgR8Az1OYs9ANk",
    //     },
    //   });
    //   const fetchResponce = await fetchRequest.json();
    //   console.log("fetch: ", fetchResponce);
    // } catch (error) {
    //   console.log("error:", error);
    // }
  };

  return (
    <div>
      <div className="text-center">
        <PrivateRoute path="/" element={<Home1Page />} />
      </div>
      <h1>Test page</h1>
      <div id="note"></div>
      <button onClick={getNotes}>download</button>
    </div>
  );
};

export default TestPage;
