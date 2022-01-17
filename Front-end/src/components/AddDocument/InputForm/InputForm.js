import React  from 'react';
import classes from './InputForm.module.css';
import InputFields from './InputFields/InputFields';
import OptionsButtons from './OptionsButtons/OptionsButtons';


const InputForm = ()=>{

    return(
        <div className = {classes.InputForm + ' row'}>

        <div className = {classes.PanelHeading + " col-lg-12 col-md-12"}>
            
            <span>إضافة قرار</span>
        </div>
        <OptionsButtons />
        <InputFields  />
        


    </div>



    );


}


export default InputForm;