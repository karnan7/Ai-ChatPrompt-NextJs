'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete}) => {
  
  const { data: session } = useSession();
  const pathname = usePathname();
  const router  = useRouter();

  const[copied, setCopied] = useState("");

  const handleProfileClick = () => {
    if(post.creator._id === session?.user.id){
      return router.push("/profile")
    }
    return router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div 
        onClick={handleProfileClick}
        className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
          src={copied === post.prompt
            ? '/assets/icons/tick.svg'
            : '/assets/icons/copy.svg'
          }
          width={12}
          height={12}
          />
        </div>
      </div>
      <p className="my-4 text-sm text-gray-700">{post.prompt}</p>
      <p 
      onClick={() => handleTagClick && handleTagClick(post.tag)}
      className="font-inter text-sm blue_gradient cursor-pointer"
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && 
      pathname === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100">
          <p 
          className="font-inter text-sm green_gradient cursor-pointer"
          onClick={handleEdit}>
            Edit
          </p>

          <p 
          className="font-inter text-sm orange_gradient cursor-pointer"
          onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard;