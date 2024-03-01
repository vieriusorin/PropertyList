import React from 'react'
import Image from 'next/image'

import { useSession } from "next-auth/react";

import imgProfileDefault from '@/assets/images/profile.png'
export const ButtonUserMenu = ({setIsProfileMenuOpen}) => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;

  return (
    <div>
      <button
        type="button"
        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        id="user-menu-button"
        aria-expanded="false"
        aria-haspopup="true"
        onClick={() => setIsProfileMenuOpen((isOpen) =>!isOpen)}
      >
        <span className="absolute -inset-1.5"></span>
        <span className="sr-only">Open user menu</span>
        <Image 
        width={40}
        height={40}
        className="h-8 w-8 rounded-full" 
        src={profileImage || imgProfileDefault} 
        alt="Profile default" 
        />
        
      </button>
    </div>
  )
}
