import * as z from "zod"
import { CompleteSession, relatedSessionSchema } from "./index"

export const messageSchema = z.object({
  id: z.number().int(),
  sessionId: z.number().int(),
  content: z.string(),
  response: z.string(),
  createdAt: z.date(),
  liked: z.boolean().nullish(),
})

export interface CompleteMessage extends z.infer<typeof messageSchema> {
  session: CompleteSession
}

/**
 * relatedMessageSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedMessageSchema: z.ZodSchema<CompleteMessage> = z.lazy(() => messageSchema.extend({
  session: relatedSessionSchema,
}))
