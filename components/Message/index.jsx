"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

const Message = ({ message }) => {
	const queryClient = useQueryClient();
	const [isRead, setIsRead] = useState(message.read);

	const mutateReadMessage = useMutation({
		mutationKey: ["message", message.id],
		mutationFn: async (message) => {
			try {
				const response = await fetch(`/api/messages/${message._id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...message,
						read: !isRead,
					}),
				});

				return response.json();
			} catch (error) {
				console.log(error);
			}
		},
	});

	const mutateDeleteMessage = useMutation({
		mutationKey: ["message", message.id],
		mutationFn: async (message) => {
			try {
				const response = await fetch(`/api/messages/${message._id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				});

				return response.json();
			} catch (error) {
				console.log(error);
			}
		},
	});

	const handleReadClick = () => {
		mutateReadMessage.mutate(message, {
			onSuccess: (data) => {
				if (data === "Message Updated") {
					setIsRead(!isRead);
					toast.success(data);
				} else {
					toast.error(data);
				}
			},
		});
	};

	const handleDeleteClick = () => {
		mutateDeleteMessage.mutate(message, {
			onSuccess: (data) => {
				if (data === "Message Deleted") {
					toast.success(data);
					queryClient.invalidateQueries({
						queryKeys: ["messages", "unreadMessagesCount"],
					});
				} else {
					toast.error(data);
				}
			},
		});
	};

	return (
		<div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
			{!isRead && (
				<div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
					New
				</div>
			)}
			<h2 className='text-xl mb-4'>
				<span className='font-bold'>Property Inquiry:</span>{" "}
				{message.property.name}
			</h2>
			<p className='text-gray-700'>{message.body}</p>

			<ul className='mt-4'>
				<li>
					<strong>Name:</strong> {message.sender.username}
				</li>

				<li>
					<strong>Reply Email:</strong>{" "}
					<a href={`mailto:${message.email}`} className='text-blue-500'>
						{message.email}
					</a>
				</li>
				<li>
					<strong>Reply Phone:</strong>{" "}
					<a href={`tel:${message.phone}`} className='text-blue-500'>
						{message.phone}
					</a>
				</li>
				<li>
					<strong>Received:</strong>{" "}
					{new Date(message.createdAt).toLocaleString()}
				</li>
			</ul>
			<button
				onClick={handleReadClick}
				className={`mt-4 mr-3 ${
					isRead ? "bg-gray-300" : "bg-blue-500 text-white"
				} py-1 px-3 rounded-md`}
			>
				{isRead ? "Mark As New" : "Mark As Read"}
			</button>
			<button
				onClick={handleDeleteClick}
				className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
			>
				Delete
			</button>
		</div>
	);
};

export default Message;
