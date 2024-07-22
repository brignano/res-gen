import { LocationSchema } from "@/app/_utils/schemas";
import LoadingSpinner from "../loading-spinner";
import getConfig from "next/config";

interface LocationProps {
  location?: LocationSchema;
}

export default function Location(props: LocationProps) {
  const { location } = props;

  const { serverRuntimeConfig } = getConfig();

  if (!serverRuntimeConfig.googleMapsApiKey) {
    return <></>;
  } else if (!location) {
    return <LoadingSpinner />;
  }

  return (
    <iframe
      width="600"
      height="275"
      style={{ border: 0 }}
      loading="lazy"
      src={`https://www.google.com/maps/embed/v1/place?q=${location.city},${location.state},${location.country}&key=${serverRuntimeConfig.googleMapsApiKey}`}
    />
  );
}
