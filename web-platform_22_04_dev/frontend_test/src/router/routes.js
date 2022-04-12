import { PostListPage } from "../pages/PostListPage";
import PostPage from "../pages/PostPage";
import LoginPage from "../pages/LoginPage";

export const routes = [{ path: "/login", element: <LoginPage /> }];

export const privateRoutes = [
  { path: "/", element: <PostListPage /> },
  { path: "/about", element: <PostListPage /> },
  { path: "/posts", element: <PostListPage /> },
  { path: "/posts/:id", element: <PostPage /> },
];
