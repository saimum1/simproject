import React, { useState } from 'react'
import { global_css } from '../../GlobalCss/GlobalCSS'

const CustomEditors =  ({getdata,selected}) => {


    const [hoverindex,sethoverindex]=useState('')
    // const [selected,setselected]=useState(['view','delete','edit'])
    const [menu, setMenu] = useState([
        {

        "iconwhite" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 14 12" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.10791 6.0354C9.10791 7.1994 8.16391 8.14273 6.99991 8.14273C5.83591 8.14273 4.89258 7.1994 4.89258 6.0354C4.89258 4.87073 5.83591 3.9274 6.99991 3.9274C8.16391 3.9274 9.10791 4.87073 9.10791 6.0354Z" stroke= '#F5F5F5' strokeLinecap="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M6.99932 10.9033C9.53798 10.9033 11.86 9.07793 13.1673 6.03527C11.86 2.9926 9.53798 1.16727 6.99932 1.16727H7.00198C4.46332 1.16727 2.14132 2.9926 0.833984 6.03527C2.14132 9.07793 4.46332 10.9033 7.00198 10.9033H6.99932Z" stroke='#F5F5F5' strokeLinecap="round"/>
        </svg>,
        "icongreen" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 14 12" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.10791 6.0354C9.10791 7.1994 8.16391 8.14273 6.99991 8.14273C5.83591 8.14273 4.89258 7.1994 4.89258 6.0354C4.89258 4.87073 5.83591 3.9274 6.99991 3.9274C8.16391 3.9274 9.10791 4.87073 9.10791 6.0354Z" stroke=  '#27CF7A' strokeLinecap="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.99932 10.9033C9.53798 10.9033 11.86 9.07793 13.1673 6.03527C11.86 2.9926 9.53798 1.16727 6.99932 1.16727H7.00198C4.46332 1.16727 2.14132 2.9926 0.833984 6.03527C2.14132 9.07793 4.46332 10.9033 7.00198 10.9033H6.99932Z" stroke= '#27CF7A'  strokeLinecap="round"/>
    </svg>,
        "text" : "Preview",
        "type" : 'preview'
    }  ,  

    {

        "iconwhite" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 14 12" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.10791 6.0354C9.10791 7.1994 8.16391 8.14273 6.99991 8.14273C5.83591 8.14273 4.89258 7.1994 4.89258 6.0354C4.89258 4.87073 5.83591 3.9274 6.99991 3.9274C8.16391 3.9274 9.10791 4.87073 9.10791 6.0354Z" stroke= '#F5F5F5' strokeLinecap="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M6.99932 10.9033C9.53798 10.9033 11.86 9.07793 13.1673 6.03527C11.86 2.9926 9.53798 1.16727 6.99932 1.16727H7.00198C4.46332 1.16727 2.14132 2.9926 0.833984 6.03527C2.14132 9.07793 4.46332 10.9033 7.00198 10.9033H6.99932Z" stroke='#F5F5F5' strokeLinecap="round"/>
        </svg>,
        "icongreen" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 14 12" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.10791 6.0354C9.10791 7.1994 8.16391 8.14273 6.99991 8.14273C5.83591 8.14273 4.89258 7.1994 4.89258 6.0354C4.89258 4.87073 5.83591 3.9274 6.99991 3.9274C8.16391 3.9274 9.10791 4.87073 9.10791 6.0354Z" stroke=  '#27CF7A' strokeLinecap="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.99932 10.9033C9.53798 10.9033 11.86 9.07793 13.1673 6.03527C11.86 2.9926 9.53798 1.16727 6.99932 1.16727H7.00198C4.46332 1.16727 2.14132 2.9926 0.833984 6.03527C2.14132 9.07793 4.46332 10.9033 7.00198 10.9033H6.99932Z" stroke= '#27CF7A'  strokeLinecap="round"/>
    </svg>,
        "text" : "View",
        "type" : 'view'
    }  ,  
    
    {

        "iconwhite" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 16 16" fill='none'>
            <g clipPath="url(#clip0_1080_37754)">
                <path d="M9.38117 2.58997C9.87797 2.05173 10.1264 1.78261 10.3903 1.62563C11.0272 1.24685 11.8114 1.23507 12.459 1.59455C12.7273 1.74354 12.9833 2.00509 13.4954 2.52818C14.0074 3.05127 14.2635 3.31282 14.4093 3.58696C14.7612 4.24842 14.7497 5.04953 14.3789 5.70014C14.2252 5.96978 13.9618 6.22353 13.4349 6.73101L7.16577 12.7692C6.16729 13.7309 5.66803 14.2118 5.04407 14.4555C4.42011 14.6992 3.73417 14.6813 2.36227 14.6454L2.17562 14.6405C1.75797 14.6296 1.54915 14.6241 1.42776 14.4863C1.30637 14.3486 1.32294 14.1359 1.35609 13.7105L1.37409 13.4795C1.46737 12.282 1.51401 11.6833 1.74784 11.1451C1.98166 10.6069 2.38499 10.17 3.19165 9.29601L9.38117 2.58997Z" stroke= '#F5F5F5' strokeLinejoin="round"/>
                <path d="M8.66797 2.66699L13.3346 7.33366" stroke='#F5F5F5' strokeLinejoin="round"/>
                <path d="M9.33203 14.667H14.6654" stroke='#F5F5F5' strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_1080_37754">
                    <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>,
        "icongreen" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 16 16" fill='none'>
        <g clipPath="url(#clip0_1080_37754)">
            <path d="M9.38117 2.58997C9.87797 2.05173 10.1264 1.78261 10.3903 1.62563C11.0272 1.24685 11.8114 1.23507 12.459 1.59455C12.7273 1.74354 12.9833 2.00509 13.4954 2.52818C14.0074 3.05127 14.2635 3.31282 14.4093 3.58696C14.7612 4.24842 14.7497 5.04953 14.3789 5.70014C14.2252 5.96978 13.9618 6.22353 13.4349 6.73101L7.16577 12.7692C6.16729 13.7309 5.66803 14.2118 5.04407 14.4555C4.42011 14.6992 3.73417 14.6813 2.36227 14.6454L2.17562 14.6405C1.75797 14.6296 1.54915 14.6241 1.42776 14.4863C1.30637 14.3486 1.32294 14.1359 1.35609 13.7105L1.37409 13.4795C1.46737 12.282 1.51401 11.6833 1.74784 11.1451C1.98166 10.6069 2.38499 10.17 3.19165 9.29601L9.38117 2.58997Z" stroke= '#27CF7A' strokeLinejoin="round"/>
            <path d="M8.66797 2.66699L13.3346 7.33366" stroke='#27CF7A'  strokeLinejoin="round"/>
            <path d="M9.33203 14.667H14.6654" stroke= '#27CF7A'  strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_1080_37754">
                <rect width="16" height="16" fill="white"/>
            </clipPath>
        </defs>
    </svg>,
        "text" : "Edit",
        "type" : 'edit'
    },{

        "iconwhite" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.99936 3.92667C7.39788 3.92667 6.85292 4.0186 6.36304 4.16556C6.09852 4.24492 5.8198 4.09484 5.74044 3.83034C5.66108 3.56584 5.8112 3.2871 6.07568 3.20775C6.65248 3.03472 7.29416 2.92667 7.99936 2.92667C11.218 2.92667 13.8327 5.51312 13.8327 8.71332C13.8327 11.9136 11.218 14.5 7.99936 14.5C4.78064 14.5 2.16602 11.9136 2.16602 8.71332C2.16602 7.52312 2.53133 6.413 3.1515 5.49372C3.30593 5.2648 3.6167 5.2044 3.84562 5.35884C4.07452 5.51328 4.13492 5.82404 3.9805 6.05296C3.46733 6.81364 3.16602 7.73024 3.16602 8.71332C3.16602 11.3531 5.32472 13.5 7.99936 13.5C10.674 13.5 12.8327 11.3531 12.8327 8.71332C12.8327 6.07356 10.674 3.92667 7.99936 3.92667Z" fill= '#F5F5F5'/>
            <path fillRule="evenodd" clipRule="evenodd" d="M7.43898 1.58052C7.67062 1.73079 7.73662 2.04042 7.58634 2.27209L6.73942 3.5778L8.0575 4.42624C8.2897 4.57568 8.35674 4.88508 8.2073 5.11728C8.05782 5.34948 7.74842 5.41656 7.51626 5.26708L5.77626 4.14708C5.6645 4.07516 5.58598 3.96168 5.55806 3.83174C5.5301 3.70179 5.55506 3.56608 5.62738 3.45457L6.74738 1.7279C6.89766 1.49623 7.2073 1.43024 7.43898 1.58052Z" fill= '#F5F5F5'/>
        </svg>,
         "icongreen" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 16 16" fill="none">
         <path fillRule="evenodd" clipRule="evenodd" d="M7.99936 3.92667C7.39788 3.92667 6.85292 4.0186 6.36304 4.16556C6.09852 4.24492 5.8198 4.09484 5.74044 3.83034C5.66108 3.56584 5.8112 3.2871 6.07568 3.20775C6.65248 3.03472 7.29416 2.92667 7.99936 2.92667C11.218 2.92667 13.8327 5.51312 13.8327 8.71332C13.8327 11.9136 11.218 14.5 7.99936 14.5C4.78064 14.5 2.16602 11.9136 2.16602 8.71332C2.16602 7.52312 2.53133 6.413 3.1515 5.49372C3.30593 5.2648 3.6167 5.2044 3.84562 5.35884C4.07452 5.51328 4.13492 5.82404 3.9805 6.05296C3.46733 6.81364 3.16602 7.73024 3.16602 8.71332C3.16602 11.3531 5.32472 13.5 7.99936 13.5C10.674 13.5 12.8327 11.3531 12.8327 8.71332C12.8327 6.07356 10.674 3.92667 7.99936 3.92667Z" fill= '#27CF7A' />
         <path fillRule="evenodd" clipRule="evenodd" d="M7.43898 1.58052C7.67062 1.73079 7.73662 2.04042 7.58634 2.27209L6.73942 3.5778L8.0575 4.42624C8.2897 4.57568 8.35674 4.88508 8.2073 5.11728C8.05782 5.34948 7.74842 5.41656 7.51626 5.26708L5.77626 4.14708C5.6645 4.07516 5.58598 3.96168 5.55806 3.83174C5.5301 3.70179 5.55506 3.56608 5.62738 3.45457L6.74738 1.7279C6.89766 1.49623 7.2073 1.43024 7.43898 1.58052Z" fill= '#27CF7A' />
     </svg>,
        "text" : "Reset",
        "type" : 'reset'
    }


    ,{

        "iconwhite" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 16 16" fill="none">
        <g id="Frame">
        <path id="Vector" d="M13.5417 3.66675L13.1113 10.3501C13.0013 12.0577 12.9464 12.9115 12.5006 13.5253C12.2801 13.8288 11.9963 14.0849 11.6672 14.2774C11.0015 14.6667 10.1104 14.6667 8.32826 14.6667C6.54383 14.6667 5.6516 14.6667 4.98545 14.2767C4.65611 14.0839 4.37222 13.8273 4.15186 13.5233C3.70617 12.9085 3.6524 12.0535 3.54487 10.3435L3.125 3.66675" stroke="#F5F5F5" stroke-linecap="round"/>
        <path id="Vector_2" d="M14.5833 3.66675H2.08333" stroke="#F5F5F5" stroke-linecap="round"/>
        <path id="Vector_3" d="M11.1524 3.66659L10.6783 2.72774C10.3634 2.10409 10.2059 1.79227 9.93434 1.59779C9.87406 1.55465 9.81031 1.51628 9.74358 1.48305C9.44281 1.33325 9.08184 1.33325 8.3599 1.33325C7.61983 1.33325 7.24976 1.33325 6.94403 1.48933C6.87626 1.52393 6.8116 1.56385 6.7507 1.6087C6.47594 1.81105 6.32246 2.13429 6.0155 2.78076L5.59489 3.66659" stroke="#F5F5F5" stroke-linecap="round"/>
        </g>
        </svg>
        
        ,
         "icongreen" :<svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 16 16" fill="none">
         <g id="Frame">
         <path id="Vector" d="M13.5417 3.66675L13.1113 10.3501C13.0013 12.0577 12.9464 12.9115 12.5006 13.5253C12.2801 13.8288 11.9963 14.0849 11.6672 14.2774C11.0015 14.6667 10.1104 14.6667 8.32826 14.6667C6.54383 14.6667 5.6516 14.6667 4.98545 14.2767C4.65611 14.0839 4.37222 13.8273 4.15186 13.5233C3.70617 12.9085 3.6524 12.0535 3.54487 10.3435L3.125 3.66675" stroke="#27CF7A" stroke-linecap="round"/>
         <path id="Vector_2" d="M14.5833 3.66675H2.08333" stroke="#27CF7A" stroke-linecap="round"/>
         <path id="Vector_3" d="M11.1524 3.66659L10.6783 2.72774C10.3634 2.10409 10.2059 1.79227 9.93434 1.59779C9.87406 1.55465 9.81031 1.51628 9.74358 1.48305C9.44281 1.33325 9.08184 1.33325 8.3599 1.33325C7.61983 1.33325 7.24976 1.33325 6.94403 1.48933C6.87626 1.52393 6.8116 1.56385 6.7507 1.6087C6.47594 1.81105 6.32246 2.13429 6.0155 2.78076L5.59489 3.66659" stroke="#27CF7A" stroke-linecap="round"/>
         </g>
         </svg>
         
         ,
        "text" : "Delete",
        "type" : 'delete'
    }

    ]);

    const handleclick =(e)=>{
        let d={
            'type':e.type
        }



        getdata(d)
    }

    return (
        <div
            style={{borderRadius:global_css.card_border_radius,border:'1px solid #595959',width:'100%',height:"100%",backgroundColor:global_css.primary_card_bg}}>
            <div style={{display:'flex',justifyContent:'center',gap:'5px' ,alignItems:'flex-start',flexDirection:'column',width:'100%' ,height:'100%',padding:'8px 14px',transition:'all 300ms'}}>

                {
                selected.length >0?
                menu?.filter((item)=>{return selected?.includes(item.type)})?.map((item, index) => 
                <>
                 <span 
                 onClick={()=>handleclick(item)}
                 onMouseEnter={e=>{e.currentTarget.style.color = '#27CF7A';sethoverindex(index)}}
                 onMouseLeave={e=>{e.currentTarget.style.color = '#F5F5F5';sethoverindex('')}}
                  style={{display:'flex' ,justifyContent:'center',alignItems:'center',gap:'12px',color: '#F5F5F5',height:'50%',backgroundColor:'',transition:'all 300ms'}}>{hoverindex === index? item?.icongreen :item?.iconwhite} <span>{item?.text}</span>
                <div  style={{width:'100%',height:'1px',backgroundColor:'#303038'}}></div>
                </span>
                    {index !== selected?.length -1 &&     <div style={{width:'98%',height:'1px',backgroundColor:'#595959'}}></div>} 
                </>)
                
                :

                menu?.map((item, index) => 
                <>
                 <span 
                 onClick={()=>handleclick(item)}
                 onMouseEnter={e=>{e.currentTarget.style.color = '#27CF7A';sethoverindex(index)}}
                 onMouseLeave={e=>{e.currentTarget.style.color = '#F5F5F5';sethoverindex('')}}
                  style={{display:'flex' ,justifyContent:'center',alignItems:'center',gap:'12px',color: '#F5F5F5',height:'50%',backgroundColor:'',transition:'all 300ms'}}>{hoverindex === index? item?.icongreen :item?.iconwhite} <span>{item?.text}</span>
                <div  style={{width:'100%',height:'1px',backgroundColor:'#303038'}}></div>
                </span>
                    {index !== menu?.length -1 &&     <div style={{width:'98%',height:'1px',backgroundColor:'#595959'}}></div>} 
                </>)
                
                }
            </div>
        </div>
    )
} 
export default CustomEditors