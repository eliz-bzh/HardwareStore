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
        this.state = {snackBaropen: false, snackBarMessage: '', brands:[], types:[], suppliers:[], image: '', loading: false};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.brandsList();
        this.typesList();
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

    suppliersList(){
        axios.get(`https://localhost:44365/api/Supplier/getAll`)
        .then(res=> {
            this.setState({suppliers: res.data})
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
            BrandId: event.target.brand.value,
            TypeId:event.target.type.value,
            Modal: event.target.model.value,
            Warranty: event.target.warranty.value,
            Price: event.target.price.value,
            Amount: event.target.amount.value,
            SupplyId: event.target.supplier.value,
            Image: this.state.image
        })}`)
        .then(res=> {
            console.log(res.data);
            this.setState({snackBaropen: true, snackBarMessage: 'Успешно добавлено', image:''});
        })
        .catch(error=> {
            console.log(error);
            this.setState({snackBaropen: true, snackBarMessage: 'Ошибка добавления'});
        });
    }
    

    uploadImage= async event=>{
        const files = event.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'hardware-store');
        this.setState({loading: true})
        const res = await fetch(`https://api.cloudinary.com/v1_1/dzlhauo5h/image/upload`,
            {
                method: 'POST',
                body: data
            }
        );

        const file = await res.json();
        this.setState({loading: false, image: file.secure_url})
        
    }

    render(){
        const{brands, types, suppliers, image}=this.state;
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
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавление нового товара
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
              <Row key={1}>
                  <Col>
                      <Form onSubmit={this.handleSubmit}>
                          <Form.Group>
                              <div>
                                    <Form.File onChange={this.uploadImage} label='Выберите картинку для товара' data-browse='Выбрать' custom/>
                                {this.state.loading?(
                                    <h3 className='mt-4'>Loading...</h3>
                                ):(
                                    <img src={image} style={{width: '300px'}} alt='' className='mt-2'/>
                                )}
                                </div>
                          </Form.Group>
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
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        </Tooltip>
                                    )}
                                </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="brand">
                              <Form.Label>Бренд</Form.Label>
                              <Form.Control as="select">
                                    {brands.map(brand=>
                                        <Tooltip key={brand.id} title={brand.name}>
                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
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
                          <Form.Group controlId="supplier">
                              <Form.Label>Поставщик</Form.Label>
                              <Form.Control as="select">
                                    {suppliers.map(supplier=>
                                        <Tooltip key={supplier.id} title={supplier.nameOrganization}>
                                            <option key={supplier.id} value={supplier.id}>{supplier.nameOrganization}</option>
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
                                Добавить товар
                            </Button>
                          </Form.Group>
                      </Form>
                  </Col>
              </Row>
          
      </Modal.Body>
      <Modal.Footer>

        <Button variant="light" onClick={this.props.onHide}>
            Закрыть
        </Button>

      </Modal.Footer>
    </Modal>
    </div>
        );
    };
}