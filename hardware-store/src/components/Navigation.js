import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import Badge from '@material-ui/core/Badge';
import { connect } from 'react-redux';

class Navigation extends Component{

    constructor(props){
        super(props);
        this.state={
            admin: true,
            client: true
        }
    }

    componentDidMount(){
        this.user();
    }

    user(){
        if(this.props.role === 'admin'){
            this.setState(({admin})=>{
                return{
                    admin: !admin
                }
            })
        }else{
            this.setState(({client})=>{
                return{
                    client: !client
                }
            })
        }
    }

    render(){
        const { admin, client } = this.state;
        const { login } = this.props.match.params;
        return(
            <Navbar expand="xl" bg="dark" variant="dark">
                <Navbar.Collapse className='m-2' id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item hidden={admin}>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/home'>Главная</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/products'>Список товаров</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/brands'>Бренды</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/types'>Категории</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/suppliers'>Поставщики</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/supplies'>Поставки</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/orders'>Заказы</NavLink>
                        </Nav.Item>
                        <Nav.Item hidden={client}>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill'  to={'/client/' + login + '/home'}>Главная</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to={'/client/' + login + '/products'}>Список товаров</NavLink>
                        </Nav.Item>
                        
                    </Nav>
                    <Nav>
                        <Nav.Item hidden={client}>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to={'/client/' + login + '/shoppingCart'}><Badge badgeContent={this.props.items.reduce((accumulator, product) => {
                                                                                                                                                                return accumulator + product.quantity;
                                                                                                                                                                }, 0)} color="secondary" showZero>{<ShoppingCartRoundedIcon/>}</Badge></NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to={'/client/' + login + '/help'}>{<HelpOutlineIcon/>}</NavLink>
                        </Nav.Item>
                        <Nav.Item hidden={admin}>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/help'>{<HelpOutlineIcon/>}</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/'>Выход</NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return { items: state.cartItems };
};

export default withRouter(connect(mapStateToProps)(Navigation));