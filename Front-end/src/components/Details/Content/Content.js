import React ,{useContext} from 'react';
import classes from './Content.module.css';
import ViewEdit from './ViewEdit/ViewEdit';
import OptionsButtons from './OptionsButtons/OptionsButtons';
import CategoryContentContext from './../../../context/category_content_context';

const Content = props =>{
    const categoryContentContext = useContext(CategoryContentContext);
    let idFieldName = null;

    if(categoryContentContext.category.title==='القرارات الإدارية'){
        idFieldName = 'administrative_doc_id';
    }else if(categoryContentContext.category.title==='هيئة التفرغ العلمي'){
        idFieldName = 'scientific_body_doc_id';
    }

    const docIndex = categoryContentContext.documents.findIndex(current=>{
        return current[idFieldName]===parseInt(props.docId);
    });

    const docInstance = categoryContentContext.documents[docIndex];
    



    return (

    <div className = {classes.Content + ' row'}>

        <div className = {classes.PanelHeading + " col-lg-12 col-md-12"}>
            
            <span>تفاصيل القرار</span>
        </div>
        <OptionsButtons docId={props.docId} />
        <ViewEdit  doc={docInstance} catName = {categoryContentContext.category.title} idfieldName={idFieldName} />
        


    </div>


);}

export default Content;