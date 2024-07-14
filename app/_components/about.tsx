import { About as AboutType } from "@/resume";
import LoadingSpinner from "./loading-spinner";
import { logger } from "../_utils/logger";

interface AboutProps {
  about?: AboutType;
}

export default function About(props: any) {
  const { about } = props;

  if (!about) return <LoadingSpinner />;

  logger.info("about: " + JSON.stringify(about, null, 2));

  return <p>{about.name}</p>;
}
