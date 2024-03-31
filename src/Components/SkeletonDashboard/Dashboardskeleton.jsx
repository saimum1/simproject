import React,{useState,useEffect} from 'react'
import { global_css } from '../../GlobalCss/GlobalCSS'
// import style from '../../GlobalCss/global.css'
import LineIcon from '../../assets/static/Line.svg'
import InventoryTable from '../InventoryTable/InventoryTable'
import { dataset } from './Skeletonlistitem'
import Nodatafound from '../NoDataFound/Nodatafound'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faL } from '@fortawesome/free-solid-svg-icons'
import LoadingSoS from '../LoadingScreen/LoadingSoS'
import SimLis from '../SimList/SimLis'
import SimRequest from '../SimRequest/SimRequest'
import {useAuth} from "../../Context/AuthInfo.jsx";
import axios from "axios";
import config from "../../config.jsx";
import GroupList from '../Users/GropuList/GroupList.jsx'
import AgentListOperation from "../Users/AgentList/AgentListOperation.jsx";
import AgentRequestList from "../Users/AgentRequest/AgentRequestList.jsx";
import UserList from '../Users/UserList/UserList.jsx'
import OfferCenter from '../OfferCenter/OfferCenter.jsx'
import SimSell from '../SimSell/SimList/SimSell.jsx'
const Dashboardskeleton = () => {

    const {user, token} = useAuth();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedIndex, setselectedIndex] = useState(null);
    const [HoveredIndexInner, setHoveredIndexInner] = useState(null);
    const [selectedIndexOuter, setselectedIndexOuter] = useState(null);
    const [ordercount, setordercount] = useState(0);
    const [offerCount, setOfferCount] = useState(0);

    const [showcomponent, setshowcomponent] = useState('')
    const [showcomponentouter, setshowcomponentouter] = useState('')

    const agent_permission = ['Sim request', 'SIM List', 'Dashboard', 'Sim Inventory', 'Settings', 'Agent Request', 'Users']

    const [pageview, setpageview] = useState(true)
    const [isPageChanging, setIsPageChanging] = useState(false)

    const getorderlist = async () => {
        let xdata = []
        try {
            const response = await axios.get(`${config.apiUrl}/api/order`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:for get order', response.data.orders);
            const oc = response?.data?.orders?.filter((n) => n.status !== 'approved')
            setordercount(oc?.length)

        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;

        }

    }


    const AgeentList = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/agentRequests`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response.data.agentRequests);
            setOfferCount(response?.data?.agentRequests.length <= 0 ? 0 : response?.data?.agentRequests.length)
        } catch (error) {
            console.error('Error++++:', error);
            throw error;
        }
    };




    const renderComponent = () => {
  console.log(":operatorr",showcomponentouter)
    switch (showcomponent) {
        case 0:
        return <Nodatafound btn_text={''}  tittle_head={'Dashboard is empty'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'}/>
        // <Nodatafound btn_text={'Add New Sim'}  tittle_head={'No Dashboard Item Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'}/>;
        case 1:
              if(showcomponentouter === 'Operators'){
                return <InventoryTable /> ;
              }else if(showcomponentouter === 'SIM List'){
                return <SimLis />
              }
              else if(showcomponentouter === 'Sim request'){
                return <SimRequest />
              } else{
                  return '';
              }
        
        case 2:
        return <Nodatafound btn_text={'Add Order Item'}  tittle_head={'No Order List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'}/>
        case 3:
        return <Nodatafound btn_text={'Add Agent'}  tittle_head={'No Agent List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'}/>
        case 4:

            if(showcomponentouter === 'Group List'){
              return <GroupList /> ;
            }else if(showcomponentouter === 'User List'){
              return <UserList />
            }
            else if(showcomponentouter === 'Agent List'){
              return <AgentListOperation/>
            } 
            else if(showcomponentouter === 'Agent Request'){
              return <AgentRequestList/>
            }  else{
                return '';
            }
        
        case 5:
        return <Nodatafound btn_text={'Add New Settings'}  tittle_head={'No Settings Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'}/>

        case 6:
        return <OfferCenter />


        case 7:

            if(showcomponentouter === 'Sim list'){
              return <SimSell /> ;
            }else if(showcomponentouter === 'Activation'){
              return ''
            } else{
                return '';
            }

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
    getorderlist(token)
      AgeentList()
  }, [showcomponent,ordercount, offerCount])
  
  
  return (
    <div   style={{height : 'calc(100vh - 4.5rem)', width:'100%', backgroundColor:global_css.primary_bg,display:'flex' ,justifyContent:'center',alignItems:'flex-start',paddingTop:'2px',overflow:'hidden'}}>
        
            <div style={{flex:'16%' ,backgroundColor:global_css.primary_card_bg,height:'98.5%',width:'100%',display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column'}}>

                <div style={{flex:'55%',height:'100%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'center',paddingTop:'1rem',transition:'all 300ms',gap:'2px'}}>

                        {dataset &&  dataset.filter((n) => user.role === 'AGENT' ? agent_permission.includes(n.name) : true).map((n,index)=>{
                            console.log("index",index)
                            return(<div style={{display:'flex',flexDirection:'column',width:'85%'}}
                            >
                                     <div  
                                        key={index} style={{width:'100%',height:'2.4rem',display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'1rem',backgroundColor: (hoveredIndex === index || selectedIndex === index) ? 'rgba(39, 207, 122, 0.10)' : '',paddingLeft: (hoveredIndex === index || selectedIndex === index) ?'1.2rem':'0.7rem',borderRadius:'6px',cursor:"pointer",transition:'all 300ms',margin:'4px 0px'}}
                                        onMouseEnter={() => {setHoveredIndex(index)}}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        onClick={()=>{setshowcomponent(n.code);setselectedIndex(selectedIndex=== index?'':index);setshowcomponentouter('');setselectedIndexOuter('');settransition()}}
                                        >
                                          <span><img src={ (hoveredIndex === index || selectedIndex === index) ? n.imgsec : n.img}  style={{width:'100%',height:'100%'}}/></span>                         
                                        <span style={{color: (hoveredIndex === index || selectedIndex === index) ? '#27CF7A':global_css.primary_txt_color ,fontFamily:'Lexend',fontWeight:'400',fontSize:'100%',lineHeight:'24px'}}>{n.name}</span>
                                        {n.code ===1 || n.code ===4 || n.code === 7?
                                      
                                        <FontAwesomeIcon rotation={selectedIndex === index? 180:''} icon={faAngleUp}  style={{color:(hoveredIndex === index || selectedIndex === index)?'#27CF7A':'white',transition:'all 300ms'}}/>
                                        :''}
                                      </div>

                                
                                      {
                                      (n.menu.length>0)? 
                                      n.menu?.filter((n) => user.role === 'AGENT' ? agent_permission.includes(n) : true).map((i,innderindex)=>{
                                        return(
                                              <div  key={innderindex}
                                              style={{margin:(selectedIndex === index)? '2px 0px':'',width:'100%',height:(selectedIndex === index) ?'2.4rem':'0rem',display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'10px',backgroundColor: (HoveredIndexInner === innderindex || selectedIndexOuter === innderindex) ? 'rgba(39, 207, 122, 0.10)' : '',paddingLeft:'30%',borderRadius:'6px',cursor:"pointer",transition:'all 300ms'}}
                                              onMouseEnter={() => {setHoveredIndexInner(innderindex)}}
                                              onMouseLeave={() => setHoveredIndexInner(null)}
                                              onClick={()=>{setshowcomponentouter(i);setselectedIndexOuter(innderindex);settransition()}}
                                              >
                                                                
                                            {(selectedIndex === index)? <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center' ,gap:'4px',width:'100%'}}> <span  style={{color: (HoveredIndexInner === innderindex || selectedIndexOuter === innderindex) ? '#27CF7A':global_css.primary_txt_color ,fontFamily:'Lexend',fontWeight:'400',fontSize:'16px',lineHeight:'24px'}}>  {i} </span>  <span >  {i === 'Sim request' || i === 'Agent Request'? <span style={{width:'auto',height:'auto', borderRadius:'12px',padding:"1px 8px" ,color:'#FFFFFF' ,backgroundColor:"#29CC79",display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'500',fontStyle:'normal',fontSize:'12px'}}> {i === 'Agent Request'? offerCount : ordercount}  </span>:''} </span>  </div>:''}

                                            </div>
                                        )
                                      })
                                      :''
                                      }
                                 
                                      </div>
                            )
                        })}
                            

                            
                </div>

                <div style={{flex:'1%',height:'100%',width:'100%',display:'flex',justifyContent:'center' ,alignItems:'center'}}>
                          <img src={LineIcon} style={{width:'85%'}}/>
                </div>

                <div style={{flex:'44%',height:'100%',width:'100%'}}>

                </div>
            </div>
          
          
          
            <div style={{flex:'84%',height:'100%',width:'100%',backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'flex-start',transition:'all 300ms'}} >
                <div className={`page-transition ${isPageChanging ? 'changing' : ''}`} id='showcomp' style={{height:'98.5%',width:'99%',display:'flex',justifyContent:'center',alignItems:'center' ,transition:'all 300ms',borderRadius:global_css.card_border_radius}}>
                     { pageview && renderComponent()}
                </div>
            </div>
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
  )
}

export default Dashboardskeleton