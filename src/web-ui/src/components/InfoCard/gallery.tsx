import type {GalleryMeta, JarklinInfoEntry} from "~/types";
import {twMerge} from "tailwind-merge";
import {formatFilename} from "~/util";
import {GalleryVerticalEndIcon} from "lucide-react";


interface Props {
    className?: string
    info: JarklinInfoEntry<GalleryMeta>
}


export default function GalleryCard(props: Props) {
    const info = props.info;

    return <div className={twMerge("aspect-vertical bg-primary-light rounded-md overflow-hidden relative group", props.className)}>
        <img className="h-full w-full object-cover" src={`/files/.jarklin/cache/${info.path}/preview.jpg`} alt=""/>
        <GalleryVerticalEndIcon className="absolute top-1 left-1" />
        <span className="absolute inset-x-0 bottom-0 px-1 bg-black bg-opacity-50">{formatFilename(info.name)}</span>
    </div>;
}
