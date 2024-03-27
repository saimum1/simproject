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
import {global_css} from "../../GlobalCss/GlobalCSS.js";
import simcon1 from '../../assets/static/s1.png'
import simcon2 from '../../assets/static/s2.png'
import simcon3 from '../../assets/static/s3.png'
import simcon4 from '../../assets/static/s4.png'
import simcon5 from '../../assets/static/s5.png'
import simcon6 from '../../assets/static/s6.png'
import simcon7 from '../../assets/static/s7.png'
import simcon8 from '../../assets/static/s8.png'
import { addnewsimlist } from './simlistdataset.jsx';
import Popnotification from '../PopNotification/Popnotification.jsx';
import { updateItem } from './simlistdataset.jsx';
import LoadingSoS from '../LoadingScreen/LoadingSoS.jsx';
import axios from "axios";
import config from "../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment";
const Addnewsimcard = ({isOpen, onClose ,data ,action ,simForEdit, GetSimList}) => {
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


    const sendata=()=>{
  
        onClose()
                let da={
                    operatorId:operatorId,
                    iccidNumber:iccidnum,
                    simCardNumber:sim_number,
                    buyingPrice: price,
                    entryDate: entry_date,
                    status:status.toLocaleLowerCase(),
                }
                if(action === true){
                        UpdateOperator(da)
                        setloader(false)

                }else{
                    SaveSim(da)
                    setloader(false)

                }
       

            

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
                    <ModalHeader >Add New SIM</ModalHeader>
                    <div style={{height:'1px',backgroundColor:'#404040',width:'90%',alignSelf:'center'}}></div>
                    <ModalCloseButton />
                    <ModalBody style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:'1rem'}}>

                    <div style={{display:'flex' ,width:'100%' ,height:'auto' ,flexDirection:'column',gap:'.5rem'}}>
                          <FormLabel style={{fontWeight :'bold',fontSize:'13px',float:'left',display:'flex',width:'95%',justifyContent:"flex-start",alignItems:'center'}}>Select operator</FormLabel>

                            <div style={{width: '100%', height:'8rem',display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px',transition:'all 300ms',cursor:'pointer',backgroundColor:'',overflowY:'auto',scrollbarWidth: '1px', scrollbarColor: '#555 transparent'}}>

                                {tableData?.map((n,index)=>{
                                    return (
                                        <div onClick={()=>{hancleitemclicked(n.id);setoperator(n.name);setoperatorId(n.id);setSelectedFile(n.logoUrl)}} key={index} style={{backgroundColor:(selecteditem === n.id)?'#27CF7A':'#404040',width:'100%',padding:'5px',borderRadius:'5px',gap:'0.5rem' ,height:'90%', transition: 'all 300ms',display:'flex' ,alignItems:'center' ,justifyContent:'flex-start'}}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#27CF7A')}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = (selecteditem === n.id || operator === n.name)?"#27CF7A" :'#404040')}
                                            ><img src={`${config.apiUrl}/${n.logoUrl}`} style={{height:'30px' ,width:'30px'}}/> <span>{n.name}</span></div>
                                    )
                                })}
                            
                            </div>  

                    </div>  

                    <div className="flex flex-col items-center gap-4 justify-between" style={{backgroundColor:'',width:'100%'}}>

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>ICCID number <span style={{color:'red'}}>*</span></FormLabel>
                            <Input name='iccid' type='number' value={iccidnum} onChange={(e)=>setselectediccid(e.target.value)} style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }}   placeholder='Ex. 1242353455' />
                            
                        </FormControl>

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>SIM number <span style={{color:'red'}}>*</span></FormLabel>
                            <Input name='sim_number' type='number' value={sim_number} onChange={(e)=>setsim_number(e.target.value)} style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040',fontSize:'13px'
                            }}   placeholder='Ex. 1242353455' />
                        </FormControl>
                    </div>

                    <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%',}}>
                        <FormControl  style={{width:'40%'}}>
                            <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Entry date</FormLabel>
                            <Input name='entry_date' value={entry_date} onChange={(e)=>setentry_date(e.target.value)} type='date' style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040',fontSize:'13px'
                                
                            }}    />
                        </FormControl>

                        <FormControl  style={{width:'35%' ,}}>
                            <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Buying Price(€)</FormLabel>
                            <Input name='price' value={price} onChange={(e)=>setprice(e.target.value)} placeholder='Ex .330' type='number' style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040',fontSize:'13px'
                            }}    />
                        </FormControl>

                        <FormControl  style={{width:'35%' ,}}>
                            <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Status</FormLabel>
                            <label style={{border : '1px solid #595959',fontSize:'16px'}} htmlFor="file-input" className="w-full  cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-[7px] px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex gap-2 items-center">
                                <input checked={status === 'Available'} onChange={(e)=>checkcheckbox(e)} type="checkbox" />
                                <span >Available</span>
                            </label>

                         
                        </FormControl>

                    </div>
                    </ModalBody>

                    <ModalFooter style={{display:'flex',gap:'1rem',justifyContent:'flex-end',width:'100%',backgroundColor:''}}>
                        
                        <Button colorScheme='white' variant='outline' onClick={onClose}>Cancel</Button>
                        <Button onClick={()=>sendata() }  style={{background : "#27CF7A", color: 'white',width:'30%'}} >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>

         
            </Modal>

            <style jsx>
                {
                    ``
                }
            </style>
        </div>
    );
};

export default Addnewsimcard