export default function PostCard({ post }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold">{post.title}</h3>
      <p>{post.description}</p>
      <p className="font-semibold">Price: {post.price} BDT</p>
      <p>Posted by: {post.postedBy.name}</p>
    </div>
  );
}
