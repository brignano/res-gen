import { Social } from "@/resume";
import { EnvelopeIcon, UserPlusIcon } from "@heroicons/react/20/solid";

interface SocialIconsProps {
  socials?: Social[];
  email: string;
}

export default function SocialIcons(props: SocialIconsProps) {
  const { socials, email } = props;

  return (
    <div className="container inline-flex">
      <a href={`mailto:${email}`}>
        <EnvelopeIcon
          aria-hidden="true"
          className="h-5 w-5 text-gray-300 hover:text-indigo-300"
        />
      </a>
      {socials?.map((social, index) => {
        return (
          <a
            href={`https://github.com/${social.username}`}
            key={index}
            className="px-2"
          >
            <UserPlusIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-300 hover:text-indigo-300"
            />
          </a>
        );
      })}
    </div>
  );
}
