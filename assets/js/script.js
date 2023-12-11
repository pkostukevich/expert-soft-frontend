const filter = document.querySelector('.cards-filter');
const cards = document.querySelectorAll('.card');
const visibilityState = document.querySelector('#show');

let hiddenCards, favouriteCards, comparableCards;

function checkVisibilityState() {          // проверка чекбокса (show hidden)
    hiddenCards.forEach(function (id) {
        document.getElementById(id).classList.toggle('card--hidden', !visibilityState.checked);
    });
}

function displayFromStorage() {              // загрузка из localStorage, отображение принадлежности карт к категориям
    hiddenCards = JSON.parse(localStorage.getItem('hiddenCards')) || [];
    favouriteCards = JSON.parse(localStorage.getItem('favouriteCards')) || [];
    comparableCards = JSON.parse(localStorage.getItem('comparableCards')) || [];
    cards.forEach(function (card) {
        const cardId = card.id;
        let cardClassList = card.classList;
        cardClassList.toggle('card--semitransparent', hiddenCards.includes(cardId));
        cardClassList.toggle('card--favourite', favouriteCards.includes(cardId));
        cardClassList.toggle('card--comparable', comparableCards.includes(cardId));
    });
    checkVisibilityState();
}

function updateFilter(filter) {         // обновление отображаемых карточек в соответствии с выбранной категорией
    cards.forEach(function (item) {
        switch (filter) {
            case 'all':
                item.classList.remove('extra');
                break;
            case 'favourites':
                item.classList.toggle('extra', !favouriteCards.includes(item.id));
                break;
            case 'comparison':
                item.classList.toggle('extra', !comparableCards.includes(item.id));
                break
        }
    })
}

function switchFilter(target) {           // переход по категориям
    if (target.classList.contains('filter__button') && !target.classList.contains('filter__button--selected')) {
        document.querySelectorAll(('.filter__button')).forEach(function (button) {
            button.classList.toggle('filter__button--selected', button.dataset.filter === target.dataset.filter);
        });
        updateFilter(target.dataset.filter);
    }
}

function changeCardCategory(icon, card) {      // изменение категории карточки в соответствии с выбранной иконкой
    const iconClassList = icon.classList;
    const cardId = card.id;
    let cardClassList = card.classList;

    if (iconClassList.contains('card__actions-item--hide')) {
        if (cardClassList.contains('card--semitransparent')) {
            hiddenCards.splice(hiddenCards.indexOf(cardId), 1);
        } else {
            hiddenCards.push(cardId);
        }
        cardClassList.toggle('card--semitransparent');
        cardClassList.toggle('card--hidden', !visibilityState.checked);
        localStorage['hiddenCards'] = JSON.stringify(hiddenCards);
    } else if (iconClassList.contains('card__actions-item--like')) {
        if (cardClassList.contains('card--favourite')) {
            favouriteCards.splice(favouriteCards.indexOf(cardId), 1);
        } else {
            favouriteCards.push(cardId);
        }
        cardClassList.toggle('card--favourite');
        localStorage['favouriteCards'] = JSON.stringify(favouriteCards);
    } else if (iconClassList.contains('card__actions-item--compare')) {
        if (cardClassList.contains('card--comparable')) {
            comparableCards.splice(comparableCards.indexOf(cardId), 1);
        } else {
            comparableCards.push(cardId);
        }
        cardClassList.toggle('card--comparable');
        localStorage['comparableCards'] = JSON.stringify(comparableCards);
    }
    let filter = document.querySelector('.filter__button--selected').dataset.filter;
    updateFilter(filter);
}

document.addEventListener("DOMContentLoaded", displayFromStorage);
filter.addEventListener('click', e => switchFilter(e.target));

visibilityState.addEventListener('change', checkVisibilityState);
cards.forEach(function (card) {         //нажатие на иконку и добавление/удаление категории для карты
    card.addEventListener('click', e => changeCardCategory(e.target, e.currentTarget))
});



