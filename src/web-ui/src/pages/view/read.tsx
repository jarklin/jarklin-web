import useInfo from "~/hooks/useInfo";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import NotFound from "~/pages/404.tsx";
import {getPreviewImage, getSource} from "~/util";
import {Fragment, useEffect, useState} from "react";
import {ArrowLeftIcon, ArrowUpFromDotIcon, ServerCrashIcon} from "lucide-react";
import ScrollToMe from "~/components/ScrollToMe.tsx";
import {GalleryInfoEntry} from "~/hooks/useInfo/types.ts";
import useFullScreen from "~/hooks/useFullScreen.ts";
import Image from "~/components/Image.tsx";
import {twMerge} from "tailwind-merge";


export default function ReadGalleryPage() {
    const info = useInfo();
    const [searchParams] = useSearchParams();
    const { "*": path } = useParams();

    const data = info.find(entry => entry.path === path);

    if (data === undefined) {
        return <NotFound />
    }
    if (data.type !== "gallery") {
        throw new Error("not a gallery")
    }

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
            {data.meta.images.map((image, i) => <Fragment key={image.filename}>
                <ScrollToMe if={image.filename === currentImage} />
                <PreviewedImage data={data} image={image} i={i} />
            </Fragment>)}
        </div>
        <ScrollToTopButton />
        <EndExitButton />
    </>;
}

interface ImageProps {
    data: GalleryInfoEntry,
    image: GalleryInfoEntry['meta']['images'][number],
    i: number
}


function PreviewedImage({ data, image, i }: ImageProps) {
    const [failed, setFailed] = useState(false);
    // first load the preview-image as "low resolution" and then the original
    const [lowResLoaded, setLowResLoaded] = useState(false);
    const [highResLoaded, setHighResLoaded] = useState(false);

    const highResSrc = getSource(`${data.path}/${image.filename}`);
    const lowResSrc = getPreviewImage(data.path, i + 1);

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
            loading="lazy"
            onLoad={() => {
                setHighResLoaded(true);
            }}
            onError={() => {
                setFailed(true);
            }}
        />}
    </>
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
    </div>
}


function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        window.addEventListener("scroll", () => {
            setVisible(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50);
        })

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


function EndExitButton() {
    const navigate = useNavigate();
    const [end, setEnd] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        window.addEventListener("scroll", () => {
            setEnd((window.innerHeight + window.scrollY) >= document.body.offsetHeight);
        })

        return () => controller.abort();
    }, []);

    return <>
        <button title="Back" className="fixed bottom-2 right-1 bg-accent/50 grid place-content-center p-2 rounded-full transition-opacity" onClick={() => {
            navigate(-1);
        }} style={{opacity: end ? "100%" : "0%"}}>
            <ArrowLeftIcon />
        </button>
    </>;
}
