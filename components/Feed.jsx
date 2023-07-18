"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCards = ({ data, handleTagClick }) => {
  return(
    <div></div>
  )
}

const Feed = () => {
  const[searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt');
      const data = await response.json();

      setPosts(data);
    }

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
      data={posts}
      handleTagClick={() => {}}/>
    </section>
  )
}

export default Feed;