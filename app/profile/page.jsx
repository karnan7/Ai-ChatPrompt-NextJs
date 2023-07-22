'use client';

import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
    const [allPosts, setAllPosts] = useState([]);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
        
            setAllPosts(data);
        }
    
        if(session?.user.id){
            fetchPosts();
        }
      },[]);

    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
      const hasConfirmed = confirm('Are you sure you want to delete the prompt?');

      if(hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE',
          });

          const filteredPost = allPosts.filter((item) => item._id !== post._id)
          setAllPosts(filteredPost);
        } catch (error) {
          console.log(error);
        }
      }
    }
  return (
    <Profile
    name='My'
    desc="Welcome to your personalized profile"
    data={allPosts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}/>
  )
}

export default MyProfile;