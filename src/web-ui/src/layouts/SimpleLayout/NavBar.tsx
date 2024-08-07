import jarklinIconSrc from "~/assets/jarklin.svg";


export default function PageNavBar() {
    return <>
        <header className="bg-primary-light p-1 flex gap-2 items-stretch content-baseline">
            <img className="h-8 rounded-md" src={jarklinIconSrc} alt="" />
            <div className="grow" />
        </header>
    </>;
}
