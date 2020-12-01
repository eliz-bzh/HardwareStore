import React, {Component} from 'react';
import {Card, CardGroup, Row, Col} from 'react-bootstrap';
import {ButtonToolbar, Button} from 'react-bootstrap';
import AddProductModal from './AddProduct';
import EditProductModal from './EditProduct';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

export default class Products extends Component{
    constructor(props){
        super(props);
        this.state={
            products: [],
            brands:[],
            types:[],
            snackBaropen: false, 
            snackBarMessage: '',
            addModalShow: false,
            editModalShow: false
        };
    }

    componentDidMount(){
        this.brandsList();
        this.typesList();
        this.productsList();
    }

    componentDidUpdate(){
        this.productsList();
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

    productsList(){
        axios.get('https://localhost:44365/api/Product/getAll')
        .then(res=>{
            this.setState({products: res.data})
        })
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

    snackBarClose=(event)=>{
        this.setState({snackBaropen: false});
    }


    render(){
        const{products, brands, types, Id,  Name, Year, Brand, Type, Modal, Warranty, Amount, Supply, Price, Image}=this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        const editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <CardGroup className='justify-content-md-center'>
                {products.map(product=>
                    <Row>
                    <Col>
                        <Card className='mr-2 mt-4' key={product.id} style={{ width: '16.5rem'}}>
                            <Card.Img variant='top' src={product.image} height='200px' alt='Error, sorry...'/>
                            <Card.Header style={{textAlign: 'center' }}>{product.name}</Card.Header>
                            <Card.Body style={{textAlign: 'left' }}>
                                <Card.Text>
                                Категория: {types.map(type=>{if(type.id === product.typeId){return type.name}})}<br/>
                                Бренд: {brands.map(brand=>{if(brand.id === product.brandId){return brand.name}})}<br/>
                                Модель: {product.modal}<br/>
                                Год выпуска: {product.year}<br/>
                                Срок гарантии: {product.warranty}<br/>
                                Количество на складе: {product.amount}<br/>
                                Поставщик(надо подумать): {product.supplyId}<br/>
                                Цена: <b>{product.price} руб.</b>
                                </Card.Text>
                                
                            </Card.Body>
                            <Card.Footer>
                                <ButtonToolbar>
                                    <Button variant="light"
                                        onClick={()=>{
                                            this.setState({
                                                editModalShow: true,
                                                Id: product.id,
                                                Name: product.name,
                                                Year: product.year,
                                                Brand: product.brandId,
                                                Type: product.typeId,
                                                Modal: product.modal,
                                                Warranty: product.warranty,
                                                Amount: product.amount,
                                                Supply: product.supplyId,
                                                Price: product.price,
                                                Image: product.image
                                            })
                                        }}>
                                        {<EditIcon/>}
                                    </Button>

                                    <div className="mr-2"></div>

                                    <Button variant="light"
                                        onClick={()=>this.deleteProduct(product.id)}>
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
                                        image={Image}
                                        />

                                </ButtonToolbar>
                            </Card.Footer>
                        </Card>
                    </Col>
                    </Row>
                    )}
                </CardGroup>  
                <ButtonToolbar>
                    <Button variant="light"
                        onClick={()=>{
                            this.setState({addModalShow: true})
                        }}>
                        {<AddIcon/>}Добавить новый товар
                    </Button>
                </ButtonToolbar>

                <AddProductModal
                    show={this.state.addModalShow}
                    onHide={addModalClose}>
                </AddProductModal>
            </div>
        )
    }
}