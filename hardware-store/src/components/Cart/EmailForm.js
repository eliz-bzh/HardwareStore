import React from 'react';
import { Carousel } from '..';

const EmailForm = ({ user, order, products }) => {

    const date = (dateOrder) => {
        var date = new Date(dateOrder);
        return date.toLocaleDateString();
    }
    return (
        <div>
            <h1>Здравствуйте, {user.name} {user.surname}.</h1><br />
            <h2>Ваш заказ №<b>{order.id}</b> от {date(order.date)} на сумму <b>{order.totalPrice}</b>р.</h2>
            <h1>Продукты</h1>
            <hr />
            {products && products.map(prod => {
                <div>
                    <br />
                    <Carousel images={prod.images} height='150px' width='150px' />
                    <h3>{prod.name}</h3>
                    <h6>Кол-во: {prod.quantity}</h6>
                    <h4><span style={{ color: 'red' }}>{prod.price}</span> BYN</h4><br />
                </div>
            })}
            <hr />
            <h1>С наилучшими пожеланиями, интернет-магазин i-Bozh shop.</h1>
        </div>
    );
}

export default EmailForm;