import type {JarklinInfoEntry, VideoMeta} from "~/types";
import {twMerge} from "tailwind-merge";
import {formatFilename, getPreview} from "~/util";
import {FilmIcon} from "lucide-react";


interface Props {
    className?: string
    info: JarklinInfoEntry<VideoMeta>
}


export default function VideoCard(props: Props) {
    const info = props.info;

    return <div className={twMerge("aspect-video bg-primary-light rounded-md overflow-hidden relative group", props.className)}>
        <img className="h-full w-full object-cover" src={getPreview(info.path)} alt="" />
        <FilmIcon className="absolute top-1 left-1" />
        <span className="absolute inset-x-0 bottom-0 px-1 bg-black bg-opacity-50">{formatFilename(info.name)}</span>
    </div>;
}
