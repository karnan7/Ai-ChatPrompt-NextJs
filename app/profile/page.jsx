'use client';

import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
    const [allPosts, setAllPosts] = useState([]);
    const { data: session } = useSession();

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

    const handleEdit = () => {}
    const handleDelete = async () => {}
  return (
    <Profile
    name='my'
    desc="Welcome to your personalized profile"
    data={allPosts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}/>
  )
}

export default MyProfile;