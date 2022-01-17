import React ,{useContext}  from 'react';
import classes from './OptionsButtons.module.css';
import LinkButton from './LinkButton/LinkButton';
import AddDocumentContext from './../../../../context/add_document_context';
import axios from 'axios';

import CookieService from './../../../../CookieService/CookieService';

const OptionsButtons =props=>{
    let addDocumentContext = useContext(AddDocumentContext);
    let axiosInstance = axios.create({
        baseURL:'http://127.0.0.1:8000'
    });
    let catNameInURL = null;
    if(addDocumentContext.category.title==='القرارات الإدارية'){
        catNameInURL ='administrativeDocs';

    }else if(addDocumentContext.category.title==='هيئة التفرغ العلمي'){
        catNameInURL ='scientificBodyDocs';
    }

    const addNewDocClickedHandler = ()=>{
        let data = new FormData();
        data.append('doc_number' , addDocumentContext.newFile.doc_number);
        data.append('num_pages' , addDocumentContext.newFile.num_pages);
        data.append('subcategory_id' , addDocumentContext.newFile.subcategory_id);
        data.append('source' , addDocumentContext.newFile.source);
        data.append('date' , addDocumentContext.newFile.date);
        data.append('recieving_date' , addDocumentContext.newFile.recieving_date);
        data.append('file' , addDocumentContext.newFile.file  );
        data.append('content' , addDocumentContext.newFile.content);
        data.append('notes' , addDocumentContext.newFile.notes);
        axiosInstance.post(`/categories/${addDocumentContext.category.category_id}/subcategories/${addDocumentContext.newFile.subcategory_id}/${catNameInURL}`,
        data , {
            headers:{
                Authorization:`Bearer ${CookieService.get('access_token')}`
            }
        }).then(res=>{
            if(res.status===200){
                let eles =document.querySelectorAll('input , select , textarea');
                eles  =Array.prototype.slice.call(eles);
                eles.forEach(current=>{
                    current.value='';
                });
                document.querySelector('#DocCatVE').value = addDocumentContext.category.title;

            }
        }).catch(err=>{
            console.error(err);
        })
    }
    
    return(
        <div className={classes.OptionsButtons + ' col-lg-2 col-md-4  '} >

        <button className={classes.AddNewDocBtn +' btn btn-success'} id="addNewDocBtnID" onClick={addNewDocClickedHandler} >
            <span> إضافة جديد<i className="glyphicon glyphicon-ok"></i></span>
        </button>
        <div className={classes.LinksButnsDivIF}>

            <LinkButton icon ="glyphicon glyphicon-chevron-right" text="الرجوع" />
            

        </div>

    </div>

    );
}
export default OptionsButtons;