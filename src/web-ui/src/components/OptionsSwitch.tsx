import {LucideIcon} from "lucide-react";

type Option<T> = {
    key: T
    text: string
    icon?: LucideIcon
}

interface Props<T> {
    current: T
    options: Option<T>[]
    onSwitch: (v: T) => void
}


export default function OptionSwitch<T>(props: Props<T>) {
    const wf = 1 / props.options.length; // width-factor
    return <div className="relative flex w-full gap-1 py-px overflow-hidden bg-primary-light rounded-xl bg-opacity-70 justify-evenly isolate">
        <div
            className="absolute inset-y-0 bg-accent transition-[left] duration-300 -z-10"
            style={{
                width: `${wf * 100}%`, left: `${wf * props.options.findIndex(el => el.key === props.current) * 100}%`
            }}
        />
        {props.options.map(opt =>
            <button key={opt.key as never} className="w-full" onClick={() => props.onSwitch(opt.key)}>
                {opt.icon !== undefined && <opt.icon className="inline h-5 mr-1" />}
                {opt.text}
            </button>,
        )}
    </div>;
}
