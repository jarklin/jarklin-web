import type {GalleryMediaEntry} from "~/types/media.ts";
import {twMerge} from "tailwind-merge";
import {getPreviewImage} from "~/util";
import {ImagesIcon} from "lucide-react";
import Image from "~/components/Image.tsx";


interface Props {
    className?: string
    media: GalleryMediaEntry
}


export default function GalleryCard(props: Props) {
    const { media } = props;

    return <div className={twMerge("aspect-portrait bg-primary-light rounded-md overflow-hidden relative isolate group", props.className)}>
        <Image className="size-full object-cover" loading="lazy" src={getPreviewImage(media.path)} />
        <ImagesIcon className="absolute top-1 left-1 size-5 drop-shadow-highlight z-10" />
        <span className="absolute inset-x-0 bottom-0 px-1 bg-gradient-to-t from-75% from-black/50 drop-shadow-highlight line-clamp-3 z-10 font-bold">{media.displayName}</span>
    </div>;
}
