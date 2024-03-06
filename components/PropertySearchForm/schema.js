import { z } from "zod";

export const SearchSchema = z.object({
	type: z.string(),
	location: z.string().nonempty({ message: "Name is required" }),
});
