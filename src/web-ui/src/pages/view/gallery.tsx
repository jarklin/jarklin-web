import {GalleryInfoEntry} from "~/hooks/useInfo/types.ts";
import {Navigate} from "react-router-dom";
import {encodePath} from "~/util";

interface Props {
    info: GalleryInfoEntry
}


export default function GalleryView({ info }: Props) {
    return <Navigate replace to={`/read/${encodePath(info.path)}`} />;
    // return <>
    //
    // </>;
}
