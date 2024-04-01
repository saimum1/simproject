import React, {useState,useEffect} from 'react';
import {
    chakra,
    FormControl,
    FormLabel, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    Input, background
} from "@chakra-ui/react";
import {global_css} from "../../../../GlobalCss/GlobalCSS.js";
import Popnotification from '../../../PopNotification/Popnotification.jsx';
import LoadingSoS from '../../../LoadingScreen/LoadingSoS.jsx';
import axios from "axios";
import config from "../../../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment";
import activexiconwhite from '../../../../assets/static/activexwhite.svg'
import activexicongreen from '../../../../assets/static/activex.svg'
import activexfullgreen from '../../../../assets/static/activexgreen.svg'
import OfferDropDown from '../../OfferDropDown.jsx';

const ItemSimInfo = () => {
 

    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:"100%"}}>
          {/* {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 
          {loader &&  <LoadingSoS  /> }  */}

           
                <div bg={global_css.modal_bg} style={{color : 'white',width:'100%'}}>
                    <div style={{height:'1px',backgroundColor:'#404040',width:'100%',alignSelf:'center'}}></div>
                  
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:'1rem'}}>

                    <div style={{display:'flex' ,width:'100%' ,height:'auto' ,flexDirection:'column',gap:'.5rem'}}>
                          <FormLabel style={{fontWeight :'bold',fontSize:'13px',float:'left',display:'flex',width:'95%',justifyContent:"flex-start",alignItems:'center'}}>Operator</FormLabel>

                            {/* <div style={{width: '100%', height:'8rem',display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px',transition:'all 300ms',cursor:'pointer',backgroundColor:'',overflowY:'auto',scrollbarWidth: '1px', scrollbarColor: '#555 transparent'}}>

                                {tableData?.map((n,index)=>{
                                    return (
                                        <div onClick={()=>{hancleitemclicked(n.id);setoperator(n.name);setoperatorId(n.id);setSelectedFile(n.logoUrl)}} key={index} style={{backgroundColor:(selecteditem === n.id)?'#27CF7A':'#404040',width:'100%',padding:'5px',borderRadius:'5px',gap:'0.5rem' ,height:'90%', transition: 'all 300ms',display:'flex' ,alignItems:'center' ,justifyContent:'flex-start'}}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#27CF7A')}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = (selecteditem === n.id || operator === n.name)?"#27CF7A" :'#404040')}
                                            ><img src={`${config.apiUrl}/${n.logoUrl}`} style={{height:'30px' ,width:'30px'}}/> <span>{n.name}</span></div>
                                    )
                                })}
                            
                            </div>   */}

                    </div>  

                    <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>ICCID number <span style={{color:'red'}}>*</span></FormLabel>
                            <Input name='iccid' type='number'
                            //  value={iccidnum} onChange={(e)=>setselectediccid(e.target.value)}
                              style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }}   placeholder='Ex. 1242353455' />
                            
                        </FormControl>

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>SIM Number <span style={{color:'red'}}>*</span></FormLabel>
                            <Input name='sim_number' type='number' 
                            // value={sim_number} onChange={(e)=>setsim_number(e.target.value)}
                             style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040',fontSize:'13px'
                            }}   placeholder='Ex. 1242353455' />
                        </FormControl>
                    </div>


                    

                        <FormControl  style={{width:'100%'}}>
                            <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Offer</FormLabel>
                             <OfferDropDown  />
                        
                          
                        </FormControl>

                     
                    </div>
                    </div>
                    
         
        

            <style jsx>
                {
                    ``
                }
            </style>
        </div>
    );
};

export default ItemSimInfo