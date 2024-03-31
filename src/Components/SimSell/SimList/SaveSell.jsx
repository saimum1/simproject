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
import {global_css} from "../../../GlobalCss/GlobalCSS.js";
import Popnotification from '../../PopNotification/Popnotification.jsx';
import LoadingSoS from '../../LoadingScreen/LoadingSoS.jsx';
import axios from "axios";
import config from "../../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment";
import activexiconwhite from '../../../assets/static/activexwhite.svg'
import activexicongreen from '../../../assets/static/activex.svg'
import activexfullgreen from '../../../assets/static/activexgreen.svg'
import ItemSimInfo from './SellSimComponents/ItemSimInfo.jsx';
import ItemCustomerInfo from './SellSimComponents/ItemCustomerInfo.jsx';
import ItemMnpPort from './SellSimComponents/ItemMnpPort.jsx';
import ItemUploadDoc from './SellSimComponents/ItemUploadDoc.jsx';

const SaveSell = ({isOpen, onClose ,data ,action ,simForEdit, GetSimList}) => {
    const [selectedFile, setSelectedFile] = useState('');
    const [iccidnum, setselectediccid] = useState( '');
    const [sim_number, setsim_number] = useState( '');
    const [price, setprice] = useState('');
    const [entry_date, setentry_date] = useState()
    const [status, setstatus] = useState('Inactive');
    const [operator, setoperator] = useState( '');
     const [selecteditem, setselecteditem] = useState('');

    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [loader,setloader]=useState(false)
    const [ tableData, setTableData ] = useState([])
    const [ operatorId, setoperatorId ] = useState('')
    const [ statusx, setstatusx ] = useState(0)

    const [pageview, setpageview] = useState(true)
    const [isPageChanging, setIsPageChanging] = useState(false)




    const GetOperators = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/operator`);
            console.log('Response:', response);
            setTableData(response.data.operators)
        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;
        }
    };

    const SaveSim = async (data) => {
        try {


            const response = await axios.post(`${config.apiUrl}/api/sim`, data);
            console.log('Response:', response);
            await GetSimList()
            await onClose()
            setprice('')
            setentry_date('')
            setsim_number('')
            setselectediccid('')
            setstatus('')
            setoperator('')
            setoperatorId('')
            setselecteditem('')
            setshowpopupmsg('Save Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg('Save Failed')
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            throw error;
        }
    };

    const hancleitemclicked=(e)=>{
        setselecteditem(selecteditem === e? '':e)
        console.log("seleceted ite," ,e)
    }

    const checkcheckbox =(e)=>{
          
            const value= e.target.value;
            const checked= e.target.checked;
           
            if(checked){
                setstatus('Available')
            }else{
                setstatus('Inactive')

            } 
    }


    const UpdateOperator = async (da) => {
        try {

            const response = await axios.put(`${config.apiUrl}/api/sim/${simForEdit.id}`, da);
            console.log('Response:', response);
            await GetSimList()
            await onClose()
            setprice('')
            setentry_date('')
            setsim_number('')
            setselectediccid('')
            setstatus('')
            setoperator('')
            setoperatorId('')
            setselecteditem('')
            setshowpopupmsg('Update Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg('Update Failed')
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            throw error;
        }
    };

    const sendataback=()=>{
        setstatusx((prev) => (prev === 0 ? prev : prev - 1));

    }
    const sendata=()=>{

        setstatusx((prev) => (prev === 3 ? prev : prev + 1));
  
        // onClose()
        //         let da={
        //             operatorId:operatorId,
        //             iccidNumber:iccidnum,
        //             simCardNumber:sim_number,
        //             buyingPrice: price,
        //             entryDate: entry_date,
        //             status:status.toLocaleLowerCase(),
        //         }
        //         if(action === true){
        //                 UpdateOperator(da)
        //                 setloader(false)

        //         }else{
        //             SaveSim(da)
        //             setloader(false)

        //         }
       

            

    }


    const renderComponent = () => {
          switch (statusx) {
              case 0:
              return <ItemSimInfo/>

              case 1:
              return <ItemCustomerInfo/>

              case 2:
              return <ItemMnpPort/>

              case 3:
              return <ItemUploadDoc/>


             
              
      
            default:
              return null;
          }
        }


        const settransition=()=>{
            setpageview(false)
            setIsPageChanging(true);
           
            setTimeout(() => {
                setIsPageChanging(false);
                setpageview(true)
              }, 200);
        }
 

    useEffect(() => {
        GetOperators()
        if (action) {
            setsim_number(simForEdit?.simCardNumber || '');
            setselectediccid(simForEdit?.iccidNumber || '');
            setprice(simForEdit?.buyingPrice || '');
            setentry_date(simForEdit ? moment(simForEdit.entryDate).format("YYYY-MM-DD") : '');
            setstatus(simForEdit?.status || 'Inactive');
            setoperator(simForEdit?.name || '');
            setselecteditem(simForEdit?.operatorId || '');
        }
    }, [action, simForEdit])


    return (
        <div >
          {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 
          {loader &&  <LoadingSoS  /> } 

            <Modal 
                isOpen={isOpen}
                onClose={onClose}
               

            >
                <ModalOverlay/>
                <ModalContent bg={global_css.modal_bg} style={{color : 'white'}}>
                    <ModalHeader >SIM information</ModalHeader>
                    <div style={{height:'1.7px',backgroundColor:'#404040',width:'90%',alignSelf:'center'}}></div>
                    <ModalCloseButton />
                    <ModalBody style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:'1rem'}}>
                   
                            <div className="flex  items-center  justify-between" style={{backgroundColor:'',width:'100%',transition:'all 900ms'}}>

                          
                                <div style={{transition:'900ms'}}>
                                    <img src={statusx > 0?activexfullgreen:activexicongreen} style={{width:"55px" ,height:"55px" ,transition:'all 900ms'}}/>
                                </div>
                            
                                <div style={{height:'1.7px',backgroundColor: statusx > 0?'#29CC79':'#404040' ,width:'100%',alignSelf:'center',transition:'all 900ms'}}></div>
                                
                                
                                <div style={{transition:'900ms'}}>
                                    <img src={statusx === 0?activexiconwhite:
                                    statusx === 1? activexicongreen:status >1? activexfullgreen:activexfullgreen} style={{width:"55px" ,height:"55px",transition:'all 900ms'}}/>
                                </div>
                            
                                <div style={{height:'2px',backgroundColor:statusx === 0? '#404040':statusx === 1?   '#404040':'#29CC79',width:'100%',alignSelf:'center',transition:'all 900ms'}}></div>

                                <div style={{transition:'900ms'}}>
                                <img src={statusx === 0?activexiconwhite:
                                    statusx === 1? activexiconwhite:statusx === 2? activexicongreen:status >2? activexfullgreen:activexfullgreen} style={{width:"55px" ,height:"55px",transition:'all 900ms'}}/>

                                </div>
                            
                                <div style={{height:'2px',backgroundColor:statusx === 0? '#404040':statusx === 1?   '#404040':statusx === 2?   '#404040':'#29CC79',width:'100%',alignSelf:'center',transition:'all 900ms'}}></div>

                                <div style={{transition:'900ms'}}>
                                <img src={statusx === 0?activexiconwhite:
                                    statusx === 1? activexiconwhite:statusx === 2? activexiconwhite:statusx === 3? activexicongreen:status >3? activexfullgreen:activexfullgreen} style={{width:"55px" ,height:"55px",transition:'all 900ms'}}/>

                                </div>

                            </div>


                            <div className="flex flex-col items-center gap-4 justify-between" style={{backgroundColor:'',width:'100%',transition:'all 900ms'}}>

                            <div style={{flex:'84%',height:'100%',width:'100%',backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'flex-start',transition:'all 300ms'}} >
                                    <div className={`page-transition ${isPageChanging ? 'changing' : ''}`} id='showcomp' style={{height:'98.5%',width:'99%',display:'flex',justifyContent:'center',alignItems:'center' ,transition:'all 300ms',borderRadius:global_css.card_border_radius}}>
                                        { pageview && renderComponent()}
                                    </div>
                                </div>

                            </div>


                    </ModalBody>

                    <ModalFooter style={{display:'flex',gap:'1rem',justifyContent:'space-between',width:'100%',backgroundColor:''}}>
                        
                    <Button colorScheme='white' variant='outline' onClick={onClose}>reset</Button>

                        <div  style={{display:'flex',gap:'1rem',justifyContent:'flex-end',width:'100%',backgroundColor:''}}>
                        <Button colorScheme='white' variant='outline' onClick={()=>{sendataback();settransition();} }>Back</Button>
                        <Button onClick={()=>{sendata();settransition();} }  style={{background : "#27CF7A", color: 'white',width:'30%'}} >
                            Save next
                        </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>

         
            </Modal>

            <style jsx>
    {`
   .page-transition {
    opacity: 1;
    transition: opacity 200ms ease-in-out;
  }
  
  .page-transition.changing {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }
    `}
</style>
        </div>
    );
};

export default SaveSell