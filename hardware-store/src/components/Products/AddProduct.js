import React, {Component} from 'react';
import {Modal, Row, Col, Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import qs from 'querystring';
import Tooltip from '@material-ui/core/Tooltip';

export default class AddProductModal extends Component{

    constructor(props){
        super(props);
        this.state = {snackBaropen: false, snackBarMessage: '', brands:[], types:[], supplies:[]};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.brandsList();
        this.typesList();
        this.supplyList();
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

    supplyList(){
        axios.get(`https://localhost:44365/api/Supply/getAll`)
        .then(res=> {
            this.setState({supplies: res.data})
        });
    }

    snackBarClose=(event)=>{
        this.setState({snackBaropen: false});
    }

    handleSubmit=(event)=>{
        event.preventDefault();

        axios.post(`https://localhost:44365/api/Product/create?${qs.stringify({
            Name: event.target.name.value,
            Year: event.target.year.value,
            BrendId: event.target.brand.value,
            TypeId:event.target.type.value,
            Model: event.target.model.value,
            Warranty: event.target.warranty.value,
            Price: event.target.price.value,
            Amount: event.target.amount.value,
            SupplyId: event.target.supply.value
        })}`)
        .then(res=> {
            console.log(res.data);
            this.setState({snackBaropen: true, snackBarMessage: 'Added successfully'});
        })
        .catch(error=> {
            console.log(error);
            this.setState({snackBaropen: true, snackBarMessage: 'Failed added'});
        });
    }

    render(){
        const{brands, types, supplies}=this.state;
        return(
            <div className='container'>
                <SnackBar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={this.state.snackBaropen}
                autoHideDuration={1000}
                onClose={this.snackBarClose}
        message={<span id='message-id'>{this.state.snackBarMessage}</span>}
        action={[
            <IconButton color="inherit" size="small"
                    onClick={this.snackBarClose}
                    ><CloseIcon/></IconButton>
        ]}/>
            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Adding product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
              <Row>
                  <Col sm={6}>
                      <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="name">
                              <Form.Label>Название</Form.Label>
                              <Form.Control 
                                type="text"
                                name="name"
                                required
                                placeholder="Название"/>
                          </Form.Group>
                          <Form.Group controlId="type">
                              <Form.Label>Категория</Form.Label>
                              <Form.Control as="select">
                                    {types.map(type=>
                                        <Tooltip key={type.id} title={type.name}>
                                            <option key={type.id}>{type.id}</option>
                                        </Tooltip>
                                    )}
                                </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="brand">
                              <Form.Label>Бренд</Form.Label>
                              <Form.Control as="select">
                                    {brands.map(brand=>
                                        <Tooltip key={brand.id} title={brand.name}>
                                            <option key={brand.id}>{brand.id}</option>
                                        </Tooltip>
                                    )}
                                </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="model">
                              <Form.Label>Модель</Form.Label>
                              <Form.Control 
                                type="text"
                                name="model"
                                required
                                placeholder="Модель"/>
                          </Form.Group>
                          <Form.Group controlId="year">
                              <Form.Label>Год выпуска</Form.Label>
                              <Form.Control 
                                type="text"
                                name="year"
                                required
                                placeholder="Год выпуска"/>
                          </Form.Group>
                          <Form.Group controlId="warranty">
                              <Form.Label>Срок гарантии</Form.Label>
                              <Form.Control 
                                type="text"
                                name="warranty"
                                required
                                placeholder="Срок гарантии"/>
                          </Form.Group>
                          <Form.Group controlId="amount">
                              <Form.Label>Количество на складе</Form.Label>
                              <Form.Control 
                                type="text"
                                name="amount"
                                required
                                placeholder="Количество на складе"/>
                          </Form.Group>
                          <Form.Group controlId="supply">
                              <Form.Label>Поставщик(надо подумать)</Form.Label>
                              <Form.Control as="select">
                                    {supplies.map(supply=>
                                        <Tooltip key={supply.id} title={supply.supplierId}>
                                            <option key={supply.id}>{supply.id}</option>
                                        </Tooltip>
                                    )}
                                </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="price">
                              <Form.Label>Цена</Form.Label>
                              <Form.Control 
                                type="text"
                                name="price"
                                required
                                placeholder="Цена"/>
                          </Form.Group>
                          <Form.Group>
                            <Button variant="light" type="submit">
                                Add product
                            </Button>
                          </Form.Group>
                      </Form>
                  </Col>
              </Row>
          
      </Modal.Body>
      <Modal.Footer>

        <Button variant="light" onClick={this.props.onHide}>
            Close
        </Button>

      </Modal.Footer>
    </Modal>
    </div>
        );
    };
}