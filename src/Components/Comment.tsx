import { CommentType } from "@/utlities/interface";
import React from "react";
import { IoPersonSharp } from "react-icons/io5";

export default function Comment({ comment }: { comment: CommentType }) {
  
  return (
    <div className="comment">
        <IoPersonSharp size={30} />
      <div className="w-full">
        <div className="flex w-full justify-between">
          <div className="text-blue-400">{comment.user.name}</div>
          <p className="text-gray-400">
            {new Date(comment.created_at).toLocaleString()}
          </p>
        </div>
        <div>{comment.content}</div>
        <div className="text-sm flex items-center gap-2">
          <button className="hover:text-green-600"> Remove </button>
          <span className="font-extrabold align-middle ">.</span>
          <button className="hover:text-green-600"> Reply </button>
          <span className="font-extrabold align-middle ">.</span>
          <button className="hover:text-green-600"> Translate </button>
        </div>
      </div>
    </div>
  );
}
