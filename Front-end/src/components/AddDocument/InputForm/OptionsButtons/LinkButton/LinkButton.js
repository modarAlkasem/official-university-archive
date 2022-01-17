import React ,{useContext}  from 'react';
import classes from './LinkButton.module.css';
import {Link} from 'react-router-dom';
import AddDocumentContext from './../../../../../context/add_document_context';






const LinkButton =props=>{
    let addDocumentContext = useContext(AddDocumentContext);
    return(
        <Link to ={`/categories/${addDocumentContext.category.category_id}`} className={classes.LinkButton+" btn btn-default col-lg-3 col-md-3"}>
             <span>{props.text} <i className={props.icon}></i></span>

        </Link>

    );
}
export default LinkButton;