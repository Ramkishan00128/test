import moment from "moment"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import {  getEventContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import {MapPinIcon,TrashIcon} from '@heroicons/react/24/outline'
import { showNotification } from '../common/headerSlice'
import axios from "axios"
import { Link } from "react-router-dom"

const TopSideButtons = () => {

    const dispatch = useDispatch()

    // const openAddNewLeadModal = () => {
    //     dispatch(openModal({title : "Add New Lead", bodyType : MODAL_BODY_TYPES.LEAD_ADD_NEW}))
    // }

    return(
        <div className="inline-block float-right">
          
            <Link className="btn px-6 btn-sm normal-case btn-primary" to="/app/create-event">Add Event</Link>
        </div>
    )
}

function Leads(){

    const allEvent  = useSelector(state => state.event.event)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getEventContent())
    }, [])


    

    const getDummyStatus = (index) => {
        if(index % 5 === 0)return <div className="badge">Not Interested</div>
        else if(index % 5 === 1)return <div className="badge badge-primary">In Progress</div>
        else if(index % 5 === 2)return <div className="badge badge-secondary">Sold</div>
        else if(index % 5 === 3)return <div className="badge badge-accent">Need Followup</div>
        else return <div className="badge badge-ghost">Open</div>
    }

    const deleteCurrentLead = (index) => {
        dispatch(openModal({title : "Confirmation", bodyType : MODAL_BODY_TYPES.CONFIRMATION, 
        extraObject : { message : `Are you sure you want to delete this lead?`, type : CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index}}))
    }

    const GetAllEvent=async()=>{
        try {
            const response = await axios.get('/get_all_events',{
                headers:{
                    // 'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
    
          const res = response.data
          console.log(res,"get all event")
        //   return response.data
     
        } catch (error) {
          console.error('Error creating event:', error);
        }
    }

   

    return(
        <>
            
            <TitleCard title="All Events" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                {/* Leads List in table format loaded from slice after api call */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Event Date</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            allEvent.events?.map((data,i) => {
                                return(
                                    <tr key={i}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={data?.image} alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{data?.title}</div>
                                               <div className="text-sm opacity-50">{data?.address1}</div>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td>{data?.timing}</td>
                                    <td>{data?.description}</td>
                                    <td className="text-xs"><Link><MapPinIcon  className="text-xl text-red-500" style={{ fontSize: '0.1rem' }} /></Link></td>
                                    <td><TrashIcon/></td>
                                    {/*<td>{moment(new Date()).add(-5*(k+2), 'days').format("DD MMM YY")}</td>
                                    <td>{getDummyStatus(k)}</td>
                                    <td>{l.last_name}</td>
                                <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentLead(k)}><TrashIcon className="w-5"/></button></td>*/}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            </TitleCard>
        </>
    )
}


export default Leads