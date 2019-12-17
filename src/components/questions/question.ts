import QuestionLabelConstructor from './question-label'

export default class QuestionConstructor {
    public type: string
    extra: string[] = []
    comment: string = ''

    constructor(type: string) {
        this.type = type
    }

    run(input: string) {
        const question = QuestionLabelConstructor(input)

        if (!question) {
            return false
        }

        switch (this.type) {
            case 'checkbox':
                this.extra = ['atleast="1"', ...this.extra]
                this.comment = 'Please select all that apply'
                let new_cells = question.question_cells
                    .split(/\n/)
                    .map(line => {
                        let new_line
                        const test_dk = /none of the.*|not sure|don't know/i
                        if (/<row/.test(line) && test_dk.test(line)) {
                            new_line = line.replace(
                                /(\s*<row label=[^\>]*)/,
                                '$1 exclusive="1" randomize="0"'
                            )

                            return new_line
                        }
                        return line
                    })

                question.question_cells = new_cells.join('\n')
                break
            case 'float':
                this.extra = ['size="6"', 'optional="0"', ...this.extra]
                break
            case 'number':
                this.extra = ['size="6"', 'optional="0"', ...this.extra]
                this.comment = 'Please enter a whole number'
                break
            case 'radio':
                this.comment = 'Please select one'
                if (
                    question.question_cells.search(/<row/) !== -1 &&
                    question.question_cells.search(/<col|<choice/) !== -1
                ) {
                    this.comment = 'Please select one in each row'
                }
                break
            case 'select':
                this.extra = ['optional="0"', ...this.extra]
                this.comment = 'Please select one'
                if (
                    question.question_cells.search(/<row/) !== -1 &&
                    question.question_cells.search(/<choice/) !== -1
                ) {
                    this.comment = 'Please select one in each row'
                }
                break
            case 'text':
                this.extra = ['size="40"', 'optional="0"', ...this.extra]
                this.comment = 'Please be as specific as possible'
                break
            case 'textarea':
                this.extra = ['optional="0"', ...this.extra]
                this.comment = 'Please be as specific as possible'
                break
            default:
                break
        }

        if (question.question_comment) {
            this.comment = question.question_comment
                .trim()
                .replace(/^\(/g, '')
                .replace(/[\)\.]*\s*$/g, '')
        }

        if (this.comment !== '') {
            this.comment = `\n  <comment>${this.comment}</comment>`
        }

        if (this.extra.length) {
            this.extra = ['', ...this.extra]
        }

        let question_constructed = `<${this.type}
  label="${question.question_label}"${this.extra.join('\n  ')}>
  <title>${question.question_text}</title>${this.comment}${
            question.question_cells ? '\n  ' : ''
        }${question.question_cells}
</${this.type}>
<suspend/>`

        return question_constructed
    }
}
