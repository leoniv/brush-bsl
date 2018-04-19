var BrushBase = require('brush-base');
var regexLib = require('syntaxhighlighter-regex').commonRegExp;

function Brush() {
  var keywords =

  this.regexList = [
    {
      regex: /\(\*[\s\S]*?\*\)/gm,
      css: 'comments'
    },
    {
      regex: /{(?!\$)[\s\S]*?}/gm,
      css: 'comments'
    },
    {
      regex: regexLib.singleLineCComments,
      css: 'comments'
    },
    {
      regex: regexLib.singleQuotedString,
      css: 'string'
    },
    {
      regex: /\{\$[a-zA-Z]+ .+\}/g,
      css: 'color1'
    },
    {
      regex: /\b[\d\.]+\b/g,
      css: 'value'
    },
    {
      regex: /\$[a-zA-Z0-9]+\b/g,
      css: 'value'
    },
    {
      regex: new RegExp(this.getKeywords(keywords), 'gmi'),
      css: 'keyword'
    }
		];
};

Brush.prototype = new BrushBase();
Brush.aliases = ['delphi', 'pascal', 'pas'];
module.exports = Brush;
