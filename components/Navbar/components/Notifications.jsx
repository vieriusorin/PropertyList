import Link from "next/link";
import { ButtonUserMenu } from "./ButtonUserMenu";
import UserMenu from "./UserMenu";
import UnreadMessagesCount from "@/components/UnreadMessagesCount";

const Notifications = ({
	setIsProfileMenuOpen,
	isProfileMenuOpen,
	session,
}) => {
	return (
		<div className='absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
			<Link href='/messages' className='relative group'>
				<button
					type='button'
					className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
				>
					<span className='absolute -inset-1.5'></span>
					<span className='sr-only'>View notifications</span>
					<svg
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						aria-hidden='true'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
						/>
					</svg>
				</button>
				<UnreadMessagesCount session={session} />
			</Link>
			<div className='relative ml-3'>
				<ButtonUserMenu setIsProfileMenuOpen={setIsProfileMenuOpen} />
				{isProfileMenuOpen && (
					<UserMenu setIsProfileMenuOpen={setIsProfileMenuOpen} />
				)}
			</div>
		</div>
	);
};

export default Notifications;
