import React, { useState } from 'react';
import {Form, Collapse, Button} from 'react-bootstrap';
import SortRoundedIcon from '@material-ui/icons/SortRounded';

const CheckBox = ({items, sortBy, handleFilters})=>{

    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([]);

    const handleToggle = (id) =>{
        const currentIndex = checked.indexOf(id);
        const newChecked = [...checked];

        if(currentIndex === -1){
            newChecked.push(id);
        }else{
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        
        handleFilters(newChecked);
    }

    const list = items.map(item=>{
        return(
            <Form.Check checked={checked.indexOf(item.id) === -1 ? false : true} inline type="checkbox" label={item.name} key={item.id} value={item.id} onChange={()=>handleToggle(item.id)}/>
        );
    });

    return(
        <div>
            <Button variant='light' onClick={()=>setOpen(!open)}>{<SortRoundedIcon/>}{sortBy}</Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    {list}
                </div>
            </Collapse>
        </div>
    )
}

export default CheckBox;