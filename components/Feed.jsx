"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCards = ({ data, handleTagClick }) => {
  console.log("d", data);
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const[searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);

  const handleSearchChange = (e) => {

  }

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  },[])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
        type="text"
        placeholder="search"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer" />
      </form>
      <PromptCards
      data={allPosts}
      handleTagClick={() => {}}/>
    </section>
  )
}

export default Feed;