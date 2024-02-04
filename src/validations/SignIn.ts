
import { z } from "zod";

export const signInSchema = z.object({
	body: z.object({
		email: z.string().trim(),
		password: z.string()
	})
})
