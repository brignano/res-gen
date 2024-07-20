import About from "@/app/_components/_about/about";
import { parseResume } from "@/app/_utils/resume-schema";

const getResume = async () => {
  const response = await fetch(process.env.API_URL + `/resume`, {
    next: {
      cache: "no-cache",
    },
  });
  const resumeJson = await response.json();
  return parseResume(resumeJson);
};

export default async function Resume() {
  const resume = await getResume();

  return (
    <main>
      <div className="container">
        <About about={resume.about} />
      </div>
    </main>
  );
}
