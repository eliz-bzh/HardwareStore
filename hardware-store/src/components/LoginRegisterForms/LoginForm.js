import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, ToggleButtonGroup, ToggleButton, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import { ToggleButtons } from '..';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = { radioValue: 0, error: '' }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://localhost:44365/api/Client/getByLogin/${event.target.login.value}`)
            .then(res => {
                if (res.data !== '') {
                    if (event.target.password.value === res.data.password) {
                        this.setState({ error: '' });
                        const customHistory = createBrowserHistory();
                        return customHistory.go(customHistory.push(`/client/${event.target.login.value}/home`));
                    } else {
                        this.setState({ error: 'Неверный пароль' });
                    }
                } else {
                    this.setState({ error: 'Пользователь не зарегистрирован' })
                }
            })
    }

    handleSubmitAdmin = (event) => {
        event.preventDefault();
        if ((event.target.loginAdmin.value === 'admin') && (event.target.passwordAdmin.value === 'qwerty')) {
            this.setState({ error: '' })
            const customHistory = createBrowserHistory();
            return customHistory.go(customHistory.push('/admin/home'));
        } else {
            this.setState({ error: 'Неверный логин или пароль' })
        }
    }

    render() {
        const { radioValue, error } = this.state;
        return (
            <Container className='mt-5 d-flex flex-column justify-content-center align-items-center'>
                <Row>
                    <Col>
                        <h1 align='center'>Аккаунт</h1>
                        <hr />
                        <ToggleButtons items={['Клиент', 'Администратор']} variant='outline-dark' value={radioValue} onChange={(radioValue) => this.setState({ radioValue })} />
                        {(radioValue === 0) ? (
                            <Form style={{ display: 'block' }} onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control required name='login' type="text" placeholder="Логин" defaultValue='' />
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control required name='password' type="password" placeholder="Пароль" defaultValue='' />
                                    <br />
                                    {(error !== '') ? (<Alert className='d-flex justify-content-center' variant='danger'>{error}</Alert>) : ''}
                                    <br />
                                    <Button type='submit' variant='outline-dark' size="lg" block>Войти</Button>
                                    <br />
                                    <NavLink className='d-flex justify-content-center' to='/registration'>Регистрация</NavLink>
                                </Form.Group>
                            </Form>
                        ) :
                            (
                                <Form onSubmit={this.handleSubmitAdmin}>
                                    <Form.Group>

                                        <Form.Label>Логин</Form.Label>
                                        <Form.Control required name='loginAdmin' type="text" placeholder="Логин" defaultValue='' />

                                        <Form.Label>Пароль</Form.Label>
                                        <Form.Control required name='passwordAdmin' type="password" placeholder="Пароль" defaultValue='' />
                                        <br />
                                        {(error !== '') ? (<Alert className='d-flex justify-content-center' variant='danger'>{error}</Alert>) : ''}
                                        <br />
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

