import React, { Component } from 'react';
import { ListGroup, Row, Col, Image, Container } from 'react-bootstrap';
import { ButtonToolbar, Button } from 'react-bootstrap';
import EditProductModal from './EditProduct';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import RemoveShoppingCartRoundedIcon from '@material-ui/icons/RemoveShoppingCartRounded';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { addItemInCart } from "../../redux/Actions";
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Carousel } from '..';

class ProductOfList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            types: [],
            supplies: [],
            suppliers: [],
            editModalShow: false,
            open: false
        }
    }

    componentDidMount() {
        this.brandsList();
        this.typesList();
        this.suppliesList();
        this.suppliersList();
    }

    brandsList() {
        axios.get(`https://localhost:5001/api/Brand/getAll`)
            .then(res => {
                this.setState({ brands: res.data })
            });
    }

    typesList() {
        axios.get(`https://localhost:5001/api/Type/getAll`)
            .then(res => {
                this.setState({ types: res.data })
            });
    }

    suppliesList() {
        axios.get(`https://localhost:5001/api/Supply/getAll`)
            .then(res => {
                this.setState({ supplies: res.data })
            });
    }

    suppliersList() {
        axios.get(`https://localhost:5001/api/Supplier/getAll`)
            .then(res => {
                this.setState({ suppliers: res.data })
            });
    }

    deleteProduct(id) {
        if (window.confirm('Are you sure?')) {
            axios.delete(`https://localhost:5001/api/Product/delete/${id}`)
                .then(res => {
                    console.log(res.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    render() {
        const { brands, types, suppliers, Id, Name, Year, Brand, Type, Modal, Warranty, Amount, Supply, Price, ImagesSrc } = this.state;
        const editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div>
                <SnackBar open={this.state.open} autoHideDuration={400} onClose={() => { this.setState({ open: false }) }}>
                    <MuiAlert onClose={() => { this.setState({ open: false }) }} severity="success" variant="filled">
                        <b>Товар добавлен</b>
                    </MuiAlert>
                </SnackBar>
                <ListGroup.Item className='mr-2 mt-2' key={this.props.product.id} >
                    <Row>
                        <Col md='auto' className='d-flex justify-content-center'>
                            <Carousel images={this.props.product.images} height='230px' width='16.4rem' />
                        </Col>
                        <Col>
                            <Container>
                                <h3 align='center' className='mt-2 mb-4'>{this.props.product.name}</h3>
                                <Row>
                                    <Col>
                                        Категория: {types.filter(type => type.id === this.props.product.typeId).map(type => { return type.name })}<br />
                                        Бренд: {brands.filter(brand => brand.id === this.props.product.brandId).map(brand => { return brand.name })}<br />
                                        Модель: {this.props.product.modal}<br />
                                        Год выпуска: {this.props.product.year}<br />
                                    </Col>
                                    <Col>
                                        Срок гарантии: {this.props.product.warranty}<br />
                                        Количество на складе: {this.props.product.amount}<br />
                                        Поставщик: {suppliers.filter(supplier => supplier.id === this.props.product.supplyId).map(supplier => { return supplier.nameOrganization + ', ' + supplier.adress + '; ' + supplier.number })}<br />
                                        Цена: <b style={{ color: 'red' }}>{this.props.product.price} BYN</b>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <hr />
                    <ButtonToolbar className='d-flex justify-content-end'>
                        {(this.props.role === 'admin') ? (
                            <div>
                                <Button variant="light"
                                    onClick={() => {
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
                                            ImagesSrc: this.props.product.images
                                        })
                                    }}>
                                    {<EditIcon />}
                                </Button>



                                <Button className='ml-2' variant="light"
                                    onClick={() => this.deleteProduct(this.props.product.id)}>
                                    {<DeleteIcon />}
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
                                    images={ImagesSrc} />
                            </div>
                        ) : (
                            <div>
                                {this.props.product.amount > 0 ? <Button variant="light"
                                    onClick={e => {
                                        e.stopPropagation();
                                        this.setState(({ open }) => {
                                            return {
                                                open: !open
                                            }
                                        })
                                        this.props.dispatch(
                                            addItemInCart({ ...this.props.product, quantity: 1 })
                                        );
                                    }}>
                                    {<AddShoppingCartRoundedIcon />}</Button> :
                                    <Button variant="light" disabled>{<RemoveShoppingCartRoundedIcon />}Sold out</Button>}
                            </div>
                        )}
                    </ButtonToolbar>
                </ListGroup.Item>
            </div>
        )
    }
}

export default withRouter(connect()(ProductOfList));