'use client'
import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import Delete from './Delete';
//import Edit from './Edit';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
        } else {
          console.error('Failed to fetch posts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);

  const formatCreatedAt = (id) => {
    const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className="mx-auto max-w-4xl ">
          <div className=" border-t border-gray-200 pt-10 sm:mt-10 sm:pt-16 ">
            {posts.map((post) => (
              <article key={post._id} className="flex flex-col items-start justify-between rounded-lg mb-6">
              <Delete id={post._id} />
              {/*<Edit id={post._id} />*/}
                <div className="group relative">
                  <h3 className="flex items-center mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="absolute inset-0" />
                    
                    {post.title}
                  </h3>
                 
                  <div className="flex items-center gap-x-4 text-sm mt-2">
                    <time dateTime={post._id} className="text-gray-500">
                      {formatCreatedAt(post._id)}
                    </time>
                  </div>
                  <p className="mt-5 line-clamp-3 text-xl leading-6 text-gray-600">{post.description}</p>
                </div>
                <div className="relative mt-8 mb-8 flex items-center gap-x-4">
                  {/* Render author information here */}

                </div>
                <div className='w-[500px]'>
                  <Comment  />
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </div>
    
  );
}
