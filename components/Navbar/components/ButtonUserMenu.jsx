import React from 'react'
import Image from 'next/image'

import imgProfileDefault from '@/assets/images/profile.png'
export const ButtonUserMenu = ({setIsProfileMenuOpen}) => {
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
        width='auto'
        height='auto'
        className="h-8 w-8 rounded-full" 
        src={imgProfileDefault} 
        alt="Profile default" 
        />
        
      </button>
    </div>
  )
}
