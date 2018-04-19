var BrushBase = require('brush-base');
var regexLib = require('syntaxhighlighter-regex').commonRegExp;

function Brush() {
 var keywords = 'КонецПроцедуры EndProcedure КонецФункции EndFunction
                'Прервать Break Продолжить Continue' +
                'Возврат Return Если If' +
                'Иначе Else ИначеЕсли ElsIf' +
                'Тогда Then КонецЕсли EndIf' +
                'Попытка Try Исключение Except' +
                'КонецПопытки EndTry Raise ВызватьИсключение' +
                'Пока While Для For' +
                'Каждого Each Из In' +
                'По To Цикл Do' +
                'КонецЦикла EndDo НЕ NOT' +
                'И AND ИЛИ OR' +
                'Новый New Процедура Procedure' +
                'Функция Function Перем Var' +
                'Экспорт Export Знач Val'

  var builds = 'СтрДлина StrLen СокрЛ TrimL СокрП TrimR СокрЛП TrimAll Лев Left Прав Right Сред Mid СтрНайти StrFind ВРег Upper НРег Lower ТРег Title Символ Char КодСимвола CharCode ПустаяСтрока IsBlankString СтрЗаменить StrReplace СтрЧислоСтрок StrLineCount СтрПолучитьСтроку StrGetLine СтрЧислоВхождений StrOccurrenceCount СтрСравнить StrCompare СтрНачинаетсяС StrStartWith СтрЗаканчиваетсяНа StrEndsWith СтрРазделить StrSplit СтрСоединить StrConcat'+
'Цел Int Окр Round ACos ACos ASin ASin ATan ATan Cos Cos Exp Exp Log Log Log10 Log10 Pow Pow Sin Sin Sqrt Sqrt Tan Tan'+
'Год Year Месяц Month День Day Час Hour Минута Minute Секунда Second НачалоГода BegOfYear НачалоДня BegOfDay НачалоКвартала BegOfQuarter НачалоМесяца BegOfMonth НачалоМинуты BegOfMinute НачалоНедели BegOfWeek НачалоЧаса BegOfHour КонецГода EndOfYear КонецДня EndOfDay КонецКвартала EndOfQuarter КонецМесяца EndOfMonth КонецМинуты EndOfMinute КонецНедели EndOfWeek КонецЧаса EndOfHour НеделяГода WeekOfYear ДеньГода DayOfYear ДеньНедели WeekDay ТекущаяДата CurrentDate ДобавитьМесяц AddMonth'+
'Тип Type ТипЗнч TypeOf'+
'Булево Boolean Число Number Строка String Дата Date'+
'ПоказатьВопрос ShowQueryBox Вопрос DoQueryBox ПоказатьПредупреждение ShowMessageBox Предупреждение DoMessageBox Сообщить Message ОчиститьСообщения ClearMessages ОповеститьОбИзменении NotifyChanged Состояние Status Сигнал Beep ПоказатьЗначение ShowValue ОткрытьЗначение OpenValue Оповестить Notify ОбработкаПрерыванияПользователя UserInterruptProcessing ОткрытьСодержаниеСправки OpenHelpContent ОткрытьИндексСправки OpenHelpIndex ОткрытьСправку OpenHelp ПоказатьИнформациюОбОшибке ShowErrorInfo КраткоеПредставлениеОшибки BriefErrorDescription ПодробноеПредставлениеОшибки DetailErrorDescription ПолучитьФорму GetForm ЗакрытьСправку CloseHelp ПоказатьОповещениеПользователя ShowUserNotification ОткрытьФорму OpenForm ОткрытьФормуМодально OpenFormModal АктивноеОкно ActiveWindow ВыполнитьОбработкуОповещения ExecuteNotifyProcessing'+
'ПоказатьВводЗначения ShowInputValue ВвестиЗначение InputValue ПоказатьВводЧисла ShowInputNumber ВвестиЧисло InputNumber ПоказатьВводСтроки ShowInputString ВвестиСтроку InputString ПоказатьВводДаты ShowInputDate ВвестиДату InputDate'+
'Формат Format ЧислоПрописью NumberInWords НСтр NStr ПредставлениеПериода PeriodPresentation СтрШаблон StrTemplate'+
'ПолучитьОбщийМакет GetCommonTemplate ПолучитьОбщуюФорму GetCommonForm ПредопределенноеЗначение PredefinedValue ПолучитьПолноеИмяПредопределенногоЗначения GetPredefinedValueFullName'+
'ПолучитьЗаголовокСистемы GetCaption ПолучитьСкоростьКлиентскогоСоединения GetClientConnectionSpeed ПодключитьОбработчикОжидания AttachIdleHandler УстановитьЗаголовокСистемы SetCaption ОтключитьОбработчикОжидания DetachIdleHandler ИмяКомпьютера ComputerName ЗавершитьРаботуСистемы Exit ИмяПользователя UserName ПрекратитьРаботуСистемы Terminate ПолноеИмяПользователя UserFullName ЗаблокироватьРаботуПользователя LockApplication КаталогПрограммы BinDir КаталогВременныхФайлов TempFilesDir ПравоДоступа AccessRight РольДоступна IsInRole ТекущийЯзык CurrentLanguage ТекущийКодЛокализации CurrentLocaleCode СтрокаСоединенияИнформационнойБазы InfoBaseConnectionString ПодключитьОбработчикОповещения AttachNotificationHandler ОтключитьОбработчикОповещения DetachNotificationHandler ПолучитьСообщенияПользователю GetUserMessages ПараметрыДоступа AccessParameters ПредставлениеПриложения ApplicationPresentation ТекущийЯзыкСистемы CurrentSystemLanguage ЗапуститьСистему RunSystem ТекущийРежимЗапуска CurrentRunMode УстановитьЧасовойПоясСеанса SetSessionTimeZone ЧасовойПоясСеанса SessionTimeZone ТекущаяДатаСеанса CurrentSessionDate УстановитьКраткийЗаголовокПриложения SetShortApplicationCaption ПолучитьКраткийЗаголовокПриложения GetShortApplicationCaption ПредставлениеПрава RightPresentation ВыполнитьПроверкуПравДоступа VerifyAccessRights РабочийКаталогДанныхПользователя UserDataWorkDir КаталогДокументов DocumentsDir ПолучитьИнформациюЭкрановКлиента GetClientDisplaysInformation ТекущийВариантОсновногоШрифтаКлиентскогоПриложения ClientApplicationBaseFontCurrentVariant ТекущийВариантИнтерфейсаКлиентскогоПриложения ClientApplicationInterfaceCurrentVariant УстановитьЗаголовокКлиентскогоПриложения SetClientApplicationCaption ПолучитьЗаголовокКлиентскогоПриложения GetClientApplicationCaption НачатьПолучениеКаталогаВременныхФайлов BeginGettingTempFilesDir НачатьПолучениеКаталогаДокументов BeginGettingDocumentsDir НачатьПолучениеРабочегоКаталогаДанныхПользователя BeginGettingUserDataWorkDir ПодключитьОбработчикЗапросаНастроекКлиентаЛицензирования AttachLicensingClientParametersRequestHandler ОтключитьОбработчикЗапросаНастроекКлиентаЛицензирования DetachLicensingClientParametersRequestHandler'+
'ЗначениеВСтрокуВнутр ValueToStringInternal ЗначениеИзСтрокиВнутр ValueFromStringInternal ЗначениеВФайл ValueToFile ЗначениеИзФайла ValueFromFile'+
'КомандаСистемы System ЗапуститьПриложение RunApp ПолучитьCOMОбъект GetCOMObject ПользователиОС OSUsers НачатьЗапускПриложения BeginRunningApplication'+
'ПодключитьВнешнююКомпоненту AttachAddIn НачатьУстановкуВнешнейКомпоненты BeginInstallAddIn УстановитьВнешнююКомпоненту InstallAddIn НачатьПодключениеВнешнейКомпоненты BeginAttachingAddIn'+
'КопироватьФайл FileCopy ПереместитьФайл MoveFile УдалитьФайлы DeleteFiles НайтиФайлы FindFiles СоздатьКаталог CreateDirectory ПолучитьИмяВременногоФайла GetTempFileName РазделитьФайл SplitFile ОбъединитьФайлы MergeFiles ПолучитьФайл GetFile НачатьПомещениеФайла BeginPutFile ПоместитьФайл PutFile ЭтоАдресВременногоХранилища IsTempStorageURL УдалитьИзВременногоХранилища DeleteFromTempStorage ПолучитьИзВременногоХранилища GetFromTempStorage ПоместитьВоВременноеХранилище PutToTempStorage ПодключитьРасширениеРаботыСФайлами AttachFileSystemExtension НачатьУстановкуРасширенияРаботыСФайлами BeginInstallFileSystemExtension УстановитьРасширениеРаботыСФайлами InstallFileSystemExtension ПолучитьФайлы GetFiles ПоместитьФайлы PutFiles ЗапроситьРазрешениеПользователя RequestUserPermission ПолучитьМаскуВсеФайлы GetAllFilesMask ПолучитьМаскуВсеФайлыКлиента GetClientAllFilesMask ПолучитьМаскуВсеФайлыСервера GetServerAllFilesMask ПолучитьРазделительПути GetPathSeparator ПолучитьРазделительПутиКлиента GetClientPathSeparator ПолучитьРазделительПутиСервера GetServerPathSeparator НачатьПодключениеРасширенияРаботыСФайлами BeginAttachingFileSystemExtension НачатьЗапросРазрешенияПользователя BeginRequestingUserPermission НачатьПоискФайлов BeginFindingFiles НачатьСозданиеКаталога BeginCreatingDirectory НачатьКопированиеФайла BeginCopyingFile НачатьПеремещениеФайла BeginMovingFile НачатьУдалениеФайлов BeginDeletingFiles НачатьПолучениеФайлов BeginGettingFiles НачатьПомещениеФайлов BeginPuttingFiles'+
'НачатьТранзакцию BeginTransaction ЗафиксироватьТранзакцию CommitTransaction ОтменитьТранзакцию RollbackTransaction УстановитьМонопольныйРежим SetExclusiveMode МонопольныйРежим ExclusiveMode ПолучитьОперативнуюОтметкуВремени GetRealTimeTimestamp ПолучитьСоединенияИнформационнойБазы GetInfoBaseConnections НомерСоединенияИнформационнойБазы InfoBaseConnectionNumber КонфигурацияИзменена ConfigurationChanged КонфигурацияБазыДанныхИзмененаДинамически DataBaseConfigurationChangedDynamically УстановитьВремяОжиданияБлокировкиДанных SetLockWaitTime ОбновитьНумерациюОбъектов RefreshObjectsNumbering ПолучитьВремяОжиданияБлокировкиДанных GetLockWaitTime КодЛокализацииИнформационнойБазы InfoBaseLocaleCode УстановитьМинимальнуюДлинуПаролейПользователей SetUserPasswordMinLength ПолучитьМинимальнуюДлинуПаролейПользователей GetUserPasswordMinLength ИнициализироватьПредопределенныеДанные InitializePredefinedData УдалитьДанныеИнформационнойБазы EraseInfoBaseData УстановитьПроверкуСложностиПаролейПользователей SetUserPasswordStrengthCheck ПолучитьПроверкуСложностиПаролейПользователей GetUserPasswordStrengthCheck ПолучитьСтруктуруХраненияБазыДанных GetDBStorageStructureInfo УстановитьПривилегированныйРежим SetPrivilegedMode ПривилегированныйРежим PrivilegedMode ТранзакцияАктивна TransactionActive НеобходимостьЗавершенияСоединения ConnectionStopRequest НомерСеансаИнформационнойБазы InfoBaseSessionNumber ПолучитьСеансыИнформационнойБазы GetInfoBaseSessions ЗаблокироватьДанныеДляРедактирования LockDataForEdit УстановитьСоединениеСВнешнимИсточникомДанных ConnectExternalDataSource РазблокироватьДанныеДляРедактирования UnlockDataForEdit РазорватьСоединениеСВнешнимИсточникомДанных DisconnectExternalDataSource ПолучитьБлокировкуСеансов GetSessionsLock УстановитьБлокировкуСеансов SetSessionsLock ОбновитьПовторноИспользуемыеЗначения RefreshReusableValues УстановитьБезопасныйРежим SetSafeMode БезопасныйРежим SafeMode ПолучитьДанныеВыбора GetChoiceData УстановитьЧасовойПоясИнформационнойБазы SetInfoBaseTimeZone ПолучитьЧасовойПоясИнформационнойБазы GetInfoBaseTimeZone ПолучитьОбновлениеКонфигурацииБазыДанных GetDataBaseConfigurationUpdate УстановитьБезопасныйРежимРазделенияДанных SetDataSeparationSafeMode БезопасныйРежимРазделенияДанных DataSeparationSafeMode УстановитьВремяЗасыпанияПассивногоСеанса SetPassiveSessionHibernateTime ПолучитьВремяЗасыпанияПассивногоСеанса GetPassiveSessionHibernateTime УстановитьВремяЗавершенияСпящегоСеанса SetHibernateSessionTerminateTime ПолучитьВремяЗавершенияСпящегоСеанса GetHibernateSessionTerminateTime ПолучитьТекущийСеансИнформационнойБазы GetCurrentInfoBaseSession ПолучитьИдентификаторКонфигурации GetConfigurationID УстановитьНастройкиКлиентаЛицензирования SetLicensingClientParameters ПолучитьИмяКлиентаЛицензирования GetLicensingClientName ПолучитьДополнительныйПараметрКлиентаЛицензирования GetLicensingClientAdditionalParameter'+
'НайтиПомеченныеНаУдаление FindMarkedForDeletion НайтиПоСсылкам FindByRef УдалитьОбъекты DeleteObjects УстановитьОбновлениеПредопределенныхДанныхИнформационнойБазы SetInfoBasePredefinedDataUpdate ПолучитьОбновлениеПредопределенныхДанныхИнформационнойБазы GetInfoBasePredefinedData'+
'XMLСтрока XMLString XMLЗначение XMLValue XMLТип XMLType XMLТипЗнч XMLTypeOf ИзXMLТипа FromXMLType ВозможностьЧтенияXML CanReadXML ПолучитьXMLТип GetXMLType ПрочитатьXML ReadXML ЗаписатьXML WriteXML НайтиНедопустимыеСимволыXML FindDisallowedXMLCharacters ИмпортМоделиXDTO ImportXDTOModel СоздатьФабрикуXDTO CreateXDTOFactory'+
'ЗаписатьJSON WriteJSON ПрочитатьJSON ReadJSON ПрочитатьДатуJSON ReadJSONDate ЗаписатьДатуJSON WriteJSONDate'+
'ЗаписьЖурналаРегистрации WriteLogEvent ПолучитьИспользованиеЖурналаРегистрации GetEventLogUsing УстановитьИспользованиеЖурналаРегистрации SetEventLogUsing ПредставлениеСобытияЖурналаРегистрации EventLogEventPresentation ВыгрузитьЖурналРегистрации UnloadEventLog ПолучитьЗначенияОтбораЖурналаРегистрации GetEventLogFilterValues УстановитьИспользованиеСобытияЖурналаРегистрации SetEventLogEventUse ПолучитьИспользованиеСобытияЖурналаРегистрации GetEventLogEventUse СкопироватьЖурналРегистрации CopyEventLog ОчиститьЖурналРегистрации ClearEventLog'+
'ЗначениеВДанныеФормы ValueToFormData ДанныеФормыВЗначение FormDataToValue КопироватьДанныеФормы CopyFormData УстановитьСоответствиеОбъектаИФормы SetObjectAndFormConformity ПолучитьСоответствиеОбъектаИФормы GetObjectAndFormConformity'+
'ПолучитьФункциональнуюОпцию GetFunctionalOption ПолучитьФункциональнуюОпциюИнтерфейса GetInterfaceFunctionalOption УстановитьПараметрыФункциональныхОпцийИнтерфейса SetInterfaceFunctionalOptionParameters ПолучитьПараметрыФункциональныхОпцийИнтерфейса GetInterfaceFunctionalOptionParameters ОбновитьИнтерфейс RefreshInterface'+
'УстановитьРасширениеРаботыСКриптографией InstallCryptoExtension НачатьУстановкуРасширенияРаботыСКриптографией BeginInstallCryptoExtension ПодключитьРасширениеРаботыСКриптографией AttachCryptoExtension НачатьПодключениеРасширенияРаботыСКриптографией BeginAttachingCryptoExtension'+
'УстановитьСоставСтандартногоИнтерфейсаOData SetStandardODataInterfaceContent ПолучитьСоставСтандартногоИнтерфейсаOData GetStandardODataInterfaceContent'+
'Мин Min Макс Max ОписаниеОшибки ErrorDescription Вычислить Eval ИнформацияОбОшибке ErrorInfo Base64Значение Base64Value Base64Строка Base64String ЗаполнитьЗначенияСвойств FillPropertyValues ЗначениеЗаполнено ValueIsFilled ПолучитьПредставленияНавигационныхСсылок GetURLsPresentations НайтиОкноПоНавигационнойСсылке FindWindowByURL ПолучитьОкна GetWindows ПерейтиПоНавигационнойСсылке GotoURL ПолучитьНавигационнуюСсылку GetURL ПолучитьДопустимыеКодыЛокализации GetAvailableLocaleCodes ПолучитьНавигационнуюСсылкуИнформационнойБазы GetInfoBaseURL ПредставлениеКодаЛокализации LocaleCodePresentation ПолучитьДопустимыеЧасовыеПояса GetAvailableTimeZones ПредставлениеЧасовогоПояса TimeZonePresentation ТекущаяУниверсальнаяДата CurrentUniversalDate ТекущаяУниверсальнаяДатаВМиллисекундах CurrentUniversalDateInMilliseconds МестноеВремя ToLocalTime УниверсальноеВремя ToUniversalTime ЧасовойПояс TimeZone СмещениеЛетнегоВремени DaylightTimeOffset СмещениеСтандартногоВремени StandardTimeOffset КодироватьСтроку EncodeString РаскодироватьСтроку DecodeString Найти Find'+
'ПередНачаломРаботыСистемы BeforeStart ПриНачалеРаботыСистемы OnStart ПередЗавершениемРаботыСистемы BeforeExit ПриЗавершенииРаботыСистемы OnExit ОбработкаВнешнегоСобытия ExternEventProcessing УстановкаПараметровСеанса SessionParametersSetting ПриИзмененииПараметровЭкрана OnChangeDisplaySettings'+
'WSСсылки WSReferences БиблиотекаКартинок PictureLib БиблиотекаМакетовОформленияКомпоновкиДанных DataCompositionAppearanceTemplateLib БиблиотекаСтилей StyleLib БизнесПроцессы BusinessProcesses ВнешниеИсточникиДанных ExternalDataSources ВнешниеОбработки ExternalDataProcessors ВнешниеОтчеты ExternalReports Документы Documents ДоставляемыеУведомления DeliverableNotifications ЖурналыДокументов DocumentJournals Задачи Tasks ИспользованиеРабочейДаты WorkingDateUse ИсторияРаботыПользователя UserWorkHistory Константы Constants КритерииОтбора FilterCriteria Метаданные Metadata Обработки DataProcessors ОтправкаДоставляемыхУведомлений DeliverableNotificationSend Отчеты Reports ПараметрыСеанса SessionParameters Перечисления Enums ПланыВидовРасчета ChartsOfCalculationTypes ПланыВидовХарактеристик ChartsOfCharacteristicTypes ПланыОбмена ExchangePlans ПланыСчетов ChartsOfAccounts ПолнотекстовыйПоиск FullTextSearch ПользователиИнформационнойБазы InfoBaseUsers Последовательности Sequences РасширенияКонфигурации ConfigurationExtensions РегистрыБухгалтерии AccountingRegisters РегистрыНакопления AccumulationRegisters РегистрыРасчета CalculationRegisters РегистрыСведений InformationRegisters РегламентныеЗадания ScheduledJobs СериализаторXDTO XDTOSerializer Справочники Catalogs СредстваГеопозиционирования LocationTools СредстваКриптографии CryptoToolsManager СредстваМультимедиа MultimediaTools СредстваПочты MailTools СредстваТелефонии TelephonyTools ФабрикаXDTO XDTOFactory ФоновыеЗадания BackgroundJobs ХранилищаНастроек'+
'ГлавныйИнтерфейс MainInterface ГлавныйСтиль MainStyle ПараметрЗапуска LaunchParameter РабочаяДата WorkingDate SettingsStorages ХранилищеВариантовОтчетов ReportsVariantsStorage ХранилищеНастроекДанныхФорм FormDataSettingsStorage ХранилищеОбщихНастроек CommonSettingsStorage ХранилищеПользовательскихНастроекДинамическихСписков DynamicListsUserSettingsStorage ХранилищеПользовательскихНастроекОтчетов ReportsUserSettingsStorage ХранилищеСистемныхНастроек SystemSettingsStorage'+
'Если If ИначеЕсли ElsIf Иначе Else КонецЕсли EndIf Тогда Then'+
'Неопределено Undefined Истина True Ложь False NULL'

  this.regexList = [
    {
      regex: regexLib.singleLineCComments,
      css: 'comments'
    },
    {
      regex: ("|^\s*\|)((?!\"\").)*?(\"|$)"),
      css: 'string'
    },

    {
      regex: /^\s*(#|&).+/gm
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
      regex: new RegExp(this.getKeywords(keywords), 'gmi'),
      css: 'keyword bold'
    }
    {
      regex: new RegExp(this.getKeywords(builds), 'gmi'),
      css: 'functions bold'
    }
    ];
};

Brush.prototype = new BrushBase();
Brush.aliases = ['delphi', 'pascal', 'pas'];
module.exports = Brush;
