import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../services/axiosInstance";

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const limit = 10;
  const hasNext = page < 10;
  const hasPrev = page > 1;

  const getAllPosts = async () => {
    let query = `?_limit=${limit}&_page=${page}`;
    query += search ? `&title=${search.trim().toLowerCase()}` : "";
    const response = await axiosInstance.get(`/posts${query}`);
    setPosts(response.data);
  };

  const getPostById = useCallback(async (id) => {
    const postsResponse = await axiosInstance.get(`/posts/${id}`);
    const commentsResponse = await axiosInstance.get(`comments/?postId=${id}`);
    setPost({ ...postsResponse.data, comments: commentsResponse.data ?? [] });
  }, []);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => prev - 1);

  useEffect(() => {
    (async () => await getAllPosts())();
  }, [search, page]);

  return (
    <PostContext.Provider
      value={{
        post,
        posts,
        setPost,
        getPostById,
        handleSearch: setSearch,
        handleNextPage,
        handlePrevPage,
        hasNext,
        hasPrev,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);

export default PostProvider;
