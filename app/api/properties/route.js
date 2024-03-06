import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async (req) => {
	try {
		await connectDB();

		const page = req.nextUrl.searchParams.get("page") || 1;
		const perPage = req.nextUrl.searchParams.get("perPage") || 9;
		const location = req.nextUrl.searchParams.get("location") || "";
		const propertyType = req.nextUrl.searchParams.get("propertyType") || "";
		const skip = (page - 1) * perPage;

		const total = await Property.countDocuments({});

		// Initialize an empty query object
		let query = {};

		// Add location to the query if it's provided
		if (location) {
			query.city = location;
		}

		// Add propertyType to the query if it's provided
		if (propertyType) {
			query.type = propertyType;
		}

		const properties = await Property.find(query).skip(skip).limit(perPage);

		const result = {
			properties,
			total,
		};
		return new Response(JSON.stringify(result), {
			status: 200,
		});
	} catch (error) {
		return new Response(error.message, {
			status: 500,
		});
	}
};
