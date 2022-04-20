import React, { useContext } from "react";
import AuthContext from "../components/contexts";
import { BaseComponent1 } from "../components/jsx/ui/base";
import { Button1 } from "../components/jsx/ui/buttons";
import { Input1 } from "../components/jsx/ui/inputs";

const PostPage = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
  };
  return (
    <div className="mt-5 p-5">
      <div className="text-center">
        <main className="form-signin" style={{ maxWidth: 330, margin: "auto" }}>
          <form onSubmit={login}>
            <img
              className="mb-4"
              src="/static/img/logo512.png"
              alt=""
              width="72"
              height="72"
            />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="bogdan"
              />
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>
            <p className="mt-5 mb-3 text-muted">© 2022</p>
          </form>
        </main>
      </div>
    </div>
  );
};

export default PostPage;
