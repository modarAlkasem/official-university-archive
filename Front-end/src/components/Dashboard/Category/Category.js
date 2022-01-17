import React , {useEffect} from 'react';
import classes from './Category.module.css';
import {Link} from 'react-router-dom';


const Category = props =>{
//   console.log(classes.Category);
//     document.getElementById('category').addEventListener('overmouse',function(){
//         document.querySelector('.far fa-file-archive').style.fontSize='100px';
//     });
    useEffect(()=>{
        
        overMouseHandler();// eslint-disable-next-line
    },[]);
    const overMouseHandler = ()=>{
        
        const MoreInfoSelector = document.querySelector("."+choosenBg +" ."+classes.Part2);
        document.getElementById(choosenBg ).addEventListener('mouseover',function(){
            
        document.getElementById(props.catName).style.fontSize='100px';
        if(props.catName==='القرارات الإدارية'){
            MoreInfoSelector.style.background= " #00a9d3"

        }else{
            MoreInfoSelector.style.background= " #00884b"

        }
       
        });
        document.getElementById(choosenBg ).addEventListener('mouseleave',function(){
            
            document.getElementById(props.catName).style.fontSize='90px';
            if(props.catName==='القرارات الإدارية'){
                MoreInfoSelector.style.background= " #00c0ef"
    
            }else{
                MoreInfoSelector.style.background= " #00a65a"
    
            }
        });

    }
    let choosenBg = null;
    
    if(props.catName==='القرارات الإدارية'){
        choosenBg=classes.Bg_aqua;
        
    }else{
        choosenBg=classes.Bg_green;
       
    }
    return(
        <div className={classes.Category +' col-lg-4 col-md-5  col-lg-push-1 ' + choosenBg } id={choosenBg}>
            <div className={classes.Part1}>
                  <h3>{props.amount}</h3>
                  <p>{props.catName}</p>
                  <i className="far fa-file-archive" id={props.catName}></i>

            </div>
            <div className={classes.Part2}>
                <Link to={`/categories/${props.catId}`}  className={classes.MoreInfo}>المزيد <i className="fas fa-arrow-circle-left"></i></Link>

            </div>
        </div>
    );
}



export default Category;