import {twMerge} from "tailwind-merge";

interface Props {
    className?: string
}


export default function LoadingSpinner(props: Props) {
    return <div className={twMerge("grid place-content-center pointer-events-none", props.className)}>
        <div className="h-[min(5vh,5vw)] aspect-square border-4 border-accent-light rounded-full border-t-transparent border-b-transparent animate-spin" />
    </div>;
}
