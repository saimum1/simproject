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
import axios from "axios";
import config from "../../../config.jsx";
import toast from "react-hot-toast";
import Popnotification from "../../PopNotification/Popnotification.jsx";

const AddnewGroup = ({isOpen, onClose ,action,getdata,data}) => {

    const generateUniqueId = () => {
        const timestamp = new Date().getTime();
        const randomNumber = Math.floor(Math.random() * 1000000); // Change the upper limit based on your requirement
        return `${timestamp}${randomNumber}`;
    };
   
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [permission_module,setpermission_module]=useState([])
    const [datalist,setdatalist]=useState({
        
            group:'',
            role_permissions:[],
            status:''
        
    })

    
    

    

    const handleCheckboxChange = (permission) => {
        console.log("eewr",permission)
        const updatedPermissions = datalist.role_permissions.includes(permission)
            ? datalist.role_permissions.filter(p => p !== permission)
            : [...datalist.role_permissions, permission];
            console.log("Updated permissions:", updatedPermissions);
            setdatalist(prevState => ({
            ...prevState,
            role_permissions: updatedPermissions
        }));
    };


    const handleStatusChange = (isChecked) => {
        const newStatus = isChecked ? 'active' : 'inactive';
        setdatalist(prevState => ({
            ...prevState,
            status: newStatus
        }));
    };
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0])
    };

    const SaveOperator = async () => {
        try {
            const data = {
                name : datalist.group,
                status : datalist.status,
                permissionIds : datalist.role_permissions
            }
            console.log("========getdata", datalist)
            const response = await axios.post(`${config.apiUrl}/api/group`, data);
            console.log('Response:user:===', response);
            await getdata()

            setdatalist({


                group:'',
                role_permissions:[],
                status:'',


            })
            onClose()

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
        }


    const PErmissionList = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/permission`);
            console.log('Response:', response);
            setpermission_module(response.data.permissions)

        } catch (error) {
            console.error('Error++++:', error);
            throw error;
        }
    };
// const UpdateOperator = async () => {
//         try {


//             const data = {
//                 "name": operatorName,
//                 'code': operatorCode,
//                 "logo": logo,
//                 "status": operatorStatus ? 'available' : ''
//             }

//             const response = await axios.put(`${config.apiUrl}/api/operator/${operatorForEdit.id}`, data);
//             console.log('Response:', response);
//             toast.success(response.statusText)
//             await GetOperators()
//             onClose()
//             setOperatorStatus(false)
//             setOperatorCode('')
//             setOperatorName('')
//             setSelectedFile(null)
//             setshowpopupmsg('Update Success')
//             setshowpopupstatus('success')
//             setshowpopup(true)
//             setTimeout(() => {
//                 setshowpopup(false)

//             }, 1500);


//         } catch (error) {
//             console.error('Error++++:', error);
//             setshowpopupmsg('Update Failed')
//             setshowpopupstatus('fail')
//             setshowpopup(true)
//             setTimeout(() => {
//                 setshowpopup(false)

//             }, 1500);
//             throw error;
//         }
//     };






    useEffect(() => {
    
        // if (action && data) {
        //     setdatalist(prevState => ({
        //         ...prevState,
        //         group: data?.group,
        //         role_permissions: data?.role_permissions,
        //         status: data?.status,
        //         code:data?.code
        //     }));
        // }
        PErmissionList()
    }, [action,data]);

    return (
        <div>
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            <Modal
                isOpen={isOpen}
                onClose={onClose}


            >
                <ModalOverlay/>
                <ModalContent bg={global_css.modal_bg} style={{color : 'white'}}>
                    <ModalHeader >Add new Group </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>Group Name</FormLabel>
                            <Input style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }} onChange={(e) => setdatalist(prevState => ({
                                                            ...prevState,
                                                            group: e.target.value
                                                             }))}
                                   value={datalist.group}
                                   placeholder='Enter group name'/>
                        </FormControl>

                   
                  
                     

                        <FormControl className="mt-5" >
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',backgroundColor:''}}>Module permission</FormLabel>
                                


                                <div  style={{width: '100%',gap:'.5rem',display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',transition:'all 300ms',height:'100%', justifyContent:'flex-start',alignItems:'center',flexDirection:'column',cursor:'pointer',backgroundColor:'',overflowY:'auto'}}>

                                {permission_module?.map((n,index)=>{
                                    return (
                                        <div   style={{width:'100%',gap:"4px" ,height:'100%', transition: 'all 300ms',display:'flex' ,alignItems:'center' ,justifyContent:'flex-start'}} 
                                    
                                            >
                                               <span style={{display:'flex',justifyContent:'center',textAlign:'center',alignItems:'center',height:'5px',width:'12px'}}><input type="checkbox" checked={datalist?.role_permissions.includes(n.id)} onChange={() => handleCheckboxChange(n.id)} style={{cursor:'pointer'}}/></span>
                              
                                                <span style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:"12px"}}>{n.name}</span>
                                            </div>
                                    )
                                })}

                                </div>    
                           
                        </FormControl>


                      
                

                        <FormControl className="mt-5">
                            <FormLabel style={{fontWeight :'bold'}}>Status</FormLabel>

                            <label style={{border : '1px solid #595959'}} className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex gap-2 items-center">
                                <input checked={datalist.status === 'active'} onChange={(e) =>handleStatusChange(e.target.checked)} type="checkbox"/>
                                <span>Available</span>
                            </label>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter className="mt-5">

                        <Button  onMouseDown={(e) => {
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
                            Save
                        </Button>
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
export default AddnewGroup