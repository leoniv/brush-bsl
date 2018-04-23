var BrushBase = require('brush-base');
var regexLib = require('syntaxhighlighter-regex').commonRegExp;

function Brush() {
 var keywords = 'КонецПроцедуры EndProcedure КонецФункции EndFunction'+
                ' Прервать Break Продолжить Continue' +
                ' Возврат Return Если If' +
                ' Иначе Else ИначеЕсли ElsIf' +
                ' Тогда Then КонецЕсли EndIf' +
                ' Попытка Try Исключение Except' +
                ' КонецПопытки EndTry Raise ВызватьИсключение' +
                ' Пока While Для For' +
                ' Каждого Each Из In' +
                ' По To Цикл Do' +
                ' КонецЦикла EndDo НЕ NOT' +
                ' И AND ИЛИ OR' +
                ' Новый New Процедура Procedure' +
                ' Функция Function Перем Var' +
                ' Экспорт Export Знач Val'

  var builds = 'Неопределено Undefined Истина True Ложь False NULL'

  // \b - word boundary doesn't work with utf-8
  this.getKeywordsUTF8 = function(str){
    const results = str
      .replace(/^\s+|\s+$/g, '')
      .replace(/\s+/g, '|');

    const _b = '[^0-9a-zA-Zа-яА-Я\.#&()]|=|^|$'
    return "("+_b+")(?:"+results+")(?:"+_b+")"
  }

  this.regexList = [
    {
      regex: regexLib.singleLineCComments,
      css: 'comments'
    },
    {
      regex: /("|^\s*\|)((?!\"\").)*?(\"|$)/gm,
      css: 'string'
    },
    {
      regex: /^\s*(#|&).+/gm,
      css: 'preprocessor'
    },
    {
      regex: /'.+'/g,
      css: 'value'
    },
    {
      regex: /-?\b[\d\.]+\b/g,
      css: 'value'
    },
    {
      regex: new RegExp(this.getKeywordsUTF8(keywords), 'gmi'),
      css: 'keyword bold'
    },
    {
      regex: new RegExp(this.getKeywordsUTF8(builds), 'gmi'),
      css: 'value bold'
    }
    ];
};

Brush.prototype = new BrushBase();
Brush.aliases = ['bsl', 'oscript'];
module.exports = Brush;
