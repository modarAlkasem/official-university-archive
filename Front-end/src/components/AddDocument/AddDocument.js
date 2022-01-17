import React  from 'react';
import ContentHeader from './../CategoryContent/ContentHeader/ContentHeader';
import CategoryHeader from './CategoryHeader/CategoryHeader';
import InputForm from './InputForm/InputForm';
import classes from './AddDocument.module.css';
import AddDocumentContext from './../../context/add_document_context';

const AddDocument = props=>{
    let context  = props.location.context;


    const inputfieldChangedHandler = (doc , event)=>{
        
        let targetName = event.target.name;
        let date = null;
        if(targetName==='file'){
            doc[targetName]= event.target.files[0];

        }else if(targetName.split('_')[0]==='date'){
            date = doc[targetName.split('_')[0]];
            date = date.split('-');
            if(targetName.split('_')[1]==='day'){
                
                date[2]=event.target.value;
                
            }else if(targetName.split('_')[1]==='month'){
                date[1]= event.target.value;

            }else{
                date[0]= event.target.value;
            }
            doc[targetName.split('_')[0]]=date.join('-');
            

        }else if(targetName.split('_')[0]==='recieving'){
            date = doc['recieving_date'].split('-');
            if(targetName.split('_')[2]==='day'){
                date[2] =event.target.value;

            }else if(targetName.split('_')[2]==='month'){
                date[1]=event.target.value;

            }else{
                date[0]=event.target.value;
            }
            doc['recieving_date']=date.join('-');

        }else{
            if(targetName==='subcategory_id' || targetName==='doc_number' ||targetName==='num_pages'){
                doc[targetName]=parseInt(event.target.value);

            }else{
                doc[targetName]=event.target.value;
            }



        }

        
    }



    return(
       <AddDocumentContext.Provider value = {{
           category:context.category,
           subCats:context.subCats,
           inputFieldChangedHandler:inputfieldChangedHandler,
           newFile:{
            num_pages:'',
            doc_number:'',
            source:'',
            subcategory_id:props.location.context.subCats[0].subcategory_id,
            date:'1900-1-1',
            recieving_date:'1900-1-1',
            content:'',
            notes:'',
            file:null
    
        }
 
       }}>
            <div className = {classes.AddDocument+" container-fluid"}>
                    <ContentHeader/>
                    <CategoryHeader />
                    <InputForm/>
                </div>
       </AddDocumentContext.Provider>

        
    );

}
export default AddDocument;