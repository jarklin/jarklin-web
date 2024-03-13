import type {VideoMediaEntry} from "~/types/media.ts";
import {twMerge} from "tailwind-merge";
import {getPreview} from "~/util";
import {FilmIcon} from "lucide-react";
import Image from "~/components/Image.tsx";


interface Props {
    className?: string
    media: VideoMediaEntry
}


export default function VideoCard(props: Props) {
    const { media } = props;

    return <div className={twMerge("aspect-video bg-primary-light rounded-md overflow-hidden relative group", props.className)}>
        <Image className="h-full w-full object-cover" loading="lazy" src={getPreview(media.path)} />
        <FilmIcon className="absolute top-1 left-1 drop-shadow-highlight" />
        <span className="absolute inset-x-0 bottom-0 px-1 bg-gradient-to-t from-black/50 via-black/50 to-transparent drop-shadow-highlight">{media.displayName}</span>
    </div>;
}
