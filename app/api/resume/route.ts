import { logger } from "@/app/_utils/logger";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import getConfig from "next/config";
import { parseResume } from "@/app/_utils/schemas";

export async function GET() {
  const { publicRuntimeConfig } = getConfig();

  if (!publicRuntimeConfig.jsonResumeUrl) {
    return new Response(
      `Failed to find environment variable: JSON_RESUME_URL`,
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusText: ReasonPhrases.INTERNAL_SERVER_ERROR,
      }
    );
  }

  logger.info("Fetching resume...");
  logger.debug(publicRuntimeConfig.jsonResumeUrl);

  const response = await fetch(publicRuntimeConfig.jsonResumeUrl, {
    //! todo: remove cache strategy
    cache: "no-cache",
  });

  if (!response.ok) {
    return new Response(
      `Failed to GET JSON file. Please validate the URL exists (and is publically accessible): ${publicRuntimeConfig.jsonResumeUrl}`,
      {
        status: StatusCodes.NOT_FOUND,
        statusText: ReasonPhrases.NOT_FOUND,
      }
    );
  }

  try {
    const resume = await parseResume(await response.json());
    return Response.json(resume);
  } catch (e) {
    return new Response(
      `${(e as Error).message}: ${publicRuntimeConfig.jsonResumeUrl}`,
      {
        status: StatusCodes.NOT_FOUND,
        statusText: ReasonPhrases.NOT_FOUND,
      }
    );
  }
}
