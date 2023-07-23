import PostItem from "../components/PostItem";
import { useLoaderData } from "react-router-dom";

function PostPage() {
  const post = useLoaderData();
  return <PostItem post={post} />;
}

export default PostPage;

export function loader({ params }) {
  const postId = params.id;
  return fetch("https://jsonplaceholder.typicode.com/posts/" + postId);
}
