import React, { useState } from 'react';
import { Select, SelectItem } from "@tremor/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp, faChevronDown, faL} from "@fortawesome/free-solid-svg-icons";
import usa from '../../assets/static/usa.png'
import Avatar from "../Avatar.jsx";
import { data } from 'autoprefixer';
import italyimagesvg from '../Navbar/Image/IT.svg'
import usaimagesvg from '../Navbar/Image/US.svg'
import companylogo from '../../assets/static/companylogo.svg'
import {useAuth} from "../../Context/AuthInfo.jsx";

const OfferDropDown = ({getdata,selected}) => {
    const { user , logout} = useAuth();

  const[selectedlang,Setselectedlang]=useState({
    lang:'EN',
    image:usaimagesvg
  })
  const[clicked,setclicked]=useState(false)
   

   const data=[{
        'lang':'EN',
        'image':usaimagesvg,
        'code':1
    },{
        'lang':'IT',
        'image':italyimagesvg,
        'code':2
    },{
        'lang':'IT2',
        'image':italyimagesvg,
        'code':3
    },{
        'lang':'IT3',
        'image':italyimagesvg,
        'code':4
    },{
        'lang':'IT4',
        'image':italyimagesvg,
        'code':5
    },{
        'lang':'IT5',
        'image':italyimagesvg,
        'code':6
    },{
        'lang':'IT6',
        'image':italyimagesvg,
        'code':7
    },{
        'lang':'IT7',
        'image':italyimagesvg,
        'code':8
    }]


    const showlangoptions=()=>{
            setclicked(!clicked)
    }

    const setlang=(e)=>{
        for(const i of data){
            console.log("showinf i ",i)
            if(i.code === e){
                selectedlang.lang = i.lang
                selectedlang.image = i.image
            }
        }
        setclicked(!clicked)

    }
    return (
        <div style={{backgroundColor:"#303038",display:"flex",height:"100%" ,
        width:'100%',justifyContent:'space-between',alignItems:'center' }} >
          
              
            <div style={{display : 'flex', gap : '3%', alignItems : 'center',width:'100%'}}>
            <div style={{backgroundColor:"var(--Dark-Gery, #444)" 
                ,height:"100%",width:'100%', borderTopRightRadius:"8px",
                borderTopLeftRadius: "8px",borderBottomLeftRadius:clicked?'':'8px',borderBottomRightRadius:clicked?'':'8px',
             display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                

                <div style={{backgroundColor:"var(--Dark-Gery, #444)" 
                        ,height:"2.6rem",width:'100%' , borderTopRightRadius:"8px",
                        borderTopLeftRadius: "8px",borderBottomLeftRadius:clicked?'':'8px',borderBottomRightRadius:clicked?'':'8px',
                        padding:'8px 16px',display:"flex",justifyContent:'center',alignItems:'center'}}>
                
                      
                        <div style={{display:'flex',justifyContent:'center' ,alignItems:'center' ,flex:'1',width:'100%' ,height:'100%',
                        color:'rgba(255, 255, 255, 0.85)' ,fontFamily:"inter",fontWeight:"500" ,lineHeight:"15px",fontSize:"16px"}}>{selectedlang.lang}</div>
                        <div style={{cursor:'pointer',display:'flex',justifyContent:'center' ,alignItems:'center' ,flex:'1',width:'100%' ,height:'100%'}} 
                            onClick={()=>showlangoptions()}
                        >
                             <FontAwesomeIcon icon={faCaretUp} style={{color:'#2aea87' ,height:'25px' ,width:"25px",}} rotation={clicked && 180}/>
                        </div>
                
                  </div>

                                {clicked && (
                                        <div
                                            style={{
                                            cursor: "pointer",
                                            backgroundColor: "var(--Dark-Gery, #444)",
                                            width: "100%",
                                            borderBottomRightRadius: "8px",
                                            borderBottomLeftRadius:"8px",
                                            height: "auto",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            position: "absolute",
                                            top: "4.4rem",
                                            // right: "2.6rem",
                                            zIndex: 1,
                                            transition: "all 300ms"
                                            }}
                                        >
                                            {data.filter((item) => item.lang !== selectedlang.lang).map((item,index,array) => (
                                            <div
                                                key={item.code}
                                                style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: "100%",
                                                height: "2.6rem",
                                                borderBottomLeftRadius:index === (array.length -1)? '8px':'',
                                                borderBottomRightRadius:index === (array.length -1)? '8px':'',
                                                borderBottom:index === (array.length -1)?'':'2px solid #303038'
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
                                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--Dark-Gery, #444)")}
                                                onClick={()=>setlang(item.code)}
                                            >
                                                
                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "1", width: "100%", height: "100%", color: "rgba(255, 255, 255, 0.85)", fontFamily: "inter", fontWeight: "500", lineHeight: "15px", fontSize: "16px" }}>
                                                  {item.lang} 
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                        )}


           

           

            
                

            </div>



            </div>
               



        </div>

       
    );
};
export default OfferDropDown