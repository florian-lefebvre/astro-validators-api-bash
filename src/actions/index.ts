import { parseFormData } from 'astro/preview-release/form';
import { ActionError, defineAction } from 'astro:actions';
import * as v from 'valibot';
import { z } from 'zod';

const subscriptionSchema = v.object({
	email: v.pipe(v.string(), v.email()),
});

const feedbackSchema = z.object({
	message: z.string().trim().min(10),
});

export const server = {
	subscribe: defineAction({
		input: subscriptionSchema,
		handler: async ({ email }) => ({ received: email }),
	}),
	feedback: defineAction({
		accept: 'form',
		handler: async (formData) => {
			const result = await parseFormData(feedbackSchema, formData);
			if (result.issues) {
				throw new ActionError({ code: 'BAD_REQUEST', message: result.issues[0].message });
			}
			return { accepted: result.value.message };
		},
	}),
	legacyFeedback: defineAction({
		accept: 'form',
		input: feedbackSchema,
		handler: async ({ message }) => ({ accepted: message }),
	}),
};
