import { ReasonPhrases, StatusCodes } from "http-status-codes";
import getConfig from "next/config";


export async function GET() {
  const { publicRuntimeConfig } = getConfig();

  const RESUME_FILE_NAME = "resume.json";
  const GIST_URL = `https://gist.github.com/${publicRuntimeConfig.gistId}`;

  const response = await fetch(
    `https://api.github.com/gists/${publicRuntimeConfig.gistId}`
  );

  if (!response.ok) {
    return new Response(
      `Could not find Gist. Please validate this Gist exists and is public (not secret): ${GIST_URL}`,
      {
        status: StatusCodes.NOT_FOUND,
        statusText: ReasonPhrases.NOT_FOUND,
      }
    );
  }

  const json = await response.json();
  let content;
  try {
    content = json?.files?.[RESUME_FILE_NAME]?.content;
  } catch (e) {
    return new Response(
      `File (${RESUME_FILE_NAME}) does not exist in Gist: ${GIST_URL}`,
      {
        status: StatusCodes.NOT_FOUND,
        statusText: ReasonPhrases.NOT_FOUND,
      }
    );
  }

  return Response.json(content);
}
