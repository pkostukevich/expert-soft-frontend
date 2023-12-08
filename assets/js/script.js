const filter = document.querySelector('.cards-filter');
const cards = document.querySelectorAll('.card');
const visibilityState = document.querySelector('#show');

let hiddenCards = [];
let favouriteCards = [];
let comparableCards = [];

function checkVisibilityState(){          //проверка чекбокса
    hiddenCards.forEach(function (card) {
        card.classList.toggle('card--hidden', !visibilityState.checked);
    });
}

function updateFilter(filter){         //вызывается при переходе по категориям и при нажатии иконки (удаление из категории)
    cards.forEach(function (item){
        switch(filter){
            case 'all':
                item.classList.remove('extra');
                break;
            case 'favourites':
                if (favouriteCards.includes(item)){
                    item.classList.remove('extra');
                }
                else{
                    item.classList.add('extra');
                }
                break;
            case 'comparison':
                if (comparableCards.includes(item)){
                    item.classList.remove('extra');
                }
                else{
                    item.classList.add('extra');
                }
                break
        }
    })
}

filter.addEventListener('click', function(e){    //переход по категориям
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

visibilityState.addEventListener('change', function() {
    checkVisibilityState()
});

cards.forEach(function (card){         //нажатие на иконку и добавление карты в категорию
    card.addEventListener('click', function(e) {
        let iconClassList = e.target.classList;
        let card = e.currentTarget;
        let cardClassList = card.classList;

        if (iconClassList.contains('card__actions-item--hide')){
            if (cardClassList.contains('card--semitransparent')){
                hiddenCards.splice(hiddenCards.indexOf(card), 1);
            }
            else{
                hiddenCards.push(card);
            }
            cardClassList.toggle('card--semitransparent');
            checkVisibilityState();
        }
        else if (iconClassList.contains('card__actions-item--like')) {
            if (cardClassList.contains('card--favourite')) {
                favouriteCards.splice(favouriteCards.indexOf(card), 1);
            } else {
                favouriteCards.push(card);
            }
            cardClassList.toggle('card--favourite')
        }
        else if (iconClassList.contains('card__actions-item--compare')) {
            if (cardClassList.contains('card--comparable')) {
                comparableCards.splice(comparableCards.indexOf(card), 1);
            } else {
                comparableCards.push(card);
            }
            cardClassList.toggle('card--comparable');
        }
        let filter = document.querySelector('.filter__button--selected').dataset.filter;
        updateFilter(filter);
    })
})



