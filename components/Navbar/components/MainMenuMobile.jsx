import Link from "next/link"
import { customLinks } from "../utils";
import { usePathname } from "next/navigation"
import ButtonLoginRegister from "./ButtonLoginRegister";

export const MainMenuMobile = ({
  isLoggedIn,
  providers
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
            !isLoggedIn && !!providers && (
              Object.values(providers).map((provider, index) => (
                <ButtonLoginRegister key={index} provider={provider} />
              ))
            )
          }  
        </div>
      </div>
  )
}

export default MainMenuMobile;