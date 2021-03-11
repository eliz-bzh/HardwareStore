import React, {Component} from 'react';
import {Avatar} from '@material-ui/core';
import axios from 'axios';
import qs from 'querystring';
import {ButtonToolbar, ButtonGroup, Button, Table, Alert, Form} from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import { deleteCartItem, updateQuantityCartItem } from '../../redux/Actions';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ExportCSV from '../../ExcelCheck/Check';
import ScrollTop from '../ScrollTop';

class Cart extends Component{

    constructor(props){
        super(props);
        this.state = {
            user: {}, open: false, message: '', severity:'', buttonHidden: true, fileName: 'CheckOnline', dataToCheck: []
        }
    }

    componentDidMount(){
        this.user();
    }
    
    componentDidUpdate(){
        this.user();
    }

    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };
    }

    user(){
        const { match } = this.props;
        const { login } = match.params;
        axios.get(`https://localhost:44365/api/Client/getByLogin/` + login)
        .then(res =>{
            this.setState({user: res.data})
        })
    }

    data=()=>{
        const data = [];
        this.props.items.map(item=>{
            let newItem = {Название: item.name, 'Цена за единицу': item.price + ' руб.', Количество: item.quantity};
            data.push(newItem);
        });
        const total = this.props.items.reduce((accumulator, product) => {
            return accumulator + product.price * product.quantity;
            }, 0);
        data.push({Итого: total + ' руб.'});
        this.setState({dataToCheck: data});
    }

    requestOrder=()=>{
        if(this.props.items && this.props.items.length === 0){
            this.setState({open: true, message:'Список пуст', severity:'warning', buttonHidden: true});
        }else{
            let arrOrder = [];
            this.props.items.map(item=>{
                arrOrder.push({productId: item.id, quantity: item.quantity});
            })
            const totalPrice = this.props.items.reduce((accumulator, product) => {
                return accumulator + product.price * product.quantity;
                }, 0);
            axios.post(`https://localhost:44365/api/Order/makeOrder/?${qs.stringify({
                ClientId: this.state.user.id,
                TotalPrice: totalPrice
            })}`, arrOrder)
            .then(res =>{
                this.data();
                this.setState({open: true, message:'Заказ оформлен', severity:'success', buttonHidden: false});
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }

    buttonHidden=(hidden)=>{
        this.setState({buttonHidden: hidden});
    }

    render(){
        const { user, open, message, severity, buttonHidden, fileName, dataToCheck } = this.state;
        return(
            <div>
                <SnackBar open={open} autoHideDuration={3000} onClose={()=>{this.setState({open: false})}}>
                    <MuiAlert onClose={()=>{this.setState({open: false})}} severity={severity} variant="filled">
                        <b>{message}</b>
                    </MuiAlert>
                </SnackBar>
                <h1 className='mt-2 d-flex justify-content-left align-items-center'>
                    <Avatar className='mr-2' style={{backgroundColor: '#FF7700'}}>{(`${user.name}`).split('')[0].toLocaleUpperCase()}</Avatar>
                    {user.name + ' ' + user.surname } 
                </h1>
                <h1 className='mt-2 d-flex justify-content-center align-items-center'>Корзина</h1>
                <ButtonToolbar className='mb-2 float-right'>
                    <ButtonGroup>
                        <ExportCSV hidden={buttonHidden} csvData={dataToCheck} fileName={fileName} buttonHidden={hidden=>setTimeout(this.buttonHidden, 10000, hidden)} />
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button className='mr-2' variant="outline-dark" onClick={()=>this.requestOrder()}>Оформить заказ</Button>
                    </ButtonGroup>
                </ButtonToolbar>
                <h5>Товаров в корзине: {this.props.items.reduce((accumulator, product)=>{
                    return accumulator + product.quantity;
                }, 0)}</h5>
                
                <h5>Итого: <span style={{color: 'red'}}>{this.props.items.reduce((accumulator, product) => {
                                        return accumulator + product.price * product.quantity;
                                        }, 0)}</span> руб.</h5>
                {(this.props.items && this.props.items.length !== 0) ? ( 
                    <Table className='mt-4' size='sm'>
                        <thead>
                            <tr>
                                <th>Продукт</th>
                                <th>Название</th>
                                <th>Характеристики</th>
                                <th>Количество</th>
                                <th>Цена</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.items.map(product=>
                                <tr key={product.id}>
                                    <td><img src={product.image} alt='error' height='100px' width='100px'/></td>
                                    <td style={{maxWidth: '200px'}}>{product.name}</td>
                                    <td style={{maxWidth: '210px'}}>
                                        <div>
                                            <b>Модель: </b>{product.modal}<br/>
                                            <b>Год выпуска: </b>{product.year}<br/>
                                            <b>Срок гарантии: </b>{product.warranty}
                                        </div>
                                    </td>
                                    <td>
                                        <Form.Control 
                                            type="number"
                                            required
                                            style={{ width: '80px' }}
                                            value={product.quantity}
                                            onChange={e=>{
                                                let quantity = parseInt(e.target.value, 10);
                                                if(isNaN(quantity)) return 0;
                                                if(quantity < 0) return;
                                                this.props.dispatch(updateQuantityCartItem({id: product.id, quantity}));
                                            }}/>
                                    </td>
                                    <td><b>{product.price}</b> руб.</td>
                                    <td>
                                    <Button className="mr-2"
                                        variant="ligth" 
                                        onClick={() => {
                                            this.props.dispatch(deleteCartItem(product.id));
                                          }}>
                                        {<DeleteIcon/>}
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                ):(<Alert className='mt-2 d-flex justify-content-center' variant='secondary'>Список пуст</Alert>)}
                <ScrollTop/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { items: state.cartItems };
  };

export default withRouter(connect(mapStateToProps)(Cart));