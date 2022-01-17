import React , {useContext} from 'react';
import DataCell from './DataCell/DataCell';
import CategoryContentContext from './../../../../context/category_content_context';

const Row = props=>{

    const categoryContentContext = useContext(CategoryContentContext);
    let idFieldName = null;
    if(categoryContentContext.category.title==='القرارات الإدارية'){
        idFieldName = 'administrative_doc_id';
    }else if(categoryContentContext.category.title==='هيئة التفرغ العلمي'){
        idFieldName = 'scientific_body_doc_id';
    }

    return(
        <tr>
            <DataCell data ={props.doc.notes} subcatId = {props.doc.subcategory_id} docId = {props.doc[idFieldName]} />
            <DataCell data ={props.doc.recieving_date} subcatId = {props.doc.subcategory_id} docId = {props.doc[idFieldName]}  />
            <DataCell data ={props.doc.content}  subcatId = {props.doc.subcategory_id} docId = {props.doc[idFieldName]} />
            <DataCell data ={categoryContentContext.findSubCat(props.doc.subcategory_id) } subcatId = {props.doc.subcategory_id} docId = {props.doc[idFieldName]} />
            <DataCell data ={props.doc.num_pages} subcatId = {props.doc.subcategory_id} docId = {props.doc[idFieldName]}  />
            <DataCell data ={props.doc.source}   subcatId = {props.doc.subcategory_id} docId = {props.doc[idFieldName]}/>
            <DataCell data ={props.doc.date} subcatId = {props.doc.subcategory_id} docId = {props.doc[idFieldName]}   />
            <DataCell data ={props.doc.doc_number}  subcatId = {props.doc.subcategory_id} docId = {props.doc[idFieldName]} />
            <DataCell data ={props.doc[idFieldName]} subcatId = {props.doc.subcategory_id} docId = {props.doc[idFieldName]}  />
        </tr>
    );
}
export default Row;