[Github](https://github.com/matt92martin/vs-ez-fv)

Shortcuts
=========
<br/>

### Cells
_____

Each of the cell shortcuts are given this string:
```
1
2
3
```


**ctrl + 1** - Create Row Cell

```xml
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
```

**ctrl + 2** - Create Column Cell

```xml
  <col label="c1">1</col>
  <col label="c2">2</col>
  <col label="c3">3</col>
```

**ctrl + 3** - Create Choice Cell

```xml
  <choice label="ch1">1</choice>
  <choice label="ch2">2</choice>
  <choice label="ch3">3</choice>
```

**ctrl + 4** - Create Pipe
```xml
<pipe
  label=""
  capture="">
  <case label="r1" cond="">1</case>
  <case label="r2" cond="">2</case>
  <case label="r3" cond="">3</case>
  <case label="r4" cond="1">UNDEFINED</case>
</pipe>
```

**ctrl + 5** - Create Group
```xml
  <group label="g1">1</group>
  <group label="g2">2</group>
  <group label="g3">3</group>
```
<br/>

### Questions
_____

Questions below are given this text:
```
Q1 This is question text
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
```

**ctrl + r** - Create Radio Question

```xml
<radio label="Q1">
  <title>This is question text</title>
  <comment>Select one</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</radio>
<suspend/>
```

**ctrl + shift + c** - Create Checkbox Question
```xml
<checkbox label="Q1" atleast="1">
  <title>This is question text</title>
  <comment>Select all that apply</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</checkbox>
<suspend/>
```

**ctrl + shift + n** - Create Number Question
```xml
<number label="Q1" size="3" optional="0">
  <title>This is question text</title>
  <comment>Please enter a whole number</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</number>
<suspend/>
```

**ctrl + shift + e f** - Create Float Question
```xml 
<float label="Q1" size="3" optional="0">
  <title>This is question text</title>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</float>
<suspend/>

```

**ctrl + shift + e s** - Create Select Question
```xml
<!-- Choices had to be inserted for this example -->
<select label="Q1" optional="0">
  <title>This is question text</title>  
  <choice label="ch1">1</choice>
  <choice label="ch2">2</choice>
  <choice label="ch3">3</choice>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</select>
<suspend/>
```

**ctrl + shift + e t** - Create Text Question
```xml 
<text label="Q1" size="40" optional="0">
  <title>This is question text</title>
  <comment>Please be as specific as possible</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</text>
<suspend/>
```
**ctrl + shift + e a** - Create Textarea Question
```xml
<textarea label="Q1" optional="0">
  <title>This is question text</title>
  <comment>Please be as specific as possible</comment>
  <row label="r1">1</row>
  <row label="r2">2</row>
  <row label="r3">3</row>
</textarea>
<suspend/>
```
<br/>

### Snippets
_____
**alt + s** - Displays valid snippets for current file type

**shift + alt + b** - Wraps selected text in `<b>` tags

**shift + alt + u** - Wraps selected text in `<u>` tags

**shift + alt + w** - Wraps selected text in blank tags 