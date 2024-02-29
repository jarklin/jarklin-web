import {useQuery} from "react-query";
import axios from "axios";
import {useMemo} from "react";
import {InfoEntry, RawInfoEntry} from "./types.ts";
import {extractTags} from "~/util";
import humanize from "humanize-plus";


export default function useInfo(): Array<InfoEntry> {
    const query = useQuery(
        [".jarklin", "info.json"],
        ({ signal }) => axios
            .get<Array<RawInfoEntry>>("/files/.jarklin/info.json", { signal })
            .then(r => r.data),
        { refetchOnMount: false, suspense: true },
    );

    const raw = query.data!;

    return useMemo(() => raw.map((entry) => {
        return <InfoEntry>{
            ...entry,
            type: entry.meta.type,
            displayName: humanize.capitalizeAll(entry.name),
            tags: extractTags(entry.path),
        };
    }), [raw]);
}
