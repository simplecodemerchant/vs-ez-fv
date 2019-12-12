function matchArray( arr, reg ){
    let matches = [];

    for ( let str of arr ){
        let match = str.match( reg );

        if ( !match ){
            return false;
        }

        matches.push( match.slice(1) );

    }

    return matches;

}

export default function CellLabelConstructor(label, input){
    let matches;
    const input_rows = input.split(/\r\n|\r|\n/);

    const re1:RegExp = /(\d{1,4})(?:[\.\)\]]{1})\s*(.*)/;
    const reCatchAll:RegExp = /(.*)/

    if ( matches = matchArray( input_rows, re1 ) ){

        matches = matches.map( (el) => ({ label: `${label}${el[0]}`, content: el[1] }) );
        
    }
    else if ( matches = matchArray( input_rows, reCatchAll ) ){
        matches = matches.map( (el, idx) => ({ label: `${label}${idx+1}`, content: el[0] }) );
    }

    return matches;

}






