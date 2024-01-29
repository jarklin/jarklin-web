import {PropsWithChildren} from "react";

export default function CardGrid(props: PropsWithChildren) {
    return <div className="grid gap-3 px-2 py-1 justify-evenly" style={{gridTemplateColumns: "repeat(auto-fill, minmax(min(95vw, 250px), 1fr))"}}>
        {props.children}
    </div>;
}
