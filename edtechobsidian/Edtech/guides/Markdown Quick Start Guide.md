![[Markdown Quick Start Guide.png | 600x1000]]

## Overview
- Introduction
- Basic Markdown Formatting
- Tables
- Lists
- Sub Superscript
- Extra Features
- Footnotes

<div style="page-break-after: always;"></div>

## Introduction

Hey there!

Here's a Markdown cheat sheet to get you started using Markdown right away.

Markdown is a lightweight markup language developed to format plain text. *It's not a replacement for a full-on editor.* It merely marks up the text. This guide you're reading was actually written in Markdown in a plaintext file later exported to a PDF actually.

Because at the end of the day, too much editing gets in the way of *actually writing.* That's why Markdown is simple, lightweight, and can be read across multiple applications like Obsidian, Vim, Ghostwriter, A1 Writer, Bear, Notepad++ (plugin required), etc.


## Basic Markdown Formatting
Here are the basic Markdown formatting to learn right away. These will be the main ways you edit your markdown file.

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

Line Divider:

---

*Italics*

**Bold**

> Block Quote

- Bullet Point
	- Sub Bullet Point

==Highlight==

![image example](images/logo.png)

**⬇️ You can also reference images like this in Obsidian.**
![[logo.png]]

```
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

Line Divider:

---

*Italics*

**Bold**

> Block Quote

- Bullet Point
	- Sub Bullet Point

==Highlight==

![image example](images/logo.png)

**⬇️ You can also reference images like this in Obsidian.**
![[logo.png]]

```

See? That's not a lot! 

If you're used to HTML or use Discord, you're probably already familiar with italics and bold formatting. The following Markdown formats are more advanced, but still pretty simple. You'll likely use some in your own note-taking journey. Even if you don't use Obsidian, these are still useful Markdown formats to know.


## Tables

This is a table in Markdown.

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

Which looks like this in Markdown language:

```
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
```

**Note:** You don't need to add that many dashes in your divider. --- is enough to tell Markdown to format this as a table. It's for human readability that extra dashes are added, but know that they're optional.

You can align cell contents with syntax...

| Left Aligned  | Center Aligned  | Right Aligned |
|:------------- |:---------------:| -------------:|
| col 3 is      | some wordy text |         $1600 |
| col 2 is      | centered        |           $12 |
| zebra stripes | are neat        |            $1 |

...like this:
```
| Left Aligned  | Center Aligned  | Right Aligned |
|:------------- |:---------------:| -------------:|
| col 3 is      | some wordy text |         $1600 |
| col 2 is      | centered        |           $12 |
| zebra stripes | are neat        |            $1 |
```


## Lists

There are three types of list you can format in Markdown: unordered lists, ordered lists, and task lists.


### Unordered Lists
Here's an unordered list:

- Item
- Item 
	- Subitem
- Item

Which looks identical to its plaintext form:
```
- Item
- Item 
	- Subitem
- Item
```

### Ordered Lists
Here's an ordered list:

1. Item
2. Item
3. Item
	1. Subitem
4. Item

Which looks exactly the same as plaintext:
```
1. Item
2. Item
3. Item
	1. Subitem
4. Item
```

### Task Lists
You can create open/closed lists like this:

- [x] Task 1
- [ ] Task 2
  - [ ] Subtask 

Code Snippet:

```
- [x] Task 1
- [ ] Task 2
  - [ ] Subtask 
```


## Sub/Superscript

To do some basic subscripts or superscripts, just insert the number, word, letter in between ```<sub> </sub>``` or ```<sup> </sup>``` to enable this formatting in Markdown.

### Subscript

: <sub>subscript</sub> content example.
: H<sub>2</sub>O

Code Snippet:
```
Subscript
: <sub>subscript</sub> content example.
: H<sub>2</sub>O
```

### Superscript

: <sup>superscript</sup> content example.
: x<sup>2</sup>

Code Snippet:
```
Superscript
: <sup>superscript</sup> content example.
: x<sup>2</sup>
```


## Extra Features

Not all these features will work depending on the Markdown editor. That's why they get their own section since everything else will work.

## Hyperlinking within Markdown

### Obsidian
In Obsidian, and in other Markdown edtiors, you can create hyperlinks to other notes by using square brackets ```[[]]```. To hyperlink *within* a note, simply add ```#``` in between the brackets like so ```[[#In-Note Hyperlink]]``` to link into your header topics within a note.

```
Example-Note.md

Index

Within Example-Note hyperlinking within the note.

- [[#Chapter 1]]
- [[#Chapter 2]]
```

```
Example-Note-2.md

Topic Notes

- [[Math Notes]]
- [[Physics Notes]]
- [[Chemistry Notes]]
```
**Note:** Currently, Obsidian can't export embedded hyperlinks to PDFs.


### Notepad++
In Notepad++, and other Markdown editors, you can only create hyperlinks within the note and the formatting is different from what would on Obsidian or other similar apps. Test and see which formatting your editor works with and adjust your formatting according.

```
Example-Note-3.md

Index

- [Header title](#id)
- [Header title 2](#id2)
- [Conclusion](#id3)

# <a href="#id"> Header title </a> 

Insert notes here.
Insert additional notes.

# <a href="#id2"> Header title 2 </a>

Insert notes here. Insert comment.
Insert additional notes.
Final argument.
<a href="#id3"> Conclusion. </a>

```

**Note**: ```id``` and ```id2``` can be anything as long as you remember what  goes with what reference. This isn't exlusive to just header titles, you can also hyper link text.


### Line Breaks

This only really matters if you're exporting a Markdown file to PDF. 

Insert this code snippet after the line you want to break for PDF exporting.
```
<div style="page-break-after: always;"></div>
```


## Footnotes

Here's a simple footnote, [^1] and here's the second one.[^2]

[^1]: This is the first footnote.

[^2]: And here's the second footnote. You're not limited to numbers for your footnotes. You can also use words as long as it follows the ^ notation properly.

```
Here's a simple footnote, [^1] and here's the second one.[^2]

[^1]: This is the first footnote.

[^2]: And here's the second footnote. You're not limited to numbers for your footnotes. You can also use words as long as it follows the ^ notation properly.

```