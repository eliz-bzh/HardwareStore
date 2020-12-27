import React, {Component} from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import {ButtonToolbar, Button} from 'react-bootstrap';
import EditProductModal from './EditProduct';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import RemoveShoppingCartRoundedIcon from '@material-ui/icons/RemoveShoppingCartRounded';
import axios from 'axios';

export default class Product extends Component{
    constructor(props){
        super(props);
        this.state={
            brands:[],
            types:[],
            supplies: [],
            suppliers: [],
            editModalShow: false
        }
    }

    componentDidMount(){
        this.brandsList();
        this.typesList();
        this.suppliesList();
        this.suppliersList();
    }

    brandsList(){
        axios.get(`https://localhost:44365/api/Brand/getAll`)
        .then(res=> {
            this.setState({brands: res.data})
        });
    }

    typesList(){
        axios.get(`https://localhost:44365/api/Type/getAll`)
        .then(res=> {
            this.setState({types: res.data})
        });
    }
    
    suppliesList(){
        axios.get(`https://localhost:44365/api/Supply/getAll`)
        .then(res=> {
            this.setState({supplies: res.data})
        });
    }

    suppliersList(){
        axios.get(`https://localhost:44365/api/Supplier/getAll`)
        .then(res=> {
            this.setState({suppliers: res.data})
        });
    }

    deleteProduct(id){
        if(window.confirm('Are you sure?')){
            axios.delete(`https://localhost:44365/api/Product/delete/${id}`)
            .then(res=> {
                console.log(res.data);
            })
            .catch(error=> {
                console.log(error);
            });
        }
    }

    render(){
        const{brands, types, supplies, suppliers, Id,  Name, Year, Brand, Type, Modal, Warranty, Amount, Supply, Price, Image}=this.state;
        const editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Row>
                    <Col>
                        <Card className='mr-2 mt-2' key={this.props.product.id} style={{ width: '16.5rem'}}>
                        <Card.Img variant='top' src={this.props.product.image} height='200px' alt='Error, sorry...'/>
                        <Card.Header style={{textAlign: 'center' }}>{this.props.product.name}</Card.Header>
                        <Card.Body style={{textAlign: 'left' }}>
                            <Card.Text>
                                Категория: {types.map(type=>{if(type.id === this.props.product.typeId){return type.name}})}<br/>
                                Бренд: {brands.map(brand=>{if(brand.id === this.props.product.brandId){return brand.name}})}<br/>
                                Модель: {this.props.product.modal}<br/>
                                Год выпуска: {this.props.product.year}<br/>
                                Срок гарантии: {this.props.product.warranty}<br/>
                                Количество на складе: {this.props.product.amount}<br/>
                                Поставщик: {suppliers.map(supplier=>{if(supplier.id === this.props.product.supplyId){return supplier.nameOrganization + ', '+supplier.adress + '; ' + supplier.number}})}<br/>
                                Цена: <b>{this.props.product.price} руб.</b>
                            </Card.Text>
                                    
                        </Card.Body>
                        <Card.Footer>
                            <ButtonToolbar className='d-flex justify-content-end'>
                                {(this.props.role === 'admin')? (
                                    <div>
                                        <Button variant="light"
                                    onClick={()=>{
                                        this.setState({
                                            editModalShow: true,
                                            Id: this.props.product.id,
                                            Name: this.props.product.name,
                                            Year: this.props.product.year,
                                            Brand: this.props.product.brandId,
                                            Type: this.props.product.typeId,
                                            Modal: this.props.product.modal,
                                            Warranty: this.props.product.warranty,
                                            Amount: this.props.product.amount,
                                            Supply: this.props.product.supplyId,
                                            Price: this.props.product.price,
                                            Image: this.props.product.image
                                        })
                                    }}>
                                    {<EditIcon/>}
                                </Button>

                                

                                <Button className='ml-2' variant="light"
                                    onClick={()=>this.deleteProduct(this.props.product.id)}>
                                    {<DeleteIcon/>}
                                </Button>

                                        <EditProductModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            id={Id}
                                            name={Name}
                                            year={Year}
                                            brand={Brand}
                                            type={Type}
                                            modal={Modal}
                                            warranty={Warranty}
                                            amount={Amount}
                                            supply={Supply}
                                            price={Price}
                                            image={Image}/>
                                    </div>
                                ):(
                                    <div>
                                        {this.props.product.amount > 0 ? <Button variant="light"
                                        onClick={()=>this.props.addToCart(this.props.product)}>{<AddShoppingCartRoundedIcon/>}</Button> : 
                                        <Button variant="light" disabled>{<RemoveShoppingCartRoundedIcon/>}Sold out</Button>}
                                    </div>
                                )}
                            </ButtonToolbar>
                        </Card.Footer>
                    </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}