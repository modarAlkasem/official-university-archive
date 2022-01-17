import React ,{useContext} from 'react';
import classes from './OptionsButtons.module.css';
import LinkButton from './LinkButton/LinkButton';
import CategoryContentContext from './../../../../context/category_content_context';
import axios from 'axios';
import CookieService from './../../../../CookieService/CookieService';

const OptionsButtons = props =>{
    let axiosInstance =axios.create({
        baseURL:'http://127.0.0.1:8000'
    });
    
    const categoryContentContext =useContext(CategoryContentContext);

    let catName = null;
    if(categoryContentContext.category.title==='القرارات الإدارية'){
    
        catName='administrativeDocs';
    }else if(categoryContentContext.category.title==='هيئة التفرغ العلمي'){
        
        catName='scientificBodyDocs';
    }
    let idFieldName  = null;
    if(catName==='administrativeDocs'){
        idFieldName = 'administrative_doc_id';
    }else if(catName==='scientificBodyDocs'){
        idFieldName = 'scientific_body_doc_id';
    }

   const  updateDoc = (catId ,  catname , docId)=>{
        const docIndex = categoryContentContext.documents.findIndex(current=>{
            return current[idFieldName]===parseInt(docId);
        });
        let docInstance = categoryContentContext.documents[docIndex];
         let subCateID = docInstance.subcategory_id;
            const  data = new FormData();
            data.append('doc_number' , docInstance['doc_number']);
            data.append('num_pages' , docInstance['num_pages']);
            data.append('subcategory_id' , docInstance['subcategory_id']);
            data.append('source' , docInstance['source']);
            data.append('date' , docInstance['date']);
            data.append('recieving_date' , docInstance['recieving_date']);
            data.append('file' , categoryContentContext.uploadedFile  );
            data.append('content' , docInstance['content']);
            data.append('notes' , docInstance['notes']);
            data.append('_method' , 'PUT');
            

            axiosInstance.post(`/categories/${catId}/subcategories/${subCateID}/${catname}/${docId}`,data ,{
                headers:{
                    Authorization:`Bearer ${CookieService.get('access_token')}`
                }
            }).then(res=>{     
                categoryContentContext.updateDocFilePathContext(res.data[idFieldName] , res.data.file_path );
                
            }).catch(error=>{
                console.error(error);
            });

   }
    return(
        <div className={classes.OptionsButtons + ' col-lg-2 col-md-4  '} >

            <button className={classes.SaveChangesBtn +' btn btn-success'} id="saveChangesBtnIDVE" onClick={updateDoc.bind(this,categoryContentContext.category.category_id , catName , props.docId )}>
                <span> حفظ التغيرات<i className="glyphicon glyphicon-ok"></i></span>
            </button>
            <div className={classes.LinksButnsDivVE}>

                <LinkButton icon ="glyphicon glyphicon-chevron-right" text="الرجوع" />
                <LinkButton icon ="glyphicon glyphicon-print" text="طباعة عرض"/>

            </div>

        </div>

    );
}

export default OptionsButtons;



