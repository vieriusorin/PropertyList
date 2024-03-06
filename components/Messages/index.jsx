"use client";

import LoadingPage from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import Message from "../Message";

const Messages = () => {
	const {
		data: messages,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["messages"],
		queryFn: async () => {
			const res = await fetch("/api/messages");
			return res.json();
		},
	});

	if (isLoading) {
		return <LoadingPage />;
	}

	if (isError) {
		return <p>Error loading messages</p>;
	}

	return (
		<section className='bg-blue-50'>
			<div className='container m-auto py-24 max-w-6xl'>
				<div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
					<h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

					<div className='space-y-4'>
						{messages.length === 0 ? (
							<p>You have no messages</p>
						) : (
							messages.map((message) => (
								<Message key={message._id} message={message} />
							))
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Messages;
