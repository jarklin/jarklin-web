import {useQuery} from "react-query";
import axios from "axios";
import {useMemo} from "react";
import type {MediaEntry, RawMediaEntry} from "~/types";
import {extractTags} from "~/util";
import humanize from "humanize-plus";


export default function useMedia(): MediaEntry[] {
    const query = useQuery(
        [".jarklin", "media.json"],
        ({ signal }) => axios
            .get<RawMediaEntry[]>("/files/.jarklin/media.json", { signal })
            .then(r => r.data),
        { refetchOnMount: false, suspense: true },
    );

    const raw = query.data!;

    return useMemo(() => raw.map((entry) => <MediaEntry>{
        ...entry,
        type: entry.meta.type,
        displayName: humanize.capitalizeAll(entry.name),
        tags: extractTags(entry.path),
    }), [raw]);
}
