"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Select from "../ui/select";
import { SearchSchema } from "./schema";
import { useRouter } from "next/navigation";

const propertyTypes = [
	{
		value: "Apartment",
		label: "Apartment",
	},
	{
		value: "Condo",
		label: "Condo",
	},
	{
		value: "House",
		label: "House",
	},
	{
		value: "Cabin or Cottage",
		label: "Cabin or Cottage",
	},
	{
		value: "Room",
		label: "Room",
	},
	{
		value: "Studio",
		label: "Studio",
	},
	{
		value: "Other",
		label: "Other",
	},
];

const PropertySearchForm = ({ redirect = true }) => {
	const { control, handleSubmit } = useForm({
		resolver: zodResolver(SearchSchema),
	});

	const router = useRouter();

	const onSubmit = (data) => {
		const { location, type } = data;
		if (location === "" && type === "All") {
			router.push("/properties");
		} else {
			const query = `?location=${location}&propertyType=${type}`;
			if (redirect) router.push(`/properties/search-results${query}`);
			else router.replace(`/properties${query}`);
		}
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'
		>
			<div className='w-full md:w-2/5 md:pl-2'>
				<Input
					label='Location'
					name='location'
					placeholder='Enter Location (City, State, Zip, etc'
					control={control}
				/>
			</div>
			<div className='w-full md:w-2/5 md:pl-2'>
				<Select
					label='Property Type'
					name='type'
					control={control}
					options={propertyTypes}
				/>
			</div>
			<button
				type='submit'
				className='md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500'
			>
				Search
			</button>
		</form>
	);
};

export default PropertySearchForm;
