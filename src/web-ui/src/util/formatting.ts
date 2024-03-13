
const videoResolutionMap: Record<number, string> = {
    480: "SD",
    720: "HD",
    1080: "Full-HD",
    1440: "2k",
    2160: "Ultra HD",
    4320: "Full Ultra HD",
}


export function height2resolution(height: number): string {
    const closest = Object
        .keys(videoResolutionMap)
        .map(res => +res)
        .reduce((prev, curr) => (
            (Math.abs(curr - height) < Math.abs(prev - height)) ? curr : prev
        ))
    return videoResolutionMap[closest];
}
