import {ImgHTMLAttributes, useState} from "react";
import {twMerge} from "tailwind-merge";


interface Props extends ImgHTMLAttributes<HTMLImageElement> {
    errorSrc?: string
}


export default function Image(props: Props) {
    const [failed, setFailed] = useState(false);

    return <img
        {...props} alt={props.alt}
        className={twMerge(props.className, failed ? "object-scale-down" : "")}
        src={failed ? (props.errorSrc ?? defaultErrorSrc) : props.src}
        onLoad={(event) => {
            if (failed) { return; }
            props.onLoad?.(event);
        }}
        onError={(event) => {
            if (failed) { return; }
            setFailed(true);
            props.onError?.(event);
        }}
    />;
}


// https://lucide.dev/icons/x-circle
const defaultErrorSrc = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-x-circle'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='m15 9-6 6'/%3E%3Cpath d='m9 9 6 6'/%3E%3C/svg%3E`;
