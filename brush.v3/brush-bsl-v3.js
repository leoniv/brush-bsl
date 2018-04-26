/**
 * Brush http://github.com/leoniv/brush-bsl
 * for SyntaxHighlighter http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 * Copyright (C) 2018 Leonid Vlasov.
 *
 * Dual licensed under the MIT and GPL licenses.
 */
;;(function()
{
  typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

  function Brush()
  {
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

    var r = SyntaxHighlighter.regexLib;

    this.getKeywordsUTF8 = function(str){
      const results = str
        .replace(/^\s+|\s+$/g, '')
        .replace(/\s+/g, '|');

      const _b = '[^a-zA-Zа-яА-Я\.#&\(\)]'
      return "(^|"+_b+"|=)?(?:"+results+")(?:"+_b+"|;|$)"
    }

    this.regexList = [
      { regex: r.singleLineCComments, css: 'comments' },
      { regex: /("|^\s*\|)((?!\"\").)*?(\"|$)/gm, css: 'string' },
      { regex: /^\s*(#|&).+/gm, css: 'preprocessor' },
      { regex: /'.+'/g, css: 'value' },
      { regex: /-?[\d\.]+\b/g, css: 'value' },
      { regex: new RegExp(this.getKeywordsUTF8(keywords), 'gmi'), css: 'keyword' },
      { regex: new RegExp(this.getKeywordsUTF8(builds), 'gmi'), css: 'value bold' }
      ];

    this.forHtmlScript(r.scriptScriptTags);
  };

  Brush.prototype  = new SyntaxHighlighter.Highlighter();
  Brush.aliases  = ['bsl'];

  SyntaxHighlighter.brushes.JScript = Brush;

  typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
