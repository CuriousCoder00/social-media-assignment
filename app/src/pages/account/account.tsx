import { useParams } from "react-router";

export default function Account() {
  const params = useParams();
  return (
    <div className="pt-24">
      <h1>Account</h1>
      <p>Account ID: {params.username}</p>
    </div>
  );
}
