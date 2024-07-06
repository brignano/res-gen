import type { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

type ResponseData = {
  resume: any;
  error?: string;
};

export async function GET() {
  const { publicRuntimeConfig } = getConfig();
  const response = await fetch(
    `https://api.github.com/gists/${publicRuntimeConfig.gistId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch GIST: ${publicRuntimeConfig.gistId}`);
  }

  const json = await response.json();
  let content;
  try {
    content = json?.files?.["resume.jso"].content;
  } catch (e) {
    return new Response("test", {
      status: 500,
      statusText: "Error",
    });
  }

  return Response.json({ resume: content });
}
