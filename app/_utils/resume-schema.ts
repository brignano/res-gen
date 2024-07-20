import { z } from "zod";
import { logger } from "./logger";

export type LocationSchema = z.infer<typeof LocationSchema>;
const LocationSchema = z.object({
  city: z.string(),
  state: z.string(),
});

export type AboutSchema = z.infer<typeof AboutSchema>;
const AboutSchema = z.object({
  name: z.string(),
  title: z.optional(z.string()),
  image: z.string(),
  email: z.string(),
  website: z.optional(z.string()),
  summary: z.optional(z.string()),
  location: z.optional(LocationSchema.merge(z.object({ country: z.string() }))),
  socials: z.array(
    z.object({
      site: z.string(),
      username: z.string(),
    })
  ),
});

export type JobSchema = z.infer<typeof JobSchema>;
const JobSchema = z.object({
  company: z.string(),
  title: z.string(),
  location: LocationSchema,
  startDate: z.date(),
  endDate: z.date(),
  url: z.string(),
  summary: z.string(),
  highlights: z.array(z.string()),
});

export type LevelSchema = z.infer<typeof LevelSchema>;
const LevelSchema = z.enum(["Basic", "Intermediate", "Advanced"]);

export type InterestSchema = z.infer<typeof InterestSchema>;
const InterestSchema = z.object({
  name: z.string(),
  keywords: z.array(z.string()),
});

export type SkillSchema = z.infer<typeof SkillSchema>;
const SkillSchema = InterestSchema.merge(
  z.object({
    level: LevelSchema,
  })
);

export type SocialSchema = z.infer<typeof SocialSchema>;
const SocialSchema = z.object({
  site: z.string(),
  username: z.string(),
});

export type ResumeSchema = z.infer<typeof ResumeSchema>;
const ResumeSchema = z.object({
  about: AboutSchema,
  jobs: z.optional(z.array(JobSchema)),
  skills: z.optional(z.array(SkillSchema)),
  interest: z.optional(z.array(InterestSchema)),
});

/**
 * This function validates the resume object against the schema.
 *
 * @param resume
 * @returns a boolean indicating whether the resume is valid
 */
export const isValidResume = (resume: unknown) => {
  logger.info(resume);
  const result = ResumeSchema.safeParse(resume);

  if (result.error) {
    logger.warn(result.error.format());
  }

  return result.success;
};

export async function parseResume(resume: unknown) {
  if (!isValidResume(resume)) {
    throw new Error("Invalid JSON schema.");
  }

  return ResumeSchema.parse(resume);
}
