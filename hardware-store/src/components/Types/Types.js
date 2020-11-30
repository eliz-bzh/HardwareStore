import React, {Component} from 'react';
import {ButtonToolbar, Button, Table} from 'react-bootstrap';
import AddTypeModal from './AddType';
import EditTypeModal from './EditType';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

export default class Types extends Component{
    constructor(props){
        super(props);
        this.state={
            types:[],
            snackBaropen: false, 
            snackBarMessage: '',
            addModalShow: false,
            editModalShow: false
        };
    }

    componentDidMount(){
        this.typesList();
    }

    componentDidUpdate(){
        this.typesList();
    }

    deleteProduct(id){
        if(window.confirm('Are you sure?')){
            axios.delete(`https://localhost:44365/api/Type/delete/${id}`)
            .then(res=> {
                console.log(res.data);
            })
            .catch(error=> {
                console.log(error);
            });
        }
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
        const{types, Id,  Name}=this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        const editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className='mt-4' size='sm'>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map(type=>
                        <tr key={type.id}>
                            <td>{type.name}</td>
                            <td>
                            <ButtonToolbar>
                                <Button 
                                variant="success" 
                                onClick={()=>this.setState({
                                    editModalShow: true, 
                                    Id: type.id,
                                    Name: type.name
                                    })}>
                                {<EditIcon/>}
                                </Button>

                                <div className="mr-2"></div>

                                <Button className="mr-2"
                                variant="secondary" 
                                onClick={()=>this.deleteCat(type.id)}>
                                {<DeleteIcon/>}
                                </Button>

                                <EditTypeModal
                                show={this.state.editModalShow}
                                onHide={editModalClose}
                                typeid={Id}
                                typename={Name}/>

                            </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

                <ButtonToolbar>
                    <Button variant="light"
                        onClick={()=>{
                            this.setState({addModalShow: true})
                        }}>
                        {<AddIcon/>}Добавить новую категорию
                    </Button>
                </ButtonToolbar>

                <AddTypeModal
                    show={this.state.addModalShow}
                    onHide={addModalClose}>
                </AddTypeModal>
            </div>
        )
    }
}