import { useState } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function Comment({ postID }) {
  const [comment, setComment] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const { data: session, } = useSession();
  useEffect(() => {

    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify({ email: session.user.email }),
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data.user);
        } else {
          console.error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("post ", postID);
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ text: comment, post: postID,author:userInfo._id }),
        //@ts-ignore
        "Content-Type": "application/json",
      });
      if (response.ok) {
        setComment("");
        console.log("Comment submitted successfully!");
      } else {
        console.error("Failed to submit comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    
    <div className="mt-6 flex gap-x-3">
    {userInfo && (
      <img
        src={userInfo.profilePic}
        alt=""
        className="h-6 w-6 flex-none rounded-full bg-gray-50"
      />
    )}
      <form
        onSubmit={handleSubmit}
        className="relative flex-auto"
        method="post"
      >
        <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
          <label htmlFor="comment" className="sr-only">
            Add your comment
          </label>
          <textarea
            rows={2}
            name="comment"
            id="comment"
            className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Add your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
          <button
            type="button"
            className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
          >
            <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Attach a file</span>
          </button>
          <button
            type="submit"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  );
}
