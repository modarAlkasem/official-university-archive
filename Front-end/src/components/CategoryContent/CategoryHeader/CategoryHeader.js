import React  from 'react';
import classes from './CategoryHeader.module.css';
import img from './../../../assets/archived_docs.png';
import idImg from './../../../assets/searching_by_icons/id.png';
import contentImg from './../../../assets/searching_by_icons/content.png';
import { Link } from "react-router-dom";

const CategoryHeader = props=>{

    let imgSrc = null;
    if(props.searchingType===1){
        imgSrc = contentImg;

    }else if(props.searchingType===2){
        imgSrc = idImg;
    }

    return (
        <div className={classes.CategoryHeader +' row'}>
            <div className={classes.Content +' col-lg-12 col-md-12'} >
                <div className={classes.RightSide + ' col-lg-7 col-md-7'}>
                    <Link to={`/categories/${props.catId}`}>
                        <img src={img} alt="Docs Logo"/>
                        <span> {props.catName}</span>
                    </Link>

                </div>
                <div className={classes.LeftSide + ' col-lg-5 col-md-5' }>
                    <input type="text" className = {classes.SearchingBox} placeholder="بحث سريع" value={props.searchingKeys} onChange={props.SearchingKeysChangedHandler}/>
                    <span id='searchingKeysValidation' style = {{'display':'none'}} ></span>
                    <span className={classes.InputGroupBtn}>
                        <button type="button" name="searching_btn"  id="searching_btn" title="بحث سريع"  className={classes.SearchingBtn} onClick = {props.SearchClickedHandler} >

                        <i className="glyphicon glyphicon-search"></i>     


                        </button>
                        <div className={"dropdown "+classes.SearchingByList} name="searchingByList" id="searchingByList"   >
                            <button className="dropdown-toggle" data-toggle="dropdown" type="button" id='searchingTypeBtn' value = {toString(props.searchingType)}>
                                <img src={imgSrc}  alt="search Type Logo" id = 'searchingTypeImg'/>
                                
                            </button>
                            <ul className="dropdown-menu">
                                <li id="item1" name='liIdImg' onClick={props.SearchingTypeChangedHandler} ><img src={idImg} alt="ID Logo" name='idImgInLi'/> رقم القرار</li>
                                <li id="item2" name='liContentImg' onClick={props.SearchingTypeChangedHandler}><img src={contentImg} alt="Content Logo" name='contentImgInLi'/> المحتوى</li>

                            </ul>
                            
                        </div>

                    </span>



                </div>

            </div>

        </div>
    );
}

export default CategoryHeader ;
