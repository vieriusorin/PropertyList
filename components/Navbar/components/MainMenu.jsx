import Link from "next/link"
import { customLinks } from "../utils"
import { usePathname } from "next/navigation"

export const MainMenu = ({
  isLoggedIn
}) => {
  const pathname = usePathname();

  return (
    <div className="flex space-x-2">
      {customLinks(isLoggedIn).map((link) => (
        <Link key={link.label} className={`text-white ${pathname === link.href ? 'bg-black text-white' : ''} hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`} href={link.href}>
            {link.label}
        </Link>
      ))}   
    </div>
  )
}
