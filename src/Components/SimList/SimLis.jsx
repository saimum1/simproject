import React, { useState ,useEffect} from 'react';
import { StatusOnlineIcon, SearchIcon } from "@heroicons/react/outline";
import {
    Badge,
    Card, Icon,
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
import {faChevronDown, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {dataset} from "./simlistdataset";
import {useDisclosure, Button} from "@chakra-ui/react";
import Addnewsimcard from './Addnewsimcard';
import Popnotification from '../PopNotification/Popnotification';
import Editopstions from '../EditFunctionality/Editopstions';
import { removeItem } from './simlistdataset';
import LoadingSoS from '../LoadingScreen/LoadingSoS';
import Nodatafound from '../NoDataFound/Nodatafound';
import axios from "axios";
import config from "../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment/moment.js";
import AlertBox from "../AlertBox/AlertBox.jsx";
import SearchDialouge from "../SearchComponent/SearchDialouge.jsx";

const SimLis = () =>  {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [simList,setSimList]=useState([])
    const [simForEdit,setSimForEdit]=useState({})
    const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const [status, setStatus]=useState('')
    const [ bulkIds, setBulkIds ] = useState([])
    const [ allTrue, setAllTrue ] = useState(false)
    const [ oneTrue, setOneTrue ] = useState(false)
    const [selected, setSelected] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
    const [nodata, setNodata] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    console.log("ssssssssssss", status)
    const handleSelect = (value) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((item) => item !== value);
            } else {
                return [...prevSelected, value];
            }
        });

        setIsAllSelected(selected.length === simList.length);
    };

    const handleSelectAll = () => {
        setSelected(isAllSelected ? [] : simList.map((option) => option.id));
        setIsAllSelected(!isAllSelected);
    };


    const getaction=(e)=>{
        console.log('action',selecteditem)
        if(e.type === 'edit'){
            GetSimForUpdate(selecteditem)


                

        }else if(e.type === 'delete'){
            onAlertOpen();
            setAlertType('')
            setAlertText('Are you sure you want to delete this data?');
            setAlertButtonText('Yes, Delete')
            setAlertButtonTextSecond('Cancel')
            setactiontype(false)
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




    useEffect(() => {
        setLoader(true)
        GetSimList()
    }, []);



    const GetSimList = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/sim`);
            console.log('Response:', response);
            setSimList(response.data.SIMCards)
            setNodata(response?.data?.SIMCards.length <= 0)
            setLoader(false)

        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
        }
    };



    const GetSimForUpdate = async (id) => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/sim/${id.id}`);
            console.log('Response:====', response);
            setSimForEdit(response.data.SIMCard)
            await setactiontype(true)
            await onOpen()
        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;
        }
    };
    const deleteSim = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/api/sim/${id}`);

            // Handle successful deletion
            console.log('Operator deleted successfully');
           await GetSimList()
            setshowpopupmsg('Delete Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            onAlertClose()
        } catch (error) {
            console.error('Error deleting operator:', error);
            setshowpopupmsg('Delete Failed')
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
        }
    };

    const UpdateBulk = async () => {
        try {

            const data ={
                simCardIds: selected,
                status: status.toLocaleLowerCase()
            }
            console.log("ssssssssssssssssssssssss", data)
            const response = await axios.put(`${config.apiUrl}/api/sim/update/bulk`, data);
            console.log(response)
            await GetSimList()
            await onAlertClose()
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




    return (
        <div  className="flex justify-center h-full w-full items-center md:items-start bg-[#303038]  rounded-[7px]" >
            <Addnewsimcard simForEdit={simForEdit} isOpen={isOpen} onClose={onClose} data={selecteditem} action={actiontype} GetSimList={GetSimList}/>
            <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType} deleteId={selecteditem} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={alertType==='warning'?UpdateBulk : deleteSim}/>
            {/* <LoadingSoS/> */}

            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
           
           {!nodata?
            <Card className="bg-[#303038]  text-white h-full w-[100%]" style={{border:'none',borderStyle:'none',boxShadow:'none',gap:'2rem',display:'flex',flexDirection:'column'}}>
                <div className="flex justify-between items-center">
                <Title className="text-4xl">SIM List</Title>
                    <div className="flex justify-end  items-center gap-3 w-4/12">
                        <label  style={{border : '1px solid #595959', position: 'relative', display: 'inline-block', zIndex : '1' }} htmlFor="file-input" className="w-8/12 h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <span onClick={() => {
            if(!filterOpen){setFilterOpen(true) }else{setFilterOpen(false)}
        }} className="flex items-center justify-between p-0">
            <span  className="flex items-center">
                <Icon size="sm" icon={SearchIcon} />Search

              </span> <span ><FontAwesomeIcon icon={faChevronDown} /></span>
        </span>
                            {filterOpen && (<SearchDialouge  setFilterOpen={setFilterOpen} setTableData={setSimList} type={'sim'}/>)}
                        </label>
                        <button onClick={()=>callbox()} className="py-2 px-2 bg-[#27CF7A] text-white font-bold  rounded-[4px] w-[8rem]">Add new</button>
                    </div>
                </div>
                <Table className="mt-5">
                    <TableHead>
                        <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{margin:'0px 4px',backgroundColor:'red'}}>
                            <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}><input checked={isAllSelected}
                                                                                                                                                     onChange={handleSelectAll} type="checkbox"/> Serial</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Operator</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>ICCICD number</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>SIM number</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Price</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Entry date</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Status</TableHeaderCell>
                            <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                   
                    <TableBody  >
                       
                        {simList?.map((item,index) => (
                            <TableRow key={item.id} style={{borderColor:'#595959'}}>
                                <TableCell>
                                    <input checked={selected.includes(item.id)}
                                           onChange={() => handleSelect(item.id)}
                                           type="checkbox"
                                           id={`my-checkbox-${index}`}/>
                                     <span className="ml-5">{(index + 1).toString().padStart(2, '0')}</span>
                                </TableCell>

                                <TableCell>
                                    <Text className="flex gap-3"><img style={{height : '24px', width : '24px'}} src={`${config.apiUrl}/${item?.operator?.logoUrl}`} alt=""/> <span>{item?.operator?.name}</span> </Text>

                                </TableCell>

                                <TableCell>
                                    <Text>{item.iccidNumber}</Text>
                                </TableCell>
                             

                                <TableCell>
                                    <Text>{item.simCardNumber}</Text>
                                </TableCell>

                                <TableCell>
                                  <Text>{item.buyingPrice}</Text>
                                </TableCell>

                                <TableCell>
                                   <Text>{moment(item.entryDate).format("YYYY-MM-DD")}</Text>
                                </TableCell>

                                <TableCell>
                                  <Text className={item.status==='inactive'? "!text-[#FFA526]" : item.status==='assigned'? "!text-[#27CF7A]" :item.status==='Sold out'? "!text-red-600" : "!text-white"}>{item.status}</Text>
                                </TableCell>

                                <TableCell>
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

                <div className="max-w-sm mt-5  flex items-center">
                    <select style={{border : '1px solid #595959'}} className="w-full h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onChange={(e) => setStatus(e.target.value)} value={status}>
                        <option value="">
                            Select Status
                        </option>
                        <option value="Available">
                            Available
                        </option>
                        <option value="Inactive">
                            Inactive
                        </option>
                    </select>
                    <Button onClick={()=>{onAlertOpen(); setAlertType('warning'); setAlertText('Are you sure you want to change the status?'); setAlertButtonTextSecond('Cancel'); setAlertButtonText('Yes, Update')}} variant='outline'  style={{border: "1px solid #27CF7A", color: '#27CF7A', marginTop : '-0.1%'}} ml={3}>
                        Apply
                    </Button>

                </div>
            </Card>:<Nodatafound btn_text={'Add Sim'}  tittle_head={'No Sim List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onbuttonclicked}/>}
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
  }

                input[type="checkbox"] {
                  appearance: none;
                  width: 15px;
                  height: 15px;
                  border: 2px solid #ddd;
                  border-radius: 3px;
                  background-color: transparent;
                }

                input[type="checkbox"]:checked {
                  background-color: #4CAF50; /* Green background when checked */
                }

                .checkbox-box {
                  display: none; /* Not needed anymore */
                }

                ::-webkit-scrollbar {
                  width: 12px; /* Width of the scrollbar */
                  border: 1px solid #ddd; /* Border color of the scrollbar */
                  border-radius: 8px;
                }

                ::-webkit-scrollbar-thumb {
                  background-color: #999; /* Color of the thumb */
                  border-radius: 3px; /* Border radius of the thumb */
                }

                /* For Firefox */
                scrollbar {
                  width: 12px; /* Width of the scrollbar */
                }

                scrollbar-thumb {
                  background-color: #999; /* Color of the thumb */
                  border-radius: 3px; /* Border radius of the thumb */
                }


                `}
            </style>
        </div>
    );
};

export default SimLis