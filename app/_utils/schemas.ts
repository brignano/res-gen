import { z } from "zod";
import { logger } from "./logger";

export type LocationSchema = z.infer<typeof LocationSchema>;
const LocationSchema = z.object({
  city: z.string(),
  state: z.string(),
  country: z.optional(z.string()),
});

export type AboutSchema = z.infer<typeof AboutSchema>;
const AboutSchema = z.object({
  name: z.string(),
  title: z.optional(z.string()),
  image_url: z.string().url(),
  social_urls: z.optional(z.array(z.string())),
  website: z.optional(z.string()),
  summary: z.optional(z.string()),
  location: z.optional(LocationSchema),
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

export type ResumeSchema = z.infer<typeof ResumeSchema>;
export const ResumeSchema = z.object({
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
 * @throws an error if the resume is invalid as per the schema
 */
export const validateResume = (resume: unknown) => {
  logger.debug(`Validating schema...`);
  const result = ResumeSchema.safeParse(resume);

  if (result.error) {
    logger.error(
      `Invalid JSON Schema: ${JSON.stringify(
        result.error.flatten().fieldErrors,
        null,
        2
      )}`
    );
    throw new Error("Invalid JSON Schema");
  }

  return result.success;
};

export async function parseResume(resumeJson: unknown) {
  logger.debug(`API Response: ${JSON.stringify(resumeJson, null, 2)}`);
  logger.info(`Loading resume...`);
  validateResume(resumeJson);
  const resume = ResumeSchema.parse(resumeJson);
  logger.debug(`Using Resume: ${JSON.stringify(resume, null, 2)}`);
  return resume;
}
