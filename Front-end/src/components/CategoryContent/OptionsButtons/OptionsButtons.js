import React ,{ useContext}from 'react';
import classes from './OptionsButtons.module.css';
import CategoryContentContext from './../../../context/category_content_context';
import {Link} from 'react-router-dom';


const OptionsButtons = props =>{
    const categoryContentContext = useContext(CategoryContentContext);

    const subcatsOptions = props.subcats.map(current=>{
        return <option value = {current.subcategory_id} key={current.subcategory_id}>{current.title}</option>
    });
    let catNameInURL =null;
    if(categoryContentContext.category.title==='القرارات الإدارية'){
        catNameInURL = 'administrativeDocs'
    }else if(categoryContentContext.category.title==='هيئة التفرغ العلمي'){

        catNameInURL = 'scientificBodyDocs';

    }

    return (
        <div className = {classes.OptionsButtons + ' row' }>
            <div className={classes.Content + ' col-lg-6 col-md-6'}>
                <span className={classes.OptionsGroupBtn}>
                    <Link to={{pathname :`/categories/${categoryContentContext.category.category_id}/${catNameInURL}/create`,
                    context:{category:categoryContentContext.category,
                            subCats:categoryContentContext.subCats} }}
                     className={classes.AddNewDoc} id='addNewDocCatConID'>

                        
                         
                         <span id="optionBtn_1"> <span className="Text Open">إضافة جديد</span><i className="Icon glyphicon glyphicon-plus-sign Open"></i></span>
                    </Link>
                    <select name="subCatsList" className={classes.SubCatsList} defaultValue={4} onChange={(event)=>{categoryContentContext.specifySubCatHandler(event.target.value);}}>
                        <option value={4} key={4} >الكل</option>
                        {subcatsOptions}
                        
                    </select>
                    <button name="showAllBtn" className={classes.ShowAllBtn}  id="Show_all_btn" onClick={categoryContentContext.specifySubCatHandler.bind(this,4)}>
                        <span id="optionBtn_3"> <span className="Text Open">عرض الكل</span>  <i  className="Icon glyphicon glyphicon-remove-circle Open"></i></span>
  
                    </button>
                    
                </span>

            </div>

        </div>

    );
}


export default React.memo(OptionsButtons);