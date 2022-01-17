import React ,{useState}from 'react';
import ContentHeader from './../CategoryContent/ContentHeader/ContentHeader';
import CategoryHeader from './CategoryHeader/CategoryHeader';
import Content from './Content/Content';
import classes from './Details.module.css';
import CategoryContentContext from './../../context/category_content_context';


const Details = props =>{
    
    const [ state, setState]=useState({
        key:null,
        uploadedFile:null
    });
    
    const context  = props.location.context;
    let uploadedfile = null;
    let idFieldName  = null;
    if(props.match.params.catName==='administrativeDocs'){
        idFieldName = 'administrative_doc_id';
    }else if(props.match.params.catName==='scientificBodyDocs'){
        idFieldName = 'scientific_body_doc_id';
    }
    const updateContextHandler = (docId ,event )=>{
        let flag = false;
        const docIndex = context.documents.findIndex(current=>{
            return current[idFieldName]===docId;
        });
        let docInstance = context.documents[docIndex];
        let date = null;
        let partOfString = null;
        if(event.target.name==='file'){
            uploadedfile=event.target.files[0];
            flag=true;
            setState({
                key:Math.random(),
                uploadedFile:uploadedfile
    
            });
            
        }
        else if(event.target.name.split('_')[0]==='date'){
            partOfString = event.target.name.split('_')[1];
            date = docInstance[event.target.name.split('_')[0]].split('-');
            if(partOfString==='day'){
                date[2]=event.target.value;

            }else if(partOfString==='month'){
                date[1]=event.target.value;

            }else if(partOfString==='year'){
                date[0]=event.target.value;

            }
            date = date.join('-');
            docInstance[event.target.name.split('_')[0]]= date;
            
            
            

        }
        else if(event.target.name.split('_')[0]==='recieving' && event.target.name.split('_')[1]==='date' ){
            partOfString = event.target.name.split('_')[2];
            date = docInstance['recieving_date'].split('-');
            if(partOfString==='day'){
                date[2]=event.target.value;

            }else if(partOfString==='month'){
                date[1]=event.target.value;

            }else if(partOfString==='year'){
                date[0]=event.target.value;

            }
            date = date.join('-');
            docInstance['recieving_date']= date;
        }else{
            if(event.target.name==='doc_number' ||event.target.name==='num_pages' || event.target.name==='subcategory_id'){

                docInstance[event.target.name]=parseInt(event.target.value);
            }else{
                
                docInstance[event.target.name]=event.target.value;
            }

            
        }
        let documents = [];
        if(!flag){
            documents = [...context['documents']];
            documents[docIndex]=docInstance;
            context['documents'] = documents;
            setState({
                key:Math.random(),
                
    
            });

        }else if(flag){
            return 0 ;

        }
        


    }
    const updatedocFilePathContext = (docId,filePath)=>{
        
        const docIndex = context.documents.findIndex(current=>{
            return current[idFieldName]===docId;
        });
        let docInstance = context.documents[docIndex];
        docInstance.file_path = filePath;
        context.documents[docIndex] = docInstance;
        setState({
            key:Math.random()
        });


    }

    return(
        <CategoryContentContext.Provider value={{...context,
            updatecontextHandler:updateContextHandler,
            uploadedFile:state.uploadedFile ,
            updateDocFilePathContext:updatedocFilePathContext
        }}>
            <div className = {classes.Details+" container-fluid"}>
                    <ContentHeader/>
                    <CategoryHeader />
                    <Content docId = {props.match.params.docId}/>
                </div>
        </CategoryContentContext.Provider>


    
 );}

export default Details;