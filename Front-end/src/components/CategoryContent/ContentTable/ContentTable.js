import React ,{useContext} from 'react';
import classes from './ContentTable.module.css';
import Row from './Row/Row';
import CategoryContentContext from './../../../context/category_content_context';

const ContentTable = props =>{

    const docs = props.docs.map((current , index)=>{
        return <Row doc={current} key={'doc_index_'+index} />;
    });

    const categoryContentContext = useContext(CategoryContentContext);


    return(
        <div className={classes.ContentTable +' row'}>

            <div className={classes.Content +' col-lg-12 col-md-12  '}>
                <table>
                    <thead>
                        <tr>
                            <th>الملاحظات</th>
                            <th>تاريخ الوصول</th>
                            <th>المحتوى</th>
                            <th>الفئة الفرعية</th>
                            <th>عدد الصفحات</th>
                            <th>المصدر</th>
                            <th>التاريخ </th>
                            <th>رقم القرار</th>
                            <th>المحدد</th>
 
                        </tr>
                    </thead>

                    <tbody>
                        {docs}

                    </tbody>

                    <tfoot >
                        <tr>
                            <td colSpan ="9">
                                <span>  {categoryContentContext.totalDocs} السجل {categoryContentContext.from} الى {categoryContentContext.to} من </span>
                            </td>
                        </tr>
                       

                    </tfoot>
                </table>

            </div>

        </div>




        
    );
}


export default React.memo(ContentTable);