import useMedia from "~/hooks/useMedia.ts";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import NotFound from "~/pages/404.tsx";
import {getPreviewImage, getSource} from "~/util";
import {Fragment, useEffect, useState} from "react";
import {ArrowLeftIcon, ArrowUpFromDotIcon, ServerCrashIcon} from "lucide-react";
import ScrollToMe from "~/components/ScrollToMe.tsx";
import type {GalleryMediaEntry} from "~/types/media.ts";
import useFullScreen from "~/hooks/useFullScreen.ts";
import Image from "~/components/Image.tsx";
import {twMerge} from "tailwind-merge";


const OFFSETSCROLLTOP = 50;


export default function MediaReadGalleryPage() {
    const { mediaList: mediaList } = useMedia();
    const {"*": path} = useParams();

    const media = mediaList.find(media => media.path === path);

    if (media === undefined) {
        return <NotFound/>;
    }
    if (media.type !== "gallery") {
        throw new Error("not a gallery");
    }

    return <ReadGalleryPageContent media={media}/>;
}


interface ContentProps {
    media: GalleryMediaEntry
}


function ReadGalleryPageContent({ media }: ContentProps) {
    const [searchParams] = useSearchParams();

    useFullScreen({
        autoFullScreen: true,
        bindKey: true,  // is dump. as it would exit with onFullScreenLeave
        // onFullScreenLeave: () => {
        //     navigate(-1);
        // }
    });

    const currentImage = searchParams.get("currentImage");

    return <>
        <ScrollProgress />
        <div className="flex flex-col items-center">
            {media.meta.images.map((image, i) => <Fragment key={image.filename}>
                <ScrollToMe if={image.filename === currentImage} />
                <PreviewedImage media={media} image={image} i={i} />
            </Fragment>)}
        </div>
        <ScrollToTopButton />
        <ExitButton />
    </>;
}

interface ImageProps {
    media: GalleryMediaEntry,
    image: GalleryMediaEntry["meta"]["images"][number],
    i: number
}


function PreviewedImage({ media, image, i }: ImageProps) {
    const [failed, setFailed] = useState(false);
    // first load the preview-image as "low resolution" and then the original
    const [lowResLoaded, setLowResLoaded] = useState(false);
    const [highResLoaded, setHighResLoaded] = useState(false);

    const highResSrc = getSource(`${media.path}/${image.filename}`);
    const lowResSrc = getPreviewImage(media.path, i + 1);

    if (failed) {
        return <ServerCrashIcon className="w-full max-w-screen-lg" />;
    }

    return <>
        {/* real image that gets displayed */}
        <Image
            className={twMerge("w-full max-w-screen-lg", highResLoaded ? "" : "blur-sm")}
            src={highResLoaded ? highResSrc : lowResSrc}
            alt=""
            width={image.width} height={image.height}
            onLoad={() => {
                setLowResLoaded(true);
            }}
            onError={() => {
                setFailed(true);
            }}
        />
        {/* not visible image just to ensure the image gets loaded */}
        {/* this is to prevent layout shifts that would happen if the image gets switched */}
        {(lowResLoaded && !highResLoaded) && <img
            className="hidden"
            src={highResSrc}
            alt=""
            // loading="lazy"  // images are somehow not loaded if hidden and lazy
            onLoad={() => {
                setHighResLoaded(true);
            }}
            onError={() => {
                setFailed(true);
            }}
        />}
    </>;
}


function ScrollProgress() {
    const [progress, setProgress] = useState(0.0);

    useEffect(() => {
        const controller = new AbortController();

        window.addEventListener("scroll", () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setProgress(winScroll / height);
        }, { signal: controller.signal });

        return () => controller.abort();
    }, []);

    return <div className="sticky top-0">
        <div className="bg-accent-light h-1" style={{width: `${progress * 100}%`}} />
    </div>;
}


function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        window.addEventListener("scroll", () => {
            setVisible(
                document.body.scrollTop > OFFSETSCROLLTOP
                || document.documentElement.scrollTop > OFFSETSCROLLTOP,
            );
        });

        return () => controller.abort();
    }, []);

    return <>
        <button title="To Top" className="fixed bottom-2 left-1 bg-accent/50 grid place-content-center p-2 rounded-full transition-opacity" onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }} style={{opacity: visible ? "100%" : "0%"}}>
            <ArrowUpFromDotIcon />
        </button>
    </>;
}


function ExitButton() {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        window.addEventListener("scroll", () => {
            setVisible(
                document.body.scrollTop > OFFSETSCROLLTOP
                || document.documentElement.scrollTop > OFFSETSCROLLTOP,
            );
        });

        return () => controller.abort();
    }, []);

    return <>
        <button title="Back" className="fixed bottom-2 right-1 bg-accent/50 grid place-content-center p-2 rounded-full transition-opacity" onClick={() => {
            navigate(-1);
        }} style={{opacity: visible ? "100%" : "0%"}}>
            <ArrowLeftIcon />
        </button>
    </>;
}
