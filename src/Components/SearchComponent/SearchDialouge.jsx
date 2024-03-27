import React, {useEffect, useState} from 'react';
import {Button} from "@chakra-ui/react";
import axios from "axios";
import config from "../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment/moment.js";
const SearchDialouge = ({ setSearchValue, setFilterOpen ,setTableData, type }) => {
    const [selectedOption, setSelectedOption] = useState('Available');
    const [selectedId, setSelectedId] = useState('');
    const [ OperatorData, setOperatorData ] = useState([])

    const handleReset = () => {
        setSelectedOption('');
        setSearchValue('');
        setFilterOpen(false);
    };

    useEffect(() => {
        GetOperators()

    }, [])


    const GetOperators = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/operator`);
            console.log('Response:', response);
            setOperatorData(response.data.operators)
        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;
        }
    };
    const handleSearch = async () => {
        try {

            console.log("kkkkkk", selectedOption)
            const response = await axios.get(`${config.apiUrl}/api/${type}?status=${selectedOption.toLocaleLowerCase()}&operatorId=${selectedId}&entryDateTo=`);
            if(type==='operator'){
                setTableData(response.data?.operators)
            }else{
                setTableData(response.data?.SIMCards)

            }

            console.log('Search clicked with:', selectedOption);
            setFilterOpen(false);
        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;
        }

    };

    return (
        <div
            style={{
                position: 'relative',
                display: 'inline-block',
            }}
            className="filter-container"
        >
            <div
                style={{
                    position: 'absolute',
                    top: '100%',
                    left: "-15px",
                    backgroundColor: '#2B2B33',
                    border: '1px solid #999999',
                    borderRadius : '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    width: '21rem',
                    padding: '15px',
                    zIndex: 20,
                }}
                className="dropdown"
            >
                <div style={{display : 'flex', alignItems : 'center',gap : '5%', justifyContent : 'space-between', marginBottom : '5%'}}>
                <label htmlFor="status">Status</label>
                <select value={selectedOption}  name="status" onChange={(e) => setSelectedOption(e.target.value)} style={{border : '1px solid #595959'}} className="w-full cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <option value="Available">
                        Available
                    </option>
                    <option value="Inactive">
                        Inactive
                    </option>
                </select>
                </div>
                {type === 'sim'?<div style={{display : 'flex', alignItems : 'center', justifyContent : 'space-between',gap : '5%',}}>
                    <label htmlFor="operatorId">Operator</label>
                    <select value={selectedId}  name="status" onChange={(e) => setSelectedId(e.target.value)} style={{border : '1px solid #595959'}} className="w-full cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <option value="">
                            Select Operator
                        </option>
                        {OperatorData?.map((data, index) => <option value={data.id}>
                            {data.name}
                        </option>)}
                    </select>
                </div> : null}
            <div className="flex justify-end items-center gap-3 mt-5">
                <Button onClick={handleReset}  variant='outline'  style={{border: "1px solid #999999", color: '#999999', marginTop : '-0.1%'}} ml={3}>
                    Reset
                </Button>

                <button onClick={()=>handleSearch()} className="py-2 px-1 bg-[#27CF7A] text-white font-bold  rounded-[4px] w-[5rem]">Search</button>
            </div>
            </div>
        </div>
    );
};

export default SearchDialouge;