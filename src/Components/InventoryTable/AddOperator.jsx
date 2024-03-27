import React, {useEffect, useState} from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {global_css} from "../../GlobalCss/GlobalCSS.js";
import axios from "axios";
import config from "../../config.jsx";
import toast from "react-hot-toast";
import Popnotification from "../PopNotification/Popnotification.jsx";


const AddOperator = ({isOpen, onClose, GetOperators ,actionType, operatorForEdit}) => {
    console.log('action=-0=',actionType)
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [operatorName, setOperatorName] = useState('');
    const [operatorCode, setOperatorCode] = useState('');
    const [operatorStatus, setOperatorStatus] = useState(false);
    const [url, setURL] = useState('');
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0])
    };

    const SaveOperator = async (logo) => {
        try {


            const data = {
                "name": operatorName,
                'code': operatorCode,
                "logo": logo,
                "status": operatorStatus ? 'available' : ''
            }

            const response = await axios.post(`${config.apiUrl}/api/operator`, data);
            console.log('Response:', response);
            toast.success(response.statusText)
            await GetOperators()
            onClose()
            setURL('')
            setOperatorStatus(false)
            setOperatorCode('')
            setOperatorName('')
            setSelectedFile(null)
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
const UpdateOperator = async (logo) => {
        try {


            const data = {
                "name": operatorName,
                'code': operatorCode,
                "logo": logo,
                "status": operatorStatus ? 'available' : ''
            }

            const response = await axios.put(`${config.apiUrl}/api/operator/${operatorForEdit.id}`, data);
            console.log('Response:', response);
            toast.success(response.statusText)
            await GetOperators()
            onClose()
            setOperatorStatus(false)
            setOperatorCode('')
            setOperatorName('')
            setSelectedFile(null)
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


    const UploadOperatorLogo = async () => {
        try {

            const formData = new FormData();
            formData.append('image', selectedFile);

            const response = await axios.post(`${config.apiUrl}/api/operator/logo/upload`, formData);
            console.log("skdjskjd",response)
             setURL(response.data.filePath)
                if (actionType) {
                    await UpdateOperator(response.data.filePath)

                } else {
                    await SaveOperator(response.data.filePath)
                }






        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;
        }
    };
    useEffect(() => {
        if (actionType) {
            setOperatorName(operatorForEdit?.name || '');
            setOperatorCode(operatorForEdit?.code || '');
            setOperatorStatus(operatorForEdit?.status === 'available' || false);
        }
    }, [actionType, operatorForEdit]);

    return (
        <div>
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            <Modal
                isOpen={isOpen}
                onClose={onClose}


            >
                <ModalOverlay/>
                <ModalContent bg={global_css.modal_bg} style={{color : 'white'}}>
                    <ModalHeader >Add new operator</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>Operator name</FormLabel>
                            <Input style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }} onChange={(e) => setOperatorName(e.target.value)}
                                   value={operatorName}
                                   placeholder='Enter new operators name'/>
                        </FormControl>

                        <FormControl mt={4} mb={8}>
                            <FormLabel>Operators logo</FormLabel>
                            {/*<Input className='custom-file-upload' type="file"/>*/}
                            <Input  type="file" id="file-input" className="hidden" onChange={handleFileChange} />
                            <label style={{border : '1px solid #595959'}} htmlFor="file-input" className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <span className="flex items-center justify-between p-0">
            <span className="flex items-center">
<svg className="mr-2 mb-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M6.1579 7.4871H5.3804C3.68457 7.4871 2.30957 8.8621 2.30957 10.5579L2.30957 14.6204C2.30957 16.3154 3.68457 17.6904 5.3804 17.6904H14.6554C16.3512 17.6904 17.7262 16.3154 17.7262 14.6204V10.5496C17.7262 8.85876 16.3554 7.4871 14.6646 7.4871H13.8787" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.0177 1.82618V11.8604" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.58838 4.26562L10.0175 1.82562L12.4475 4.26562" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                {selectedFile ? `${selectedFile.name.slice(0, 20)}...` : 'Drag & drop file here or'}</span> <span className="bg-amber-50 text-black px-2 py-1 mr-[-3%] rounded-[4px] hover:bg-amber-100">Choose file</span>
        </span>
                            </label>
                        </FormControl>
                        <div className="flex items-center gap-2 justify-between">
                        <FormControl className="mt-16">
                            <FormLabel style={{fontWeight :'bold'}}>Operators code <span style={{color : 'red'}}>*</span></FormLabel>
                            <Input value={operatorCode} style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }} onChange={(e) => setOperatorCode(e.target.value)} placeholder='Ex. +88'/>
                        </FormControl>

                        <FormControl className="mt-5">
                            <FormLabel style={{fontWeight :'bold'}}>Status</FormLabel>

                            <label style={{border : '1px solid #595959'}} className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex gap-2 items-center">
                                <input checked={operatorStatus} onChange={(e) => setOperatorStatus(e.target.checked)} type="checkbox"/>
                                <span>Available</span>
                            </label>
                        </FormControl>
                        </div>
                    </ModalBody>

                    <ModalFooter>

                        <Button colorScheme='white' variant='outline' onClick={onClose}>Cancel</Button>
                        <Button onClick={UploadOperatorLogo} style={{background: "#27CF7A", color: 'white'}} ml={3}>
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

export default AddOperator;