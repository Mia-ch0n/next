"use client";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import Delete from "./Delete";
import Up from "../components/Up";
import Down from "../components/Down";
import Edit from "./Edit";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const user = useSession()?.data?.user;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts", {
          cache: "no-store",
        });
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
  const [showAllComments, setShowAllComments] = useState(false);
  const handleDeletePost = (deletedPostId) => {
    setPosts(posts.filter((post) => post._id !== deletedPostId));
  };

  const handleEditPost = (updatedPost) => {
    setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
  };
  
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className="mx-auto max-w-4xl  ">
          <div className=" border-t border-gray-200 pt-10 sm:mt-10 sm:pt-16 ">
            {posts.map((post) => (
              <article
                key={post._id}
                className="flex flex-col items-start justify-between rounded-lg mb-6 bg-white/20 shadow-lg ring-1 ring-black/5 px-10 pt-10"
              >
                <div className="relative flex items-center justify-between w-full gap-x-4">
                  <div className="flex items-center gap-x-4">
                    <img
                      src={post?.author?.profilePic}
                      alt="profile pic"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        {post?.author?.fullName}
                      </p>
                      <p className="text-gray-600">{post?.author?.job}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    {user?.email === post.author.email && (
                      <Delete id={post._id} onDelete={handleDeletePost} />
                    )}
                    {user?.email === post.author.email && (
                      <Edit postData={post} onEdit={handleEditPost} />
                    )}
                  </div>
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
                  <p className="mt-5 line-clamp-3 text-xl leading-6 text-gray-600 mb-6">
                    {post.description}
                  </p>
                  {post.imageUrl && (
                  <img
                  src={post?.imageUrl}
                  className="w-[500px] h-[500px] justify-center"
                />
              )}
                </div>
                  
                <div className="w-[500px]">
                  <Comment postID={post._id} />

                  {/*<Com/>*/}

                  {post.comments
                    .slice(0, showAllComments ? undefined : 3)
                    .map((comment) => {
                      return <CommentsComponent
                        comment={comment}
                        post={post}
                        posts={posts}
                        userId={user.id}
                      />}
                    )}
                  <button
                    onClick={() => setShowAllComments(!showAllComments)}
                    className="text-sm text-gray-700 bg-gray-200 rounded-full mt-6"
                  >
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

const CommentsComponent = ({ comment, post, posts, userId }) => {
  const [upvotes, setUpvote] = useState(comment.like || []);
  const [downvotes, setDownvote] = useState(comment.dislike || []);

  const handleVote = async (isUp) => {
   await console.log("handle vote",comment._id);
    const response = await fetch("/api/comments", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentId: comment._id,
        userId: userId,
        like: isUp,
      }),
    });

    if (response.ok) {
      const { comment: updatedComment } = await response.json();
      setUpvote(updatedComment.like);
      setDownvote(updatedComment.dislike);
    } else {
      console.error("Failed to update comment");
    }
  };

  return (
    <div className="relative pb-8" key={comment._id}>
      <span
        className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200 "
        aria-hidden="true"
      />
      <b>{comment.author?.fullName}</b>
      <div className="relative flex items-start space-x-3">
        <>
          <div className="relative">
            {comment.author && comment.author.profilePic && (
              <img
                className="flex h-10 w-10 items-center justify-center rounded-full "
                src={comment.author.profilePic}
                alt=""
              />
            )}
            <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-gray-100/80 px-0.5 py-px">
              <ChatBubbleLeftEllipsisIcon
                className="h-5 w-5 text-black-400"
                aria-hidden="true"
              />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="mt-2 text-sm text-gray-700">
              <p>{comment.text}</p>
            </div>
            <div className="flex items-end justify-end w-full gap-x-4">
              <Up
                count={upvotes.length}
                like={upvotes.includes(userId)}
                onPress={() => handleVote(true)}
              />
              <Down
                count={downvotes.length}
                dislike={downvotes.includes(userId)}
                onPress={() => handleVote(false)}
              />
            </div>
          </div>
        </>
      </div>
    </div>
  );
};
