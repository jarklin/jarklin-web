import type {HTMLProps} from "react";
import {twMerge} from "tailwind-merge";
import {Link, LinkProps} from "react-router-dom";
import {ChevronRightIcon} from "lucide-react";


type Props = HTMLProps<HTMLHeadingElement> & Partial<LinkProps>;


export default function SectionHeader(props: Props) {
    const {reloadDocument, replace, state, preventScrollReset, relative, to, unstable_viewTransition} = props;

    return <h1 {...props} className={twMerge("text-2xl font-bold", props.to !== undefined && "hover:text-accent", props.className)}>
        {to !== undefined ? <>
            <Link reloadDocument={reloadDocument} replace={replace} state={state} preventScrollReset={preventScrollReset} relative={relative} to={to} unstable_viewTransition={unstable_viewTransition}>
                {props.children} <ChevronRightIcon className="inline size-5" />
            </Link>
        </> : <>
            {props.children}
        </>}
    </h1>;
}
