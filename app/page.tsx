"use client";

import getConfig from "next/config";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [resume, setResume] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/resume")
      .then((res) => res.json())
      .then((data) => {
        setResume(data.resume);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!resume) return <p>No resume data</p>;

  return <main>{resume}</main>;
}
