import {Link} from "react-router-dom";

export default function NotFound() {
    return <>
        <div className="h-full grid place-content-center text-center gap-1">
            <h1 className="text-4xl">404 Page Not Found</h1>
            <p>The requested URL was not found. If you entered the URL manually please check your spelling and try again.</p>
            <Link to="/" className="hover:underline text-accent text-xl">Homepage</Link>
        </div>
    </>;
}
