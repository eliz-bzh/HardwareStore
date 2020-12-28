import React, {Component} from 'react';
import {Avatar} from '@material-ui/core';
import axios from 'axios';
import {ButtonToolbar, ButtonGroup, Button, Table, Alert} from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import { deleteCartItem } from '../../redux/Actions';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

class Cart extends Component{

    constructor(props){
        super(props);
        this.state = {
            user: {}, checkShow: false, open: false
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

    requestOrder=()=>{
        if(this.props.items && this.props.items.length === 0){
            this.setState({open: true});
        }else{
            console.log('Заказ оформлен');
            const { checkShow } = this.state;
            this.setState({checkShow: !checkShow});
        }
    }

    render(){
        const { user } = this.state;
        return(
            <div>
                <SnackBar open={this.state.open} autoHideDuration={3000} onClose={()=>{this.setState({open: false})}}>
                    <MuiAlert onClose={()=>{this.setState({open: false})}} severity="warning" variant="filled">
                        <b>Список пуст</b>
                    </MuiAlert>
                </SnackBar>
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
                <h5>Товаров в корзине: {this.props.items.length}</h5>
                
                <h5>Итого: <span style={{color: 'red'}}>{this.props.items.reduce((accumulator, product) => {
                                        return accumulator + product.price;
                                        }, 0)}</span> руб.</h5>
                {(this.props.items && this.props.items.length !== 0) ? ( 
                    <Table className='mt-4' size='sm'>
                        <thead>
                            <tr>
                                <th>Продукт</th>
                                <th>Название</th>
                                <th>Характеристики</th>
                                <th>Цена</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.items.map(product=>
                                <tr key={product.id}>
                                    <td><img src={product.image} alt='error' height='100px' width='100px'/></td>
                                    <td>{product.name}</td>
                                    <td>
                                        <div>
                                            <b>Модель: </b>{product.modal}<br/>
                                            <b>Год выпуска: </b>{product.year}<br/>
                                            <b>Срок гарантии: </b>{product.warranty}
                                        </div>
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { items: state.cartItems };
  };

export default withRouter(connect(mapStateToProps)(Cart));