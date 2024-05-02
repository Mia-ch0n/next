"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditForm = ({ post }) => {
  const EDITMODE = post._id === "new" ? false : true;
  const router = useRouter();
  const startingPostData = {
    title: "",
    description: "",

  };

  if (EDITMODE) {
    startingPostData["title"] = post.title;
    startingPostData["description"] = post.description;

  }

  const [formData, setFormData] = useState(startingPostData);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/posts/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) {
        throw new Error("Failed to update post");
      }
    } else {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ formData }),
        //@ts-ignore
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create post");
      }
    }

    router.refresh();
    router.push("/");
  };

  const categories = [
    "Hardware Problem",
    "Software Problem",
    "Application Deveopment",
    "Project",
  ];

  return (
    <div className=" flex justify-center">
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
          <button
            type="button"
            className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
          >
            <PaperClipIcon className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500" aria-hidden="true" />
            <span className="text-sm italic text-gray-500 group-hover:text-gray-600">Attach a file</span>
          </button>
        </div>
        <div className="flex-shrink-0">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </form>
    </div>
  );
};

export default EditForm;