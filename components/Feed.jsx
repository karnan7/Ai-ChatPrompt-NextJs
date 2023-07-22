"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCards = ({ data, handleTagClick }) => {
  
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
  const [allPosts, setAllPosts] = useState([]);
  
  const[searchText, setSearchText] = useState("");
  const[searchTimeout, setSearchTimeout] = useState(null);
  const[searchedResult, setSearchedResult] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  },[])

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i');
    
    return allPosts.filter((item) => (
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    ))
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResult(searchResult);
      }, 500)
    )
  };

  const handleTagClick =  (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResult(searchResult);
  }

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
      {
        searchText ? (
          <PromptCards
          data={searchedResult}
          handleTagClick={handleTagClick}/>
        ) : (
          <PromptCards
          data={allPosts}
          handleTagClick={handleTagClick}/>
        )
      }
    </section>
  )
}

export default Feed;