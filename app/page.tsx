"use client";

import { useEffect, useState } from "react";
import Loading from "./_components/loading";

export default function Home() {
  const [resume, setResume] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/resume")
      .then((res) => res.json())
      .then((data) => {
        setResume(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;
  if (!resume) return <p>No resume data</p>;

  return <main>{resume}</main>;
}
