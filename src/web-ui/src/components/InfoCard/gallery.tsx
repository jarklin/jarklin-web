import type {GalleryInfoEntry} from "~/hooks/useInfo/types.ts";
import {twMerge} from "tailwind-merge";
import {getPreview} from "~/util";
import {GalleryVerticalEndIcon} from "lucide-react";
import Image from "~/components/Image.tsx";


interface Props {
    className?: string
    info: GalleryInfoEntry
}


export default function GalleryCard(props: Props) {
    const info = props.info;

    return <div className={twMerge("aspect-portrait bg-primary-light rounded-md overflow-hidden relative group", props.className)}>
        <Image className="h-full w-full object-cover" loading="lazy" src={getPreview(info.path)} />
        <GalleryVerticalEndIcon className="absolute top-1 left-1 drop-shadow-highlight" />
        <span className="absolute inset-x-0 bottom-0 px-1 bg-black/50">{info.displayName}</span>
    </div>;
}
