'use client';
import React, { useState, useRef } from 'react';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

export default function CreatePost({ onAddPost }) {
  const session = useSession();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const [file, setFile] = useState();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));

    if (name === 'title') {
      setTitle(value);
      setTitleError(''); // Clear error when user types
    } else if (name === 'description') {
      setDescription(value);
      setDescriptionError(''); // Clear error when user types
    }
  };

  const startingPostData = {
    title: "",
    description: "",
  };
  const [formData, setFormData] = useState(startingPostData);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (title.trim() === '') {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (description.trim() === '') {
      setDescriptionError('Please fill the description');
      hasError = true;
    }

    if (hasError) return;

    try {
      if (!session.data.user.email) {
        throw new Error('Email not found! Check session!');
      }

      console.log('create post', session.data.user.email);
      
      const userResponse = await fetch('/api/user', {
        method: "POST",
        body: JSON.stringify({ email: session.data.user.email }),
      });
      const { user } = await userResponse.json();
      if (!user._id) {
        throw new Error('Id not found!');
      }

      const newFormData = new FormData();
      newFormData.append("title", formData.title);
      newFormData.append("description", formData.description);
      if (file) {
        newFormData.append("file", file);
      }
      newFormData.append('author', user?._id);

      const response = await fetch('/api/posts', {
        method: "POST",
        body: newFormData,
        cache: 'no-store'
      });

      if (response.ok) {
        setShowForm(false);
        setTitle('');
        setDescription('');
        location.reload();

        
      } else {
        console.error('Failed to create post:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  
  return (
    <div className="relative mx-20">
      <button
        type="button"
        onClick={toggleForm}
        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Ask a Question
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500" method="post">
          <label htmlFor="title" className="sr-only">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
            placeholder="Title"
          />
          {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
          <label htmlFor="description" className="sr-only">Description</label>
          <textarea
            rows={2}
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Write a description..."
            defaultValue={''}
          />
          {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
          <div aria-hidden="true">
            <div className="py-2">
              <div className="h-9" />
            </div>
            <div className="h-px" />
            <div className="py-2">
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>
          <div className="absolute inset-x-px bottom-0">
            <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
              <div className="flex">
                <input
                  id="file"
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
                >
                  <PaperClipIcon
                    className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm italic text-gray-500 group-hover:text-gray-600">
                    Attach a file
                  </span>
                </button>
                {fileName && (
                  <span className="ml-2 text-sm text-gray-500">{fileName}</span>
                )}
              </div>
              <div className="flex-shrink-0">
                <button
                
                  type="submit"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
