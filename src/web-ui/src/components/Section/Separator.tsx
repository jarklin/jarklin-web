import {twMerge} from "tailwind-merge";


interface Props {
    className?: string
}


export default function SectionSeparator(props: Props) {
    return <div className={twMerge("h-px m-2 bg-primary-light/50", props.className)} />;
}
