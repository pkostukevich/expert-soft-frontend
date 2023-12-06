const filter = document.querySelector('.cards-filter');
const cards = document.querySelectorAll('.card');
const visibilityState = document.querySelector('#show');

let extraCards = [];   // дополнительные карты, не подходящие под категорию
let hiddenCards = [];
let favouriteCards = [];
let comparableCards = [];

function checkVisibilityState(){       //проверка чекбокса
    if(visibilityState.checked) {
        hiddenCards.forEach(function (card) {
            card.classList.remove('hidden');
        });
    }
    else {
        hiddenCards.forEach(function (card) {
            card.classList.add('hidden');
        });
    }
}

function showFilteredCard(item){
    item.classList.remove('extra');
    extraCards.splice(extraCards.indexOf(item), 1);
}

function hideFilteredCard(item){
    item.classList.add('extra');
    extraCards.push(item);
}

function updateFilter(filter){         //вызывается при переходе по категориям и при нажатии иконки (удаление из категории)
    cards.forEach(function (item, i){
        switch(filter){
            case 'all':
                showFilteredCard(item);
                break;
            case 'favourites':
                if (favouriteCards.includes(item)){
                    showFilteredCard(item);
                }
                else{
                    hideFilteredCard(item);
                }
                break;
            case 'comparison':
                if (comparableCards.includes(item)){
                    showFilteredCard(item);
                }
                else{
                    hideFilteredCard(item);
                }
                break
        }
    })
}

filter.addEventListener('click', function(e){    //переход по категориям
    extraCards = [];
    let target = e.target;
    if(target.classList.contains('filter__button') && !target.classList.contains('filter__button--selected')){
        document.querySelectorAll(('.filter__button')).forEach(function (button){
            if (button.dataset.filter === target.dataset.filter) {
                button.classList.add('filter__button--selected');
            }
            else{
                button.classList.remove('filter__button--selected');
            }
        });
        updateFilter(target.dataset.filter);
    }
})

visibilityState.addEventListener('change', function(e) {
    checkVisibilityState()
});

cards.forEach(function (card){         //нажатие на иконку и добавление карты в категорию
    card.addEventListener('click', function(e) {
        let targetClassList = e.target.classList;
        let card = e.currentTarget;
        if (targetClassList.contains('card__actions-item--hide')){
            if (targetClassList.contains('card__actions-item--hide--active')){
                hiddenCards.splice(hiddenCards.indexOf(card), 1);
            }
            else{
                hiddenCards.push(card);
            }
            targetClassList.toggle('card__actions-item--hide--active');
            card.classList.toggle('card--hidden');
            checkVisibilityState();
        }
        else if (targetClassList.contains('card__actions-item--like')) {
            if (targetClassList.contains('card__actions-item--like--active')) {
                favouriteCards.splice(favouriteCards.indexOf(card), 1);
            } else {
                favouriteCards.push(card);
            }
            targetClassList.toggle('card__actions-item--like--active')
        }
        else if (targetClassList.contains('card__actions-item--compare')) {
            if (targetClassList.contains('card__actions-item--compare--active')) {
                comparableCards.splice(comparableCards.indexOf(card), 1);
            } else {
                comparableCards.push(card);
            }
            targetClassList.toggle('card__actions-item--compare--active')
        }
        let filter = document.querySelector('.filter__button--selected').dataset.filter;
        updateFilter(filter);
    })
})



