import { z } from "zod";

export const signUpSchema = z.object({
	body: z.object({
		name: z.string(),
		email: z.string(),
		password: z.string()
	})
})
