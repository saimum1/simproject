import React,{useState,useEffect} from 'react'
import successicon from '../../assets/static/checok.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";

const Popnotification = ({msg, showpopoup, status}) => {

    const[message ,setMessage]=useState('')

  useEffect(() => {

    if(showpopoup === true){

  
 
   if(msg !==''){
    setMessage(msg)
    setTimeout(() => {
    setMessage('')

    }, 3000);
   }
  }
  }, [showpopoup])
  

  return (

    <div className={message === ''? 'closebox':'openbox'} style={{ 
      transition:'all 300ms',
      position: 'fixed', top: '2%', right: '2%',display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B2B33',
    borderRadius: '8px',
    border:'1px solid #999999',
    margin: '0 0 1rem 0',
    padding:'1rem',
    color:'#FFFFFF',
    fontSize:'14px' ,
    zIndex:'10000'}}>
  
    <div
     
        style={{
         display:'flex',justifyContent:'center',alignItems:'flex-start',flexDirection:'column',width:'100%',height:'100%',gap:'1rem'
        }}
      >
            <div>{status==='success'?<img src={successicon}/> : <FontAwesomeIcon style={{width : '15px', height : '15px', color : '#DC4446'}} icon={faCircleXmark} />}</div>
            <div >{msg}</div>
      </div>
    

      <style jsx>
        {`
        
        .openbox{
            width:20rem;
            transition:all 800ms;
            height:4.5rem;
        }

        .closebox{
            width:0rem;
            transition:all 800ms;
            heght:4.5rem;
        }
        
        `}
      </style>

  </div>
  )
}

export default Popnotification