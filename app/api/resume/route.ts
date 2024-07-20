import { logger } from "@/app/_utils/logger";
import { Resume } from "@/resume";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import getConfig from "next/config";

export async function GET() {
  const { publicRuntimeConfig } = getConfig();

  const response = await fetch(publicRuntimeConfig.jsonResumeUrl);

  if (!response.ok) {
    return new Response(
      `Failed to find Resume. Please validate the URL exists and is publically accessible: ${publicRuntimeConfig.jsonResumeUrl}`,
      {
        status: StatusCodes.NOT_FOUND,
        statusText: ReasonPhrases.NOT_FOUND,
      }
    );
  }

  try {
    const jsonResume = await response.json();
    logger.debug(`jsonResume: ${JSON.stringify(jsonResume, null, 2)}`);
    return Response.json(jsonResume as Resume);
  } catch (e) {
    return new Response(
      `Failed to parse JSON. Please validate the file is in a validate JSON format: ${publicRuntimeConfig.jsonResumeUrl}`,
      {
        status: StatusCodes.NOT_FOUND,
        statusText: ReasonPhrases.NOT_FOUND,
      }
    );
  }
}
