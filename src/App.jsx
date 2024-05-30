import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import PostProvider from "./contexts/PostContext";
import UserProvider from "./contexts/UserContext";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to={"/posts"} /> },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/posts/:id",
    element: <PostDetails />,
  },
]);

function App() {
  return (
    <>
      <UserProvider>
        <PostProvider>
          <RouterProvider router={router} />
        </PostProvider>
      </UserProvider>
    </>
  );
}

export default App;
