import type {GalleryMediaEntry} from "~/types/media.ts";
import {twMerge} from "tailwind-merge";
import {getPreview} from "~/util";
import {GalleryVerticalEndIcon} from "lucide-react";
import Image from "~/components/Image.tsx";


interface Props {
    className?: string
    media: GalleryMediaEntry
}


export default function GalleryCard(props: Props) {
    const { media } = props;

    return <div className={twMerge("aspect-portrait bg-primary-light rounded-md overflow-hidden relative group", props.className)}>
        <Image className="h-full w-full object-cover" loading="lazy" src={getPreview(media.path)} />
        <GalleryVerticalEndIcon className="absolute top-1 left-1 drop-shadow-highlight" />
        <span className="absolute inset-x-0 bottom-0 px-1 bg-gradient-to-t from-black/50 via-black/50 to-transparent drop-shadow-highlight">{media.displayName}</span>
    </div>;
}
