import React,{useContext}  from 'react';
import img from './../../../assets/archived_docs.png';
import {Link} from 'react-router-dom';
import classes from './CategoryHeader.module.css';
import CategoryContentContext from './../../../context/category_content_context';

const CategoryHeader = ()=>{
    const categoryContentContext = useContext(CategoryContentContext);
    let catNameInURL =null;
    if(categoryContentContext.category.title==='القرارات الإدارية'){
        catNameInURL ='administrativeDocs';
    }else if(categoryContentContext.category.title==='هيئة التفرغ العلمي'){
        catNameInURL='scientificBodyDocs';
    }
    
return(

    <div className={classes.CategoryHeader +' row'}>
        <div className={classes.Content +' col-lg-12 col-md-12'} >
            <div className={classes.RightSide + ' col-lg-7 col-md-7'}>
                <Link to={`/categories/${categoryContentContext.category.category_id}`} className={classes.CatLink}>
                    <img src={img} alt="Docs Logo"/>
                    <span> {categoryContentContext.category.title}</span>
                </Link>
                <Link to={{
                    pathname:`/categories/${categoryContentContext.category.category_id}/${catNameInURL}/create`,
                    context:{
                        category:categoryContentContext.category,
                        subCats:categoryContentContext.subCats
                    }
                }} className = {classes.AddItemBtn+" btn btn-success"}>
                    
                        <span>إضافة جديد</span>
                        <i className="glyphicon glyphicon-plus-sign"></i>
                        
                    

                </Link>

            </div>


        </div>
    </div>

);
}

export default CategoryHeader ; 