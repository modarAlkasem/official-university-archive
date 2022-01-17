import React ,{useContext} from 'react';
import {Link} from 'react-router-dom';
import CategoryContentContext from './../../../../../context/category_content_context';


const DataCell = props=>{
    const categoryContentContext = useContext(CategoryContentContext);
    let catName = null;
    if(categoryContentContext.category.title==='القرارات الإدارية'){
    
        catName='administrativeDocs';
    }else if(categoryContentContext.category.title==='هيئة التفرغ العلمي'){
        
        catName='scientificBodyDocs';
    }

   return (
        <td>
           <Link to={{pathname:`/categories/${categoryContentContext.category.category_id}/subcategories/${props.subcatId}/${catName}/${props.docId}`,
                      context:categoryContentContext  }}>
               {props.data}
            </Link> 
        </td>
    );
 }
export default DataCell;