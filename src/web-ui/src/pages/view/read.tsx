import useInfo from "~/hooks/useInfo";
import {useParams} from "react-router-dom";
import NotFound from "~/pages/404.tsx";
import {getSource} from "~/util";
import {useEffect, useState} from "react";

export default function ReadGalleryPage() {
    const info = useInfo();
    const { "*": path } = useParams();

    const data = info.find(entry => entry.path === path);

    if (data === undefined) {
        return <NotFound />
    }
    if (data.meta.type !== "gallery") {
        throw new Error("not a gallery")
    }

    return <>
        <ScrollProgress />
        <div className="flex flex-col items-center">
            {data.meta.images.map(image => <>
                <img
                    className="w-full max-w-screen-lg"
                    src={getSource(`${data.path}/${image.filename}`)}
                    alt={image.filename}
                    width={image.width} height={image.height}
                    loading="lazy"
                />
            </>)}
        </div>
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
