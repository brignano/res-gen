import { LocationSchema } from "@/app/_utils/schemas";
import LoadingSpinner from "../loading-spinner";

interface LocationProps {
  location?: LocationSchema;
}

export default function Location(props: LocationProps) {
  const { location } = props;

  if (!location) {
    return <LoadingSpinner />;
  }

  return (
    <iframe
      width="600"
      height="275"
      style={{ border: 0 }}
      loading="lazy"
      src={`https://www.google.com/maps/embed/v1/place?q=${location.city},${location.state},${location.country}&key=${process.env.GOOGLE_MAPS_API_KEY}`}
      allowFullScreen={true}
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
