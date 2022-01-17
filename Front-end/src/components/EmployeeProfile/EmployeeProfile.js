import React ,{useContext} from 'react';
import classes from './EmployeeProfile.module.css';
import ContentHeader from './../CategoryContent/ContentHeader/ContentHeader';
import GeneralContext from './../../context/general_context';




const EmployeeProfile = ()=>{
    let generalContext = useContext(GeneralContext);
    return(
        <div className = {classes.EmployeeProfile + ' container-fluid'} dir='rtl'>
            <ContentHeader/>
            <div className = {classes.Welecome}>
            مرحبا {generalContext.firstName}!

            </div>
            <div className = {classes.MainPart+' row'}>
                <div className={classes.MainPartHeader}>معلوماتك</div>
                <div className = {classes.Content}>
                <table>
                    <thead>
                        <th></th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='label-e'> المحدد </td>
                            <td>  {generalContext.userId}</td>
                        </tr>
                        <tr>
                            <td className='label-e'> الأسم الأول</td>
                            <td>  {generalContext.firstName}</td>
                        </tr>
                        <tr>
                            <td className='label-e'> الأسم الأخير</td>
                            <td>  {generalContext.lastName}</td>
                        </tr>
                        <tr>
                            <td className='label-e'> صفة المستخدم</td>
                            <td> موظف</td>
                        </tr>
                        <tr>
                            <td className='label-e'> اسم المستخدم</td>
                            <td> {generalContext.userName}</td>
                        </tr>
                    </tbody>
                </table>
                </div>


            </div>

        </div>
    );
}
export default EmployeeProfile;