import React from 'react';

const PostCard = () => {
  return (
    <div className="mx-auto px-4 py-8 max-w-xl my-20">
      <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide">
        <div className="md:flex-shrink-0">
          <img
            src="https://chatai.com/wp-content/uploads/2023/11/tr71123-ai-art.jpeg"
            alt=""
            className="w-full h-64 rounded-lg rounded-b-none"
          />
        </div>
        <div className="px-4 py-2 mt-2">
          <h2 className="font-bold text-2xl text-gray-800 tracking-normal">
            New AI has dropped.
          </h2>
          <p className="text-sm text-gray-700 px-2 mr-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora reiciendis ad architecto at aut placeat quia, minus dolor praesentium officia maxime deserunt porro amet ab debitis deleniti modi soluta
            similique...
          </p>
          <div className="flex items-center justify-between mt-2 mx-6">
            <a href="#" className="text-blue-500 text-xs -ml-3">
              Show More
            </a>
            <a href="#" className="flex text-gray-700">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-blue-500"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              5
            </a>
          </div>
          <div className="author flex items-center -ml-3 my-3">
            <div className="user-logo">
              <img
                className="w-12 h-12 object-cover rounded-full mx-4 shadow"
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
                alt="avatar"
              />
            </div>
            <h2 className="text-sm tracking-tighter text-gray-900">
              <a href="#">By Mohammed Ibrahim</a>{' '}
              <span className="text-gray-600">21 SEP 2015.</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
