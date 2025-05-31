import {menuArray} from '/data.js'
import { selectedItemsPricing } from './selectedItemsPricing.js'


const menuItemsEl = document.getElementById('menu-items')
const orderDetailsEl = document.getElementById('order-details')
const thankYouCardEl = document.getElementById('thank-you-card')


menuItemsEl.innerHTML = renderMenu()

document.addEventListener('click', (e)=>{

    if(e.target.dataset.add || e.target.dataset.remove){
        addOrRemoveItemEvenHandler(e)
    }

    if(e.target.id === 'complete-order' || e.target.id === 'pay')
    {
        handleCompleteOrder(e) 
    }


})

function handleCompleteOrder(e){

    const cardDetailsEl = document.getElementById('card-details')

    if(e.target.id === 'complete-order')
    {
            cardDetailsEl.classList.remove('hidden')
    }

    else if(e.target.id === 'pay')
    {   
        e.preventDefault();
        const customerName = cardDetailsEl.querySelector('input[name="Customername"]').value;  
        const form = cardDetailsEl.querySelector('form')
        form.reset()
        cardDetailsEl.classList.add('hidden')
        selectedItemsPricing.reset()
        renderOrder()
        renderThankYou(customerName)


    }
}

function renderThankYou(name)
{
    const tName = thankYouCardEl.querySelector('p span')
    tName.textContent= name
    thankYouCardEl.classList.remove('hidden')

}

function addOrRemoveItemEvenHandler(e){
    
    if(e.target.dataset.add === 'Pizza'){
        selectedItemsPricing.incrementPizzaPrice()
    }else if(e.target.dataset.add === 'Hamburger'){
        selectedItemsPricing.incrementBurgerPrice()
    }else if(e.target.dataset.add === 'Beer'){
        selectedItemsPricing.incrementBeerPrice()
    }

    if(e.target.dataset.remove === 'pizza'){
        selectedItemsPricing.decrementPizzaPrice()
    }else if(e.target.dataset.remove=== 'burger'){
        selectedItemsPricing.decrementBurgerPrice()
    }
    else if(e.target.dataset.remove === 'beer'){
        selectedItemsPricing.decrementBeerPrice()
    }
    
    renderOrder()
}


function renderOrder(){

    const orderItemsListEl = document.getElementById('order-items-list')
    const pizzaDivEl = document.getElementById('order-pizza-div')
    const burgerDivEl = document.getElementById('order-burger-div')
    const beerDivEl = document.getElementById('order-beer-div')

    if(selectedItemsPricing.pizzaPrice>0){
        const currPizzaPrice = orderItemsListEl.querySelector("#order-pizza-cost")
        currPizzaPrice.textContent = `$${selectedItemsPricing.pizzaPrice}`
        pizzaDivEl.classList.remove('hidden')
    }else{
       pizzaDivEl.classList.add('hidden')
    }

    if(selectedItemsPricing.burgerPrice>0){
        const currBurgerPrice = orderItemsListEl.querySelector("#order-burger-cost")
        currBurgerPrice.textContent = `$${selectedItemsPricing.burgerPrice}`
        burgerDivEl.classList.remove('hidden')
    }else{
        burgerDivEl.classList.add('hidden')
    }

    if(selectedItemsPricing.beerPrice>0){
        const currBeerPrice = orderItemsListEl.querySelector("#order-beer-cost")
        currBeerPrice.textContent = `$${selectedItemsPricing.beerPrice}`
        beerDivEl.classList.remove('hidden')
    }else{
        beerDivEl.classList.add('hidden')
    }

    selectedItemsPricing.totalPriceCal()
    document.getElementById('total-cost').textContent = `$${selectedItemsPricing.totalPrice}`

    if(selectedItemsPricing.totalPrice>0){
        orderDetailsEl.classList.remove('hidden')
        thankYouCardEl.classList.add('hidden')

    }else{
        orderDetailsEl.classList.add('hidden')
    }
    
    
}

function renderMenu()
{
    const menu = menuArray.map((m) => {

        const ingredients = m.ingredients.join(',')
        return `
            <div class="item-detail">
                    <img src="images/${m.image}" class="item-img">
                    <div class="item-info">
                        <h2> ${m.name} </h2>
                        <p class="ingredients-style"> ${ingredients} </p>
                        <p class="cost-syle"> $${m.price} </p>
                    </div>                   
                    <button class="add-btn" data-add="${m.name}"> + </button>
                </div>
        `
    }).join('')

    return menu    

}