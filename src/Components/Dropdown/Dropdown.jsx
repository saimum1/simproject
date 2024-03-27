import React, { useRef, useState } from 'react';
import { Select, SelectItem } from "@tremor/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp, faCaretDown, faCaretUp, faChevronDown, faL} from "@fortawesome/free-solid-svg-icons";

import pendingicon from '../../assets/static/status1.svg'
import processingicon from '../../assets/static/status2.svg'
import approvedicon from '../../assets/static/status3.svg'
import canceledicon from '../../assets/static/status4.svg'
import AlertBox from '../AlertBox/AlertBox';
import { useDisclosure } from '@chakra-ui/react';
const Dropdown = ({getdata,order_status, dropType}) => {

    const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
    const[selecteditem,setselecteditem]= useState('');
   

   
    const[selectedlang,Setselectedlang]=useState({
        lang:order_status,
        img:order_status === 'pending'?pendingicon:order_status === 'processing'?processingicon:
        order_status === 'approved'?approvedicon:
        order_status === 'canceled'?canceledicon:''
      })
      const[clicked,setclicked]=useState(false)
       
    
       const data=[{
            'lang':'pending',
            'img':pendingicon,
            'code':1
        },{
            'lang':'processing',
            'img':processingicon,

            'code':2
        },{
            'lang':'canceled',
            'img':canceledicon,

            'code':4
        }]

    if (dropType !== 'sim') {
        data.push({
            'lang': 'approved',
            'img': approvedicon,
            'code': 4
        });
    }
        const showlangoptions=()=>{
                setclicked(!clicked)
        }
    
        const setlang=(e)=>{
            setselecteditem(e)
            onAlertOpen();
            setAlertType('warning')
            setAlertText('Are you sure you want to change the status?');
            setAlertButtonText('Yes,Update')
            setAlertButtonTextSecond('Cancel')

          
    
        }



        const leftbtn =()=>{
            console.log("3434",'ll')
           
            if(alertType === 'warning'){
                onAlertClose()
               
            }
           
        }
        
        const rightbtn=async()=>{

            if(alertType === 'warning'){
                onAlertClose()
                for(const i of data){
                    
                    console.log("showinf i ",i)
                    if(i.code === selecteditem){
                        selectedlang.lang = i.lang
                        selectedlang.img = i.img

                    }
                
                }

                getdata(selectedlang)
                setclicked(!clicked)
                
            }

          }
        
  return (
    <div  style={{backgroundColor:"" 
    ,height:"100%",width:'100%', borderTopRightRadius:"8px",
    borderTopLeftRadius: "8px",borderBottomLeftRadius:clicked?'':'8px',borderBottomRightRadius:clicked?'':'8px',zIndex:'9',
    marginRight:"3rem",display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column',position:'absolute',top:'200%',right:'-25%'}}>
    
    <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={leftbtn} type={alertType} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={rightbtn} />

    <div style={{backgroundColor:"var(--Dark-Gery, #444)" 
            ,height:"2rem",width:'8.5rem' , borderTopRightRadius:"8px",
            borderTopLeftRadius: "8px",borderBottomLeftRadius:clicked?'':'8px',borderBottomRightRadius:clicked?'':'7px',
            padding:'8px 1px',display:"flex",justifyContent:'space-between',alignItems:'center',border:'1px solid #595959'}}>

             <div style={{display:'flex',justifyContent:'center' ,alignItems:'center' ,width:'100%' ,height:'100%'}}>
                            <img src={selectedlang.img} style={{width:'28px' ,height:'15px'}}/>
                        </div>
        
            <div style={{display:'flex',justifyContent:'center' ,alignItems:'center' ,width:'100%' ,height:'100%',
           fontFamily:"inter",fontWeight:"500" ,lineHeight:"15px",fontSize:"16px"}} >{selectedlang.lang}</div>
          {order_status === 'approved' ?
          <div style={{cursor:'pointer',display:'flex',justifyContent:'center' ,alignItems:'center' ,width:'100%' ,height:'100%'}}>
              
            </div>
            : <div style={{cursor:'pointer',display:'flex',justifyContent:'center' ,alignItems:'center' ,width:'100%' ,height:'100%'}} 
                onClick={()=>showlangoptions()}
            >
                 <FontAwesomeIcon icon={faAngleUp} style={{ height:'15px' ,width:"15px",}} rotation={clicked && 180}/>
            </div>} 
    
      </div>

                    {clicked && (
                            <div
                                style={{
                                cursor: "pointer",
                                backgroundColor: "var(--Dark-Gery, #444)",
                                width: "8.5rem",
                                borderBottomRightRadius: "8px",
                                borderBottomLeftRadius:"8px",
                                height: "auto",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                position: "absolute",
                                    top:'100%',
                                zIndex: '999999',
                                transition: "all 300ms",border:'1px solid #595959'
                                
                                }}
                            >
                                {data.filter((item) => item.lang !== selectedlang.lang).map((item,index,array) => (
                                <div
                                    key={item.code}
                                    style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "2rem",
                                    borderBottomLeftRadius:index === (array.length -1)? '8px':'',
                                    borderBottomRightRadius:index === (array.length -1)? '8px':'',
                                    borderBottom:index === (array.length -1)?'':'2px solid #303038'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--Dark-Gery, #444)")}
                                    onClick={()=>setlang(item.code) }
                                >
                                     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                                <img src={item.img} style={{ width:'28px' ,height:'15px' }} alt='' />
                                                </div>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", fontFamily: "inter", fontWeight: "500", lineHeight: "15px", fontSize: "16px" }} >
                                      {item.lang} 
                                    </div>
                                </div>
                                ))}
                            </div>
                            )}







    

</div>
  )
}

export default Dropdown