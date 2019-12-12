
export default function StripTag(input) {
    const find_label = /(<.*? label=".*?"[^>]*>)([^]*?)(<\/.*?>)/ig;

    return input.replace(/(\s*<.*? label=".*?"[^>]*>)([^]*?)(<\/.*?>\s*)/ig, "$2\n");

}