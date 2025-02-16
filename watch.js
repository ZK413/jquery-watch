/**
 * Часы
 * 
 * @param {Array} options массив с параметрами:
 * - format: '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}:{sss}'
 * - - Производится html вставка часов. По этому `options.format` может содержать html теги - '<div class="MyDiv">{hh}:{mm}:{ss} {DD}.{MM}.{YYYY}</div>'.
 * - - {DD} - Число
 * - - {MM} - Месяц
 * - - {YYYY} - Год
 * - - {hh} - Часы
 * - - {mm} - Минуты
 * - - {ss} - Секунды
 * - - {sss} - Миллисекунды
 * - - {period} - Время суток
 * - - {Period} - Время суток с заглавной буквы
 * - - {dayperiod} - Время суток со склонением
 * - - {dayPeriod} - Время суток со склонением с заглавной буквы
 * - - {day} - День недели
 * - - {Day} - День недели с заглавной буквы
 * - - {month} - Название месяца
 * - - {Month} - Название месяца с заглавной буквы
 * - - По умолчанию: '{hh}:{mm}:{ss}'
 * - before: '' - Текст или html код который надо вставить до часов
 * - after: '' - Текст или html код который надо вставить после часов
 * - get: `true` / `false` - Забрать содержимое тега, в который вставляются часы.
 * - type: 'html' / 'text' - Формат в котором забирается содержимое тега html или text.
 * - past: 'start' / 'end' - Вывести часы перед (start) или после (end) возвращаемым содержимым.
 * @returns {boolean} `false` ошибка, `true` модуль выполняется.
 */
$.fn.Watch = function (options) {
    if (ElementExist(this) == false) return false;
    var $set = $.extend({ format: '{hh}:{mm}:{ss}', before: '', after: '', get: false, type: 'html', past: 'start' }, options || {});
    var int = ($set.format.indexOf('{sss}') !== (-1)) ? 1 : 1000;
    setInterval(() => {
        let date = new Date(), tmp, result = $set.format, month = date.getMonth(), daydate = date.getDate(), hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds(), milliseconds = date.getMilliseconds();
        if ($set.format.indexOf('eriod}') !== (-1)) {
            let pt = [0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5];
            let pn = [['полночь', 'ночь', 'утро', 'полдень', 'день', 'вечер'], ['Полночь', 'Ночь', 'Утро', 'Полдень', 'День', 'Вечер']];
            tmp = date.toLocaleString(navigator.language, { dayPeriod: 'long' });
            result = result.replace('{dayperiod}', tmp);
            tmp = tmp.charAt(0).toUpperCase() + tmp.slice(1);
            result = result.replace('{dayPeriod}', tmp);
            result = result.replace('{period}', pn[0][pt[hours]]).replace('{Period}', pn[1][pt[hours]]);
        }
        if ($set.format.indexOf('ay}') !== (-1)) {
            tmp = date.toLocaleString(navigator.language, { weekday: 'long' });
            result = result.replace('{day}', tmp);
            tmp = tmp.charAt(0).toUpperCase() + tmp.slice(1);
            result = result.replace('{Day}', tmp);
        }
        if ($set.format.indexOf('onth}') !== (-1)) {
            tmp = date.toLocaleString(navigator.language, { month: 'long' });
            result = result.replace('{month}', tmp);
            tmp = tmp.charAt(0).toUpperCase() + tmp.slice(1);
            result = result.replace('{Month}', tmp);
        }
        if (month < 10) month = '0' + (month + 1);
        if (daydate < 10) daydate = '0' + daydate;
        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;
        if (milliseconds < 100) {
            milliseconds = ((milliseconds < 10) ? '00' : '0') + milliseconds;
        }
        result = $set.before + result.replace('{DD}', daydate).replace('{MM}', month).replace('{YYYY}', date.getFullYear()).replace('{hh}', hours).replace('{mm}', minutes).replace('{ss}', seconds).replace('{sss}', milliseconds) + $set.after;
        if ($set.get === true) {
            var get = ($set.type === 'text') ? $(this).text() : $(this).html();
            if ($set.past === 'start') $(this).html(result + get);
            if ($set.past === 'end') $(this).html(get + result);
        } else {
            $(this).html(result);
        }
    }, int, $set);
    return true;
};
