import About from "@/app/_components/_about/about";
import type { Resume } from "@/resume";

export default async function Resume() {
  const response = await fetch(`http://localhost:3000/api/resume`, {
    next: { revalidate: 120 },
  });
  const resume = (await response.json()) as Resume;

  return (
    <main>
      <div className="container">
        <About about={resume.about} />
      </div>
    </main>
  );
}
