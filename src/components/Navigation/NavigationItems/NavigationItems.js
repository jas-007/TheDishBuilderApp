import React from 'react'
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = ()=>(
           <ul className ='NavigationItems'>
            <NavigationItem link = '/' active>DishBuilder</NavigationItem>
            <NavigationItem link  ='/'>Checkout</NavigationItem>

            
       </ul>

)


export default navigationItems