// import jarklinIconSrc from "~/assets/jarklin.svg";
// import {GithubIcon, Globe2Icon} from "lucide-react";
import {Link} from "react-router-dom";

export default function PageFooter() {
    return <>
        <div className="bg-primary-light p-1 flex flex-col gap-1 items-center">
            {/*<div className="flex justify-center gap-5">*/}
            {/*    <div className="flex gap-1">*/}
            {/*        <Globe2Icon />*/}
            {/*        <Link className="hover:underline text-accent" to="https://jarklin.github.io/" target="_blank">Jarklin</Link>*/}
            {/*    </div>*/}
            {/*    <div className="flex gap-1">*/}
            {/*        <GithubIcon />*/}
            {/*        <Link className="hover:underline text-accent" to="https://github.com/jarklin/" target="_blank">Repository</Link>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="bg-accent h-px w-full" />*/}
            <div>
                <Link className="hover:underline text-accent" to="https://jarklin.github.io/" target="_blank">
                    ©{new Date().getFullYear()} Jarklin
                </Link>
            </div>
        </div>
    </>;
}
