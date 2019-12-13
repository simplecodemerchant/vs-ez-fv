

export default function QuestionLabelConstructor(input: string){
    
    const search_for_cells = /<row|<col|<choice|<style|<group|<net|<exec|<validate|\@([^c][^\s]*)/
    const search_for_comment = /\@c\s*/
    const search_for_question = /^(?:\[)*\s*([A-Za-z0-9_]+)\s*(?:\.|\]|\))*\s*([^]*)$/i
    
    let beginning_cells = input.search( search_for_cells )
    beginning_cells = ( beginning_cells === -1 ) ? input.length : beginning_cells

    let question = input.substr( 0, beginning_cells )

    let question_cells = input.substr( beginning_cells )
    
    const question_list = question.split(search_for_comment)
    
    let question_comment = question_list.slice(1)[0]
    question = question_list.slice(0)[0].trim().replace(/[\n\r]{1,}/g, '\n<br/><br/>\n')


    let matches = question.match(search_for_question)


    if ( !matches ){ return false }


    const question_label = matches[1]
    const question_text = matches[2]

    return {
        question_cells: question_cells,
        question_label: question_label.trim(),
        question_text:  question_text.trim(),
        question_comment: question_comment
    }
}