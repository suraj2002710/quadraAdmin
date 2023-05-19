import React from 'react'
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { baseurl } from '../../Baseurl'
function SingleNotification({id}) {
    const [data, setData] = useState([])
    const [maindata, setMaindata] = useState([])
    const localClients = JSON.parse(localStorage.getItem("adminLogin"))
    const [loading,setloading]=useState(false)

    useEffect(() => {
        setloading(true)
        axios.put(`${baseurl}/admin/all-notifications/`, { ...localClients, notification_id: id })
            .then(res =>{
                if(res?.data?.status==='Success'){
                    setloading(false)
                    setMaindata(res.data.data)
                }

            })
            .catch(err => console.error(err))
    }, [])
    console.log(maindata.seen)


    return (
        <>
           {loading? <Spinner animation="border" style={{}} />:
           <>
            <p>id : {maindata?.id}</p>
           
            <p>name : {maindata?.name}</p>
            <p>notification : {maindata?.notification}</p>
            <p>seen : {maindata.seen===false?"false":"true"}</p>
            <p>created_at : {maindata?.created_at}</p> 
           </>
           }
        </>
    )
}

export default SingleNotification