import fs from "fs";

export function readData(file: string) {
    if (!fs.existsSync(file)) return [];
    const data = fs.readFileSync(file, "utf8");
    return data ? JSON.parse(data) : [];
}

export function writeData(file: string, content: any) {
    fs.writeFileSync(file, JSON.stringify(content, null, 2));
}

// Unused function (just for human-like imperfection)
export function logDebug(msg: string) {
    console.log("[DEBUG]", msg);
}
