import * as assert from 'assert'
import '../extensions/string.extension'
import * as Components from '../src/components'

type CellType = 'row' | 'col' | 'choice' | 'case'

const CellsTests = (cell: CellType, label: string) => {
    describe(`Make ${cell.toTitleCase()}s`, function() {

        const Cell = new Components.CellConstructor(cell)

        describe(`Single ${cell.toTitleCase()}`, function() {

            it(`should return standard ${cell} with text as content`, function() {
                assert.equal(Cell.run('Cell content'), `  <${cell} label="${label}1">Cell content</${cell}>`);
            });

            it(`should return standard ${cell} with text as content and assign a label if present`, function() {
                assert.equal(Cell.run('3. Cell content'), `  <${cell} label="${label}3">Cell content</${cell}>`);
            });

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
            assert.equal(Cell.run(CellText), CellTextCorrect);
        });

        });
    });
}



CellsTests('row', 'r')
CellsTests('col', 'c')
CellsTests('choice', 'ch')

describe('Make Radio Question', function(){
    it('should return a radio question given a label, question text, and cells', function(){
        const Radio = new Components.QuestionConstructor('radio')

        const RadioText = 
`Q1 Radio question
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>`

        const RadioTextCorrect = 
`<radio label="Q1">
  <title>Radio question</title>
  <comment>Please select one</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</radio>`

        assert.equal(Radio.run(RadioText), RadioTextCorrect)
    })
})



describe('Make Checkbox Question', function(){
    it('should return a checkbox question given a label, question text, and cells', function(){
        const Checkbox = new Components.QuestionConstructor('checkbox')
        
        const CheckboxText = 
`Q1 Checkbox question
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>`

        const CheckboxTextCorrect = 
`<checkbox label="Q1" atleast="1">
  <title>Checkbox question</title>
  <comment>Please select all that apply</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</checkbox>`

        assert.equal(Checkbox.run(CheckboxText), CheckboxTextCorrect)
    })
})