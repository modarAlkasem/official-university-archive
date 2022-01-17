import React , {Component} from 'react';
import classes from './CategoryContent.module.css';
import ContentHeader from './../../components/CategoryContent/ContentHeader/ContentHeader';
import CategoryHeader from './../../components/CategoryContent/CategoryHeader/CategoryHeader';
import ContentTable from './../../components/CategoryContent/ContentTable/ContentTable';
import OptionsButtons from './../../components/CategoryContent/OptionsButtons/OptionsButtons';
import PaginationButtons from './../../components/CategoryContent/PaginationButtons/PaginationButtons';
import GeneralContext from './../../context/general_context';
import axios from 'axios';
import CategoryContentContext from './../../context/category_content_context';
import CookieService from './../../CookieService/CookieService';

class CategoryContent extends Component {

    axiosInstance = axios.create({
        baseURL : 'http://127.0.0.1:8000'
    });

    static contextType = GeneralContext;

    state = {       
        documents:[] ,
        category:{},
        subCats:[],
        showBasedOn :4,
        searchingKeys : '',
        searchingType: 1,
        nextPageUrl:null,
        prevPageUrl:null,
        from:0,
        to:0,
        totalDocs:0
    };

    initializingState=()=>{
        
        const categoryIndex = this.context.categories.findIndex(current=>{
            return current.category_id === parseInt(this.props.match.params.catId)
        });
        
        const categoryInstance = this.context.categories[categoryIndex];
        let catName = '';
        if(categoryInstance.title==='القرارات الإدارية'){
            catName = 'administrativeDocs';

        }else if(categoryInstance.title==='هيئة التفرغ العلمي'){
            catName = 'scientificBodyDocs';

        }
        
        axios.all([
            this.axiosInstance.get(`/categories/${this.props.match.params.catId}/subcategories/4/${catName}`,{
                headers:{
                    Authorization:`Bearer ${CookieService.get('access_token')}`
                }
            }),
            this.axiosInstance.get(`/categories/${this.props.match.params.catId}/subcategories`,{
                headers:{
                    Authorization:`Bearer ${CookieService.get('access_token')}`
                }
            })
            
        ]).then(axios.spread((docs , subcats)=>{
            this.setState({
                documents:docs.data.data,
                subCats:subcats.data,
                category:categoryInstance,
                nextPageUrl:docs.data.next_page_url,
                prevPageUrl:docs.data.prev_page_url,
                from:docs.data.from,
                to:docs.data.to,
                totalDocs:docs.data.total


            });
        })).catch(error=>{
            console.error(error);
        });

        

    }

        findSubCat=subCatId=>{

            const subCatIndex  = this.state.subCats.findIndex(current=>{

                return current.subcategory_id===subCatId ; 
            });
            return this.state.subCats[subCatIndex].title;


        }

        prevNextPageHandler = prevOrNext=>{
            if(prevOrNext===1){
                if(this.state.prevPageUrl===null){
                    return 0;

                }else{

                    this.axiosInstance.get(this.state.prevPageUrl,{
                        headers:{
                            Authorization:`Bearer ${CookieService.get('access_token')}`
                        }
                    }).then(res=>{
                        this.setState({
                            documents:res.data.data,
                            nextPageUrl:res.data.next_page_url,
                            prevPageUrl:res.data.prev_page_url,
                            from:res.data.from,
                            to:res.data.to,
                            totalDocs:res.data.total
                        })
                    }).catch(err=>{
                        console.error(err);
                    });

                }

            }
            if(prevOrNext===2){
                if(this.state.to===this.state.totalDocs){
                    return 0;

                }else{
                    this.axiosInstance.get(this.state.nextPageUrl , {
                        headers:{
                            Authorization:`Bearer ${CookieService.get('access_token')}`
                        }
                    }).then(res=>{
                        this.setState({
                            documents:res.data.data,
                            nextPageUrl:res.data.next_page_url,
                            prevPageUrl:res.data.prev_page_url,
                            from:res.data.from,
                            to:res.data.to,
                            totalDocs:res.data.total
                        })
                    }).catch(err=>{
                        console.error(err);
                    });
                }


            }
        }

        specifySubCatHandler=(subCatId)=>{
            
            const categoryIndex = this.context.categories.findIndex(current=>{
                return current.category_id === parseInt(this.props.match.params.catId)
            });
            
            const categoryInstance = this.context.categories[categoryIndex];
            let catName = '';
            if(categoryInstance.title==='القرارات الإدارية'){
                catName = 'administrativeDocs';
    
            }else if(categoryInstance.title==='هيئة التفرغ العلمي'){
                catName = 'scientificBodyDocs';
    
            }
            if(subCatId===4){
                if(this.state.category.title==='القرارات الإدارية'){
                    return 0 ;
                }else if(this.state.category.title!=='القرارات الإدارية') {
                    if(this.state.showBasedOn===4){
                        return 0;
                    }else{
                        this.axiosInstance.get(`/categories/${this.props.match.params.catId}/subcategories/${subCatId}/${catName}`,{
                            headers:{
                                Authorization:`Bearer ${CookieService.get('access_token')}`
                            }
                        })
                        .then(res=>{
                            this.setState({
                                documents:res.data.data,
                                showBasedOn:4,
                                prevPageUrl:res.data.prev_page_url,
                                nextPageUrl:res.data.next_page_url,
                                from:res.data.from,
                                to:res.data.to,
                                totalDocs:res.data.total

                            });
                        }).catch(err=>{
                            console.error(err);
                        });
                    }
                    
                }

            }else{

                if(catName==='administrativeDocs'){
                    return 0 ;

                }else{

                    this.axiosInstance(`/categories/${this.props.match.params.catId}/subcategories/${subCatId}/${catName}`,{
                        headers:{
                            Authorization:`Bearer ${CookieService.get('access_token')}`
                        }
                    })
                    .then(res=>{

                        this.setState({
                            documents:res.data.data,
                            showBasedOn:parseInt(subCatId),
                            prevPageUrl:res.data.prev_page_url,
                            nextPageUrl:res.data.next_page_url,
                            from:res.data.from,
                            to:res.data.to,
                            totalDocs:res.data.total
                        });
                    }).catch(err=>{
                        console.error(err);
                    });
                }


            }
        }

        searchingTypeChangedHandler = event=>{
            if(event.target.getAttribute('name')==='liIdImg' || event.target.getAttribute('name')==='idImgInLi'){

                this.setState({
                    searchingType:2
                });
    
    
            }else if(event.target.getAttribute('name')==='liContentImg' || event.target.getAttribute('name')==='contentImgInLi' ){
                this.setState({
                    searchingType:1
                });
    
            }
        }

        searchingKeysChangedHandler = event =>{
            this.setState({
                searchingKeys:event.target.value
            });
        }


        searchClickedHandler = ()=>{ 
                let catNameInURL = null;
                if(this.state.category.title==='القرارات الإدارية'){
                    catNameInURL = 'administrativeDocs';

                }else if(this.state.category.title==='هيئة التفرغ العلمي'){
                    catNameInURL = 'scientificBodyDocs';
                }
                const contentReg = /[\u0600-\u06FF\u0750-\u077F]/;
                const numberReg =  /^[0-9]+$/;
                const validationEle =document.getElementById('searchingKeysValidation'); 
                const stylesString = 'display:inline ; color:#f39c12;font-size:13px; position:absolute;top:35px; left:90px;';
                if(this.state.searchingType===2){                
                    if(this.state.searchingKeys.match(numberReg)){
                        validationEle.style.cssText = 'display:none ;' ;
                        this.axiosInstance.get(`/${catNameInURL}/search` , {params:{
                            value:this.state.searchingKeys,
                            searchingIn:this.state.showBasedOn,
                            searchingType:this.state.searchingType

                        },
                        headers:{
                            Authorization:`Bearer ${CookieService.get('access_token')}`
                        }

                    }).then(res=>{
                           
                            this.setState({
                                documents:res.data.data,
                                nextPageUrl:res.data.next_page_url,
                                prevPageUrl:res.data.prev_page_url,
                                from:res.data.from,
                                to:res.data.to,
                                totalDocs:res.data.total
                            });
                        }).catch(error=>{
                            console.error(error);
                        });
                    }else{
                        this.setState({
                            searchingKeys:''
                        });
                        
                        validationEle.style.cssText = stylesString ;
                        validationEle.innerText='** يجب ان يكون المدخل رقم **';
                    }
    
                }else if(this.state.searchingType===1){

                    if(this.state.searchingKeys.match(contentReg)){
                        validationEle.style.cssText = 'display:none ;' ;
                        this.axiosInstance.get(`/${catNameInURL}/search` , {params:{
                            value:this.state.searchingKeys,
                            searchingIn:this.state.showBasedOn,
                            searchingType:this.state.searchingType

                        },
                        headers:{
                            Authorization:`Bearer ${CookieService.get('access_token')}`
                        }
                }).then(res=>{
                            this.setState({
                                documents:res.data.data,
                                nextPageUrl:res.data.next_page_url,
                                prevPageUrl:res.data.prev_page_url,
                                from:res.data.from,
                                to:res.data.to,
                                totalDocs:res.data.total
                            });
                        }).catch(error=>{
                            console.error(error);
                        });

                    }else{
                        this.setState({
                            searchingKeys:''
                        });
                        
                        validationEle.style.cssText = stylesString ;
                        validationEle.innerText='** يجب ان يكون المدخل احرف و أرقام **';
                    }


                }
                 

        }

        render(){

            return(
                
                <div className={ classes.CategoryContent+" container-fluid"}>
                    <CategoryContentContext.Provider value={{
                            documents:this.state.documents ,
                            category:this.state.category ,
                            subCats:this.state.subCats ,
                            findSubCat : this.findSubCat,
                            prevNextPageHandler :this.prevNextPageHandler,
                            specifySubCatHandler:this.specifySubCatHandler,
                            from:this.state.from,
                            to:this.state.to,
                            totalDocs:this.state.totalDocs

                    }}> 
                        <ContentHeader/>
                        <CategoryHeader catName={this.state.category.title} catId = {this.state.category.category_id} 
                        SearchingTypeChangedHandler={this.searchingTypeChangedHandler} searchingType = {this.state.searchingType}
                        SearchingKeysChangedHandler = {this.searchingKeysChangedHandler} searchingKeys = {this.state.searchingKeys}
                        SearchClickedHandler = {this.searchClickedHandler}/>
                        <OptionsButtons subcats = {this.state.subCats}/>
                        <ContentTable docs = {this.state.documents}/>
                        <PaginationButtons/>
                    </CategoryContentContext.Provider>
                </div>

            );
        }

        componentDidMount(){
            this.initializingState();
           
            
        }
        componentDidUpdate(){
            if(this.state.category.category_id!==parseInt(this.props.match.params.catId)){
                this.initializingState();
            }
            

        }







}

export default CategoryContent;
