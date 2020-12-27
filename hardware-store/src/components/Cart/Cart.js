import React, {Component} from 'react';
import {Avatar} from '@material-ui/core';
import axios from 'axios';
import {ButtonToolbar, ButtonGroup, Button, Table, Alert} from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';

export default class Cart extends Component{

    constructor(props){
        super(props);
        this.state = {
            user: {}, checkShow: false, productsCart: [
                {id:1, image:'https://i.pinimg.com/originals/ab/b6/a8/abb6a800ab2193fcedd9bda566b7402c.jpg', name:'Liz', price: 1},
                {id:2, image:'https://i.pinimg.com/originals/ab/b6/a8/abb6a800ab2193fcedd9bda566b7402c.jpg', name:'Liz2', price: 2},
                {id:3, image:'https://i.pinimg.com/originals/ab/b6/a8/abb6a800ab2193fcedd9bda566b7402c.jpg', name:'Liz3', price: 3},
                {id:4, image:'https://i.pinimg.com/originals/ab/b6/a8/abb6a800ab2193fcedd9bda566b7402c.jpg', name:'Liz4', price: 4}
            ]
        }
    }

    componentDidMount(){
        this.user();
    }
    
    componentDidUpdate(){
        this.user();
    }

    user(){
        const { match } = this.props;
        const { login } = match.params;
        axios.get(`https://localhost:44365/api/Client/getByLogin/` + login)
        .then(res =>{
            this.setState({user: res.data})
        })
    }

    requestOrder(){
        console.log('Заказ оформлен');
        const { checkShow } = this.state;
        this.setState({checkShow: !checkShow});
    }

    deleteItem=(id)=>{
        this.setState(({productsCart})=>{
            const idx = productsCart.findIndex((el)=> el.id === id);
            const  newArray = [...productsCart.slice(0, idx), ...productsCart.slice(idx + 1)];
            return{
                productsCart: newArray
            }
        })
    };

    render(){
        const { user, productsCart } = this.state;
        const { login } = this.props.match.params;
        return(
            <div>
                <h1 className='mt-2 d-flex justify-content-left align-items-center'>
                    <Avatar className='mr-2' style={{backgroundColor: '#FF7700'}}>{(`${user.name}`).split('')[0].toLocaleUpperCase()}</Avatar>
                    {user.name + ' ' + user.surname } 
                </h1>
                <h1 className='mt-2 d-flex justify-content-center align-items-center'>Корзина</h1>
                <ButtonToolbar className='mb-2 float-right'>
                    <ButtonGroup>
                        <Button variant="outline-dark" onClick={()=>{this.requestOrder()}}>Оформить заказ</Button>
                    </ButtonGroup>
                </ButtonToolbar>
                <h5>Amount: {productsCart.length}</h5>
                
                <h5>Total price: {productsCart.reduce((accumulator, product) => {
                                        return accumulator + product.price;
                                        }, 0)}</h5>
                {(productsCart && productsCart.length !== 0) ? ( 
                    <Table className='mt-4' size='sm'>
                        <thead>
                            <tr>
                                <th>Продукт</th>
                                <th>Название</th>
                                <th>Цена</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsCart.map(product=>
                                <tr key={product.id}>
                                    <td><img src={product.image} alr='error' height='100px' width='100px'/></td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                    <Button className="mr-2"
                                        variant="ligth" 
                                        onClick={()=>this.deleteItem(product.id)}>
                                        {<DeleteIcon/>}
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                ):(<Alert className='mt-2 d-flex justify-content-center' variant='secondary'>Список пуст</Alert>)}
            </div>
        )
    }
}