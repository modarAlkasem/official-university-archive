import React  , {useState ,useEffect , useContext}from 'react';
import classes from './ViewEdit.module.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CategoryContentContext from './../../../../context/category_content_context';
import axios from 'axios';
import CookieService from './../../../../CookieService/CookieService';




const optionsDateGen = ()=>{

    let yearsOptionsEles= new Array(201).fill(null);
    let daysOptionsEles= new Array(31).fill(null);
    let monthsOptionsEles = [];
    const months = ['كانون الأول','تشرين الثاني','تشرين الأول','أيلول','آب','تموز','حزيران','آيار' ,'نيسان','آذار','شباط', 'كانون الثاني'];
    monthsOptionsEles= months.reverse().map((current , index)=>{
        
         return <option value = {index+1} key={'monthOption-'+index+1}>{current}</option>
    });
    yearsOptionsEles = yearsOptionsEles.map((_ , index)=>{
        
        return <option value = {1900+index} key={'yearOption-'+index+1900}>{1900+index}</option>
    });
    daysOptionsEles = daysOptionsEles.map((_ , index)=>{
        return <option value = {1+index}  key={'dayOption-'+index+1}> {1+index}</option>
    });

    return {
        days:daysOptionsEles ,
        months:monthsOptionsEles,
        years:yearsOptionsEles
    }
}
const ViewEdit = props=>{

const categoryContentContext = useContext(CategoryContentContext);
const axiosInstance = axios.create({
    baseURL : 'http://127.0.0.1:8000'
});

let catNameInUrl = '';
if(categoryContentContext.category.title==='القرارات الإدارية'){
    catNameInUrl = 'administrativeDocs';

}else if(categoryContentContext.category.title==='هيئة التفرغ العلمي'){
    catNameInUrl = 'scientificBodyDocs';

}
function viewDocHandler(catId , subcatId , catName , docId){
    axiosInstance.get(`/categories/${catId}/subcategories/${subcatId}/${catName}/${docId}/view`,{
        responseType: 'blob',
        
     headers:{
                Authorization:`Bearer ${CookieService.get('access_token')}`
            }
        
    }).then(res=>{
        const file = new Blob([res.data],{type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);     
    }).catch(error => {
        console.error(error);
    });
}

useEffect(()=>{
    
    DateSelectOpts(calendarDate.whichDate);
});

const [calendarDate , setDate]= useState({
    Date:new Date(2017, 0, 1),
    RecDate:new Date(2017, 0, 1),
    whichDate:null,
    

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

    const subcatsOptions =categoryContentContext.subCats.map(current=>{
        return <option value ={current.subcategory_id} key={'subcatOption'+current.subcategory_id}>{current.title}</option>
    });
    
    
    return(

        <div className={classes.ViewEdit + ' col-lg-10 col-md-8  '} dir="rtl">
            <div className={classes.DocIDDiv + ' '+ classes.DivVE+ ' form-group'}>
                <hr className="hidden-md hidden-lg"/> 
                
                <div className="col-lg-9" >
  
                     <input type="text" name="doc_number"  className="form-control" id="DocIDVE" dir="rtl" value={props.doc.doc_number} onChange={categoryContentContext.updatecontextHandler.bind(this,props.doc[props.idfieldName])}/>

                </div>
                <label htmlFor="DocIDVE" className="col-lg-3">رقم القرار</label>
            </div>

            <div className={classes.DocNumPagesDiv + ' '+ classes.DivVE+' form-group'}>

                <hr className="hidden-md hidden-lg"/> 
                
                <div className="col-lg-9" >
                    <input type="text" name="num_pages" className="form-control" id ="DocNumPagesVE" dir="rtl" value={props.doc.num_pages} onChange={categoryContentContext.updatecontextHandler.bind(this,props.doc[props.idfieldName])}/>
                </div>
                <label htmlFor="DocNumPagesVE" className="col-lg-3">عدد الصفحات</label>

            </div>

            <div className={classes.DocSourceDiv + ' '+ classes.DivVE+' form-group'}>
                 <hr className="hidden-md hidden-lg"/> 
                 
                <div className="col-lg-9" >
                     <input type="text" name="source" className="form-control" id ="DocSourceVE" dir="rtl" value={props.doc.source} onChange={categoryContentContext.updatecontextHandler.bind(this,props.doc[props.idfieldName])}/>

                </div>
                <label htmlFor="DocSourceVE" className="col-lg-3">المصدر</label>
            </div>

                
               <div className={classes.DocCatDiv + ' '+ classes.DivVE+' form-group'} >
                    <hr className="hidden-md hidden-lg"/> 
                    
                   <div className="col-lg-9">
                        <input name="category" id = "DocCatVE" className="form-control" dir="rtl" value={props.catName} readOnly/>
                   </div>
                   <label htmlFor="DocCatVE" className="col-lg-3">الفئة الأساسية</label>
               </div>
              
            <div className={classes.DocSubCatDiv  + ' '+ classes.DivVE+ ' from-group'}>
                <hr className="hidden-md hidden-lg"/> 
                
                <div className="col-lg-9">
                    <select name="subcategory_id" id = "DocSubCatVE" className="form-control" dir="rtl" value={props.doc.subcategory_id} onChange={categoryContentContext.updatecontextHandler.bind(this,props.doc[props.idfieldName])} >
                            {subcatsOptions}
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
                                    <select name="date_month" className="form-control DocDateMonthsListVE" dir="rtl" value = {parseInt(props.doc.date.split('-')[1])} onChange={categoryContentContext.updatecontextHandler.bind(this,props.doc[props.idfieldName])}>
                                        {monthsOptionsEles}
                                    </select>
                                    
                                    </td>
                                    <td> 
                                    <select name="date_day" className="form-control DocDateDaysListVE" dir="rtl" value = {parseInt(props.doc.date.split('-')[2])} onChange={categoryContentContext.updatecontextHandler.bind(this,props.doc[props.idfieldName])}>
                                        {daysOptionsEles}
                                    </select>
                                    
                                    </td>
                                    <td> 
                                    <select name="date_year" className="form-control DocDateYearsListVE" dir="rtl" value = {parseInt(props.doc.date.split('-')[0])} onChange={categoryContentContext.updatecontextHandler.bind(this,props.doc[props.idfieldName])}>
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
                                    <select name="recieving_date_month" className="form-control DocRecDateMonthsListVE" dir="rtl" value = {parseInt(props.doc.recieving_date.split('-')[1])} onChange={categoryContentContext.updatecontextHandler.bind(this,props.doc[props.idfieldName])} >
                                        {monthsOptionsEles}
                                    </select>
                                    
                                    </td>
                                    <td> 
                                    <select name="recieving_date_day" className="form-control DocRecDateDaysListVE" dir="rtl" value = {parseInt(props.doc.recieving_date.split('-')[2])} onChange={categoryContentContext.updatecontextHandler.bind(this,props.doc[props.idfieldName])}>
                                        {daysOptionsEles}
                                    </select>
                                    
                                    </td>
                                    <td> 
                                    <select name="recieving_date_year" className="form-control DocRecDateYearsListVE" dir="rtl" value = {parseInt(props.doc.recieving_date.split('-')[0])} onChange={categoryContentContext.updatecontextHandler.bind(this,props.doc[props.idfieldName])}>
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

                                    <button type ="button" className ={classes.DocViewBtnVE + ' btn btn-danger'} id="DocViewBtnIDVE" name="DocViewBtnVE" onClick={viewDocHandler.bind(this,categoryContentContext.category.category_id ,props.doc.subcategory_id,catNameInUrl,props.doc[ props.idfieldName]) }><span> <i className="glyphicon glyphicon-eye-open"></i>  عرض القرار </span></button>
                                </td>
                                <td>
                                    <input type="file" name="file" className={classes.DocUploadFieldVE+" form-control "} id="DocUploadFieldIDVE" onChange={categoryContentContext.updatecontextHandler.bind(this,props.doc[props.idfieldName])}  />
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
                    <textarea id="DocContentVE" className="form-control" name="content" dir="rtl"  rows="3" value ={props.doc.content} onChange={categoryContentContext.updatecontextHandler.bind(this,props.doc[props.idfieldName])}></textarea>
                </div>
                <label htmlFor="DocContentVE" className="col-lg-3">المحتوى</label>
            </div>

            <div className={classes.DocNotesDiv  + ' '+ classes.DivVE+' form-group'}> 
                <hr className="hidden-md hidden-lg"/> 
                <div className="col-lg-9"> 
                     <textarea id="DocNotesVE" className="form-control" name="notes" dir="rtl" rows="3" value ={props.doc.notes} onChange={categoryContentContext.updatecontextHandler.bind(this,props.doc[props.idfieldName])}></textarea>

                </div>
                <label htmlFor="DocNotesVE" className="col-lg-3">الملاحظات</label>
            </div>

        </div>

    );
}
export {optionsDateGen};
export default ViewEdit;