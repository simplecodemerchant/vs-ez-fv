import * as assert from 'assert'
import '../extensions/string.extension'
import * as Components from '../src/components'
import OneOffPointer from '../src/helpers/one_offs/one_offs'
import Switch from '../src/components/utils/switch'
import Image from '../src/components/cells/image'


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
`<radio
  label="Q1">
  <title>Radio question</title>
  <comment>Please select one</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</radio>
<suspend/>`

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
`<radio
  label="Q1">
  <title>Radio question
<br/><br/>
new line</title>
  <comment>This is a comment</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</radio>
<suspend/>`

    it('should return a radio question and comment if @c is specified ', function(){
        assert.equal(Radio.run(RadioText), RadioTextCorrect)
    })

    RadioText = 
`Q1 Radio question

new line
<comment>This is a comment</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>`
    
    RadioTextCorrect = 
`<radio
  label="Q1">
  <title>Radio question
<br/><br/>
new line</title>
  <comment>This is a comment</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</radio>
<suspend/>`

    it('should return a radio question and comment if <comment> is specified ', function(){
        const Radio = new Components.QuestionConstructor('radio')
        assert.equal(Radio.run(RadioText), RadioTextCorrect)
    })
})


// Checkbox Tests
describe('Make Checkbox Question', function(){


    let CheckboxText = 
`Q1 Checkbox question
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>`
    
    let CheckboxTextCorrect = 
`<checkbox
  label="Q1"
  atleast="1">
  <title>Checkbox question</title>
  <comment>Please select all that apply</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</checkbox>
<suspend/>`

    it('should return a checkbox question given a label, question text, and cells', function(){
        const Checkbox = new Components.QuestionConstructor('checkbox')
        assert.equal(Checkbox.run(CheckboxText), CheckboxTextCorrect)
    })

    CheckboxText = 
`Q1 Checkbox question
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r99">Don't know</row>`
        
    CheckboxTextCorrect = 
`<checkbox
  label="Q1"
  atleast="1">
  <title>Checkbox question</title>
  <comment>Please select all that apply</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r99" exclusive="1" randomize="0">Don't know</row>
</checkbox>
<suspend/>`

    it(`should include exclusive row if Don't know, etc. is in row`, function(){
        const Checkbox = new Components.QuestionConstructor('checkbox')
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
`<select
  label="Q1"
  optional="0">
  <title>Select question</title>
  <comment>Please select one in each row</comment>
  <choice label="ch1">Cell 1</choice>
  <choice label="ch2">Cell 2</choice>
  <choice label="ch3">Cell 3</choice>
  <choice label="ch4">Cell 4</choice>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</select>
<suspend/>`

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

// Float tests
describe('Make Float', function(){
    
    let FloatText = 
`Q1 Float Text`

    let FloatTextCorrect = 
`<float
  label="Q1"
  size="6"
  optional="0">
  <title>Float Text</title>
</float>`

    it('should make float if given label, question text', function(){
        const Float = new Components.QuestionConstructor('float')

        assert.equal(Float.run(FloatText), FloatTextCorrect)
    })

    FloatText = 
`Q1 Float Text
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
  `
    
        FloatTextCorrect = 
`<float
  label="Q1"
  size="6"
  optional="0">
  <title>Float Text</title>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</float>
<suspend/>`

    it('should make float if given label, question text, and cells', function(){
        const Float = new Components.QuestionConstructor('float')

        assert.equal(Float.run(FloatText), FloatTextCorrect)
    })
})

// Number Tests
describe('Make Number', function(){
        
    let NumberText = 
`Q1 Number Text`

    let NumberTextCorrect = 
`<number
  label="Q1"
  size="6"
  optional="0">
  <title>Number Text</title>
</number>
<suspend/>`

    it('should make number if given label, question text', function(){
        const Number = new Components.QuestionConstructor('number')

        assert.equal(Number.run(NumberText), NumberTextCorrect)
    })

    NumberText = 
`Q1 Number Text
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
  `
    
    NumberTextCorrect = 
`<number
  label="Q1"
  size="6"
  optional="0">
  <title>Number Text</title>
  <comment>Please enter a whole number</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</number>
<suspend/>`

    it('should make number if given label, question text, and cells', function(){
        const Number = new Components.QuestionConstructor('number')

        assert.equal(Number.run(NumberText), NumberTextCorrect)
    })
})

// Text Tests
describe('Make Text', function(){
        
    let TextText = 
`Q1 Text Text`

    let TextTextCorrect = 
`<text
  label="Q1"
  size="40"
  optional="0">
  <title>Text Text</title>
  <comment>Please be as specific as possible</comment>
</text>
<suspend/>`

    it('should make Text if given label, question text', function(){
        const Text = new Components.QuestionConstructor('text')

        assert.equal(Text.run(TextText), TextTextCorrect)
    })

    TextText = 
`Q1 Text Text
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
  `
    
    TextTextCorrect = 
`<text
  label="Q1"
  size="40"
  optional="0">
  <title>Text Text</title>
  <comment>Please be as specific as possible</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</text>
<suspend/>`

    it('should make Text if given label, question text, and cells', function(){
        const Text = new Components.QuestionConstructor('text')

        assert.equal(Text.run(TextText), TextTextCorrect)
    })
})


// TextArea Tests
describe('Make TextArea', function(){
        
    let TextAreaText = 
`Q1 TextArea Text`

    let TextAreaTextCorrect = 
`<textarea
  label="Q1"
  optional="0">
  <title>TextArea Text</title>
  <comment>Please be as specific as possible</comment>
</textarea>
<suspend/>`

    it('should make Text if given label, question text', function(){
        const TextArea = new Components.QuestionConstructor('textarea')

        assert.equal(TextArea.run(TextAreaText), TextAreaTextCorrect)
    })

    TextAreaText = 
`Q1 TextArea Text
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
  `
    
    TextAreaTextCorrect = 
`<textarea
  label="Q1"
  optional="0">
  <title>TextArea Text</title>
  <comment>Please be as specific as possible</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</textarea>
<suspend/>`

    it('should make Text if given label, question text, and cells', function(){
        const TextArea = new Components.QuestionConstructor('textarea')

        assert.equal(TextArea.run(TextAreaText), TextAreaTextCorrect)
    })
})

// Switch Cells Test
describe('Switch between Cols-Rows', function(){
    let Text = 
`  <row group="g1" label="r1">1</row>
<row label="r2">2</row> <row label="r3">3</row>
        <row label="r4" open="1" openSize="25" randomize="0">4</row>`

    let TextCorrect = 
`  <col group="g1" label="c1">1</col>
  <col label="c2">2</col>
  <col label="c3">3</col>
  <col label="c4" open="1" openSize="25" randomize="0">4</col>`

    it('should switch the row cells to col cells', function(){
        assert.equal(Switch.run(Text), TextCorrect)
    })
})

// Image Test
describe('Create image tags', function(){
    let Text = 
`  test1.jpg
test2.jpg

test3.jpg

`

    let TextCorrect = 
`<img src="[rel test1.jpg]" class="custom-img" />
<img src="[rel test2.jpg]" class="custom-img" />
<img src="[rel test3.jpg]" class="custom-img" />`

    it('should create image tags', function(){
        assert.equal(Image.run(Text), TextCorrect)
    })
})

// Noanswer Test
describe('Create Noanswer cells', function(){
    let Text = 
`1
2
3`

    let TextCorrect = 
`  <noanswer label="na1">1</noanswer>
  <noanswer label="na2">2</noanswer>
  <noanswer label="na3">3</noanswer>`

    it('should create image tags', function(){
        const NoAnswer = new Components.CellConstructor('noanswer')
        assert.equal(NoAnswer.run(Text), TextCorrect)
    })
})