import {menuArray} from '/data.js'

export const selectedItemsPricing = {
    pizzaPrice: 0,
    burgerPrice: 0,
    beerPrice:0,
    totalPrice:0,

    incrementPizzaPrice : function(){
        this.pizzaPrice += menuArray[0].price
    },

    incrementBurgerPrice : function(){
        this.burgerPrice += menuArray[1].price
    },

    incrementBeerPrice : function(){
        this.beerPrice += menuArray[2].price
    },

    decrementPizzaPrice : function(){

        if(this.pizzaPrice>0){
            this.pizzaPrice -= menuArray[0].price
        }
        
    },
    decrementBurgerPrice : function(){

        if(this.burgerPrice>0){
            this.burgerPrice -= menuArray[1].price
        }
        
    },
    decrementBeerPrice : function(){

        if(this.beerPrice>0){
            this.beerPrice -= menuArray[2].price
        }     
    },
    totalPriceCal : function(){
        this.totalPrice = (this.pizzaPrice+this.burgerPrice+this.beerPrice)
    },
    reset : function(){
        this.pizzaPrice = 0
        this.burgerPrice = 0
        this.beerPrice = 0
        this.totalPrice = 0
    }
}