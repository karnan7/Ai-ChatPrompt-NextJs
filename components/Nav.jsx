"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const isLoggedIn = true;
    const[ providers, setProviders ] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const Providers = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        Providers();
    },[])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="" className='flex gap-2 flex-center'>
            <Image
            src='assets/images/logo.svg'
            alt='chatprompt'
            width={30}
            height={30}
            className='object-contain'/>
            <p className='logo_text'>Chatprompt</p>
        </Link>

        {/* Desktop Navigation */}
        <div className='sm:flex hidden'>
            { isLoggedIn? (
                <div className='flex gap-3 md:gap-5'>
                    <Link 
                    href='create/prompt' 
                    className='black_btn'>Create Post</Link>
                    
                    <button 
                    type='button'
                    onClick={signOut}
                    className='outline_btn'>Sign Out</button>

                    <Link href='/profile'>
                        <Image 
                        src='assets/images/logo.svg'
                        width={37}
                        height={37}
                        className='rounded-full'
                        alt='profile'/>
                    </Link>
                </div>
            ):(
                <>
                    {providers &&
                     Object.values(providers).map(provider => (
                        <button
                        type='button'
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className='outline_btn'>
                            Sign In
                        </button>
                    ))
                    }
                </>
            )}
        </div>

        {/* Mobile Navigation */}
        <div className='sm:hidden flex relative'>
            { isLoggedIn ? (
                <div className='flex'>
                    <Image
                    src='assets/images/logo.svg'
                    width={37}
                    height={37}
                    className='rounded-full cursor-pointer'
                    alt='profile'
                    onClick={() => setToggleDropdown((prev) => !prev)}/>

                    { toggleDropdown &&
                        <div className='dropdown'>
                            <Link 
                            href="/profile"
                            onClick={() => setToggleDropdown(false)}
                            className='dropdown-link'>My Profile</Link> 
                            <Link 
                            href="/create-prompt"
                            onClick={() => setToggleDropdown(false)}
                            className='dropdown-link'>Create Post</Link> 
                            <button
                            type='button'
                            onClick={() => {
                                setToggleDropdown(false);
                                signOut();
                            }}
                            className="mt-5 black_btn w-full">Sign Out</button>
                        </div>
                    }
                </div>
            ) : (
                <>
                 { providers &&
                  Object.values(providers).map(provider => (
                    <button
                    type='button'
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='outline_btn'>Sign In</button>
                  ))
                 }
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav;