import Link from "next/link"
import { customLinks } from "../utils"
import { FaGoogle } from "react-icons/fa6";
import { usePathname } from "next/navigation"

export const MainMenuMobile = ({
  isLoggedIn
}) => {
  const pathname = usePathname();
  return (
    <div id="mobile-menu">
        <div className="space-y-1 flex flex-col px-2 pb-3 pt-2">
          {
            customLinks(isLoggedIn).map((link) => (
              <Link key={link.label} className={`text-white ${pathname === link.href ? 'bg-black text-white' : ''} hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`} href={link.href}>
                  {link.label}
              </Link>
            ))
          }
          {
            !isLoggedIn && (
            <button
              className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4"
            >
              <FaGoogle className="text-white mr-2" />
              <span>Login or Registers</span>
            </button>
            )
          }  
        </div>
      </div>
  )
}

export default MainMenuMobile;