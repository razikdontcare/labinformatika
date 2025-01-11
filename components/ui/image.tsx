import NextImage from "next/image";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";

type ImageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  src: string | StaticImport;
  alt: string;
  priority?: boolean;
  objectFit?: string;
};

export default function Image(props: ImageProps) {
  return (
    <div className={`relative ${props.className}`}>
      <NextImage
        src={props.src}
        alt={props.alt}
        fill
        className={`object-${props.objectFit ?? "contain"}`}
        priority={props.priority}
      />
    </div>
  );
}
