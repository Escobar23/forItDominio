import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { BooksPage } from "../pages/BooksPage";
import { PrivateRoute } from "./guards";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [{ index: true, element: <BooksPage /> }],
  },
]);
