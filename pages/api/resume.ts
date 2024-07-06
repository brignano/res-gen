import type { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

type ResponseData = {
  resume: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
  const response = await fetch(
    `https://api.github.com/gists/${publicRuntimeConfig.gistId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch GIST: ${publicRuntimeConfig.gistId}`);
  }

  const json = await response.json();
  let content;
  try {
    content = json?.files?.["resume.json"]?.content;
  } catch (e) {
    return res.status(500).json({
      resume: null,
      error: `Failed to find resume.json file in GIST: ${publicRuntimeConfig.gistId}`,
    });
  }

  return res.status(200).json({ resume: content });
}
