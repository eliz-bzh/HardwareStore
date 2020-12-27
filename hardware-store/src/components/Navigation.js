import React, {useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import Badge from '@material-ui/core/Badge';

const Navigation=({role})=>{

        const [admin, setAdmin ] = useState(true);
        const [client, setClient ] = useState(true);
        let { login } = useParams();
        const hideAdmin = (role === 'admin')? (()=>setAdmin(!admin)) : (client)
        const hideClient = (role === 'client')? (()=>setClient(!client)) : (admin)

        return(
            <Navbar expand="xl" bg="dark" variant="dark">
                <Navbar.Collapse className='m-2' id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item hidden={hideAdmin}>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/home'>Главная</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/products'>Список товаров</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/brands'>Бренды</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/types'>Категории</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/supplies'>Поставки</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/admin/suppliers'>Поставщики</NavLink>
                        </Nav.Item>
                        <Nav.Item hidden={hideClient}>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill'  to={'/client/' + login + '/home'}>Главная</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to={'/client/' + login + '/products'}>Список товаров</NavLink>
                        </Nav.Item>
                        
                    </Nav>
                    <Nav>
                        <Nav.Item hidden={hideClient}>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to={'/client/' + login + '/shoppingCart'}><Badge badgeContent={Object.keys([1,2]).length} color="secondary" showZero>{<ShoppingCartRoundedIcon/>}</Badge></NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to={'/client/' + login + '/help'}>{<HelpOutlineIcon/>}</NavLink>
                        </Nav.Item>
                        <Nav.Item hidden={hideAdmin}>
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
export default Navigation;
