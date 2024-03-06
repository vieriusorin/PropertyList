"use-client";

import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";

const UnreadMessagesCount = ({ session }) => {
	const { data: messages, isLoading } = useQuery({
		queryKey: ["unreadMessagesCount"],
		queryFn: async () => {
			const res = await fetch("/api/messages/unread-count");
			return res.json();
		},
		enabled: !!session,
	});

	return (
		<span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
			{isLoading ? (
				<FaSpinner className='w-6 h-6 animate-spin  text-blue-500' />
			) : (
				messages
			)}
		</span>
	);
};

export default UnreadMessagesCount;
