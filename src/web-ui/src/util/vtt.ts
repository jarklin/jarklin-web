

export class VttCreator {
    counter: number
    lines: string[]

    constructor() {
        this.counter = 0;
        this.lines = ['WEBVTT - generated'];
    }

    add(from: number, to: number, lines: string | string[], settings?: string) {
        this.counter++;
        this.lines.push(
            "",
            `${this.counter}`,
            `${secondsToTime(from)} --> ${secondsToTime(to)} ${settings ?? ""}`,
            ...(Array.isArray(lines) ? lines : [lines]),
        )
    }

    toString() {
        return this.lines.join('\r\n');
    }
}


function secondsToTime(sec: number) {
    const seconds = (sec % 60);
    const minutes = Math.floor(sec / 60) % 60;
    const hours = Math.floor(sec / 60 / 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toFixed(3).padStart(6, '0')}`;
}
