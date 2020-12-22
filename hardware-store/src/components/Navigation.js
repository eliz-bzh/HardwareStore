import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';

export default class Navigation extends Component{

    constructor(props){
        super(props);
        this.state={
            admin: true, client: true
        }
    }

    componentDidMount(){
        this.adminHide();
    }

    adminHide(){
        console.log('admin ' + this.props.role);
        if(this.props.role === 'admin'){
            this.setState({admin: false})
        }else{
            this.setState({client: false})
        }
    }

    
    render(){
        const {admin, client} = this.state;
        return(
            <Navbar expand="xl" bg="dark" variant="dark">
                <Navbar.Collapse className='m-2' id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item hidden={admin}>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/home'>Главная</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/products'>Список товаров</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/brands'>Бренды</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/types'>Категории</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/supplies'>Поставки</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/suppliers'>Поставщики</NavLink>
                        </Nav.Item>
                        <Nav.Item hidden={client}>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/client/home'>Главная</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/client/products'>Список товаров</NavLink>
                        </Nav.Item>
                        
                    </Nav>
                    <Nav>
                        <Nav.Item hidden={client}>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/client/shoppingCart'>{<ShoppingCartRoundedIcon/>}Корзина</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/help'>{<HelpOutlineIcon/>}</NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}