import useInfo from "~/hooks/useInfo.ts";
import {useMemo, useState} from "react";
import CardGrid from "~/components/CardGrid.tsx";
import useDebounce from "~/hooks/useDebounce.ts";
import InfoCard from "~/components/InfoCard";
import {encodePath} from "~/util";
import {Link} from "react-router-dom";


export default function SearchPage() {
    const [inputValue, setInputValue] = useState("");
    const rawEntries = useInfo();
    const query = useDebounce(inputValue.trim().toLowerCase(), 300);

    const validEntries = useMemo(() => {
        if (query.length < 3) {
            return [];
        }
        return rawEntries.data!
            .map((entry) => {
                const name = entry.name.toLowerCase();
                let score: number = 0;
                let pos = 0;
                for (let n = 0; n < query.length; n++) {
                    const character = query.charAt(n);
                    const nextPos = name.indexOf(character, pos);
                    if (nextPos === -1) {
                        break;
                    } else {
                        score++;
                        score -= (nextPos - pos) / 100;
                        pos = nextPos;
                    }
                }
                return {
                    value: entry,
                    score: score,
                }
            })
            .filter(element => element.score >= (query.length / 2))
            .sort((a, b) => b.score - a.score)
            .map(element => element.value)
    }, [rawEntries.data, query]);

    return <>
        <div className="w-full p-3 relative">
            <input
                type="search"
                className="block w-full max-w-screen-lg mx-auto px-1 py-px text-black rounded-md"
                placeholder="query"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
        </div>
        {!validEntries.length ? <>
            <p className="text-center text-xl">No entries found</p>
        </> : <>
            <CardGrid>
                {validEntries.map(entry => <>
                    <Link key={entry.path} to={`/view/${encodePath(entry.path)}`}>
                        <InfoCard key={entry.path} info={entry} />
                    </Link>
                </>)}
            </CardGrid>
        </>}
    </>;
}
