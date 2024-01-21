import type { GalleryMeta } from "~/types";


interface Props {
    meta: GalleryMeta,
}


export default function GalleryCard({ meta }: Props) {
    return <div>
        {JSON.stringify(meta)}
    </div>;
}
