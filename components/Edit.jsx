import React, { useState } from 'react';
import { useRouter } from 'next/router';

const EditForm = ({ postData }) => {
  const [formData, setFormData] = useState(postData);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/posts/${postData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Redirect to the post page or update state accordingly
        router.push(`/posts/${postData._id}`);
      } else {
        console.error('Failed to update post:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" value={formData.content} onChange={handleChange} />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditForm;
