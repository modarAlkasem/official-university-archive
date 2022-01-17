import React,{useContext}  from 'react';
import img from './../../../assets/archived_docs.png';
import {Link} from 'react-router-dom';
import classes from './CategoryHeader.module.css';
import AddDocumentContext from './../../../context/add_document_context';






const CategoryHeader = () =>{
    let addDocumentContext = useContext(AddDocumentContext);
    return(
        <div className={classes.CategoryHeader +' row'}>
        <div className={classes.Content +' col-lg-12 col-md-12'} >
            <div className={classes.RightSide + ' col-lg-7 col-md-7'}>
                <Link to={`/categories/${addDocumentContext.category.category_id}`} className={classes.CatLink}>
                    <img src={img} alt="Docs Logo"/>
                    <span> {addDocumentContext.category.title}</span>
                </Link>

            </div>


        </div>
    </div>

    );
}

export default CategoryHeader;