import { LocationSchema } from "@/app/_utils/schemas";

interface LocationProps {
  location: LocationSchema;
}

export default function Location(props: LocationProps) {
  const { location } = props;

  return (
    <div role="none" className="h-screen flex justify-center items-center">
      <div>
        <iframe
          width="600"
          height="450"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?q=${location.city},${location.state},${location.country}&key=${process.env.GOOGLE_MAPS_API_KEY}`}
        />
      </div>
      <div>
        {location.city}, {location.state}{" "}
        {location.country && `(${location.country})`}
      </div>
    </div>
  );
}
