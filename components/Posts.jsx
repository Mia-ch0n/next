"use client";
import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import Delete from "./Delete";
import Up from "../components/Up";
import Down from "../components/Down";
//import Edit from './Edit';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const user = useSession()?.data?.user;
  const router = useRouter();
  const [upvotes, setUpvote] = useState([]);
  const [downvotes, setDownvote] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts");
        if (response.ok) {
          const data = await response.json();

          setPosts(data.posts);
        } else {
          console.error("Failed to fetch posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  const formatCreatedAt = (id) => {
    const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
    return new Date(timestamp).toLocaleDateString();
  };

  const handleVote = (isUp) => {
    if (isUp) {
      //upvote logic
      if (upvotes.includes(user.email)) {
        let res = upvotes.filter((ids) => ids != user.email);
        setUpvote(res);
      } else {
        setUpvote((prevState) => [...prevState, user.email]);
      }
    } else {
      //dowvote logic
      if (downvotes.includes(user.email)) {
        let res = downvotes.filter((ids) => ids !== user.email);
        setDownvote(res);
      } else {
        setDownvote((prevState) => [...prevState, user.email]);
      }
    }
  };

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className="mx-auto max-w-4xl ">
          <div className=" border-t border-gray-200 pt-10 sm:mt-10 sm:pt-16 ">
            {posts.map((post) => (
              <article
                key={post._id}
                className="flex flex-col items-start justify-between rounded-lg mb-6"
              >
                <div className="flex items-end justify-end w-full gap-x-4">
                <div className="flex flex-col">
                <Up
                  count={upvotes.length}
                  onPress={() => {
                    handleVote(true);
                  }}
                />
                <Down
                  count={downvotes.length}
                  onPress={() => {
                    handleVote(false);
                  }}
                />
              </div>
                  {user?.email === post.author.email && (
                    <Delete id={post._id} />
                  )}
                </div>

                <div className="group relative w-full">
                  <h3 className="flex items-center mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="absolute inset-0" />
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-x-4 text-sm mt-2">
                    <time dateTime={post._id} className="text-gray-500">
                      {formatCreatedAt(post._id)}
                    </time>
                  </div>
                  <p className="mt-5 line-clamp-3 text-xl leading-6 text-gray-600">
                    {post.description}
                  </p>
                  <button>
                    <span>see more</span>
                  </button>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src={post?.author?.profilePic}
                    alt="profile pic"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      {post?.author?.fullName}
                    </p>
                    <p className="text-gray-600">{post?.author?.job}</p>
                  </div>
                </div>
                <section>
                  <div className="w-[500px]">
                    <Comment postID={post._id} />
                    Comments
                    {post.comments.map(({ text }) => (
                      <p>{text}</p>
                    ))}
                  </div>
                </section>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
