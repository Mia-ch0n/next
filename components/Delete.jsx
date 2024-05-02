"use client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const DeleteBlock = ({ id }) => {
  const router = useRouter();

  const deletePost = async () => {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <FontAwesomeIcon icon={faTrash} 
      className=" text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={deletePost}
    />
  );
};

export default DeleteBlock;