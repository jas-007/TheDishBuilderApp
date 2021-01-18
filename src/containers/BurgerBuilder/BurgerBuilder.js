import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Layout/Burger/Burger'
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Layout/Burger/OrderSummary/OrderSummary'
import BaseLink from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7    
}
class BurgerBuilder extends Component
{
state = {
    ingredients:null,
    totalPrice: 4,
    purchasable:false,
    purchasing: false,
    loading: false,
    error:false
}

componentDidMount =()=>{
    axios.get('https://burgerbuilder-4a8e9.firebaseio.com/Ingredients.json')
        .then(response =>
                this.setState({ingredients: response.data}))
        .catch(error=>{
                this.setState({error:true})})

}


purchaseHandler=()=>{
this.setState({purchasing: true})
}
purchaseCancelHandler= () =>{
this.setState({purchasing: false})
}

purchaseContinuedHandler =() =>{
    // this.setState({ loading: true })
    // const order = {
    //     ingredients: this.state.ingredients,
    //     price: this.state.totalPrice,
    //     customer:{
    //         name: "Snigdha  Chathley",
    //         address: {
    //             street: '1430 Pembina Hwy',
    //             zipCode: 'R3T2C1',
    //             country: 'Canada'
    //                 }, 
    //             email: 'snigdha.chathley83@gmail.com'
    //         },
    //     deliveryMethod:'Fastest'
    // };
    // BaseLink.post('/orders.json', order)

    // .then(response => 
    //     this.setState({loading:false, purchasing: false}))
    // .catch(error =>
    //     this.setState({loading:false, purchasing:false}))
        this.props.history.push('/checkout')
};

    updatePurchaseState(ingredients){
    const sum = Object.keys(ingredients)
    .map(igKey =>{
        return ingredients[igKey]
    })
        .reduce((sum,el)=>{
             return sum+el;
         }
             ,0);
        this.setState({ purchasable:sum > 0 })
}

    addIngredientHandler = (type)=>{
    const oldCount  = this.state.ingredients[type];
    const updatedCount =  oldCount + 1;
    const updatedIngredients = {
    ...this.state.ingredients
};
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice+priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients}) 
    this.updatePurchaseState(updatedIngredients);

}
    removeIngredientHandler = (type)=>{

    const   oldCount  = this.state.ingredients[type];
    if(oldCount<=0){
    return }
    const   updatedCount =  oldCount - 1;
    const   updatedIngredients = {
    ...this.state.ingredients
};
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice-priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients}) 
    this.updatePurchaseState(updatedIngredients);

}
    render(){
    const disabledInfo = {
        ...this.state.ingredients       
};
        for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key]<= 0   
}

let orderSummary = null;  
let burger  = this.state.error ?<p>Ingredients can not be loaded</p>:<Spinner/>

if(this.state.ingredients){
    burger = (
        <Aux>
        <Burger ingredients = {this.state.ingredients}/>
            <BuildControls
                ingredientAdded = {this.addIngredientHandler}       
                ingredientRemoved  = {this.removeIngredientHandler} 
                disabled = {disabledInfo}
                purchasable ={this.state.purchasable}
                price = {this.state.totalPrice}
                ordered = {this.purchaseHandler}
                />
        </Aux>
    )
        orderSummary =  <OrderSummary  
                 ingredients = {this.state.ingredients}
                 purchaseCanceled = {this.purchaseCancelHandler}
                 purchaseContinued = {this.purchaseContinuedHandler}  
                          price = {this.state.totalPrice}/>    
}
       if(this.state.loading){
            orderSummary = <Spinner/>}

        return(
 
          <Aux>
            <Modal  show =          {this.state.purchasing} 
                    modalClosed =   {this.purchaseCancelHandler}>
               {orderSummary}  
        </Modal>  
        {burger}
            
          </Aux>

               )
        }
}
 
export default withErrorHandler(BurgerBuilder, axios);