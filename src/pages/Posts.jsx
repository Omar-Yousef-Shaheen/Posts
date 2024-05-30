import { Link } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import { usePostContext } from "../contexts/PostContext";
import { useUserContext } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import LoadingIndicator from "../components/LoadingIndicator";

const PostCard = ({ post }) => {
  const [user, setUser] = useState(null);
  const { getUserById } = useUserContext();

  useEffect(() => {
    (async () => {
      const user = await getUserById(post.userId);
      setUser(user);
    })();
  }, []);

  return (
    <Link
      to={`/posts/${post.id}`}
      className=" flex flex-col gap-3 rounded-lg p-[20px] bg-gray-200 hover:bg-gray-300 hover:shadow-md cursor-pointer"
    >
      {!user ? (
        <LoadingIndicator />
      ) : (
        <>
          {" "}
          <h3 className="text-lg font-bold text-blue-500">{user.name}</h3>
          <span className="text-lg font-semibold capitalize  ">
            {post.title}
          </span>
          <p className="text-xl font-semibold capitalize">{post.body}</p>
        </>
      )}
    </Link>
  );
};

const Posts = () => {
  const { posts } = usePostContext();

  return (
    <>
      <SearchInput />

      <div className="grid grid-cols-1 gap-3 xl:grid xl:gap-5 mx-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <Pagination />
    </>
  );
};

export default Posts;
