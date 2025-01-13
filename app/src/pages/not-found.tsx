import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[50dvh] w-full">
      <h1 className="text-4xl font-bold">Sorry, this page isn't available.</h1>
      <p className="text-lg">
        The link you followed may be broken, or the page may have been removed.
      </p>
      <Link to="/" className="text-sky-600 mt-4">
        Go back to Home
      </Link>
    </div>
  );
}
