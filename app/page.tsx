import About from "@/app/_components/_about/about";
import { parseResume } from "./_utils/schemas";
import getConfig from "next/config";
import LoadingSpinner from "./_components/loading-spinner";
import { Suspense } from "react";
import { logger } from "./_utils/logger";

async function getResume() {
  const { publicRuntimeConfig } = getConfig();

  if (!publicRuntimeConfig.jsonResumeUrl) {
    logger.warn(`Failed to find environment variable: JSON_RESUME_URL`);
  }

  logger.info("Fetching resume...");
  logger.debug(publicRuntimeConfig.jsonResumeUrl);

  const response = await fetch(publicRuntimeConfig.jsonResumeUrl, {
    //! todo: remove cache strategy
    cache: "no-cache",
  });

  if (!response.ok) {
    logger.error(`Failed to GET JSON file. Please validate the URL exists (and is publically accessible): ${publicRuntimeConfig.jsonResumeUrl}`);
  }

  try {
    return await parseResume(await response.json());
  } catch (e) {
    logger.error(e);
  }
}

export default async function Resume() {
  const { publicRuntimeConfig } = getConfig();
  const resume = await getResume();

  if (!resume) {
    return (
      <main>
        <div className="container mx-auto flex justify-center items-center h-screen">
          <div role="alert" className="w-3/4">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              Failed to load resume!
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700 overflow-auto">
              <a href={publicRuntimeConfig.jsonResumeUrl} target="_blank">
                {publicRuntimeConfig.jsonResumeUrl}
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container">
        <Suspense fallback={<LoadingSpinner />}>
          <About about={resume.about} />
        </Suspense>
      </div>
    </main>
  );
}
