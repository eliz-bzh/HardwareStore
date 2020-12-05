import React, {useState} from 'react';
import {Form, Row, Col, Button, Collapse} from 'react-bootstrap';
import SortRoundedIcon from '@material-ui/icons/SortRounded';

const RadioBox =({list, handleSort})=>{

    const [open, setOpen] = useState(false);

    const handleToggle = (label)=>{
        handleSort(label);
    }
    const sortPrice = list.map(item=>{
        return(
            <Form.Check
        type="radio"
        label={item.label}
        id={item.id}
        name='sortBy'
        onChange={()=>handleToggle(item.label)}
        />
        )
    });
        

    return(
        <div>
            <Button variant='light' onClick={()=>setOpen(!open)}>{<SortRoundedIcon/>}Сортировка по цене</Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    {sortPrice}
                </div>
            </Collapse>
        </div>
    )
}

export default RadioBox;