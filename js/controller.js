'use strict'

function onAddBookClick() {
    addBook();
    cleanModalFields(); // clean fields
    //closeModal();
    openCanvas();
    renderBooks();
}

function onClickDelete(iDx) {
    deleteBook(iDx);
    renderBooks();
}

function onUpdateBookFromList(bookId) {
    //openModal();
    openCanvas()
    setModalBtn('update');
    populateFieldsInModal(bookId);
    gBookPosHandle = getBookArryPos(bookId);
}

function onUpdatekClick() {
    updateBook();
    saveToStorage('books', gBooks);
    renderBooks();
    cleanModalFields();
    setModalBtn('add');
    closeModal();
}

function onClickRead(BookId) {
    gBookLoaded = true;

    gBookPosHandle = BookId;
    renderPanel(BookId);
}

function onLoadDumpClick() {
    loadDump();
    renderBooks();
}

function onPlusClicked(bookPos, bookId) {
    if (gBooks[bookPos].rate < 10) ratePlus(bookPos, bookId);
}

function onMinusClicked(bookPos, bookId) {
    if (gBooks[bookPos].rate > 0) rateMinus(bookPos, bookId);
}

function onTitleClicked() {

    if (gSortDirection == 'up') gSortDirection = 'down';
    else {
        gSortDirection = 'up'
    }
    sortByTitle();
}

function onTitleClickedPrice() {
    if (gSortDirectionPrice == 'up') gSortDirectionPrice = 'down';
    else {
        gSortDirectionPrice = 'up'
    }
    sortByPrice();
}

function onNextPageClick() {
    goNextPage();
    renderBooks();
    generatePageNumbers();
}

function onBackPageClick() {
    goBackPage();
    renderBooks();
}

function onPageClick(pageNumber) {
    goPageNumber(pageNumber);
    generatePageNumbers();
}

function onLangSelect(lang) {
    setLang(lang);


    // TODO: if lang is hebrew add RTL class to document.body
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }

    //gBookLoaded = false;
    renderBooks();
    renderPanel(gBookPosHandle);
    doTrans();


}