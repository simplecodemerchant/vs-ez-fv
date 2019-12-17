# Change Log
All notable changes to this project will be documented in this file.

## [0.3.4]
### Added
- Image tag
- No answer cell
- HTML structure


## [0.3.3]
### Added
- Ability to `switch` between `<row>` and `<col>` cells
- Added `<group>` cells
- Added `<survey>` structure
- Added `<comment>` structure

### Updated
- Questions to adhere to programming standards
- Input cleaning (Unicode, `&`, etc.)
- `<pipe>` now repositions the cursor after it is inserted

## [0.3.1]
### Fixes
- Added `<suspend/>` to the end of questions

### Update
- Readme
- Tests

## [0.3.0]
### Added 
- Tests for all functions

### Fixes
- Fixed the regex on the tag strip function
- Updated the spacing for questions without rows

## [0.2.0]
### Added
- Insert numbers( or letters) in order at each cursor

### Updated
- Updated workflow for easier development
- More specific Typing

### Fixes
- Fixed an issue where cells were not being constructed
- Pipes should now work
- Fixed an issue where question labels were stripped of numbers