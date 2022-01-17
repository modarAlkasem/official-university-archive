import React ,{useContext , useState} from 'react';
import classes from './AdminProfile.module.css';
import ContentHeader from './../CategoryContent/ContentHeader/ContentHeader';
import GeneralContext from './../../context/general_context';
import axios from 'axios';
import CookieService from './../../CookieService/CookieService';


const AdminProfile = props=>{
    let generalContext =useContext(GeneralContext);
    let axiosInstance = axios.create({
        baseURL:'http://127.0.0.1:8000'
    });
    const [state , updateState] = useState({
        newUserFirstName:'',
        newUserLastName:'',
        newUserUserName:'',
        newUserRole:'A',
        newUserPassword:'',
        newUserConfirmPassword:'',
        currentUserId:generalContext.userId,
        currentUserFirstName:generalContext.firstName,
        currentUserLastName:generalContext.lastName,
        currentUserUserName:generalContext.userName,
        currentUserRole:generalContext.role,
        currentUserOldPassword:'',
        currentUserNewPassword:'',
        currentUserConfirmPassword:'',
        deleteUserFieldValue:''

    });
    const newUserFirstNameChangedHandler= event=>{
        let currentState = {...state};
        currentState['newUserFirstName']=event.target.value;
        updateState(currentState);
    }
    const newUserLastNameChangedHandler= event=>{
        let currentState = {...state};
        currentState['newUserLastName']=event.target.value;
        updateState(currentState);
    }
    const newUserUserNameChangedHandler= event=>{
        let currentState = {...state};
        currentState['newUserUserName']=event.target.value;
        updateState(currentState);
    }
    const newUserRoleChangedHandler= event=>{
        let currentState = {...state};
        currentState['newUserRole']=event.target.value;
        updateState(currentState);
    }
    const newUserPasswordChangedHandler= event=>{
        let currentState = {...state};
        currentState['newUserPassword']=event.target.value;
        updateState(currentState);
    }
    const newUserConfirmPasswordChangedHandler= event=>{
        let currentState = {...state};
        currentState['newUserConfirmPassword']=event.target.value;
        updateState(currentState);
    }
    /* /////////////////////////////////////*/

    const currentUserFirstNameChangedHandler= event=>{
        let currentState = {...state};
        currentState['currentUserFirstName']=event.target.value;
        updateState(currentState);
    }
    const currentUserLastNameChangedHandler= event=>{
        let currentState = {...state};
        currentState['currentUserLastName']=event.target.value;
        updateState(currentState);
    }
    const currentUserUserNameChangedHandler= event=>{
        let currentState = {...state};
        currentState['currentUserUserName']=event.target.value;
        updateState(currentState);
    }
    const currentUserRoleChangedHandler= event=>{
        let currentState = {...state};
        currentState['currentUserRole']=event.target.value;
        updateState(currentState);
    }
    const currentUserOldPasswordChangedHandler= event=>{
        let currentState = {...state};
        currentState['currentUserOldPassword']=event.target.value;
        updateState(currentState);
    }
    const currentUserNewPasswordChangedHandler= event=>{
        let currentState = {...state};
        currentState['currentUserNewPassword']=event.target.value;
        updateState(currentState);
    }
    const currentUserConfirmPasswordChangedHandler= event=>{
        let currentState = {...state};
        currentState['currentUserConfirmPassword']=event.target.value;
        updateState(currentState);
    }
    const addNewUser = ()=>{
        const newUserFirstNameField = document.getElementById('InputNewUserFirstNameFieldId');
        const newUserLastNameField = document.getElementById('InputNewUserLastNameFieldId');
        const newUserUserNameField = document.getElementById('InputNewUserUserNameFieldId');
        const newUserRoleField = document.getElementById('InputNewUserRoleFieldId');
        const newUserPasswordField = document.getElementById('InputNewUserPasswordFieldId');
        const newUserConfirmPasswordField = document.getElementById('InputNewUserConfirmPasswordFieldId');
        const validationInputNewUserEle = document.getElementById('validationInputNewUserEleId');
        const emptyReg = /[\s\S]*\S[\s\S]*/;
        const englishAlphabetOnly = /^[a-zA-Z]+$/;
        const strongPasswordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        
        const stylesString = 'display:inline; color:#f39c12; margin-bottom:10px';
        let arrEles = [newUserFirstNameField,newUserLastNameField , newUserUserNameField ,newUserRoleField
                        ,newUserPasswordField ,newUserConfirmPasswordField ];
        let isFieldEmpty=false;
         
          arrEles.forEach(current=>{
            if(!current.value.match(emptyReg)){
                validationInputNewUserEle.innerText = '**لا يجب ان يكون هنالك حقول فارغة**';
                validationInputNewUserEle.style.cssText = stylesString;
                
                isFieldEmpty = true
                return 0;
            }
            
           
        });

        if(isFieldEmpty){
            return 0;

        }else{
            validationInputNewUserEle.style.cssText='display:none';
        }
       arrEles = [newUserFirstNameField,newUserLastNameField ];
       let flag =false;
       arrEles.forEach(current=>{
        if(!current.value.match(englishAlphabetOnly)){
            validationInputNewUserEle.innerText = '**يجب ان تحوي حقول الأسم الأول و الأسم الأخير فقط احرف**';
            validationInputNewUserEle.style.cssText = stylesString;
            
            flag = true
            return 0;
        }
        
       
    });
    
        if(flag){
            return 0 ;
        }else{
            validationInputNewUserEle.style.cssText='display:none';
        }
        flag =false;
        if(newUserPasswordField.value.match(strongPasswordReg)){
            validationInputNewUserEle.style.cssText='display:none';

        }else{
            validationInputNewUserEle.innerText = '**يجب ان تكون كلمة المرور على الأقل تتألف من 8 محارف و على الأقل رقم واحد و حرف واحد**';
            validationInputNewUserEle.style.cssText = stylesString;
            return 0 ;
        }
        flag =false;
        if(newUserPasswordField.value===newUserConfirmPasswordField.value){
            validationInputNewUserEle.style.cssText='display:none';

        }else{
            validationInputNewUserEle.innerText = '**كلمة المرور غير متطابقة**';
            validationInputNewUserEle.style.cssText = stylesString;
            return 0 ;
        }

        axiosInstance.post('/register' , {
            first_name :state.newUserFirstName,
            last_name:state.newUserLastName,
            email:state.newUserUserName,
            role:state.newUserRole,
            password:state.newUserPassword
        } , {
            headers:{
                Authorization:`Bearer ${CookieService.get('access_token')}`
            }
        }).then(()=>{
            validationInputNewUserEle.innerText = 'تم إضافة مستخدم جديد بنجاح' ;
            validationInputNewUserEle.style.cssText = 'display:inline; color:#3e8f3e; margin-bottom:10px';

            return 0 ;
        }).catch(()=>{
            validationInputNewUserEle.innerText = '** يوجد اسم مستخدم مماثل**';
            validationInputNewUserEle.style.cssText = stylesString;
            return 0;
        });

    }

    /*////////////////////////*/

    const upateCurrentUser = ()=>{
        const currentFirstNameField = document.getElementById('userDetailsFirstNameFieldId');
        const currentLastNameField = document.getElementById('userDetailsLastNameFieldId');
        const currentUserNameField = document.getElementById('userDetailsUserNameFieldId');
        // const currentRoleField = document.getElementById('userDetailsRoleFieldId');
        // const currentOldPasswordField = document.getElementById('userDetailsOldPasswordFieldId');
        const currentNewPasswordField = document.getElementById('userDetailsNewPasswordFieldId');
        const currentConfirmPasswordField = document.getElementById('userDetailsConfirmPasswordFieldId');
        const validationUserDetailsEle = document.getElementById('validationUserDetailsEleId');
        const emptyReg = /[\s\S]*\S[\s\S]*/;
        const englishAlphabetOnly = /^[a-zA-Z]+$/;
        const strongPasswordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        
        const stylesString = 'display:inline; color:#f39c12; margin-bottom:10px';
        let arrEles = [currentFirstNameField,currentLastNameField , currentUserNameField ];
        let isFieldEmpty=false;
         
          arrEles.forEach(current=>{
            if(!current.value.match(emptyReg)){
                validationUserDetailsEle.innerText = '**لا يجب ان يكون حقل الأسم الأول او الأسم الأخير أو اسم المستخدم فارغ**';
                validationUserDetailsEle.style.cssText = stylesString;
                
                isFieldEmpty = true
                return 0;
            }
            
           
        });

        if(isFieldEmpty){
            return 0;

        }else{
            validationUserDetailsEle.style.cssText='display:none';
        }
       arrEles = [currentFirstNameField,currentLastNameField ];
       let flag =false;
       arrEles.forEach(current=>{
        if(!current.value.match(englishAlphabetOnly)){
            validationUserDetailsEle.innerText = '**يجب ان تحوي حقول الأسم الأول و الأسم الأخير فقط احرف**';
            validationUserDetailsEle.style.cssText = stylesString;
            
            flag = true
            return 0;
        }
        
       
    });
    
        if(flag){
            return 0 ;
        }else{
            validationUserDetailsEle.style.cssText='display:none';
        }
        if(currentConfirmPasswordField.value===currentNewPasswordField.value){
            validationUserDetailsEle.style.cssText='display:none';
            flag =false;
            if(currentNewPasswordField.value!==''){
                if(currentNewPasswordField.value.match(strongPasswordReg)){
                    validationUserDetailsEle.style.cssText='display:none';
        
                }else{
                    validationUserDetailsEle.innerText = '**يجب ان تكون كلمة المرور على الأقل تتألف من 8 محارف و على الأقل رقم واحد و حرف واحد**';
                    validationUserDetailsEle.style.cssText = stylesString;
                    return 0 ;
                }
            }


        }else{
            validationUserDetailsEle.innerText = '**كلمة السر الجديدة غير متطابقة**';
            validationUserDetailsEle.style.cssText = stylesString;
            return 0 ;
        }
        let data = new FormData();
        data.append(' first_name' , state.currentUserFirstName);
        data.append('last_name' , state.currentUserLastName);
        data.append('role' , state.currentUserRole);
        data.append('email' , state.currentUserUserName);
        data.append('oldPassword' , state.currentUserOldPassword);
        data.append('newPassword' ,state.currentUserNewPassword);
        data.append('user_id' , state.currentUserId);
        data.append('_method' , 'PUT');
        axiosInstance.post(`/users/${state.currentUserId}` , data , {
            headers:{
                Authorization:`Bearer ${CookieService.get('access_token')}`
            }
        }).then(()=>{
            validationUserDetailsEle.innerText = 'تم التعديل بنجاح' ;
            validationUserDetailsEle.style.cssText = 'display:inline; color:#3e8f3e; margin-bottom:10px';

            props.history.push({
                pathname:'/',
                state:'details'
            });
            return 0 ;
           
        }).catch((error)=>{
            if(error.response.data.errorType===2){
                validationUserDetailsEle.innerText = '** يوجد اسم مستخدم مماثل **'  ;
                validationUserDetailsEle.style.cssText = 'display:inline; color:#f39c12; margin-bottom:10px';

            }else if(error.response.data.errorType===1){
                validationUserDetailsEle.innerText = '** كلمة المرور غير صحيحة **'  ;
                validationUserDetailsEle.style.cssText = 'display:inline; color:#f39c12; margin-bottom:10px';
            }
            
            // validationInputNewUserEle.innerText = '** يوجد اسم مستخدم مماثل**';
            // validationInputNewUserEle.style.cssText = stylesString;
            return 0;
        });

    }

    /*/////*/
    const deleteUserChangedHandler= event=>{
        let currentState = {...state};
        currentState['deleteUserFieldValue']=event.target.value;
        updateState(currentState);
    }
    const deleteUser = ()=>{
        const deleteUserField= document.getElementById('deleteUserFieldId');
        const deleteUserValEle = document.getElementById('deleteUserVal');
        const emptyReg = /[\s\S]*\S[\s\S]*/;
        const stylesString = 'display:inline; color:#f39c12; margin-bottom:10px';
        if(!deleteUserField.value.match(emptyReg)){
            deleteUserValEle.innerText =  '**لا يجب ان يكون هنالك حقول فارغة**';
            deleteUserValEle.style.cssText = stylesString;
           return 0 ;

        }else{  
            let data = new FormData();
            data.append('email',state.deleteUserFieldValue);
            deleteUserValEle.cssText='display:none;';
            axiosInstance.post('/users/delete' , data,{
                headers:{
                    Authorization:`Bearer ${CookieService.get('access_token')}`
                }
            }).then(()=>{
                deleteUserValEle.innerText = 'تم حذف المستخدم بنجاح';
                deleteUserValEle.style.cssText='display:inline; color:#3e8f3e; margin-bottom:10px';
                return 0;
            }).catch(()=>{
                deleteUserValEle.innerText =  '**لا يوجد اسم مستخدم مماثل **';
                deleteUserValEle.style.cssText = stylesString;
                return 0;
            });

        }

    }

    return (
        <div className = {classes.AdminProfile+' container-fluid'}>
            <ContentHeader/>
            <div className={classes.Welcome} dir="rtl"> مرحبا {generalContext.firstName}!</div>
            <div className={classes.MainPart+' row'}  >

                <div className={classes.InputNewUser + ' col-lg-5 col-md-5'} dir='rtl'>
                        <div className ={classes.InputNewUserHeader} dir="rtl"><span className='Icon glyphicon glyphicon-plus-sign'></span>إضافة مستخدم جديد </div>
                        
                        <div className={classes.InputNewUserFields}>
                            <span id="validationInputNewUserEleId" ></span>
                                <div className={classes.InputNewUserFirstName +' form-group'}>
                                    <label htmlFor = 'InputNewUserFirstNameFieldId'>الأسم الأول</label>
                                    <input type="text" name='InputNewUserFirstNameField' className='form-control' id='InputNewUserFirstNameFieldId' value={state.newUserFirstName} onChange={newUserFirstNameChangedHandler} />

                                </div>
                                <div className={classes.InputNewUserLastName +' form-group'}>
                                    <label htmlFor = 'InputNewUserLastNameFieldId'>الأسم الأخير</label>
                                    <input type="text" name='InputNewUserLastNameField' className='form-control' id='InputNewUserLastNameFieldId' value={state.newUserLastName} onChange={newUserLastNameChangedHandler} />

                                </div>
                                <div className={classes.InputNewUserUserName +' form-group'}>
                                    <label htmlFor = 'InputNewUserUserNameFieldId'>اسم المستخدم</label>
                                    <input type="text" name='InputNewUserUserNameField' className='form-control' id='InputNewUserUserNameFieldId' value={state.newUserUserName} onChange={newUserUserNameChangedHandler}/>

                                </div>
                                <div className={classes.InputNewUserRole +' form-group'}>
                                    <label htmlFor = 'InputNewUserRoleFieldId'>صفة المستخدم</label>
                                    <select name = 'InputNewUserRoleField' id= "InputNewUserRoleFieldId" className="form-control" value={state.newUserRole} onChange={newUserRoleChangedHandler}>
                                        <option value="A"> مدير</option>
                                        <option value = "E"> موظف</option>
                                    </select>

                                </div>
                                <div className={classes.InputNewUserPassword +' form-group'}>
                                    <label htmlFor = 'InputNewUserPasswordFieldId'>كلمة المرور</label>
                                    <input type="password" name='InputNewUserPasswordField' className='form-control' id='InputNewUserPasswordFieldId' value={state.newUserPassword} onChange={newUserPasswordChangedHandler} />

                                </div>
                                <div className={classes.InputNewUserConfirmPassword +' form-group'}>
                                    <label htmlFor = 'InputNewUserConfirmPasswordFieldId'>تأكيد كلمة المرور</label>
                                    <input type="password" name='InputNewUserConfirmPasswordField' className='form-control' id='InputNewUserConfirmPasswordFieldId' value={state.newUserConfirmPassword} onChange={newUserConfirmPasswordChangedHandler}/>

                                </div>
                                <div className ={classes.InputNewUserBtnDiv}>
                                        <button className='btn btn-success btn-md' onClick={addNewUser}> <span className='Icon glyphicon glyphicon-plus-sign'></span> إضافة مستخدم </button>
                                </div>


                        </div>
                </div>
                
                <div className={classes.userDetails + ' col-lg-5 col-md-5 col-lg-push-2'} dir='rtl'>
                        <div className ={classes.userDetailsHeader} dir="rtl"><span className='glyphicon glyphicon-info-sign'></span>معلوماتك </div>
                        
                        <div className={classes.userDetailsFields}>
                            <span id="validationUserDetailsEleId" ></span>
                                <div className={classes.userDetailsFirstName +' form-group'}>
                                    <label htmlFor = 'userDetailsFirstNameFieldId'>الأسم الأول</label>
                                    <input type="text" name='userDetailsFirstNameField' className='form-control' id='userDetailsFirstNameFieldId' value={state.currentUserFirstName} onChange={currentUserFirstNameChangedHandler} />

                                </div>
                                <div className={classes.userDetailsLastName +' form-group'}>
                                    <label htmlFor = 'userDetailsLastNameFieldId'>الأسم الأخير</label>
                                    <input type="text" name='userDetailsLastNameField' className='form-control' id='userDetailsLastNameFieldId' value={state.currentUserLastName} onChange={currentUserLastNameChangedHandler} />

                                </div>
                                <div className={classes.userDetailsUserName +' form-group'}>
                                    <label htmlFor = 'userDetailsUserNameFieldId'>اسم المستخدم</label>
                                    <input type="text" name='userDetailsUserNameField' className='form-control' id='userDetailsUserNameFieldId' value={state.currentUserUserName} onChange={currentUserUserNameChangedHandler}/>

                                </div>
                                <div className={classes.userDetailsRole +' form-group'}>
                                    <label htmlFor = 'userDetailsRoleFieldId'>صفة المستخدم</label>
                                    <select name = 'userDetailsRoleField' id= "userDetailsRoleFieldId" className="form-control" value={state.currentUserRole} onChange={currentUserRoleChangedHandler}>
                                        <option value="A"> مدير</option>
                                        <option value = "E"> موظف</option>
                                    </select>

                                </div>
                                <div className={classes.userDetailsOldPassword +' form-group'}>
                                    <label htmlFor = 'userDetailsOldPasswordFieldId'>كلمة المرور القديمة</label>
                                    <input type="password" name='userDetailsOldPasswordField' className='form-control' id='userDetailsOldPasswordFieldId' value={state.currentUserOldPassword} onChange={currentUserOldPasswordChangedHandler} />

                                </div>
                                <div className={classes.userDetailsNewPassword +' form-group'}>
                                    <label htmlFor = 'userDetailsNewPasswordFieldId'>كلمة المرور الجديدة</label>
                                    <input type="password" name='userDetailsNewPasswordField' className='form-control' id='userDetailsNewPasswordFieldId' value={state.currentUserNewPassword} onChange={currentUserNewPasswordChangedHandler} />

                                </div>

                                <div className={classes.userDetailsConfirmPassword +' form-group'}>
                                    <label htmlFor = 'userDetailsConfirmPasswordFieldId'>تأكيد كلمة المرور</label>
                                    <input type="password" name='userDetailsConfirmPasswordField' className='form-control' id='userDetailsConfirmPasswordFieldId' value={state.currentUserConfirmPassword} onChange={currentUserConfirmPasswordChangedHandler}/>

                                </div>
                                <div className ={classes.userDetailsBtnDiv}>
                                        <button className='btn btn-success btn-md' onClick={upateCurrentUser}> <span className='glyphicon glyphicon-ok'></span> تحديث المعلومات </button>
                                </div>


                        </div>
                </div>

            
            <div className={classes.DeleteUser + ' col-lg-5 col-md-5 col-lg-push-2'} dir='rtl'>
                        <div className ={classes.DeleteUserHeader} dir="rtl"><span className='glyphicon glyphicon-trash'></span>حذف مستخدم </div>
                        
                        <div className = {classes.DeleteUserMainPart}>
                        <span id='deleteUserVal'></span>
                        <div className = {classes.DeleteUserDiv + ' form-group'}>
                            <label htmlFor = 'deleteUserFieldId'>اسم المستخدم</label>
                            <input type='text' name = 'deleteUserField' id = 'deleteUserFieldId' className='form-control' value={state.deleteUserFieldValue} onChange = {deleteUserChangedHandler}/>

                        </div>
                        <div className ={classes.DeleteUserBtnDiv}>
                                        <button className='btn btn-danger btn-md' onClick={deleteUser}> <span className='glyphicon glyphicon-trash'></span> حذف مستخدم </button>
                         </div>
                        </div>

            </div>

            </div>

        </div>


    );
}

export default AdminProfile;
