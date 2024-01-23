import {PropsWithChildren} from "react";


export default function ContextsProvider({ children }: PropsWithChildren) {
    return <>
        {children}
    </>;
}
