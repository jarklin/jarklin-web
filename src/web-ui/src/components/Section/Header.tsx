import type {HTMLProps} from "react";
import {twMerge} from "tailwind-merge";
import {Link, type LinkProps} from "react-router-dom";
import {ChevronRightIcon} from "lucide-react";


type Props = HTMLProps<HTMLHeadingElement> & Partial<LinkProps>;


export default function SectionHeader(props: Props) {
    const {reloadDocument, replace, state, preventScrollReset, relative, to} = props;

    return <h1 {...props} className={twMerge("text-2xl font-bold", props.to !== undefined && "hover:text-accent", props.className)}>
        {to !== undefined ? <>
            <Link reloadDocument={reloadDocument} replace={replace} state={state} preventScrollReset={preventScrollReset} relative={relative} to={to}>
                {props.children} <ChevronRightIcon className="inline-block size-5 -mt-1"/>
            </Link>
        </> : <>
            {props.children}
        </>}
    </h1>;
}
