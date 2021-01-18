import React from 'react'
import Aux from '../../../../hoc/Aux'
import Button from '../../../UI/Button/Button'

const orderSummary =(props)=> {
const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey=>{
            return (
                <li key = {igKey}> 
                <span style  = {{textTransform: 'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
                </li>  )

})

    return (
        <Aux>
            <h3>Your Order</h3>
            <p> A delicious burger with the following ingredients</p>
            <ui> {ingredientSummary}</ui>
            <p> <strong>Total Price: {props.price.toFixed('2')}</strong></p>
            <p> Continue to Checkout?</p>
            <Button 
                style = {{color: "red"}}
                clicked = {props.purchaseCanceled}
                >CANCEL</Button>
            <Button 
                 style = {{color:"green"}}
                clicked = {props.purchaseContinued}
                >CONTINUE</Button>
       </Aux>

)
}

export default orderSummary