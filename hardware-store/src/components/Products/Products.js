import React, {Component} from 'react';
import {ButtonToolbar, Button, ButtonGroup, FormControl, Form, FormGroup, CardGroup, Alert, ListGroup, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import AddProductModal from './AddProduct';
import ProductOfGrid from './ProductOfGrid';
import ProductOfList from './ProductOfList';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import CheckBox from '../CheckBox';
import RadioBox from '../RadioBox';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ScrollTop from '../ScrollTop';

export default class Products extends Component{
    constructor(props){
        super(props);
        this.state={
            products: [],
            productsFilters: [],
            brands:[],
            types:[],
            addModalShow: false,
            search: '',
            newFiltersBrands: [],
            newFiltersTypes: [],
            items: [
                {id: 1, label: 'Любой'},
                {id: 2, label: 'От большего к меньшему'},
                {id: 3, label: 'От меньшего к большему'}
            ],
            sortBy: '',
            cart: [],
            grid: true, showScroll: false
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

    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };
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

    productsList(){
        axios.get('https://localhost:44365/api/Product/getAll')
        .then(res=>{
            let filterList = this.filterList(res.data);
            if(this.state.sortBy !== ''){
                this.sortList(filterList, this.state.sortBy);
            }
            
            this.setState({products: res.data, productsFilters: filterList});
        })
    }

    searchPanel(rows){
        return rows.filter((row)=>row.name.toLowerCase().indexOf(this.state.search.toLocaleLowerCase()) > -1);
    }

    filterList(list){
        let newList = list;
        if((this.state.newFiltersBrands && this.state.newFiltersBrands.length) || (this.state.newFiltersTypes && this.state.newFiltersTypes.length)){
            //if states not empty
            if(this.state.newFiltersBrands && this.state.newFiltersBrands.length){
                newList = list.filter(a=>this.state.newFiltersBrands.indexOf(a.brandId) > -1);
            }
            if(this.state.newFiltersTypes && this.state.newFiltersTypes.length){
                newList = newList.filter(a=>this.state.newFiltersTypes.indexOf(a.typeId) > -1);
            }
        }else{
            return newList = this.state.products;
        }
        return newList;
    }

    sortList(list, sortType){
        let oldList = list;
        if (sortType === 'От большего к меньшему' || sortType === 'От меньшего к большему') {
            if (sortType === 'От меньшего к большему') {
                return list.sort((a, b)=>(a.price > b.price) ? 1 : -1);
            }else if(sortType === 'От большего к меньшему'){
                return list.sort((a, b)=>(a.price < b.price) ? 1 : -1);
            }
        }else{
            list = oldList;
            return list;
        }
    }

    handleFiltersBrands=(filters)=>{
        var newFilters = [...filters];
        this.setState({newFiltersBrands: newFilters});
    }

    handleFiltersTypes=(filters)=>{
        var newFilters = [...filters];
        this.setState({newFiltersTypes: newFilters});
    }

    handleSortPrice = (sortType) => {
        this.setState({sortBy: sortType});
    }

    render(){
        const{productsFilters, brands, types, search, items, grid}=this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        const productsSearch = this.searchPanel(productsFilters);
        const list = (productsSearch && productsSearch.length !== 0) ? (
            (grid === true)?(<CardGroup className='justify-content-center'> {productsSearch.map(product=> <ProductOfGrid key={product.id} product={product} role={this.props.role}/> )} </CardGroup>)
            :(<ListGroup> {productsSearch.map(product=> <ProductOfList key={product.id} product={product} role={this.props.role}/> )} </ListGroup>))
            :(<Alert className='mt-2 d-flex justify-content-center' variant='secondary'>Список пуст</Alert>)
        return(
            <div>
                <ButtonToolbar className='float-right'>
                    <ButtonGroup className='vertical'>
                        {/*Sorting by price*/}
                        <RadioBox list={items} handleSort={sort=>this.handleSortPrice(sort)}/>
                        <div className="mr-2"></div>
                        {(this.props.role === 'admin') ? (
                            <Button variant="light"
                            onClick={()=>{
                                this.setState({addModalShow: true})
                            }}>
                            {<AddIcon/>}Добавить новый товар
                            </Button>
                        ):(null)}
                    </ButtonGroup>
                </ButtonToolbar>

                <ButtonToolbar className='mt-2'>
                    <ButtonGroup className='vertical'>
                        {/*Filter by brands*/}
                        <CheckBox items={brands} sortBy='Бренды' handleFilters={filters=>this.handleFiltersBrands(filters)}/>
                        <div className="mr-2"></div>
                        {/*Filter by category(types)*/}
                        <CheckBox items={types} sortBy='Категории' handleFilters={filters=>this.handleFiltersTypes(filters)}/>
                    </ButtonGroup>
                </ButtonToolbar>

                <AddProductModal
                    show={this.state.addModalShow}
                    onHide={addModalClose}>
                </AddProductModal>
                <div className="mt-2"></div>
                {/*Search Panel*/}
                <Form>
                    <FormGroup>
                        <FormControl type="text" value={search} placeholder="Search" className="mr-sm-2"
                        onChange={(e)=>this.setState({search: e.target.value})}/>
                    </FormGroup>
                </Form>
                <ToggleButtonGroup className='d-flex justify-content-center align-items-center' type="radio" name="options" defaultValue={1}>
                    <ToggleButton value={1} variant="light" checked={grid === true} name="radio" onChange={(e)=>this.setState({grid: true})}>{<ViewComfyIcon/>}</ToggleButton>
                    <ToggleButton value={2} variant="light" checked={grid === false} name="radio" onChange={(e)=>this.setState({grid: false})}>{<FormatListBulletedIcon/>}</ToggleButton>
                </ToggleButtonGroup>
                {list}
                <ScrollTop/>
            </div>
        )
    }
}