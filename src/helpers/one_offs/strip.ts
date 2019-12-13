
export default function StripTag(input: string) {
    const find_label = /(<.*? label=".*?"[^>]*>)([^]*?)(<\/.*?>)/ig;

    return input.replace(/(\s*<.*? label=".*?"[^>]*>)([^]*?)(<\/.*?>\s*)/ig, "$2\n");

}