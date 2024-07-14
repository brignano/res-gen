import { logger } from "@/app/_utils/logger";
import { Resume } from "@/resume";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import getConfig from "next/config";

export async function GET() {
  const { publicRuntimeConfig } = getConfig();

  const response = await fetch(publicRuntimeConfig.jsonResumeUrl);

  if (!response.ok) {
    return new Response(
      `Could not find Gist. Please validate this Gist exists and is public (not secret): ${publicRuntimeConfig.jsonResumeUrl}`,
      {
        status: StatusCodes.NOT_FOUND,
        statusText: ReasonPhrases.NOT_FOUND,
      }
    );
  }

  try {
    const jsonResume = await response.json();
    logger.warn(`jsonResume: ${JSON.stringify(jsonResume, null, 2)}`);
    return Response.json(jsonResume as Resume);
  } catch (e) {
    return new Response(
      `File does not exist and/or is not (publically) accessible: ${publicRuntimeConfig.jsonResumeUrl}`,
      {
        status: StatusCodes.NOT_FOUND,
        statusText: ReasonPhrases.NOT_FOUND,
      }
    );
  }
}
