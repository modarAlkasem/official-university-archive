import React from 'react';

const generalContext = React.createContext({
    categories:[],
    firstName:'',
    lastName:'',
    userName:'',
    role:'',
    signOut:()=>{},
    authenticated:false,
    userId:null
});

export default generalContext;