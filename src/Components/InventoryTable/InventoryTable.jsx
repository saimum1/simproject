import React, {useEffect, useState} from 'react';
import { StatusOnlineIcon, SearchIcon } from "@heroicons/react/outline";
import {
    Badge,
    Card, Icon, Select, SelectItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text, TextInput,
    Title,


} from "@tremor/react";
import {Button} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {dataset} from "./dataset.jsx";
import {useDisclosure} from "@chakra-ui/react";
import AddOperator from "./AddOperator.jsx";

import {global_css} from "../../GlobalCss/GlobalCSS.js";
import axios from "axios";
import config from "../../config.jsx";
import toast from "react-hot-toast";
import {removeItem} from "../SimList/simlistdataset.jsx";
import Editopstions from "../EditFunctionality/Editopstions.jsx";
import SearchDialouge from "../SearchComponent/SearchDialouge.jsx";
import AlertBox from "../AlertBox/AlertBox.jsx";
import Nodatafound from "../NoDataFound/Nodatafound.jsx";
import LoadingSoS from "../LoadingScreen/LoadingSoS.jsx";
import Popnotification from "../PopNotification/Popnotification.jsx";
const InventoryTable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ tableData, setTableData ] = useState([])
    const [ bulkIds, setBulkIds ] = useState([])
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [status, setStatus]=useState('')
    const [isOpenD, setIsOpenD] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [operatorForEdit, setOperatorForEdit] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const [selected, setSelected] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
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

        setIsAllSelected(selected.length === tableData.length);
    };

    const handleSelectAll = () => {
        setSelected(isAllSelected ? [] : tableData.map((option) => option.id));
        setIsAllSelected(!isAllSelected);
    };
    const getaction=(e)=>{

        if(e.type === 'edit'){
            GetOperatorForUpdate(selecteditem.id)


            onOpen()
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


    useEffect(() => {
        setLoader(true)
        GetOperators()
    }, []);



    const GetOperators = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/operator`);
            console.log('Response:=-=-=-=-=', response);
            setTableData(response.data.operators)
            setNodata(response.data.operators.length <= 0)
            setLoader(false)
        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
        }
    };

    const GetOperatorForUpdate = async (id) => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/operator/${id}`);
            console.log('GetOperatorForUpdate:', response);
            setOperatorForEdit(response.data.operator)
            await setactiontype(true)
        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;
        }
    };
    const deleteOperator = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/api/operator/${id}`);

            // Handle successful deletion
            console.log('Operator deleted successfully');
            toast.success('Operator deleted successfully');
            await GetOperators()
            await onAlertClose()
            setshowpopupmsg('Delete Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            // Update UI to reflect deletion, e.g., remove the operator from a list
        } catch (error) {
            console.error('Error deleting operator:', error);
            setshowpopupmsg('Delete Failed')
            setshowpopupstatus('failed')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
        }
    };

    const UpdateBulk = async () => {
        try {

            const data ={
                operatorIds: selected,
                    status: status.toLocaleLowerCase()
            }
            const response = await axios.put(`${config.apiUrl}/api/operator/update/bulk`, data);
            console.log(response)
            await GetOperators()
            await setBulkIds([])
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
            setshowpopupstatus('failed')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            throw error;
        }
    };

    // function capitalizeFirst(str) {
    //     return str[0].toUpperCase() + str.slice(1).toLowerCase();
    // }


    return (
        <div   className="border-none h-full w-full">
            <AddOperator isOpen={isOpen} onClose={onClose} actionType={actiontype} GetOperators={GetOperators} operatorForEdit={operatorForEdit} />
            <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType} deleteId={selecteditem} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={alertType==='warning'?UpdateBulk : deleteOperator}/>
            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            {!nodata?  <Card  className="w-full h-full text-white mb-12" style={{borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,  boxShadow : 'none'}}>
                <div className="flex justify-between items-center mb-14">
                <Title className="text-4xl">Operators</Title>
                    <div  className="flex justify-end  items-center gap-3 w-4/12">
                        <label  style={{border : '1px solid #595959', position: 'relative', display: 'inline-block', zIndex : '1' }} htmlFor="file-input" className="w-8/12 h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <span onClick={() => {
            if(!filterOpen){setFilterOpen(true) }else{setFilterOpen(false)}
        }} className="flex items-center justify-between p-0">
            <span  className="flex items-center">
                <Icon size="sm" icon={SearchIcon} />Search

              </span> <span ><FontAwesomeIcon icon={faChevronDown} /></span>
        </span>
                            {filterOpen && (<SearchDialouge  setFilterOpen={setFilterOpen} setTableData={setTableData} type={'operator'}/>)}
                        </label>
                        <button onClick={onOpen} className="py-2 px-2 bg-[#27CF7A] text-white font-bold rounded rounded-1xl w-3/12">Add new</button>
                    </div>
                </div>
                <Table onClick={() =>setFilterOpen(false)} className="mt-8">
                    <TableHead>
                        <TableRow className="!bg-[#444444] !rounded !rounded-1xl">
                            <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}><input checked={isAllSelected}
                                                                                                                                                     onChange={handleSelectAll} type="checkbox"/> Serial</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Operator</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Operator Code</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Status</TableHeaderCell>
                            <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{minHeight : '300px' , overflow : 'auto'}}>
                        {tableData?.map((item, index) => (
                            <TableRow key={index} style={{borderColor:'#595959'}}>
                                <TableCell>
                                    <input checked={selected.includes(item.id)}
                                           onChange={() => handleSelect(item.id)}
                                           type="checkbox"
                                           id={`my-checkbox-${index}`}/>
                                    <span className="ml-5">{(index + 1).toString().padStart(2, '0')}</span>
                                </TableCell>
                                <TableCell>
                                    <Text className="flex gap-3"><img style={{height : '24px', width : '24px'}} src={`${config.apiUrl}/${item.logoUrl}`} alt=""/> <span>{item.name}</span> </Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.code}</Text>
                                </TableCell>

                                <TableCell>
                                       <Text className={item.status==='inactive' || item.status===''? "!text-red-600" : "!text-white"}>{item.status}</Text>
                                </TableCell>

                                <TableCell>
                                    <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index !== showeditindex);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
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
                    <select style={{border : '1px solid #595959'}} className="w-full cursor-pointer bg-[#404040] h-10 hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onChange={(e) => setStatus(e.target.value)} value={status}>
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
            </Card>:<Nodatafound btn_text={'Add Operator'}  tittle_head={'No Operator List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onOpen}/>}
            <style jsx>
            {
              ` input[type="checkbox"] {
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
              

              `
            }
            </style>
        </div>
    );
};

export default InventoryTable;