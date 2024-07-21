import { SocialIcon } from "react-social-icons";

interface SocialsProps {
  social_urls?: string[];
}

export default function Socials(props: SocialsProps) {
  const { social_urls } = props;

  return (
    <div className="container inline-flex">
      {social_urls?.map((url, index) => {
        return (
          <>
            <SocialIcon
              url={
                url.includes("@") && !url.startsWith("mailto:")
                  ? `mailto:${url}`
                  : url
              }
              key={index}
              aria-hidden="true"
              style={{
                width: "1.25rem",
                height: "1.25rem",
                marginLeft: "0.25rem",
              }}
              className="hover:opacity-50"
            />
          </>
        );
      })}
    </div>
  );
}
