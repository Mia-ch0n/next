"use client";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import Delete from "./Delete";
import Up from "../components/Up";
import Down from "../components/Down";
// import Com from "../components/Com";
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
  const [comments, setComments] = useState([]);
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
 
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch("/api/comments");
        if (response.ok) {
          const data = await response.json();

          setComments(data.comments);
        } else {
          console.error("Failed to fetch comments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    fetchComments();
  }, []);


  const formatCreatedAt = (id) => {
    const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
    return new Date(timestamp).toLocaleDateString();
  };
  const [showAllComments, setShowAllComments] = useState(false);
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
        <div className="mx-auto max-w-4xl  ">
          <div className=" border-t border-gray-200 pt-10 sm:mt-10 sm:pt-16 ">
            {posts.map((post) => (
              <article 
                key={post._id}
                className="flex flex-col items-start justify-between rounded-lg mb-6 isolate aspect-video rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 px-10 mx-34 "
              >
                <div className="flex items-end justify-end w-full gap-x-4">
                  
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
                
                  <div className="w-[500px]">
                    <Comment postID={post._id} />

                    {/*<Com/>*/}

                    {post.comments.slice(0, showAllComments ? undefined : 3).map((comment) => (
                      <div className="relative pb-8" key={comment._id}>
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
                              <div className="mt-2 text-sm text-gray-700">
                                <p>{comment.text}</p>
                              </div>  
                            </div>
                          </>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => setShowAllComments(!showAllComments)} className="text-sm text-gray-700 bg-gray-200 rounded-full mt-6">
                  <span>{showAllComments ? "See less" : "See more"}</span>
                </button>
                  </div>
               
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
