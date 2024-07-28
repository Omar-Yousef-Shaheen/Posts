import { Link, useParams } from "react-router-dom";
import { usePostContext } from "../contexts/PostContext";
import { useEffect } from "react";
import LoadingIndicator from "../components/LoadingIndicator";

const PostDetails = () => {
  const { id } = useParams();

  const { post, setPost, getPostById } = usePostContext();

  useEffect(() => {
    if (id) {
      (async () => {
        await getPostById(id);
      })();
    }
  }, [id]);

  useEffect(() => {
    return () => {
      setPost(null);
    };
  }, []);

  if (!post) return <LoadingIndicator />;

  return (
    <>
      <div className="m-5 flex items-center">
        <Link
          className="py-2 px-5 bg-gray-500 text-white font-semibold rounded-full shadow-md hover:bg-gray-700  "
          to={".."}
        >
          Back
        </Link>
      </div>
      <div className="flex flex-col">
        {post?.comments?.map((comment) => (
          <div className="m-4 p-5 bg-gray-200 rounded-lg" key={comment.id}>
            <div className="flex justify-between items-center ">
              <h3 className="text-lg font-bold capitalize text-blue-500">
                {comment.name}
              </h3>
              <span className="font-bold text-xl">
                {" "}
                <span className="text-xl font-bold text-gray-700 ">
                  Email :{" "}
                </span>
                {comment.email}
              </span>
            </div>
            <p className="font-bold mt-6">
              {" "}
              <span className="text-xl font-bold text-gray-700 ">Body : </span>
              {comment.body}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostDetails;
