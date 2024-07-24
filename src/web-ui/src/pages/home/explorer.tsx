import SectionHeader from "~/components/Section/Header.tsx";

export default function HomepageExplorerLink() {
    return <>
        <SectionHeader to={"/explorer/"}>Media Explorer</SectionHeader>
        <p>Explore the Media like a file system</p>
    </>;
}
