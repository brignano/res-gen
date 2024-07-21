import About from "@/app/_components/_about/about";
import { Suspense } from "react";
import LoadingSpinner from "./_components/loading-spinner";
import { parseResume } from "./_utils/schemas";
import getConfig from "next/config";

const getResume = async () => {
  const response = await fetch(process.env.API_URL + `/resume`, {
    //! todo: remove cache strategy
    cache: "no-cache",
  });

  if (!response.ok) {
    return null;
  }

  // return await response.json();
  return parseResume(await response.json());
};

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
