import React, { useState ,useEffect} from 'react';
import { StatusOnlineIcon, SearchIcon } from "@heroicons/react/outline";
import {
    Badge, Button,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text, TextInput,
    Title,

} from "@tremor/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
// import {dataset} from "./simrequestdatalist";
import {useDisclosure} from "@chakra-ui/react";
import Popnotification from '../PopNotification/Popnotification';
import Editopstions from '../EditFunctionality/Editopstions';
import LoadingSoS from '../LoadingScreen/LoadingSoS';
import Addnewsimrequest from './Addnewsimrequest';
import Nodatafound from '../NoDataFound/Nodatafound';
import { reqremoveItem } from './simrequestdatalist';
import { requpdateItemstatus } from './simrequestdatalist';
import Dropdown from '../Dropdown/Dropdown';
import axios from "axios";
import config from "../../config.jsx";
import moment from 'moment';
import {useAuth} from "../../Context/AuthInfo.jsx";
const SimRequestAgentpage = () => {

    const { user , token } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [loader,setloader]=useState(false)
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [pageview,setpageview]=useState('initial')
    const [orderlist,setorderlist]=useState([])
    const[dataset,setdataset]=useState([])

    const getaction=(e)=>{
        console.log('action',selecteditem)
        if(e.type === 'edit'){
                setactiontype(true)
                onOpen()

        }else if(e.type === 'delete'){
                setactiontype(false)
                reqremoveItem(selecteditem, token).then(res=>{
                    if(res === 200){
                        getorderlist()
                        
                        setshowpopupmsg('Order successfully deleted')
                        setshowpopup(true)
                        setTimeout(() => {
                        setshowpopup(false)
                        }, 3000);
                    }else{
                        setshowpopup(true)
                        setshowpopupmsg('could not delete')
                        setTimeout(() => {
                        setshowpopup(false)
                        }, 3000);
                    }
                })
        }

        

    }

    const callbox =()=>{
        setactiontype(false)
        onOpen()
    }

    const onbuttonclicked=(e)=>{
        console.log("eee",e)
        if(e.clicked === true){
            callbox()
        }
}

const getdata=(da)=>{
    let sds=[]
      for(const i of da){
        let xx={
          'img':'',
          'name':i.operator.name,
          'amount':i.quantity,
          'operator_id':i.operator.id
        }
  
        sds.push(xx)
      }
  
      return sds
  }

  

const getorderlist=async()=>{
    setloader(true)
    console.log('ssssss')
     let xdata=[]
     try {
         // ${config.apiUrl}/${item.logoUrl}
         const response = await axios.get(`${config.apiUrl}/api/order`,{
             headers: {
                 Authorization: `Bearer ${token}`
             }
         });
         console.log('Response:for get order', response.data.orders);
         for(const i of response?.data?.orders ){
   
           console.log("jnjnjnjni",i)
             let dx={order_no:i.id,
   
               details:getdata(i.orderItems),
   
               order_date:i.updatedAt,
               isdeleted:i.isDeleted,
   
               status:i.status,
             total_quantity:i.totalQuantity,
            totalPrice:i.totalPrice}
   
   
   
             xdata.push(dx)
             console.log("asasaas",dx)
         }
         setdataset(xdata)
   
         console.log("adadada",dataset)
         
     } catch (error) {
         console.error('Error++++:', error);
         toast.error(error)
         throw error;
     
     }
     setloader(false)
   }


   const getstatus=(e)=>{
    console.log("sd status89898",e)
        if(e==='true'){
            getorderlist(token)
        }
   } 

useEffect(() => { 
    // getorderlis()
    console.log("asdasd")
    getorderlist(token)
}, [])



  return (
    <div  className="flex justify-center h-full w-full items-center md:items-start bg-[#303038]  rounded-[7px]" >
    <Addnewsimrequest isOpen={isOpen} onClose={onClose} data={selecteditem} action={actiontype}  getstatus={getstatus}/>
    {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 

     {loader &&  <LoadingSoS  /> } 

 

    {  dataset.length>0?
    
    <Card className="bg-[#303038]  text-white h-full w-[95%]" style={{border:'none',borderStyle:'none',boxShadow:'none',gap:'2rem',display:'flex',flexDirection:'column',backgroundColor:''}}>
        <div className="flex justify-between items-center ">
        <Title className="text-4xl">Requested order</Title>
            <div className="flex justify-between items-center gap-3">
                <TextInput className="rounded-[5px]  !bg-[#444444] border border-[#595959] w-[17rem]" icon={SearchIcon} placeholder="Search..." />
                <button onClick={()=>callbox()} className="py-2 px-2 bg-[#27CF7A] text-white font-bold  rounded-[4px] w-[8rem]">Add new</button>
            </div>
        </div>
        <Table className="mt-5" >
            <TableHead>
                <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{margin:'0px 4px',backgroundColor:''}}>
                    <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}><input type="checkbox"/> Serial</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Order no</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Details</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Total</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Total Price</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Order date</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Status</TableHeaderCell>
                    <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
                </TableRow>
            </TableHead>
           
            <TableBody style={{height:'100%',backgroundColor:""}} >
               
                {dataset.map((item,index) => (
                    <TableRow key={index} style={{borderColor:'#595959',maxHeight:'auto',height:'10rem'}}>
                        <TableCell>
                            <input type="checkbox" style={{backgroundColor:'#2B2B33'}}/> <span style={{backgroundColor:'#2B2B33'}} className="ml-5">{(index + 1).toString().padStart(2, '0')}</span>
                        </TableCell>

                        <TableCell>
                            <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                                  <Text>{item.order_no}</Text>
                            </div>
                           
                        </TableCell>

                        <TableCell>
                            <Text style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',flexDirection:'column',gap:'5px',height:'auto'}}>{item.details?.map((n)=>{
                                return(
                                    <div style={{display:'flex' ,alignItems:'center',justifyContent:'center',gap:'2px'}}>
                                            <span style={{width:'64%',textAlign:'left'}}>{n.name}</span>
                                            <span style={{width:'1%'}}>:</span>
                                            <span style={{width:'35%',textAlign:'left',marginLeft:'10px'}}>{n.amount}</span>
                                    </div>
                                )
                            })}</Text>
                        </TableCell>
                     

                        <TableCell>
                            <Text>
                            {item.total_quantity}
                              
                            </Text>
                        </TableCell>

                        <TableCell>
                          <Text> $  {item.status === 'approved'? item.totalPrice:''}</Text>
                        </TableCell>

                        <TableCell>
                           <Text>{moment(item.order_date).format('YYYY-MM-DD')}</Text>
                        </TableCell>

                        <TableCell>
                                <span className={item.status==='pending'? "!text-[#FFA526]" : item.status==='approved'? "!text-[#12B262]":item.status==='canceled'? "!text-[#E55245]":item.status==='processing'? "!text-[#0080FF]":''}>{item.status}</span>
                        </TableCell>


                        <TableCell >
                            <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                            {showedit &&  <div style={{position:'absolute',width:'8rem',right:'50%',top:'1%',zIndex:'9999999' ,height:'4rem',display:( index === showeditindex) ?'flex':'none'}}>
                            <Editopstions 
                             getdata={getaction} edittext={'Edit'}/> 
                             
                            </div>}
                            </div>
                        
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Card>:<Nodatafound btn_text={'Request order'}  tittle_head={'No Order List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onbuttonclicked}/>}

  
    
    
    
    
    
    
    
    <style jsx>
        {`body::-webkit-scrollbar {
                display: none;
                }

                /* Hide scrollbar for IE, Edge */
                body {
                -ms-overflow-style: none;
                }

                /* Hide scrollbar for Firefox */
                body {
                scrollbar-width: thin;
                scrollbar-color: transparent transparent;
                }`}
    </style>
</div>
  )
}


export default SimRequestAgentpage