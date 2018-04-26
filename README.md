[![Build Status](https://travis-ci.org/leoniv/brush-bsl.svg?branch=master)](https://travis-ci.org/leoniv/brush-bsl)

# brush-bsl

[1C:Enterprise](http://1c.ru) builtin lang aka *bsl* brush module for
[SyntaxHighlighter](https://github.com/syntaxhighlighter/syntaxhighlighter).

## Regards!

 and thanks to developers of projects:

 - [SyntaxHighlighter](https://github.com/syntaxhighlighter)
 - [xDrivenDevelopment/1c-syntax](https://github.com/xDrivenDevelopment/1c-syntax)

## Usage

### For [SyntaxHighlighter v3](http://alexgorbatchev.com/SyntaxHighlighter/)

Use pure js file [brush-dsl-v3.js](brush.v3/brush-bsl-v3.js)

Demo [index.html](brush.v3/index.html). For looking clone and open in your
favorite web browser:

    $git clone https://github.com/leoniv/brush-bsl
    $cd brush-bsl
    $firefox brush.v3/index.html

### For SyntaxHighlighter v4

Please see [Building Instructions](https://github.com/syntaxhighlighter/syntaxhighlighter/wiki/Building)
on the [SyntaxHighlighter Wiki](https://github.com/syntaxhighlighter/syntaxhighlighter/wiki) for details.

## Troubles

1. Regexp \b word boundary does not work for non ASCII characters in browser
and some keywords highlights not correctly.

2. Errors occurred while [brash.js](branch.js) building.

## License

MIT
