import { z } from "zod";

const ImageSchema = z.object({
	file: z.object({
		name: z.string(),
		size: z.number(),
		type: z.string(),
	}),
});

export const PropertySchema = z.object({
	type: z.string(),
	name: z.string().nonempty({ message: "Name is required" }),
	description: z.string(),
	location: z.object(
		{
			street: z.string().min(3, { message: "Street is required" }),
			city: z.string().min(5, { message: "City is city" }),
			state: z.string().min(2, { message: "State is required" }),
			zipcode: z.string(),
		},
		{
			message: "Location is required",
		}
	),
	beds: z.number().min(1, { message: "Number of beds is required" }),
	baths: z.number().min(1, { message: "Number of baths is required" }),
	square_feet: z.number().min(1),
	amenities: z.array(z.string()),
	rates: z.object({
		weekly: z.number().min(0),
		monthly: z.number().min(0),
		nightly: z.number().min(0),
	}),
	seller_info: z.object({
		name: z.string().min(5, { message: "Name is required" }),
		email: z.string().email({ message: "Email is not valid" }),
		phone: z.string(),
	}),
	images: z.array(ImageSchema),
});
