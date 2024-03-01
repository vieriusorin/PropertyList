"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary";

export const POST_PROPERTY = async (request) => {
	await connectDB();

	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.userId) {
		return new Response("User ID is required", { status: 401 });
	}

	const { userId } = sessionUser;

	const formData = await request;
	const amenities = formData.getAll("amenities");
	const images = formData.getAll("images");

	const propertyData = {
		type: formData.get("type"),
		name: formData.get("name"),
		description: formData.get("description"),
		location: {
			street: formData.get("location.street"),
			city: formData.get("location.city"),
			state: formData.get("location.state"),
			zipcode: formData.get("location.zipcode"),
		},
		beds: formData.get("beds"),
		baths: formData.get("baths"),
		square_feet: formData.get("square_feet"),
		amenities,
		rates: {
			weekly: formData.get("rates.weekly"),
			monthly: formData.get("rates.monthly"),
			nightly: formData.get("rates.nightly."),
		},
		seller_info: {
			name: formData.get("seller_info.name"),
			email: formData.get("seller_info.email"),
			phone: formData.get("seller_info.phone"),
		},
		owner: userId,
	};

	// Upload image(s) to Cloudinary

	// Upload image(s) to Cloudinary
	const imageUploadPromises = [];

	for (const image of images) {
		const imageBuffer = await image.arrayBuffer();
		const imageArray = Array.from(new Uint8Array(imageBuffer));
		const imageData = Buffer.from(imageArray);

		// Convert the image data to base64
		const imageBase64 = imageData.toString("base64");

		// Make request to upload to Cloudinary
		const result = await cloudinary.uploader.upload(
			`data:image/png;base64,${imageBase64}`,
			{
				folder: "propertypulse",
			}
		);

		imageUploadPromises.push(result.secure_url);

		// Wait for all images to upload
		const uploadedImages = await Promise.all(imageUploadPromises);
		// Add uploaded images to the propertyData object
		propertyData.images = uploadedImages;
	}

	const newProperty = await Property.create(propertyData);
	await newProperty.save();

	revalidatePath("/properties"); // Update cached posts
	redirect(`/properties/${newProperty._id}`); // Navigate to the new post page
};
