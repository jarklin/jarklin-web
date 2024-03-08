import {useQuery} from "react-query";
import axios from "axios";
import {useMemo} from "react";
import type {InfoEntry, RawInfoEntry} from "~/types";
import {extractTags} from "~/util";
import humanize from "humanize-plus";


export default function useInfo(): InfoEntry[] {
    const query = useQuery(
        [".jarklin", "info.json"],
        ({ signal }) => axios
            .get<RawInfoEntry[]>("/files/.jarklin/info.json", { signal })
            .then(r => r.data),
        { refetchOnMount: false, suspense: true },
    );

    const raw = query.data!;

    return useMemo(() => raw.map((entry) => <InfoEntry>{
        ...entry,
        type: entry.meta.type,
        displayName: humanize.capitalizeAll(entry.name),
        tags: extractTags(entry.path),
    }), [raw]);
}
