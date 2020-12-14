import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';

export default class Navigation extends Component{
    
    render(){
        return(
            <Navbar expand="xl" bg="dark" variant="dark">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/home'>Главная</NavLink>
                        <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/products'>Список товаров</NavLink>
                        <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/brands'>Бренды</NavLink>
                        <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/types'>Категории</NavLink>
                        <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/supplies'>Поставки</NavLink>
                        <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/suppliers'>Поставщики</NavLink>
                    </Nav>
                    <Nav>
                        <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/shoppingCart'>{<ShoppingCartRoundedIcon/>}Корзина</NavLink>
                        <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/help'>{<HelpOutlineIcon/>}</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}