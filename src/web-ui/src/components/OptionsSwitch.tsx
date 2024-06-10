import type {LucideIcon} from "lucide-react";

type Option<T> = {
    key: T
    text: string
    icon?: LucideIcon
}

interface Props<T> {
    current: NoInfer<T>
    options: Array<Option<T>>
    onSwitch: (v: NoInfer<T>) => void
}


export default function OptionSwitch<T>(props: Props<T>) {
    const cellWidth = 1 / props.options.length;

    return <div className="relative flex w-full gap-1 py-px overflow-hidden bg-primary-light/75 rounded-xl justify-evenly isolate">
        <div
            className="absolute inset-y-0 bg-accent/50 transition-[left] duration-300 -z-10"
            style={{
                width: `${cellWidth * 100}%`,
                left: `${cellWidth * props.options.findIndex(opt => opt.key === props.current) * 100}%`,
            }}
        />
        {props.options.map(opt =>
            <button key={opt.key as never} className="w-full flex justify-center gap-x-1 font-bold" onClick={() => props.onSwitch(opt.key)}>
                {opt.icon !== undefined && <div className="grid place-content-center">
                    <opt.icon className="size-5" />
                </div>}
                {opt.text}
            </button>,
        )}
    </div>;
}
