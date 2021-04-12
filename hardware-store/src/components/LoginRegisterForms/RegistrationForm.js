import React, { Component } from 'react';
import { Form, Button, ButtonGroup, Alert, Container, Row, Col } from 'react-bootstrap';
import { createBrowserHistory } from 'history';
import axios from 'axios';

export default class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = { error: '' }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.password.value === event.target.password2.value) {

            axios.post(`https://localhost:5001/api/Client/create`, {

                name: event.target.name.value,
                surname: event.target.surname.value,
                adress: event.target.city.value + ', ' + event.target.street.value + ', д. ' + event.target.house.value + ', кв. ' + event.target.flat.value,
                number: event.target.number.value,
                login: event.target.login.value,
                password: event.target.password.value

            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.setState({ error: '' });
                    //const customHistory = createBrowserHistory();
                    //return customHistory.go(customHistory.push('/'));
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ error: 'Пользователь уже существует' });
                });
        } else {
            this.setState({ error: 'Пароли не совпадают' });
        }
    }

    render() {
        return (
            <Container className='mt-5 d-flex flex-column justify-content-center align-items-center'>
                <Row>
                    <Col>
                        <h1 align='center'>Регистрация</h1>
                        <hr />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Label>Ваше имя</Form.Label>
                            <Form.Control type="text" name='name' required autoFocus placeholder="Ваше имя" />

                            <Form.Label>Ваша фамилия</Form.Label>
                            <Form.Control type="text" name='surname' required autoFocus placeholder="Ваше фамилия" />

                            <Row>
                                <Col>
                                    <Form.Label>Город</Form.Label>
                                    <Form.Control type="text" name='city' required autoFocus placeholder="Город"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>Улица</Form.Label>
                                    <Form.Control type="text" name='street' required autoFocus placeholder="Улица"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>Номер дома</Form.Label>
                                    <Form.Control type="number" name='house' required autoFocus placeholder="Номер дома"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>Номер квартиры</Form.Label>
                                    <Form.Control type="number" name='flat' required autoFocus placeholder="Номер квартиры"></Form.Control>
                                </Col>
                            </Row>


                            <Form.Label>Номер телефона</Form.Label>
                            <Form.Control type="tel" name="number" defaultValue='+375' required maxLength={13}></Form.Control>

                            <Form.Label>Логин</Form.Label>
                            <Form.Control type="text" name='login' required autoFocus placeholder="Логин" />

                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" name="password" required placeholder="Пароль" />

                            <Form.Label>Повтор пароля</Form.Label>
                            <Form.Control type="password" name="password2" required placeholder="Повтор пароля" />
                            <br />
                            {(this.state.error !== '') ? (<Alert className='d-flex justify-content-center' variant='danger'>{this.state.error}</Alert>) : ''}
                            <br />
                            <ButtonGroup className='d-flex justify-content-center align-items-center' variant='horizontal'>
                                <Button className='active' variant='outline-dark' size="lg" type="submit">Зарегистрироваться</Button>
                                <Button variant='outline-dark' size="lg" onClick={() => {
                                    const customHistory = createBrowserHistory();
                                    return customHistory.go(customHistory.push('/'));
                                }}>
                                    Отмена</Button>
                            </ButtonGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>

        )
    }
}