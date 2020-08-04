'use strict'
const KEY = 'books';
const PAGE_SIZE = 5;
var gPageIdx = 0;
var gBookPosHandle; // used by the update feature
var gSortDirection = 'up';
var gSortDirectionPrice = 'up';
var gBookLoaded = false;
var gBooks = [];

function init() {
    if (!loadFromStorage('books') || loadFromStorage('books') == '') { // if nothing in storage
        null;
    } else {
        gBooks = loadFromStorage('books');
    }
    renderBooks();
    generatePageNumbers();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function renderBooks() {
    var strHTML = ``;

    var startIdx = gPageIdx * PAGE_SIZE;
    var booksToRender = gBooks.slice(startIdx, startIdx + PAGE_SIZE);


    booksToRender.map((gBook) => {
        strHTML += `    
            <div class="tc">${gBook.id}</div>
            <div class="tc">${gBook.title}</div>
            <div class="tc">${formatCurrency(gBook.price)}</div>
            <div class="tc read-btn" onclick="onClickRead(${gBook.id})" data-trans="read">Read</div>
            <div class="tc update-btn" onclick="onUpdateBookFromList(${gBook.id})" data-trans="update">Update</div>
            <div class="tc delete-btn" onclick="onClickDelete(${gBook.id})" data-trans="delete">Delete</div>`
    })

    var elTable = document.querySelector('.table');
    elTable.innerHTML = '';
    elTable.innerHTML += strHTML;
    doTrans();
}

function addBook() {
    var idEl = document.querySelector('.id-input');
    var titleEl = document.querySelector('.title-input');
    var priceEl = document.querySelector('.price-input');
    var imgEl = document.querySelector('.img-url');
    var newBook = {
        id: idEl.value,
        title: titleEl.value,
        price: priceEl.value,
        img: imgEl.value,
        rate: '0'
    }
    gBooks.unshift(newBook);
    saveToStorage('books', gBooks);
    generatePageNumbers();
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book, idx) {
        if (bookId == book.id) return idx;
    })

    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
    generatePageNumbers();

}

function updateBook() {

    var idEl = document.querySelector('.id-input');
    var titleEl = document.querySelector('.title-input');
    var priceEl = document.querySelector('.price-input');
    var imgEl = document.querySelector('.img-url');
    var rate = gBooks[gBookPosHandle].rate;

    var newBook = {
        id: idEl.value,
        title: titleEl.value,
        price: priceEl.value,
        img: imgEl.value,
        rate: rate
    }

    gBooks[gBookPosHandle] = newBook;

}

function renderPanel(bookId) {
    var bookPos = getBookArryPos(bookId);
    document.querySelector('.panel-title h3').innerText = gBooks[bookPos].title;
    document.querySelector('.panel-description').innerText = `Price: ${ formatCurrency(   gBooks[bookPos].price ) }`;
    document.querySelector('.panel-pic').innerHTML = `<a href="${gBooks[bookPos].img}" target="_blank"><img src="${gBooks[bookPos].img}" height="200px" /></a>`;
    document.querySelector('.rate-controller').innerHTML = `

        <div><p>Rate: </p></div>
        <div class="rate-cell right" onclick="onMinusClicked(${bookPos},${bookId})">-</div>
        <div class="rate-number">${gBooks[bookPos].rate}</div>
        <div class="rate-cell left" onclick="onPlusClicked(${bookPos},${bookId})">+</div>
                
`;

}

function loadDump() {

    gBooks = '';
    gBooks = [{
            id: '28',
            title: 'The Hobbit',
            price: '34',
            img: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3453/9780345339683.jpg',
            rate: '3'
        }, {
            id: '27',
            title: 'The Hitchhikers Guide to the Galaxy',
            price: '13.95',
            img: 'https://api.time.com/wp-content/uploads/2014/10/hitchhiker-s-guide-douglas-adams-657242_451_700.jpg?w=800&quality=85',
            rate: '7'
        },
        {
            id: '26',
            title: 'The Lord Of The Rings',
            price: '32.55',
            img: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/5440/9780544003415.jpg',
            rate: '2'
        },
        {
            id: '25',
            title: 'The Catcher in the Rye',
            price: '4.55',
            img: 'https://target.scene7.com/is/image/Target/GUEST_f364f9b7-05de-4824-a82e-614767747122?wid=488&hei=488&fmt=pjpeg',
            rate: '2'
        },
        {
            id: '24',
            title: 'Effective Modern C++',
            price: '34',
            img: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4919/9781491903995.jpg',
            rate: '3'
        }, {
            id: '23',
            title: 'Everything Is F*cked : A Book About Hope',
            price: '64',
            img: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0628/9780062888464.jpg',
            rate: '7'
        },
        {
            id: '22',
            title: 'War and Peace',
            price: '19.12',
            img: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/8532/9781853260629.jpg',
            rate: '2'
        },
        {
            id: '21',
            title: 'Fifty Shades of Grey',
            price: '109.81',
            img: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0995/9780099579939.jpg',
            rate: '2'
        },
        {
            id: '20',
            title: 'The Hobbit',
            price: '34',
            img: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3453/9780345339683.jpg',
            rate: '3'
        }, {
            id: '19',
            title: 'The Hitchhikers Guide to the Galaxy',
            price: '13.95',
            img: 'https://api.time.com/wp-content/uploads/2014/10/hitchhiker-s-guide-douglas-adams-657242_451_700.jpg?w=800&quality=85',
            rate: '7'
        },
        {
            id: '18',
            title: 'The Lord Of The Rings',
            price: '32.55',
            img: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/5440/9780544003415.jpg',
            rate: '2'
        },
        {
            id: '17',
            title: 'The Catcher in the Rye',
            price: '4.55',
            img: 'https://target.scene7.com/is/image/Target/GUEST_f364f9b7-05de-4824-a82e-614767747122?wid=488&hei=488&fmt=pjpeg',
            rate: '2'
        },
        {
            id: '16',
            title: 'Effective Modern C++',
            price: '34',
            img: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4919/9781491903995.jpg',
            rate: '3'
        }, {
            id: '15',
            title: 'Everything Is F*cked : A Book About Hope',
            price: '64',
            img: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0628/9780062888464.jpg',
            rate: '7'
        },
        {
            id: '14',
            title: 'War and Peace',
            price: '19.12',
            img: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/8532/9781853260629.jpg',
            rate: '2'
        },
        {
            id: '13',
            title: 'Fifty Shades of Grey',
            price: '109.81',
            img: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0995/9780099579939.jpg',
            rate: '2'
        }

    ];
    saveToStorage('books', gBooks);
    renderBooks();
    generatePageNumbers();
}

function ratePlus(bookPos, bookId) {

    gBooks[bookPos].rate++;
    renderPanel(bookId);
    _saveBooksToStorage();
}

function rateMinus(bookPos, bookId) {

    gBooks[bookPos].rate--;
    renderPanel(bookId);
    _saveBooksToStorage();
}

function sortByTitle() {
    if (gSortDirection == 'up') {
        gBooks.sort(function (a, b) {
            var nameA = a.title.toUpperCase(); // ignore upper and lowercase
            var nameB = b.title.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
    } else {
        gBooks.sort(function (b, a) {
            var nameA = a.title.toUpperCase(); // ignore upper and lowercase
            var nameB = b.title.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });

    }

    renderBooks();
}

function sortByPrice() {
    if (gSortDirectionPrice == 'up') {

        gBooks.sort(function (b, a) {
            return a.price - b.price;
        })
    } else {
        gBooks.sort(function (a, b) {
            return a.price - b.price;
        })

    }
    renderBooks();

}

function goNextPage() {
    var pageCount = gBooks.length / PAGE_SIZE;

    gPageIdx = (gPageIdx + 1 <= pageCount) ? gPageIdx + 1 : 0
}

function goBackPage() {
    var pageCount = gBooks.length / PAGE_SIZE;
    gPageIdx = (gPageIdx - 1 >= 0) ? gPageIdx - 1 : (Math.floor(gBooks.length / PAGE_SIZE))
}

function goPageNumber(pageNumber) {
    gPageIdx = pageNumber;
    renderBooks();
    generatePageNumbers();

}

function generatePageNumbers() {
    var pageCount = Math.floor(gBooks.length / PAGE_SIZE)
    if (gBooks.length % PAGE_SIZE == 0) pageCount--;
    var HTMLstr = ``;
    for (var i = 0; i <= pageCount; i++) {
        HTMLstr += `<div class="page`;
        if (i == gPageIdx) HTMLstr += ` mark-page-btn`;
        HTMLstr += `" onclick="onPageClick(${i})">${i+1}</div>`;
    }
    document.querySelector('.pages').innerHTML = HTMLstr;
}

function openCanvas(){
    //document.querySelector('.offcanvas-btn').classList.toggle('offcanvas-btn-open');
    document.querySelector('.offcanvas-aside').classList.toggle('offcanvas-aside-open');    
}