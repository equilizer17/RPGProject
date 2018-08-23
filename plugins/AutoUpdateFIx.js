/*:ru
 * @plugindesc Исправляет совместимость плагина SumRndmDde Auto Updater с плагинами Янфлая 
 * @author Дмитрик
 *
 * @help
 * Исправляет совместимость между плагином SumRndmDde Auto Updater
 * и плагинами Янфлая.
 *
 * Его необходимо установить после плагина SRD_AutoUpdater.
 *
 * Проблема вот в чём. Автообновление перезагружает базу данных.
 * Плагины Янфлая уже отработали и изменили базу данных,
 * однако SRD_AutoUpdater загрузил базу данных ещё раз (возможно,
 * обновлённую), поэтому плагины Янфлая надо перезагрузить.
 *
 * Для этого я меняю внутри объекта Yanfly переменные, названия
 * которых начинаются с _loaded_YEP_ на false, что заставит плагины
 * Янфлая повторить инициализацию.
 *
 * ЭТО ХАК. Он может не сработать, если плагин Янфлая не просто
 * инициализирует массивы $dataЧтоНибудь, а делает ещё какие-то
 * переменные. Но с плагином YEP_EquipCore.js этот хак работает.
 * Если будут проблемы с другими плагинами — надо исправлять их
 * для каждого плагина отдельно. Пишите в этой теме на Светлой:
 * http://rpgmaker.ru/forum/voprosy-po-skriptam-mv/62002-mv-zhestkij-konflikt-plagina
 * Укажите, с каким именно плагинами это не работает, я разберусь.
 * Спасибо!
 */
 /*:
  * @plugindesc Fixes compatibility between the SumRndmDde Auto Updater and Yanfly's plugins 
  * @author Dmytryk
  *
  * @help
  * This plugin fixes the compatibility between SumRndmDde's Auto Updater plugin
  * and Yanfly's plugins.
  *
  * It needs to be installed after the SRD_AutoUpdater plugin.
  * 
  * The problem is as follows. The auto-updater reloads the database.
  * Yanfly's plugins have already finished working and have changed
  * the database, but the SRD_AutoUpdater plugin re-loaded the database
  * (probably after updating it), so Yanfly's plugins need to be re-run.
  *
  * For this, I'm changing the variables inside the Yanfly object if
  * their name starts with _loaded_YEP_ to false, which triggers
  * re-initialization of Yanfly's plugins.
  *
  * THIS IS A HACK. It might not work if Yanfly's plugin doesn't just
  * initialise $dataSomething arrays but does more things to them.
  * But this hack works with YEP_EquipCore.js. If you have problems
  * with other plugins, they need to be fixed on a plugin-per-plugin basis.
  * Write in the following topic on the Zone of Light forum:
  * http://rpgmaker.ru/forum/voprosy-po-skriptam-mv/62002-mv-zhestkij-konflikt-plagina
  * Tell me which plugins cause conflicts, I'll look into this. Thanks!
  */

var Imported = Imported || {};
Imported["Dmytryk's fix for SumRndmDde Auto Updater"] = 1.00;

Dmy_Scene_AutoUpdate_gotoSceneBoot = Scene_AutoUpdate.prototype.gotoSceneBoot;
Scene_AutoUpdate.prototype.gotoSceneBoot = function() {
  for (var property in Yanfly) {
    if (property.match(/^_loaded_YEP_/) && Yanfly[property] === true) {
      Yanfly[property] = false;
    }
  }
  Dmy_Scene_AutoUpdate_gotoSceneBoot.call(this);
}