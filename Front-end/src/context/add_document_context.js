import React from 'react';

const addDocumentContext = React.createContext({
    category:{},
    subCats:[],
    inputFieldChangedHandler:()=>{},
    newFile:{}
});


export default addDocumentContext ;