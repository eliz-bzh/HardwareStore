import React, {Component} from 'react';
import {Form,Button, Tabs, Tab, Alert, Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginForm from './LoginForm';
import { createBrowserHistory } from 'history';

export default class RegistrationForm extends Component{

    constructor(props){
        super(props);
        this.state={error:''}
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        if(event.target.password.value === event.target.password2.value){
            const customHistory = createBrowserHistory();
            return customHistory.go(customHistory.push('/'));
        }else{
            this.setState({error: 'Пароли не совпадают'});
        }
    }

    render(){
        return(
            <Container className='mt-5 d-flex flex-column justify-content-center align-items-center'>
                <Row>
                    <Col>
                        <h1 align='center'>Регистрация</h1>
                        <hr/>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Label>Логин</Form.Label>
                            <Form.Control type="text" name='login' required autoFocus placeholder="Логин" />
                    
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" name="password" required placeholder="Пароль" />
            
                            <Form.Label>Повтор пароля</Form.Label>
                            <Form.Control type="password" name="password2" required placeholder="Повтор пароля" />
                            <br/>
                            {(this.state.error !== '')?(<Alert variant='danger'>{this.state.error}</Alert>): ''}
                            <br/>
                            <Button variant='outline-dark' size="lg" block type="submit">Зарегистрироваться</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            
        )
    }
}