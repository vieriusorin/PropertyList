import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa6";

 const ButtonLoginRegister = ({provider}) => {
  return (
    <button
    onClick={() => signIn(provider.id)}
      className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
    >
      <FaGoogle className="text-white mr-2" />
      <span>Login or Register</span>
    </button>
  )
}

export default ButtonLoginRegister;