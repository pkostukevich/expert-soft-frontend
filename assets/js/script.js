const filter = document.querySelector('.cards-filter');
const cards = document.querySelectorAll('.card');
const visibilityState = document.querySelector('#show');

var extraCards = [];   // дополнительные карты, не подходящие под категорию
var hiddenCards = [];
var favouriteCards = [];
var comparableCards = [];

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

visibilityState.addEventListener('change', function(e) {
    checkVisibilityState()
});

function updateFilter(filter){         //вызывается при переходе по категориям и при нажатии иконки (удаление из категории)
    cards.forEach(function (item, i){
        switch(filter){
            case 'all':
                item.classList.remove('extra');
                extraCards.splice(extraCards.indexOf(item), 1);
                break;
            case 'favourites':
                if (favouriteCards.includes(item)){
                    item.classList.remove('extra');
                    extraCards.splice(extraCards.indexOf(item), 1);
                }
                else{
                    item.classList.add('extra');
                    extraCards.push(item);
                }
                break;
            case 'comparison':
                if (comparableCards.includes(item)){
                    item.classList.remove('extra');
                    extraCards.splice(extraCards.indexOf(item), 1);
                }
                else{
                    item.classList.add('extra');
                    extraCards.push(item);
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

cards.forEach(function (card){         //нажатие на иконку и добавление карты в категорию
    card.addEventListener('click', function(e) {
        let target = e.target;
        let card = e.currentTarget;
        if (target.classList.contains('card__actions-item--hide')){
            if (target.classList.contains('card__actions-item--hide--active')){
                hiddenCards.splice(hiddenCards.indexOf(card), 1);
            }
            else{
                hiddenCards.push(card);
            }
            target.classList.toggle('card__actions-item--hide--active');
            card.classList.toggle('card--hidden');
            checkVisibilityState();
        }
        else if (target.classList.contains('card__actions-item--like')) {
            if (target.classList.contains('card__actions-item--like--active')) {
                favouriteCards.splice(favouriteCards.indexOf(card), 1);
            } else {
                favouriteCards.push(card);
            }
            target.classList.toggle('card__actions-item--like--active')
        }
        else if (target.classList.contains('card__actions-item--compare')) {
            if (target.classList.contains('card__actions-item--compare--active')) {
                comparableCards.splice(comparableCards.indexOf(card), 1);
            } else {
                comparableCards.push(card);
            }
            target.classList.toggle('card__actions-item--compare--active')
        }
        let filter = document.querySelector('.filter__button--selected').dataset.filter;
        updateFilter(filter);
    })
})


