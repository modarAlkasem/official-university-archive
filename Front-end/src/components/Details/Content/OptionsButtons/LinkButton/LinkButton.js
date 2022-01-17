import React , {useContext} from 'react';
import classes from './LinkButton.module.css';
import {Link} from 'react-router-dom';
import CategoryContentContext from './../../../../../context/category_content_context';

const LinkButton = props =>{
    let style ={};
    if(props.text==="طباعة عرض"){
        style={
            display:'none'
        }
    }

    let categoryContentContext = useContext(CategoryContentContext);

    return(

        <Link to ={`/categories/${categoryContentContext.category.category_id}`} className={classes.LinkButton+" btn btn-default col-lg-3 col-md-3"} style={style}>
            <span>{props.text} <i className={props.icon}></i></span>

        </Link>


    );
}

export default LinkButton;