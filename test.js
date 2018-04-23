var chai = require('chai');
var expect = chai.expect;
var match = require('syntaxhighlighter-match');
var Brush = require('./brush');
var sample = require('fs').readFileSync('./sample.txt', 'utf8');

describe('brush-bsl', function() {

  var instance = null;

  before(function() {
    instance = new Brush();
  });

  it('has populated code sample', function() {
    expect(sample).to.not.match(/^Populate/);
  });

  describe('instance', function() {
    it('has `regexList`', function() {
      expect(instance).to.have.property('regexList');
    });
  });

  describe('parsing', function() {
    var matches = null;

    before(function() {
      matches = match.applyRegexList(sample, instance.regexList);
    });

    it('can parse', function() {
      expect(matches).to.have.length.above(0);
    });

    it('string parse', function() {
      var strs = matches.filter(function(m) {return m.css == 'string'})
        .map(function(m) {return m.value}).join("\n")
      expect(strs).to.equal('"текст с экраннированной "\n'
            +'" кавычкой"\n'
            +'"и конкатенаций"\n'
            +'""\n'
            +'"многострочная\n'
            +'      |строка\n'
            +'      |// а это нет\n'
            +'      |"\n'
            +'""\n'
            +'"ВЫБРАТЬ\n'
            +'    |  Таблица.Поле КАК Поле,\n'
            +'    |  МАКСИМУМ(Таблица.Поле2) КАК Поле2\n'
            +'    |ИЗ\n'
            +'    |  Таблица КАК Таблица\n'
            +'    |ГДЕ\n'
            +'    |  Таблица.Поле = 0\n'
            +'    |  И Таблица.Поле <> "\n'
            +'"Строка"\n'
            +'"\n'
            +'    |  И ВЫРАЗИТЬ(Таблица.Поле КАК СТРОКА) <> "\n'
            +'""\n'
            +'"\n'
            +'    |  И Таблица.Поле <> "\n'
            +'"Строка с экраннированной "\n'
            +'""\n'
            +'" кавычкой"\n'
            +'"\n'
            +'    |// Закомметированная строка внутри запроса с кавычками "\n'
            +'"ТЕКСТ"\n'
            +'"\n'
            +'    |СГРУППИРОВАТЬ ПО\n'
            +'    |  Поле\n'
            +'    |//АВТОУПОРЯДОЧИВАНИЕ"\n'
            +'"Some selected text"\n'
            +'"Литерал типа Дата: \'00010101\'"\n'
            +'"ТаблицаЗначений"\n'
            +'""')
    })

    it('comments parse',function() {
      var comments = matches.filter(function(m) {return m.css == 'comments'})
        .map(function(m){return m.value})

      comments.forEach(function(com) {
        expect(com).to.match(/^\s*\/\//)
      })
    })

    it('value parse', function() {
      var values = matches.filter(function(m) {return m.css == 'value'})
        .map(function(m){return m.value}).join("\n")

      expect(values).to.equal([ '0',
        '0.0',
        '100',
        '-100',
        '\'00010101000000\'',
        '\'00010101\'',
        '\'0001-01-01T00:00:00\'',
        '\'0001/01/01\'',
        '0',
        '0',
        '0',
        '0',
        '0' ].join("\n"))
    })

    it('preprocessor parse',function() {
      var preprocessor = matches.filter(function(m) {return m.css == 'preprocessor'})
        .map(function(m){return m.value})

      preprocessor.forEach(function(com) {
        expect(com).to.match(/^\s*(#|&)/)
      })
    })

    it ('keyword parse', function() {
      var keywords = matches.filter(function(m) {return m.css == 'keyword bold'})
        .map(function(m){return m.value})
      expect(keywords.join(" ")).to.equal(
          [ '\nПерем ',
            ' Экспорт;',
            '\nПерем ',
            '\nПерем ',
            ' Экспорт,',
            '\nПерем ',
            ' Экспорт;',
            '\nПерем ',
            ' Экспорт,',
            ' Экспорт;',
            '\nПроцедура ',
            ' Знач ',
            ' Экспорт\n',
            ' Если ',
            ' И ',
            ' Тогда\n',
            ' Иначе\n',
            ' КонецЕсли;',
            ' Пока ',
            ' Цикл\n',
            ' Прервать;',
            ' КонецЦикла;',
            ' Новый ',
            ' Новый(',
            ' Если ',
            ' Тогда\n',
            ' ИначеЕсли ',
            ' Тогда\n',
            ' КонецЕсли;',
            ' Если ',
            ' И\n',
            ' Тогда\n',
            ' КонецЕсли;',
            '\nКонецПроцедуры\n',
            '\nПроцедура ',
            ' Возврат;',
            '\nКонецПроцедуры\n',
            '\nПроцедура ',
            '\nКонецПроцедуры\n',
            '\nProcedure ',
            '\nEndProcedure\n' ].join(' '))
    })

    it ('build parse', function() {
      var builds = matches.filter(function(m) {return m.css == 'value bold'})
        .map(function(m){return m.value})
      console.log(builds)
      //expect(builds.join("\n")).to.equal([ ])
    })
  });
});
