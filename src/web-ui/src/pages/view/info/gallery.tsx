import {GalleryInfoEntry} from "~/hooks/useInfo/types.ts";
import {encodePath, getAnimatedPreview, getPreview, getPreviewImage} from "~/util";
import {Link} from "react-router-dom";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import {BookOpenTextIcon} from "lucide-react";
import humanize from "humanize-plus";


export default function GalleryViewPage({ gallery }: { gallery: GalleryInfoEntry }) {
    const href = `/read/${encodePath(gallery.path)}`

    return <>
        <div className="relative h-[50vh]">
            <img className="w-full h-full object-cover" src={getAnimatedPreview(gallery.path)} alt=""/>
            <Link to={href} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[10vh] bg-accent/50 rounded-full p-2 transition-transform hover:scale-105">
                <BookOpenTextIcon className="w-full h-full"/>
            </Link>
        </div>
        <div className="flex px-[2vw] gap-[5vw] h-[35vh]">
            <div className="h-full">
                <img className="mx-auto h-full rounded-md object-contain" src={getPreview(gallery.path)} alt=""/>
            </div>
            <div className="grow text-xs">
                <p className="text-xl">{gallery.displayName}</p>
                <p>Path: {gallery.path}</p>
                <p>Images: {gallery.meta.images.length}</p>
                <p>Total Size: {humanize.fileSize(gallery.meta.images.reduce((size, image) => size + image.filesize, 0))}</p>
                <div className="flex gap-2 flex-wrap">
                    {gallery.tags.map(tag => <>
                        <Link key={tag} className="bg-accent hover:bg-accent-light rounded-lg px-1 py-px" to={{
                            pathname: "/search",
                            search: new URLSearchParams({tag}).toString(),
                        }}>{tag}</Link>
                    </>)}
                </div>
            </div>
        </div>
        <p className="text-2xl">Images</p>
        <VerticalScrollArea>
            {gallery.meta.images.map((image, i) => <>
                <Link key={i} className="min-w-fit bg-primary-light rounded-md overflow-hidden" to={{
                    pathname: href,
                    search: new URLSearchParams({
                        currentImage: image.filename,
                    }).toString()
                }}>
                    <img className="block aspect-portrait h-40 object-cover" src={getPreviewImage(gallery.path, i + 1)} alt=""/>
                </Link>
            </>)}
        </VerticalScrollArea>
    </>;
}
