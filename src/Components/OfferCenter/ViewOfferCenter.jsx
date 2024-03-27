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
    Input, background, Textarea
} from "@chakra-ui/react";
import {global_css} from "../../GlobalCss/GlobalCSS.js";
import axios from "axios";
import config from "../../config.jsx";
import OperatorDropDown from '../CustomDropDown/OperatorDropDown.jsx';


const ViewOfferCenter = ({isOpen, onClose ,data}) => {

 
   
    const SaveOperator = async () => {
     
        onClose()
    };

    return ( 
        <div>
            
            <Modal
                 isOpen={isOpen}
                 onClose={onClose}
                 
                // size='xxl'
            >
                <ModalOverlay/>
                <ModalContent bg={global_css.modal_bg} style={{color : 'white'}} maxW="50%"> 
                    <ModalHeader >Offer Details for {data?.operator.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} >

                 

                        <FormControl >
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px',fontSize:'12px'}}>{data?.offerName}</FormLabel>
                        </FormControl>


                        <FormControl >
                            <div style={{width:'100%',height:'1px',margin:'2rem 0px',backgroundColor:'#404040'}}></div>
                        </FormControl>


                        <FormControl >
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>

                                <div style={{display:'flex',justifyItems:'center',alignItems:'flex-start',flexDirection:'column',gap:'1rem'}}>
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1rem'}}>
                                        <span style={{color:'#29CC79',display:'flex',justifyContent:'flex-start',alignItems:'center',width:'9rem'}}>Cost per month</span>
                                        <span style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'10rem'}}>${data?.costPerMonth}</span>
                                    </div>

                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1rem'}}>
                                        <span style={{color:'#29CC79',display:'flex',justifyContent:'flex-start',alignItems:'center',width:'9rem'}}>Total recharge</span>
                                        <span style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'10rem'}}>${data?.totalRecharge}</span>
                                    </div>
                                </div>


                                <div style={{display:'flex',justifyItems:'center',alignItems:'flex-start',flexDirection:'column',gap:'1rem'}}>
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1rem'}}>
                                        <span style={{color:'#29CC79',display:'flex',justifyContent:'flex-start',alignItems:'center',width:'9rem'}}>Default price</span>
                                        <span style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'10rem'}}>${data?.defaultPrice}</span>
                                    </div>

                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1rem'}}>
                                        <span style={{color:'#29CC79',display:'flex',justifyContent:'flex-start',alignItems:'center',width:'9rem'}}>Agent price</span>
                                        <span style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'10rem'}}>${data?.agentPrice}</span>
                                    </div>
                                </div>

                               
                            </div>
                        </FormControl>

                        <FormControl >
                            <div style={{width:'100%',height:'1px',margin:'2rem 0px',backgroundColor:'#404040'}}></div>
                        </FormControl>




                        <FormControl >
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>

                                <div style={{display:'flex',justifyItems:'center',alignItems:'flex-start',flexDirection:'column',gap:'1rem'}}>
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'flex-start',gap:'1rem'}}>
                                        <span style={{color:'#29CC79',display:'flex',justifyContent:'flex-start',alignItems:'center',width:'9rem'}}>Free internet pack (GB)</span>
                                        <span style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',width:'10rem'}}>{data?.freeInternetPack}</span>
                                    </div>

                                    <div style={{display:'flex',justifyContent:'center',alignItems:'flex-start',gap:'1rem',flexDirection:'column'}}>
                                        <span style={{color:'#29CC79',display:'flex',justifyContent:'flex-start',alignItems:'flex-start',width:'9rem'}}>Offer vaild for</span>
                                        <span style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',width:'20rem'}}>{data?.offerValidFor}</span>
                                    </div>
                                </div>


                                <div style={{display:'flex',justifyItems:'center',alignItems:'flex-start',flexDirection:'column',gap:'1rem'}}>
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'flex-start',gap:'1rem'}}>
                                        <span style={{color:'#29CC79',display:'flex',justifyContent:'flex-start',alignItems:'center',width:'9rem'}}>IBAN</span>
                                        <span style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',width:'10rem'}}>{data?.iban? 'Yes' : 'No'}</span>
                                    </div>

                              
                                </div>

                               
                            </div>
                        </FormControl>

                        <FormControl >
                            <div style={{width:'100%',height:'1px',margin:'2rem 0px',backgroundColor:'#404040'}}></div>
                        </FormControl>


                        <FormControl >
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>

                                <div style={{display:'flex',justifyItems:'center',alignItems:'flex-start',flexDirection:'column',gap:'1rem'}}>
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1rem'}}>
                                        <span style={{color:'#29CC79',display:'flex',justifyContent:'flex-start',alignItems:'center',width:'9rem'}}>Free minutes for local operator</span>
                                        <span style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'10rem'}}>{data?.freeMinutesForLocalOperator}</span>
                                    </div>

                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1rem'}}>
                                        <span style={{color:'#29CC79',display:'flex',justifyContent:'flex-start',alignItems:'center',width:'9rem'}}>Free minutes for International</span>
                                        <span style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'10rem'}}>{data?.freeMinutesForLocalInternational}</span>
                                    </div>
                                </div>


                                <div style={{display:'flex',justifyItems:'center',alignItems:'flex-start',flexDirection:'column',gap:'1rem'}}>
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1rem'}}>
                                        <span style={{color:'#29CC79',display:'flex',justifyContent:'flex-start',alignItems:'center',width:'9rem'}}>Unlimited minutes to</span>
                                        <span style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'10rem'}}>{data?.unlimitedMinutesTo}</span>
                                    </div>

                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1rem'}}>
                                        <span style={{color:'#29CC79',display:'flex',justifyContent:'flex-start',alignItems:'center',width:'9rem'}}>International minutes valid for</span>
                                        <span style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'10rem'}}>{data?.internationalMinutesValidFor}</span>
                                    </div>
                                </div>

                               
                            </div>
                        </FormControl>

                        <FormControl >
                            <div style={{width:'100%',height:'1px',margin:'2rem 0px',backgroundColor:'#404040'}}></div>
                        </FormControl>




                        <FormControl >
                            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start'}}>

                                <div style={{display:'flex',justifyItems:'center',alignItems:'flex-start',flexDirection:'column',gap:'1rem'}}>
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'flex-start',gap:'1rem',flexDirection:'column'}}>
                                        <span style={{color:'#29CC79',display:'flex',justifyContent:'flex-start',alignItems:'center',width:'9rem'}}>Others information</span>
                                        <span style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'100%'}}>{data?.othersInformation}</span>
                                    </div>

                                  
                                </div>


                             

                               
                            </div>
                        </FormControl>

                     



                    

                    </ModalBody>

                    <ModalFooter >
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>

                        <Button  style={{color:'#999999'}} onMouseDown={(e) => {
                                e.target.style.backgroundColor = '#999999'; 
                            }}
                            onMouseUp={(e) => {
                                e.target.style.backgroundColor = ''; 
                            }} colorScheme='white' variant='outline' onClick={onClose}>Cancel</Button>

                                    <Button  onMouseDown={(e) => {
                                                e.target.style.backgroundColor = '#1EAB5E'; 
                                            }}
                                            onMouseUp={(e) => {
                                                e.target.style.backgroundColor = '#27CF7A'; 
                                            }}  onClick={SaveOperator} style={{background: "#27CF7A", color: 'white'}} ml={3}>
                                        Download PDF
                        </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <style jsx>
                {
                    `
                      .custom-file-upload {
                        padding: 4px 2px;
                        cursor: pointer;
                        //background-color: #f5f5f5;
                        font-size: 15px;
                      }

                      //.custom-file-upload:hover {
                      //  background-color: red;
                      //}

                      .custom-file-upload:active {
                        background-color: white;
                        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
                      }

                      input:focus{
                        outline: none;
                      }
                        
                    
                    `
                }

            </style>
        </div>
    );
};

export default ViewOfferCenter