'use client';
import { useState, useEffect }from 'react';
import Link from "next/link"
import Image from 'next/image'

import { usePathname } from 'next/navigation';
import { useSession, getProviders } from "next-auth/react";

import ButtonLoginRegister from "./components/ButtonLoginRegister"
import { MainMenu } from "./components/MainMenu"
import MainMenuMobile from "./components/MainMenuMobile"
import Notifications from "./components/Notifications"

import logo from '@/assets/images/logo-white.png'

const Navbar = () => {
  const { data: session } = useSession();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);

  const pathname = usePathname();

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen((isOpen) =>!isOpen)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            <Link className="flex flex-1 items-center justify-center md:items-stretch md:justify-start" href="/">
              <Image className="h-10 w-auto" width="auto" height="auto" src={logo} alt="PropertyPulse" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">PropertyPulse</span>
            </Link>
            <div className="hidden md:ml-6 md:block">
              <MainMenu isLoggedIn={session} />
            </div>
          </div>

          {
            !session ? (
              <div className="md:block md:ml-6">
              <div className="flex items-center">
                {!!providers && 
                  Object.values(providers).map((provider, index) => (
                    <ButtonLoginRegister key={index} provider={provider} />
                  ))
                }
              </div>
            </div> 
            ) : <Notifications 
            setIsProfileMenuOpen={setIsProfileMenuOpen}
            isProfileMenuOpen={isProfileMenuOpen}
          />
          }
        </div>
      </div>

    {
      isMobileMenuOpen && (
        <MainMenuMobile isLoggedIn={session} />
      )
    }
    </nav>
  )
}

export default Navbar