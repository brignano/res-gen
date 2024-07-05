import type { NextApiRequest, NextApiResponse } from "next";
import type { Resume } from "@/resume";

type ResumeData = {
  message: string;
  // todo: remove optional chaining below
  resume?: Resume;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResumeData>
) {
  res.status(200).json({ message: "Hello from Next.js!" });
}
