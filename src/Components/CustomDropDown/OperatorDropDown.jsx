import React, { useState ,useEffect} from 'react';
import { Select, SelectItem } from "@tremor/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp, faCaretDown, faCaretUp, faChevronDown, faL} from "@fortawesome/free-solid-svg-icons";
import usa from '../../assets/static/usa.png'
import Avatar from "../Avatar.jsx";
import { data } from 'autoprefixer';
import italyimagesvg from '../Navbar/Image/IT.svg'
import usaimagesvg from '../Navbar/Image/US.svg'
import axios from "axios";
import config from "../../config.jsx";
const OperatorDropDown = ({SetselectedOperator, selectedOperator, setclicked, clicked}) => {


  const [tableData,setTableData]=useState([])
 


    const showlangoptions=()=>{
            setclicked(!clicked)
        SetselectedOperator({})
    }

    const setlang=(e)=>{
      console.log('showinfgsg',e)
       SetselectedOperator(e)
        setclicked(!clicked)

    }

    const GetOperators = async () => {
      try {
          const response = await axios.get(`${config.apiUrl}/api/operator`);
          console.log('Response: for operator', response.data.operators);
          if(selectedOperator){
              console.log('Response: for selectedOperator', selectedOperator);

              const selectedOPP = response.data.operators.filter(item => item.id === selectedOperator)
              console.log("offer" , selectedOPP)
              setTableData(selectedOPP)
          }else{
              setTableData(response.data.operators)
          }

      } catch (error) {
          console.error('Error++++:', error);
          toast.error(error)
          throw error;
      }
  };

  useEffect(() => {
    GetOperators()
  }, [])
  




  return (

 


    <div style={{backgroundColor:"#595959" 
    ,height:"auto",width:'100%',borderRadius:'6px',border: '1px solid var(--Base-Color-White-Dark, #999)',
    marginRight:"3rem",display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
    

    <div style={{backgroundColor:"#404040" 
            ,height:"2.6rem",width:'100%' ,borderRadius:'6px',
            padding:'8px 16px',display:"flex",justifyContent:'space-between',alignItems:'center'}}>
              {selectedOperator !== ''?
            <div style={{display:'flex',justifyContent:'flex-start' ,alignItems:'center' ,width:'100%' ,height:'100%' ,gap:"1rem"}}>
                <img src={`${config.apiUrl}/${selectedOperator.logoUrl}`} style={{width:'25px' ,height:'25px'}}/>
                 <span>{selectedOperator.name }</span> 
                 </div>:
                 <div style={{display:'flex',justifyContent:'flex-start' ,alignItems:'center' ,width:'100%' ,height:'100%'}}>

                  <span>Select Operator</span> 
                  </div>}
            <div style={{cursor:'pointer',display:'flex',justifyContent:'flex-end' ,alignItems:'center',width:'100%' ,height:'100%'}} 
                onClick={()=>showlangoptions()}
            >
                 <FontAwesomeIcon icon={faAngleUp} style={{height:'20px' ,width:"20px",}} rotation={clicked && 180}/>
            </div>
    
      </div>

                    {clicked && (
                            <div
                                style={{
                                cursor: "pointer",
                                backgroundColor: "#2B2B33",
                                // backgroundColor: "var(--Dark-Gery, #444)",
                                width: "100%",
                                // borderBottomRightRadius: "8px",
                                // borderBottomLeftRadius:"8px",
                                borderRadius:'6px',
                                border: '1px solid var(--Base-Color-White-Dark, #999)',
                                height: "auto",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                position: "absolute",
                                top: "4.9rem",
                                // right: "2.6rem",
                                zIndex: 1,
                                transition: "all 300ms"
                                }}
                            >
                                {tableData.filter((item) => item.name !== selectedOperator.name).map((item,index,array) => (
                                  <>
                                <div
                                    key={item.code}
                                    style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "2.6rem",
                                    paddingLeft:'1rem',
                                    // borderBottomLeftRadius:index === (array.length -1)? '8px':'',
                                    // borderBottomRightRadius:index === (array.length -1)? '8px':'',
                                    // borderBottom:index === (array.length -1)?'':'2px solid #303038'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2B2B33")}
                                    onClick={()=>setlang(item)}
                                >
                                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flex: "1", width: "100%", height: "100%",gap:'1rem' }}>
                                    <img src={`${config.apiUrl}/${item.logoUrl}`} style={{ width: "25px", height: "25px" }} alt='' />
                                  
                                     <psan>{item.name} </psan> 
                                    </div>
                                </div>
                                      <div style={{width:"98%",height:'1px',backgroundColor:'#595959'}}></div>
                                </>
                                ))}
                            </div>
                            )}







    

</div>







  )
}

export default OperatorDropDown