export default function CleanText(input: string){
    
    let text = input.replace(/\n{2,}/g, '\n');

    // replace(u"\u2019", "'").
    // replace(u"\u2018", "'").
    // replace(u"\u201C", "\"").
    // replace(u"\u201D", "\"").
    // replace(u"\u2014", '&amp;mdash;').replace(u"\u2013", '&amp;ndash;')
    // re.sub('&\s', '&amp; ',input)
    
    return text;
}