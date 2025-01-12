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

/**
 * Renders an image with optional styling and priority.
 *
 * @param props - Object containing:
 *  - src: The image source URL.
 *  - alt: The alternative text for the image.
 *  - objectFit: The CSS object-fit property (default: 'contain').
 *  - className: Additional utility classes for the container.
 *    IMPORTANT: Must include size using Tailwind classes (e.g., 'size-24' or 'w-24 h-24')
 *    otherwise the image won't be visible.
 *  - priority: If true, image will be prioritized for loading.
 * @returns A container with a responsive image element.
 */
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
