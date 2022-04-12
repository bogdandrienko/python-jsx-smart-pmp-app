import React, { useContext } from "react";
import AuthContext from "../components/contexts";
import { BaseComponent1 } from "../components/UI/base";
import { Button1 } from "../components/UI/buttons";
import { Input1 } from "../components/UI/inputs";

const PostPage = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
  };
  return (
    <BaseComponent1>
      <h1>Login to account</h1>
      <form onSubmit={login}>
        <Input1 type="text" placeholder="Login" autoComplete="username" />
        <Input1
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        <Button1>enter</Button1>
      </form>
    </BaseComponent1>
  );
};

export default PostPage;
