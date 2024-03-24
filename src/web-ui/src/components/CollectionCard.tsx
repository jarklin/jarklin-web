import {twMerge} from "tailwind-merge";
import Image from "~/components/Image.tsx";
import type {Collection} from "~/types";
import {LibrarySquareIcon} from "lucide-react";


interface Props {
    className?: string
    collection: Collection
}


export default function CollectionCard(props: Props) {
    const { collection } = props;

    return <div className={twMerge("aspect-square bg-primary-light rounded-md overflow-hidden relative isolate group", props.className)}>
        <Image className="size-full object-cover" loading="lazy" src={collection.previewUrl} />
        <LibrarySquareIcon className="absolute top-1 left-1 size-5 drop-shadow-highlight z-10" />
        <span className="absolute inset-x-0 bottom-0 px-1 bg-gradient-to-t from-75% from-black/50 drop-shadow-highlight line-clamp-3 z-10">{collection.displayName}</span>
    </div>;
}
