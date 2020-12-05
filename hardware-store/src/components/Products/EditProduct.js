import React, {Component} from 'react';
import {Modal, Row, Col, Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import qs from 'querystring';
import Tooltip from '@material-ui/core/Tooltip';

export default class EditProductModal extends Component{

    constructor(props){
        super(props);
        //const imageProps = this.props.image;
        this.state = {snackBaropen: false, snackBarMessage: '', brands:[], types:[], supplies:[], loading: false, imagep: this.props.image};
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
        var imageUrl = this.state.imagep;
        if(imageUrl === undefined){
            imageUrl = this.props.image;
        }
        axios.put(`https://localhost:44365/api/Product/edit?${qs.stringify({
            Id: this.props.id,
            Name: event.target.name.value,
            Year: event.target.year.value,
            BrandId: event.target.brand.value,
            TypeId:event.target.type.value,
            Modal: event.target.model.value,
            Warranty: event.target.warranty.value,
            Price: event.target.price.value,
            Amount: event.target.amount.value,
            SupplyId: event.target.supply.value,
            Image: imageUrl
        })}`)
        .then(res=> {
            console.log(res.data);
            this.setState({snackBaropen: true, snackBarMessage: 'Updated successfully'});
        })
        .catch(error=> {
            console.log(error);
            this.setState({snackBaropen: true, snackBarMessage: 'Failed to update'});
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
        this.setState({loading: false, imagep: file.secure_url});
        
    }

    render(){
        const{brands, types, supplies, loading, imagep} = this.state;
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
          Редактирование товара
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
              <Row>
                  <Col sm={6}>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="image">
                              <div>
                                    <Form.File onChange={this.uploadImage} label='Выберите картинку для товара' data-browse='Выбрать' custom/>
                                {loading?(
                                    <h3 className='mt-4'>Loading...</h3>
                                ):(
                                    <img src={imagep} style={{width: '300px'}} alt='Error' className='mt-2'/>
                                )}
                                </div>
                          </Form.Group>
                      <Form.Group controlId="name">
                              <Form.Label>Название</Form.Label>
                              <Form.Control 
                                type="text"
                                name="name"
                                required
                                defaultValue={this.props.name}
                                placeholder="Название"/>
                          </Form.Group>
                          <Form.Group controlId="type">
                              <Form.Label>Категория</Form.Label>
                              <Form.Control as="select"
                                defaultValue={this.props.type}>
                                    {types.map(type=>
                                        <Tooltip key={type.id} title={type.name}>
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        </Tooltip>
                                    )}
                                </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="brand">
                              <Form.Label>Бренд</Form.Label>
                              <Form.Control as="select"
                                defaultValue={this.props.brand}>
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
                                defaultValue={this.props.modal}
                                placeholder="Модель"/>
                          </Form.Group>
                          <Form.Group controlId="year">
                              <Form.Label>Год выпуска</Form.Label>
                              <Form.Control 
                                type="text"
                                name="year"
                                required
                                defaultValue={this.props.year}
                                placeholder="Год выпуска"/>
                          </Form.Group>
                          <Form.Group controlId="warranty">
                              <Form.Label>Срок гарантии</Form.Label>
                              <Form.Control 
                                type="text"
                                name="warranty"
                                required
                                defaultValue={this.props.warranty}
                                placeholder="Срок гарантии"/>
                          </Form.Group>
                          <Form.Group controlId="amount">
                              <Form.Label>Количество на складе</Form.Label>
                              <Form.Control 
                                type="text"
                                name="amount"
                                required
                                defaultValue={this.props.amount}
                                placeholder="Количество на складе"/>
                          </Form.Group>
                          <Form.Group controlId="supply">
                              <Form.Label>Поставщик</Form.Label>
                              <Form.Control as="select" 
                                defaultValue={this.props.supply}>
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
                                defaultValue={this.props.price}
                                placeholder="Цена"/>
                          </Form.Group>
                          <Form.Group>
                            <Button variant="light" type="submit">
                                Изменить товар
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