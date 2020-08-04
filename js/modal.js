function toggleNewBookModal() {
    var elModal = document.querySelector('.newBookModal');
    elModal.classList.toggle('hide');
    cleanModalFields();
    setModalBtn('add');

}

function openModal() {
    setTimeout(() => {
        var elModal = document.querySelector('.newBookModal');
        elModal.classList.remove('hide');
    }, 200);
}

function closeModal() {
    setTimeout(() => {
        var elModal = document.querySelector('.newBookModal');
        elModal.classList.add('hide');
    }, 200);
}

function cleanModalFields() {
    document.querySelector('.id-input').value = '';
    document.querySelector('.title-input').value = '';
    document.querySelector('.price-input').value = '';
    document.querySelector('.img-url').value = '';

}

function setModalBtn(text) {
    if (text=='update'){
    var elModalBtn = document.querySelector('.modal-btn');
    elModalBtn.classList.add('hide');
    var elModalBtn = document.querySelector('.modal-update-btn');
    elModalBtn.classList.remove('hide');
    }

    if (text=='add'){
     
        var elModalBtn = document.querySelector('.modal-btn');
        elModalBtn.classList.remove('hide');
        var elModalBtn = document.querySelector('.modal-update-btn');
        elModalBtn.classList.add('hide');
    }

}

function populateFieldsInModal(bookId) {
    var BookArryPos= getBookArryPos(bookId);
    document.querySelector('.id-input').value = gBooks[BookArryPos].id;
    document.querySelector('.title-input').value = gBooks[BookArryPos].title;
    document.querySelector('.price-input').value = gBooks[BookArryPos].price;
    document.querySelector('.img-url').value = gBooks[BookArryPos].img;

}

function getBookArryPos(bookId) {
    for (var i = 0; i < gBooks.length; i++) {
        if (bookId == gBooks[i].id) return i;
    }

}