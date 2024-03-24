import type {GalleryMediaEntry} from "~/types/media.ts";
import {encodePath, findClosestEntry, getAnimatedPreview, getPreviewImage} from "~/util";
import {Link} from "react-router-dom";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import {type LucideIcon, BookOpenTextIcon, RectangleHorizontalIcon, RectangleVerticalIcon, SquareIcon} from "lucide-react";
import humanize from "humanize-plus";
import TagLink from "~/components/TagLink.tsx";
import SectionHeader from "~/components/Section/Header.tsx";
import SectionSeparator from "~/components/Section/Separator.tsx";
import Image from "~/components/Image.tsx";
import LabelBox from "~/components/LabelBox.tsx";
import {useMemo} from "react";


/* eslint-disable no-magic-numbers */
const aspect2IconMap: Record<number, [LucideIcon, string]> = {
    [9/16]: [RectangleVerticalIcon, "portrait"],
    [1]: [SquareIcon, "squared"],
    [16/9]: [RectangleHorizontalIcon, "landscape"],
};
/* eslint-enable no-magic-numbers */


export default function MediaGalleryInfo({ gallery }: { gallery: GalleryMediaEntry }) {
    const readHref = `/media/read/${encodePath(gallery.path)}`;

    const aspectIcons = useMemo(() => (
        Array
            .from(new Set(
                gallery.meta.images
                    .map(image => image.width / image.height)  // calculate aspect-ratio's
                    .map(ratio => findClosestEntry(aspect2IconMap, ratio)),
            ))
            .map(([Icon, title]) => <span key={title} title={title}><Icon className="size-5" /></span>)
    ), [gallery]);

    const totalImages = gallery.meta.images.length;
    const totalImagesSize = gallery.meta.images.reduce((size, image) => size + image.filesize, 0);

    return <>
        <div className="relative h-[50vh]">
            <Image className="w-full h-full object-cover" src={getAnimatedPreview(gallery.path)} />
            <Link to={readHref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[10vh] bg-accent/50 rounded-full p-2 transition-transform hover:scale-105">
                <BookOpenTextIcon className="size-full" />
            </Link>
        </div>
        <div className="flex px-[2vw] gap-[5vw] min-h-[35vh]">
            <div className="h-[35vh]">
                <Image className="mx-auto h-full rounded-md object-contain" src={getPreviewImage(gallery.path)} />
            </div>
            <div className="grow text-xs">
                <p className="text-xl font-bold">{gallery.displayName}</p>
                <div className="grid gap-x-2 gap-y-1 grid-cols-kv odd:[&>*]:font-semibold">
                    <span>Path</span>
                    <span>{gallery.path}</span>
                    <span>Images</span>
                    <span>{humanize.intComma(totalImages)}</span>
                    <span>Total Size</span>
                    <span>{humanize.fileSize(totalImagesSize)}</span>
                    <span>Average Size</span>
                    <span>{humanize.fileSize(totalImagesSize / totalImages)}</span>
                    <span>Aspects</span>
                    <span className="flex gap-x-1">{aspectIcons}</span>
                    <span>Filetypes</span>
                    <span className="flex gap-x-1 flex-wrap">
                        {Array.from(new Set(gallery.meta.images.map(im => im.ext))).map(ext => (
                            <LabelBox key={ext}>{ext}</LabelBox>
                        ))}
                    </span>
                    <span>Tags</span>
                    <div className="flex gap-2 flex-wrap">
                        {gallery.tags.map(tag => <TagLink key={tag} tag={tag}/>)}
                    </div>
                </div>
            </div>
        </div>
        <SectionSeparator/>
        <SectionHeader className="px-2">Images</SectionHeader>
        <VerticalScrollArea>
            {gallery.meta.images.map((image, i) => (
                <Link key={i} className="min-w-fit bg-primary-light rounded-md overflow-hidden" to={{
                    pathname: readHref,
                    search: new URLSearchParams({
                        currentImage: image.filename,
                    }).toString(),
                }}>
                    <Image className="block aspect-portrait h-gallery-sm object-cover" src={getPreviewImage(gallery.path, i + 1)} />
                </Link>
            ))}
        </VerticalScrollArea>
    </>;
}
