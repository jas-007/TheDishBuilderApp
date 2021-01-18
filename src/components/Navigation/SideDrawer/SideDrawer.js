import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems'
import './SideDrawer.css'
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'



const sideDrawer = (props) =>{
return (
<Aux>
    <Backdrop show  = {props.open}  clicked = {props.closed}/> 
 {props.open ?
    <div className = 'SideDrawer Open' >
        <div className = 'Logo' >
            <Logo/>
        </div>
        <nav>
            <NavigationItems/>
        </nav>
    </div>:
     <div className = 'SideDrawer Close' >
        <div className = 'Logo' >
            <Logo/>
        </div>
        <nav>
            <NavigationItems/>
        </nav>
    </div>}
</Aux>
    )

}

export default sideDrawer;