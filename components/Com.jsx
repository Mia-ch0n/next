"use client";
import React, { useState, useEffect } from "react";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/20/solid";

const Com = () => {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch("/api/comments");
        if (response.ok) {
          const data = await response.json();

          setCommentList(data.comments);
        } else {
          console.error("Failed to fetch comments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    fetchComments();
  }, []);

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {commentList &&
          commentList.map((comment) => (
            <li key={comment._id}>
              <div className="relative pb-8">
                <span
                  className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
                <div className="relative flex items-start space-x-3">
                  <>
                    <div className="relative">
                      {comment.author && comment.author.profilePic && (
                        <img
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                          src={comment.author.profilePic}
                          alt=""
                        />
                      )}
                      <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                        <ChatBubbleLeftEllipsisIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          {comment.author && comment.author.fullName}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Com;
