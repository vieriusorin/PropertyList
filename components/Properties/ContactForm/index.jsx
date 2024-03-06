"use client";

import { useState } from "react";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const PropertyContactForm = ({ property }) => {
	const queryClient = useQueryClient();
	const { data: session } = useSession();

	const { control, handleSubmit, reset } = useForm();

	const mutateMessage = useMutation({
		mutationKey: "sendContactMessage",
		mutationFn: async (data) => {
			try {
				const response = await fetch("/api/messages", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});

				return response;
			} catch (error) {
				console.log(error);
			}
		},
	});

	const [wasSubmitted, setWasSubmitted] = useState(false);

	const onSubmit = (data) => {
		mutateMessage.mutate(
			{
				...data,
				recipient: property.owner,
				property: property._id,
			},
			{
				onSuccess: async (data) => {
					const res = await data.json();
					if (data.status === 200 || data.status === 201) {
						toast.success(res.message);
						setWasSubmitted(true);
						reset();
						queryClient.invalidateQueries({
							queryKeys: ["unreadMessagesCount"],
						});
					} else if (data.status === 400 || data.status === 401) {
						toast.error(res.message);
					} else {
						toast.error("Error sending message");
					}
				},
				onError: (error) => {
					console.log(error);
					toast.error(error.message);
				},
			}
		);
	};

	return (
		<div className='bg-white p-6 rounded-lg shadow-md'>
			<h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>

			{!session ? (
				<p> You must be logged in to send a message</p>
			) : (
				<>
					{wasSubmitted ? (
						<p className='text-green-500 text-center mb-4'>
							Your message has been send successfully
						</p>
					) : (
						<form onSubmit={handleSubmit(onSubmit)}>
							<Input
								name='name'
								type='text'
								placeholder='Enter your name'
								control={control}
							/>

							<Input
								name='email'
								type='email'
								placeholder='Enter your email'
								control={control}
							/>

							<Input
								name='phone'
								type='tel'
								placeholder='Enter your phone number'
								control={control}
							/>

							<Textarea
								name='message'
								placeholder='Enter your message'
								control={control}
							/>
							<div>
								<button
									className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
									type='submit'
								>
									<FaPaperPlane /> &nbsp; Send Message
								</button>
							</div>
						</form>
					)}
				</>
			)}
		</div>
	);
};

export default PropertyContactForm;
