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
import {useDisclosure} from "@chakra-ui/react";
import Popnotification from '../PopNotification/Popnotification';
import Editopstions from '../EditFunctionality/Editopstions';
import LoadingSoS from '../LoadingScreen/LoadingSoS';
import Addnewsimrequest from './Addnewsimrequest';
import moment from "moment/moment.js";
import Nodatafound from '../NoDataFound/Nodatafound';
import { reqremoveItem } from './simrequestdatalist';
import { requpdateItemstatus } from './simrequestdatalist';
import Dropdown from '../Dropdown/Dropdown';
import axios from "axios";
import config from "../../config.jsx";
import AlertBox from '../AlertBox/AlertBox.jsx';
import {useAuth} from "../../Context/AuthInfo.jsx";

const SimRequestAdminpage = ({actioncallset}) => {

    const { user , token } = useAuth();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)

    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [pageview,setpageview]=useState('initial')
    const [loader,setloader]=useState(false)
    const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()

    const[dataset,setdataset]=useState([])
    const[dataset2,setdataset2]=useState([])
    const[datasetfilter,setdatasetfilter]=useState([])
    const [simList,setSimList]=useState([])
    const [nodatafound,setnodatafound]=useState(false)

    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
  


    const getaction=(e)=>{
        console.log('action',selecteditem)
        let order_item=selecteditem;
        if (order_item) {
            try {
            const operatorCounts = [];
            order_item?.details.forEach((sim) => {
            const operatorName = sim.name
                console.log("first")
            if (operatorName) {
                const existingOperator = operatorCounts.find((op) => op.operator === operatorName);

                if (existingOperator) {
                    existingOperator.total++;
                } else {
                operatorCounts.push({ operator: operatorName, total: 1 });
                }
            }
            });
            console.log("sdfsdfsdffff",operatorCounts)
            let dd={'order_id':selecteditem?.order_no ,'data':operatorCounts}
             localStorage.setItem('orderitem',JSON.stringify(dd))
            } catch (error) {

            console.error('Error parsing item from localStorage:', error);
            }
        }
        if(e.type === 'edit'){
            actioncallset('review',selecteditem?.order_no )
        }else if(e.type === 'delete'){

            setactiontype(false)
            reqremoveItem(selecteditem, token).then(res=>{
                if(res === 200){
                    getorderlist()
                    setshowpopup(true)
                    setshowpopupmsg('Order successfully deleted')
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
        }else if(e.type === 'pdf_info'){
            actioncallset('pdf_info',selecteditem?.order_no )

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


const countamount = (e) =>{
    const total = e.reduce((accumulator, currentValue) => {
        return accumulator + parseInt(currentValue.amount);
      }, 0);
      return total
}  


const getselecteditem=(e)=>{

          


    requpdateItemstatus(selecteditem,e, token).then(res=>{
        if(res === 200){
            setshowpopupstatus('success')
            setshowpopupmsg('Status successfully updated')
            setshowpopup(true)
            getorderlist()
            setTimeout(() => {
                setshowpopup(false)
              }, 3000);
              
        }else{
            setshowpopupstatus('failed')
            setshowpopupmsg('Status could not update')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)
              }, 3000);
        }
    })
    console.log("sdadad",xx)
  
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
  
    console.log('ssssssdsdsds')
     let xdata=[]
     try {
       
         const response = await axios.get(`${config.apiUrl}/api/order`, {
             headers: {
                 Authorization: `Bearer ${token}`
             }
         });
         for(const i of response?.data?.orders ){
   
           console.log("jnjnjnjni",i)
             let dx={order_no:i.id,
   
               details:getdata(i.orderItems),
   
               order_date:i.updatedAt,
               isdeleted:i.isDeleted,
   
               status:i.status,
             total_quantity:i.totalQuantity,
             simCards:i.simCards,
            totalPrice:i.totalPrice,
        totalQuantity:i.totalQuantity}
   
   
   
             xdata.push(dx)
             console.log("asasaas",dx)
         }
         setdataset(xdata)
         setdataset2(xdata)
         setdatasetfilter(xdata)
         setloader(false)
         setnodatafound(response.data.orders.length>0?false:true)
         console.log("adadada",xdata)
         
     } catch (error) {
        setloader(false)
         console.error('Error++++:', error);
         toast.error(error)
         throw error;
     
     }
  
   }

const handlefilter=(e)=>{
    console.log("filter",e)
    let val=e.target.value
    if(val !== ''){
        const df=datasetfilter?.filter((n)=>n.order_no === parseInt(val))
        // console.log("filter",e,df)
        setdataset(df.length>0?df:[])
    }else{ 
        setdataset(dataset2)
        console.log("filter",'emty')
    }
   
}

const GetSimList = async () => {
    try {
        const response = await axios.get(`${config.apiUrl}/api/sim`);
        console.log('Response:', response);
        setSimList(response.data.SIMCards)
    } catch (error) {
        console.error('Error++++:', error);
        throw error;
    }
};



const leftbtn =()=>{
 
   
}

const rightbtn=async()=>{

}


useEffect(() => { 
    setloader(true)
    // getorderlis()
    console.log("sdsdsfe333")
    getorderlist()
    GetSimList()
}, [])



  return (

   
    <div  className="flex justify-center h-full w-full items-center md:items-start bg-[#303038]  rounded-[7px]" >
    <Addnewsimrequest isOpen={isOpen} onClose={onClose} data={selecteditem} action={actiontype}/>
    <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={leftbtn} type={alertType} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={rightbtn} />

    {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 
    {loader &&   <LoadingSoS  /> } 


 
        {nodatafound === false ?
    <Card className="bg-[#303038]  text-white h-full w-[95%]" style={{border:'none',borderStyle:'none',boxShadow:'none',gap:'2rem',display:'flex',flexDirection:'column',backgroundColor:''}}>
        <div className="flex justify-between items-center ">
        <Title className="text-4xl">Requested order</Title>
            <div className="flex justify-between items-center gap-3">
                <TextInput type='number' onChange={(e)=>handlefilter(e)} className="rounded-[5px]  !bg-[#444444] border border-[#595959] w-[17rem]" icon={SearchIcon} placeholder="Search..." />
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
               
                {dataset?.map((item,index) => (
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
                            {item.totalQuantity}
                            </Text>
                        </TableCell>

                        <TableCell>
                          <Text>
                             $ {item.totalPrice}
                          </Text>
                        </TableCell>

                        <TableCell>
                           <Text>{moment(item.order_date).format('YYYY-MM-DD')}</Text>
                        </TableCell>

                        <TableCell onClick={()=>setselecteditem(item)} style={{backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>

                                 <div style={{width:"8rem",backgroundColor:''}}> <Dropdown dropType={'sim'} getdata={getselecteditem}  order_status={item.status}/></div>
                         
             
                        </TableCell>


                        <TableCell >
                            <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                            {showedit &&  <div style={{position:'absolute',width:'8rem',right:'50%',top:'1%',zIndex:'9999999' ,height:'4rem',display:( index === showeditindex) ?'flex':'none'}}>
                            <Editopstions 
                             getdata={getaction} edittext={item.status !== 'approved'?'Add Sim':''} status={item.status === 'approved'?'approved':''}/> 
                             
                            </div>}
                            </div>
                        
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
            
        </Table>
    </Card>
    :<Nodatafound btn_text={''}  tittle_head={'No Order List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'}/>}

  
    
    
    
    
    
    
    
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


export default SimRequestAdminpage