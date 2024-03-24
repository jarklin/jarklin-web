import type {VideoMediaEntry} from "~/types/media.ts";
import {twMerge} from "tailwind-merge";
import {getPreviewImage} from "~/util";
import {FilmIcon} from "lucide-react";
import Image from "~/components/Image.tsx";


interface Props {
    className?: string
    media: VideoMediaEntry
}


export default function VideoCard(props: Props) {
    const { media } = props;

    return <div className={twMerge("aspect-video bg-primary-light rounded-md overflow-hidden relative isolate group", props.className)}>
        <Image className="size-full object-cover" loading="lazy" src={getPreviewImage(media.path)} />
        <FilmIcon className="absolute top-1 left-1 size-5 drop-shadow-highlight z-10" />
        <span className="absolute inset-x-0 bottom-0 px-1 bg-gradient-to-t from-75% from-black/50 drop-shadow-highlight line-clamp-2 z-10">{media.displayName}</span>
    </div>;
}
