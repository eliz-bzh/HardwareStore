import React, {Component} from 'react';
import {Card} from 'react-bootstrap';
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
        const{products, brands, types, Id,  Name, Year, Brend, Type, Model, Warranty, Amount, Supply, Price}=this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        const editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                {products.map(product=>
                        <Card key={product.id} style={{ width: '18rem'}}>
                            <Card.Img variant='top' src='https://content2.onliner.by/catalog/device/header/1172d56c04b6938925920fcefe994d0f.jpeg' height='270px' alt='Error, sorry...'/>
                            <Card.Header>{product.name}</Card.Header>
                            <Card.Body style={{textAlign: 'left' }}>
                                <Card.Text>
                                Категория: {types.map(type=>{if(type.id === product.typeId){return type.name}})}<br/>
                                Бренд: {brands.map(brand=>{if(brand.id === product.brendId){return brand.name}})}<br/>
                                Модель: {product.model}<br/>
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
                                                Brend: product.brendId,
                                                Type: product.typeId,
                                                Model: product.model,
                                                Warranty: product.warranty,
                                                Amount: product.amount,
                                                Supply: product.supplyId,
                                                Price: product.price
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
                                        brend={Brend}
                                        type={Type}
                                        model={Model}
                                        warranty={Warranty}
                                        amount={Amount}
                                        supply={Supply}
                                        price={Price}
                                        />

                                </ButtonToolbar>
                            </Card.Footer>
                        </Card>
                    )}

                <ButtonToolbar>
                    <Button variant="light"
                        onClick={()=>{
                            this.setState({addModalShow: true})
                        }}>
                        {<AddIcon/>}Add new product
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