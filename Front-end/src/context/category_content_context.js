import React from 'react';


const categoryContentContext  = React.createContext({
    documents:[] ,
    category:{},
    subCats:[],
    findSubCat : ()=>{},
    prevNextPageHandler:()=>{},
    specifySubCatHandler:()=>{},
    from:0,
    to:0,
    totalDocs:0

});

export default categoryContentContext;