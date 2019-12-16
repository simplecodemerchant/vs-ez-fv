import * as assert from 'assert'
import '../extensions/string.extension'
import * as Components from '../src/components'
import OneOffPointer from '../src/helpers/one_offs/one_offs'

type CellType = 'row' | 'col' | 'choice' | 'case'

const CellsTests = (cell: CellType, label: string) => {
    describe(`Make ${cell.toTitleCase()}s`, function() {

        describe(`Single ${cell.toTitleCase()}`, function() {

            it(`should return standard ${cell} with text as content`, function() {
                const Cell = new Components.CellConstructor(cell)
                assert.equal(Cell.run('Cell content'), `  <${cell} label="${label}1">Cell content</${cell}>`);
            });

            it(`should return standard ${cell} with text as content and assign a label if present`, function() {
                const Cell = new Components.CellConstructor(cell)
                assert.equal(Cell.run('3. Cell content'), `  <${cell} label="${label}3">Cell content</${cell}>`);
            });

            if (cell === 'row'){
                it('should return a row with open attributes if the text asks to specify', function(){
                    const Cell = new Components.CellConstructor(cell)
                    assert.equal(Cell.run('1. Other please specify'), `  <${cell} label="${label}1" open="1" openSize="25" randomize="0">Other please specify</${cell}>`)
                })
            }
            

        });

        describe(`Multiple ${cell.toTitleCase()}s`, function() {

            let CellText = 
`Cell 1    
Cell 2    
Cell 3`

            let CellTextCorrect = 
`  <${cell} label="${label}1">Cell 1</${cell}>
  <${cell} label="${label}2">Cell 2</${cell}>
  <${cell} label="${label}3">Cell 3</${cell}>`

            it(`should return standard ${cell}s split by newline with text as content`, function() {
                const Cell = new Components.CellConstructor(cell)
                assert.equal(Cell.run(CellText), CellTextCorrect);
            });

            CellText = 
`3. Cell 1    
2. Cell 2    
1. Cell 3`

            CellTextCorrect = 
`  <${cell} label="${label}3">Cell 1</${cell}>
  <${cell} label="${label}2">Cell 2</${cell}>
  <${cell} label="${label}1">Cell 3</${cell}>`

            it(`should return standard ${cell}s split by newline with text as content and match defined labels`, function() {
                const Cell = new Components.CellConstructor(cell)
                assert.equal(Cell.run(CellText), CellTextCorrect);
            });

        });
    });
}


// Cell Tests
CellsTests('row', 'r')
CellsTests('col', 'c')
CellsTests('choice', 'ch')


// Radio Tests
describe('Make Radio Question', function(){

    const Radio = new Components.QuestionConstructor('radio')

    let RadioText = 
`Q1 Radio question
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>`
    
    let RadioTextCorrect = 
`<radio label="Q1">
  <title>Radio question</title>
  <comment>Please select one</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</radio>`

    it('should return a radio question given a label, question text, and cells', function(){
        assert.equal(Radio.run(RadioText), RadioTextCorrect)
    })

    RadioText = 
`Q1 Radio question

new line
@c This is a comment
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>`
    
    RadioTextCorrect = 
`<radio label="Q1">
  <title>Radio question
<br/><br/>
new line</title>
  <comment>This is a comment</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</radio>`

    it('should return a radio question and comment if @c is specified ', function(){
        assert.equal(Radio.run(RadioText), RadioTextCorrect)
    })
})


// Checkbox Tests
describe('Make Checkbox Question', function(){

    const Checkbox = new Components.QuestionConstructor('checkbox')

    let CheckboxText = 
`Q1 Checkbox question
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>`
    
    let CheckboxTextCorrect = 
`<checkbox label="Q1" atleast="1">
  <title>Checkbox question</title>
  <comment>Please select all that apply</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</checkbox>`

    it('should return a checkbox question given a label, question text, and cells', function(){
        assert.equal(Checkbox.run(CheckboxText), CheckboxTextCorrect)
    })
})


// Select Tests
describe('Make Select Question', function(){

    const Checkbox = new Components.QuestionConstructor('select')

    let SelectText = 
`Q1 Select question
  <choice label="ch1">Cell 1</choice>
  <choice label="ch2">Cell 2</choice>
  <choice label="ch3">Cell 3</choice>
  <choice label="ch4">Cell 4</choice>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>`
    
    let SelectTextCorrect = 
`<select label="Q1" optional="0">
  <title>Select question</title>
  <comment>Please select one in each row</comment>
  <choice label="ch1">Cell 1</choice>
  <choice label="ch2">Cell 2</choice>
  <choice label="ch3">Cell 3</choice>
  <choice label="ch4">Cell 4</choice>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</select>`

    it('should return a select question given a label, question text, and cells', function(){
        assert.equal(Checkbox.run(SelectText), SelectTextCorrect)
    })
})

describe('Make Pipe', function(){

    const Pipe = new OneOffPointer('pipe')
    
    let PipeText = 
`Cell 1
Cell 2
Cell 3`

    let PipeTextCorrect = 
`<pipe label="" capture="">
  <case label="c1" cond="">Cell 1</case>
  <case label="c2" cond="">Cell 2</case>
  <case label="c3" cond="">Cell 3</case>
  <case label="c999" cond="1">BAD PIPE</case>
</pipe>`

    it('should return pipe given options', function(){
        assert.equal(Pipe.run(PipeText), PipeTextCorrect)
    })
})

// Strip test
describe('Strip tags', function(){
    const Strip = new OneOffPointer('strip')

    let StripText = 
`  <row label="r1">1</row>
<col label="c2">2</col>
            <choice label="ch3">3</choice>
`

    let StripTextCorrect =
`1
2
3`

    it('should remove all cell tags', function(){
        assert.equal(Strip.run(StripText), StripTextCorrect)
    })
})