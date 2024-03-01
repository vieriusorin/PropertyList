import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/user/:userId
export const GET = async (req, { params }) => {
	try {
		await connectDB();

		const userId = params.userId;

		if (!userId) {
			return new Response("User ID is required", { status: 401 });
		}

		const properties = await Property.find({ user: userId });

		return new Response(JSON.stringify(properties), {
			status: 200,
		});
	} catch (error) {
		return new Response(error.message, {
			status: 500,
		});
	}
};
