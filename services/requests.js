import { revalidatePath } from "next/cache";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

const getProperties = async () => {
	try {
		// Handle the case where the domain is not available yer
		if (!apiDomain) return [];

		const res = await fetch(`${apiDomain}/properties`, {
			cache: "no-cache",
		});

		if (!res.ok) {
			throw new Error("Failed to fetch properties");
		}

		return res.json();
	} catch (error) {
		throw new Error(error.message);
	}
};

const getPropertyById = async (id) => {
	try {
		// Handle the case where the domain is not available yet
		if (!apiDomain) {
			return null;
		}

		const res = await fetch(`${apiDomain}/properties/${id}`);

		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		return res.json();
	} catch (error) {
		console.log(error);
		return null;
	}
};

const getUserPropertiesList = async (id) => {
	try {
		// Handle the case where the domain is not available yet
		if (!apiDomain) {
			return null;
		}

		const res = await fetch(`${apiDomain}/properties/user/${id}`);

		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		return res.json();
	} catch (error) {
		console.log(error);
		return null;
	}
};

const removePropertyById = async (id) => {
	try {
		// Handle the case where the domain is not available yet
		if (!apiDomain) {
			return null;
		}

		const res = await fetch(`${apiDomain}/properties/${id}`, {
			method: "DELETE",
		});

		if (res.status === 200) {
			throw new Error("Failed to delete property");
		}

		return res.json();
	} catch (error) {
		return null;
	}

	revalidatePath("/api/properties/:id");
};

export {
	getProperties,
	getPropertyById,
	getUserPropertiesList,
	removePropertyById,
};
