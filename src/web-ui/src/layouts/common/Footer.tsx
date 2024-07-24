// import jarklinIconSrc from "~/assets/jarklin.svg";
// import {GithubIcon, Globe2Icon} from "lucide-react";
import {Link} from "react-router-dom";


export default function PageFooter() {
    return <>
        <div className="bg-primary-light p-1 flex flex-col gap-1 items-center">
            <div>
                <Link className="text-accent hover:underline hover:text-accent-light" to="https://jarklin.github.io/" target="_blank">
                    ©{new Date().getFullYear()} Jarklin
                </Link>
            </div>
        </div>
    </>;
}
