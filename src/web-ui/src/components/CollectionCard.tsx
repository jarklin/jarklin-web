import {twMerge} from "tailwind-merge";
import Image from "~/components/Image.tsx";
import type {Collection} from "~/types";


interface Props {
    className?: string
    collection: Collection
}


export default function CollectionCard(props: Props) {
    const { collection } = props;

    return <div className={twMerge("aspect-square bg-primary-light rounded-md overflow-hidden relative isolate group", props.className)}>
        <Image className="h-full w-full object-cover" loading="lazy" src={collection.previewUrl} />
        <span className="absolute inset-x-0 bottom-0 px-1 bg-gradient-to-t from-black/50 via-black/50 to-transparent drop-shadow-highlight line-clamp-3 z-10">{collection.displayName}</span>
    </div>;
}