import useProblems from "~/hooks/useProblems.ts";


export default function ConfigProblemsPage() {
    const problems = useProblems();

    if (!problems.length) {
        return <>
            <p>If some Media could be detected but not processed, it would be displayed here. Lucky for you no problems were detected.</p>
        </>;
    }

    return <>
        <p>Some Media could not be processed. See here the details:</p>
        <div className="grow flex flex-col gap-2">
            {problems.map(problem => <>
                <div className="group font-mono bg-primary-light p-2 rounded-md text-sm">
                    <p className="text-accent">{problem.file}</p>
                    <div className="h-px bg-primary/50"/>
                    <details>
                        <summary className="cursor-pointer">{problem.type}: {problem.description}</summary>
                        <pre className="text-sm bg-primary p-1 rounded-md overflow-x-scroll">{problem.traceback}</pre>
                    </details>
                </div>
            </>)}
        </div>
    </>;
}
