
export function username2initials(username: string) {
    return Array.from(username.matchAll(/\b\w/g)).join("").toUpperCase();
}

export function createAvatar(name: string, backgroundColor?: string, foregroundColor?: string) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    canvas.width = 200;
    canvas.height = 200;

    // Draw background
    context.fillStyle = backgroundColor ?? "transparent";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    context.font = "bold 100px Assistant";
    context.fillStyle = foregroundColor ?? "white";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(username2initials(name), canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/png");
}
