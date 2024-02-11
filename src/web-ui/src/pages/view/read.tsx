import useInfo from "~/hooks/useInfo";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import NotFound from "~/pages/404.tsx";
import {getSource} from "~/util";
import {useEffect, useState} from "react";
import {ArrowLeftIcon, ArrowUpFromDotIcon} from "lucide-react";
import ScrollToMe from "~/components/ScrollToMe.tsx";

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

    useEffect(() => {
        if (!document.fullscreenEnabled) { return; }
        document.documentElement.requestFullscreen().then();

        return () => {
            if (document.fullscreenElement !== null) {
                document.exitFullscreen().then()
            }
        };
     }, []);

    const currentImage = searchParams.get("currentImage");

    return <>
        <ScrollProgress />
        <div className="flex flex-col items-center">
            {data.meta.images.map(image => <>
                <ScrollToMe if={image.filename === currentImage} />
                <img
                    className="w-full max-w-screen-lg"
                    src={getSource(`${data.path}/${image.filename}`)}
                    alt={image.filename}
                    width={image.width} height={image.height}
                    loading="lazy"
                />
            </>)}
        </div>
        <ScrollToTopButton />
        <EndExitButton />
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
            console.log({ innerHeight: window.innerHeight, scrollY: window.scrollY, offsetHeight: document.body.offsetHeight })
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
