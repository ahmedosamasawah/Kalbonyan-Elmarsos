import PostList from "../components/PostList";
import { useLoaderData } from "react-router-dom";

function BlogPage() {
  const posts = useLoaderData();
  return <PostList posts={posts} />;
}

export default BlogPage;

export function loader() {
  return fetch("https://jsonplaceholder.typicode.com/posts");
}
