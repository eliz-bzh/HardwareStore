import React, {Component} from 'react';
import {Form,Button, Tabs, Tab, Container, Row,Col, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import {BrowserRouter, Route, Switch, Redirect, NavLink} from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import { createBrowserHistory } from 'history';
import Navigation from '../Navigation';

export default class LoginForm extends Component{

    constructor(props){
        super(props);
        this.state={radioValue:1, error:''}
    }
    
    handleSubmit(event){
        event.preventDefault();
        if((event.target.login.value === 'client') && (event.target.password.value === 'client')){
            const customHistory = createBrowserHistory();
            return customHistory.go(customHistory.push('/client/home'));
        }
    }

    handleSubmitAdmin(event){
        event.preventDefault();
        if((event.target.login.value === 'admin') && (event.target.password.value === 'qwerty')){
            const customHistory = createBrowserHistory();
            return customHistory.go(customHistory.push('/admin/home'));
        }
    }

    render(){
        return(
            <Container className='mt-5 d-flex flex-column justify-content-center align-items-center'>
                <Row>
                    <Col>
                        <h1 align='center'>Аккаунт</h1>
                        <hr/>
                        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                            <ToggleButton value={1} variant="outline-dark" checked={this.state.radioValue === 1} name="radio" onChange={(e) => this.setState({radioValue: 1})}>Клиент</ToggleButton>
                            <ToggleButton value={2} variant="outline-dark" checked={this.state.radioValue === 2} name="radio" onChange={(e) => this.setState({radioValue: 2})}>Администратор</ToggleButton>
                        </ToggleButtonGroup>
                        {(this.state.radioValue === 1) ? (
                            <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                
                                <Form.Label>Логин</Form.Label>
                                <Form.Control name='login' type="text" placeholder="Логин" />
                                    
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control name='password' type="password" placeholder="Пароль" />
                                <br/>
                                <Button type='submit' variant='outline-dark' size="lg" block>Войти</Button>
                                <br/>
                                <NavLink className='d-flex justify-content-center' to='/registration'>Регистрация</NavLink>
                            </Form.Group>
                        </Form>
                        ):
                        (
                            <Form onSubmit={this.handleSubmitAdmin}>
                                <Form.Group>
                                    
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control name='login' type="text" placeholder="Логин" />
                                        
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control name='password' type="password" placeholder="Пароль" />
                                    <br/>
                                    <Button type='submit' variant='outline-dark' size="lg" block>Войти</Button>
                                </Form.Group>
                            </Form>
                        )
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}