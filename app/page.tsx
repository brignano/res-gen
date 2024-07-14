"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "./_components/loading-spinner";
import About from "./_components/about";
import { Resume } from "@/resume";

export default function Home() {
  const [resume, setResume] = useState({} as Resume);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/resume")
      .then((res) => res.json())
      .then((data) => {
        setResume(data as Resume);
        setLoading(false);
      })
      .catch((e) => setError(e));
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (!resume) return <p>{error}</p>;

  return (
    <main>
      <About about={resume.about} />
    </main>
  );
}
