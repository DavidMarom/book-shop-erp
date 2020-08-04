var gCurrLang = 'en';

var gTrans = {
    id: {
        en: 'Id',
        ru: 'ид',
        he: 'מק"ט'
    },
    title: {
        en: 'Title',
        ru: 'заглавие',
        he: 'כותר'
    },
    price: {
        en: 'Price',
        ru: 'цена',
        he: 'מחיר'
    },
    action: {
        en: 'Action',
        ru: 'действие',
        he: 'פעולות'
    },
    info: {
        en: 'Information',
        ru: 'Информация',
        he: 'מידע'
    },
    'next': {
        en: 'Next',
        ru: 'следующий',
        he: 'הבא'
    },
    'back': {
        en: 'Back',
        ru: 'назад',
        he: 'קודם'
    },
    headline : {
        en: 'Bookshop ERP',
        ru: 'книжный EPП',
        he: 'ניהול ספרים'
    },
    read : {
        en: 'Read',
        ru: 'читать',
        he: 'קרא'
    },
    update : {
        en: 'Update',
        ru: 'Обновить',
        he: 'עדכן'
    },
    delete : {
        en: 'Delete',
        ru: 'Удалить',
        he: 'מחק'
    }
}



function getTrans(transKey) {
    var translation = gTrans[transKey][gCurrLang]
    if (!translation) return gTrans[transKey].en
    return translation
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var transKey = el.dataset.trans
        var trans = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            el.placeholder = trans
        } else {
            el.innerText = trans
        }
    })

}

function setLang(lang) {
    gCurrLang = lang;
    console.log(lang);
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: 'ILS'
    }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}