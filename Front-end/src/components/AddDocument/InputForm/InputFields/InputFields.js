import React  , {useState ,useEffect , useContext}from 'react';
import classes from './InputFields.module.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AddDocumentContext from './../../../../context/add_document_context';
import {optionsDateGen} from './../../../Details/Content/ViewEdit/ViewEdit';

const InputFields = ()=>{
    let addDocumentContext =useContext(AddDocumentContext);
    const subCatsOptions = addDocumentContext.subCats.map(current=>{
        return <option value={current.subcategory_id} key={'inputFieldsSubCat-'+current.subcategory_id}>{current.title}</option>
    });

    useEffect(()=>{
    
        DateSelectOpts(calendarDate.whichDate);
    });
    const [calendarDate , setDate]= useState({
        Date:new Date(2017, 0, 1),
        RecDate:new Date(2017, 0, 1),
        whichDate:null
    });
    const onChangeRecDate = (calDate )=>{
        let state= {...calendarDate} ;
        state['RecDate']=calDate;
        state['whichDate']=2;
        setDate(state);    
    };
    const onChangeDate = (calDate )=>{
        let state= {...calendarDate} ;
        state['Date']=calDate;
        state['whichDate']=1;
        setDate(state);    
    };

    const DateSelectOpts =(whichDate)=>{
        if(whichDate){
            const DateStrings = {
                yearsListSelector : `.Doc${whichDate===1?'':'Rec'}DateYearsListVE option`,
                daysListSelector : `.Doc${whichDate===1?'':'Rec'}DateDaysListVE option`,
                monthsListSelector :`.Doc${whichDate===1?'':'Rec'}DateMonthsListVE option`,
                calendar:`${whichDate===1?'Date':'RecDate'}`
            }
    
            let listYears= document.querySelectorAll(DateStrings.yearsListSelector);
            let listDays= document.querySelectorAll(DateStrings.daysListSelector);
            let listMonths= document.querySelectorAll(DateStrings.monthsListSelector);
    
            listYears = Array.prototype.slice.call(listYears);
            listDays = Array.prototype.slice.call(listDays);
            listMonths = Array.prototype.slice.call(listMonths);
            
            let splitedDate = [];
            splitedDate[0]= calendarDate[DateStrings.calendar].getFullYear();
            splitedDate[1]= calendarDate[DateStrings.calendar].getMonth()+1;
            splitedDate[2]= calendarDate[DateStrings.calendar].getDate();
            
            listYears.forEach((cur)=>{
                if(parseInt(cur.value)===parseInt(splitedDate[0])){
                    cur.selected = true;
        
                }
            });
            
            listDays.forEach((cur)=>{
                
                if(parseInt(cur.value)===parseInt(splitedDate[2])){
                    cur.selected = true;
                    
        
                }
            });
        
            listMonths.forEach((cur)=>{
                if(parseInt(cur.value)===parseInt(splitedDate[1])){
                    cur.selected = true;
        
                }
            });
        }


    };

    const calendarBtnClickHandler = (whichCalBtn)=>{

        let calendarDateSelect = document.querySelector('.calendar_1');
        let calendarRecDateSelect = document.querySelector('.calendar_2');
        if(whichCalBtn===1){
            if(calendarDateSelect.style.display==='block'){
            
                calendarDateSelect.style.display='';
    
            }else if(calendarDateSelect.style.display===''){
                calendarDateSelect.style.display='block';
            }
        }else if(whichCalBtn===2){
            if(calendarRecDateSelect.style.display==='block'){
            
                calendarRecDateSelect.style.display='';
    
            }else if(calendarRecDateSelect.style.display===''){
                calendarRecDateSelect.style.display='block';
            }

        }
    }

    let monthsOptionsEles , yearsOptionsEles , daysOptionsEles;
    monthsOptionsEles=null;
    yearsOptionsEles=null;
    daysOptionsEles=null;
    const date =optionsDateGen();
    monthsOptionsEles = date['months'];
    yearsOptionsEles= date['years'];
    daysOptionsEles= date['days'];

    return(
        
        <div className={classes.ViewEdit + ' col-lg-10 col-md-8  '} dir="rtl">
            <div className={classes.DocIDDiv + ' '+ classes.DivVE+ ' form-group'}>
                <hr className="hidden-md hidden-lg"/> 
                
                <div className="col-lg-9" >
  
                     <input type="text" name="doc_number"  className="form-control" id="DocIDVE" dir="rtl"  onChange={addDocumentContext.inputFieldChangedHandler.bind(this,addDocumentContext.newFile)} />

                </div>
                <label htmlFor="DocIDVE" className="col-lg-3">رقم القرار</label>
            </div>

            <div className={classes.DocNumPagesDiv + ' '+ classes.DivVE+' form-group'}>

                <hr className="hidden-md hidden-lg"/> 
                
                <div className="col-lg-9" >
                    <input type="text" name="num_pages" className="form-control" id ="DocNumPagesVE" dir="rtl"  onChange={addDocumentContext.inputFieldChangedHandler.bind(this,addDocumentContext.newFile)} />
                </div>
                <label htmlFor="DocNumPagesVE" className="col-lg-3">عدد الصفحات</label>

            </div>

            <div className={classes.DocSourceDiv + ' '+ classes.DivVE+' form-group'}>
                 <hr className="hidden-md hidden-lg"/> 
                 
                <div className="col-lg-9" >
                     <input type="text" name="source" className="form-control" id ="DocSourceVE" dir="rtl"  onChange={addDocumentContext.inputFieldChangedHandler.bind(this,addDocumentContext.newFile)} />

                </div>
                <label htmlFor="DocSourceVE" className="col-lg-3">المصدر</label>
            </div>

                
               <div className={classes.DocCatDiv + ' '+ classes.DivVE+' form-group'} >
                    <hr className="hidden-md hidden-lg"/> 
                    
                   <div className="col-lg-9">
                        <input name="category" id = "DocCatVE" className="form-control" dir="rtl" value={addDocumentContext.category.title}  readOnly/>
                   </div>
                   <label htmlFor="DocCatVE" className="col-lg-3">الفئة الأساسية</label>
               </div>
              
            <div className={classes.DocSubCatDiv  + ' '+ classes.DivVE+ ' from-group'}>
                <hr className="hidden-md hidden-lg"/> 
                
                <div className="col-lg-9">
                    <select name="subcategory_id" id = "DocSubCatVE" className="form-control" dir="rtl"  onChange={addDocumentContext.inputFieldChangedHandler.bind(this,addDocumentContext.newFile)} >
                           {subCatsOptions} 
                    </select>

                </div>
                <label htmlFor="DocSubCatVE" className="col-lg-3">الفئة الفرعية</label>
            </div>
               
            <div className={classes.DocDateDiv  + ' '+ classes.DivVE+' form-group'} >
                 <hr className="hidden-md hidden-lg"/> 
                 <div className="col-lg-9">
                    <table id="DocDateVE">
                        <tbody>
                            <tr >
                                <td> 
                                    <select name="date_month" className="form-control DocDateMonthsListVE" dir="rtl"  onChange={addDocumentContext.inputFieldChangedHandler.bind(this,addDocumentContext.newFile)} >
                                        {monthsOptionsEles}
                                    </select>
                                    
                                    </td>
                                    <td> 
                                    <select name="date_day" className="form-control DocDateDaysListVE" dir="rtl"  onChange={addDocumentContext.inputFieldChangedHandler.bind(this,addDocumentContext.newFile)} >
                                        {daysOptionsEles}
                                    </select>
                                    
                                    </td>
                                    <td> 
                                    <select name="date_year" className="form-control DocDateYearsListVE" dir="rtl"  onChange={addDocumentContext.inputFieldChangedHandler.bind(this,addDocumentContext.newFile)}>
                                        {yearsOptionsEles}
                                    </select>
                                    
                                    </td>
                                    <td> 
                                
                                        <button name="DocDateCalendarBtnVE"  className = "btn" onClick={calendarBtnClickHandler.bind(this,1)}>  <i className="glyphicon glyphicon-th"> </i></button>
                                        <Calendar   defaultValue={new Date(2017, 0, 1)} calendarType="Arabic"  onChange={onChangeDate} value={calendarDate['Date']} className={classes.CalendarComp +' calendar_1'}  />
                                    
                                    </td>
                            </tr>
                        </tbody>
                    </table>

                 </div>
                 <label htmlFor="DocDateVE" className="col-lg-3">التاريخ</label>

            </div>
                
            <div className={classes.DocRecDateDiv + ' '+ classes.DivVE+' form-group'}>
                <hr className="hidden-md hidden-lg"/> 
                <div className="col-lg-9">
                    <table id= "DocRecDateVE">
                        <tbody>
                            <tr>
                                <td> 
                                    <select name="recieving_date_month" className="form-control DocRecDateMonthsListVE" dir="rtl"  onChange={addDocumentContext.inputFieldChangedHandler.bind(this,addDocumentContext.newFile)} >
                                        {monthsOptionsEles}
                                    </select>
                                    
                                    </td>
                                    <td> 
                                    <select name="recieving_date_day" className="form-control DocRecDateDaysListVE" dir="rtl"  onChange={addDocumentContext.inputFieldChangedHandler.bind(this,addDocumentContext.newFile)} >
                                        {daysOptionsEles}
                                    </select>
                                    
                                    </td>
                                    <td> 
                                    <select name="recieving_date_year" className="form-control DocRecDateYearsListVE" dir="rtl"  onChange={addDocumentContext.inputFieldChangedHandler.bind(this,addDocumentContext.newFile)}>
                                        {yearsOptionsEles}
                                    </select>
                                    
                                    </td>
                                    <td > 
                                
                                <button type="button" name="DocRecDateCalendarBtnVE" className="btn" id="showDatePickerBtnVE" onClick={calendarBtnClickHandler.bind(this,2)}>  <i className="glyphicon glyphicon-th"> </i></button>
                                <Calendar   defaultValue={new Date(2017, 0, 1)} calendarType="Arabic"  onChange={onChangeRecDate} value={calendarDate['RecDate']} className={classes.CalendarComp +' calendar_2'} />
                            
                            
                            </td>

                            </tr>
                        </tbody>
                    </table>

                </div>
                <label htmlFor="DocRecDateVE" className="col-lg-3"> تاريخ الأستلام</label>
            </div>
                
            <div className={classes.DocUploadViewDiv  + ' '+ classes.DivVE+ ' form-group'}>
                <hr className="hidden-md hidden-lg"/> 
                <div className="col-lg-9">
                    <table id= "DocUploadViewVE">
                        <tbody>
                            <tr>
                                <td>
                                    <input type="file" name="file" className={classes.DocUploadFieldVE+" form-control "} id="DocUploadFieldIDVE"  onChange={addDocumentContext.inputFieldChangedHandler.bind(this,addDocumentContext.newFile)}  />
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </div>
                <label htmlFor = "DocUploadViewVE" className="col-lg-3">القرار</label>
                
            </div>
            <div className={classes.DocContentDiv  + ' '+ classes.DivVE+ ' from-group'}>
                <hr className="hidden-md hidden-lg"/> 
                <div className="col-lg-9">
                    <textarea id="DocContentVE" className="form-control" name="content" dir="rtl"  rows="3"  onChange={addDocumentContext.inputFieldChangedHandler.bind(this,addDocumentContext.newFile)}></textarea>
                </div>
                <label htmlFor="DocContentVE" className="col-lg-3">المحتوى</label>
            </div>

            <div className={classes.DocNotesDiv  + ' '+ classes.DivVE+' form-group'}> 
                <hr className="hidden-md hidden-lg"/> 
                <div className="col-lg-9"> 
                     <textarea id="DocNotesVE" className="form-control" name="notes" dir="rtl" rows="3"  onChange={addDocumentContext.inputFieldChangedHandler.bind(this,addDocumentContext.newFile)}></textarea>

                </div>
                <label htmlFor="DocNotesVE" className="col-lg-3">الملاحظات</label>
            </div>

        </div>

    );
}
export default InputFields;