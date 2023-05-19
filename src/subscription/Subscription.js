import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { GrAdd, IoIosAdd, IoIosAddCircle } from "react-icons/io";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';import { Pagination, Typography } from '@mui/material';
import axios from "axios"
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import { baseurl } from '../Baseurl';

const Subscription = () => {



    const [subscription, setsubscription] = useState([])
    const history = createBrowserHistory()
    const [counts, setcounts] = useState(0)
    const localClients = JSON.parse(localStorage.getItem("adminLogin"))
    const navigate=useNavigate()
    const [id, setid] = useState(null)
    const cookie = new Cookies()
    const location=useLocation()
    const querypage=new URLSearchParams(location.search)
    const token = cookie.get('token')
    const [loading, setloading] = useState(true)
    const [temp, settemp] = useState(true)
    const [page, setpage] = useState(querypage.get('page')?parseInt(querypage.get('page')):1)
    
  
    const [editprofessional_name, seteditprofessional_name] = useState("")
    const [subscription_id, setsubscription_id] = useState("")
    const [subscriptionupdateloading, setsubscriptionupdateloading] = useState(false)
    const [editmodalShow,seteditmodalShow]=useState(false)
    const [editearning,seteditearning]=useState("")
    const [open, setOpen] = useState(false);
    const [query,setquery]=useState("")
    const getsubscription = async () => {
      const res = await axios.post(`${baseurl}/admin/fetch_subscription_plans/`, {
        ...localClients, page: page, page_size: 10
      });
      console.log(res);
      if (res.data.status === "Success") {
        setloading(false)
        let data = res.data
        setsubscription(data.data)
        setcounts(Math.ceil(data.data.total_data / 10))
      }
      else {
        console.log("suraj");
        setsubscription([])
        setloading(false)
      }
    }
  
    const sendpageinquery=(val)=>{
      navigate({
        pathname:'/dashboard/professionalsubscription',
        search:`?page=${val}`
      })
    }
  
    useEffect(() => {
      if(!query){
        getsubscription()
        settemp(true)
      }
    }, [page, temp])
  
  
  
 
    

    useEffect(() => {
      if (!token) {
        history.push("/")
        navigate("/")
      }
    }, [])

  



    const searchfilter = async (query) => {
      setloading(true)
      const { data } = await axios.post(`${baseurl}/admin/search_professional_subscription/`, {
        ...localClients, purpose: "search", query: query, page: page, page_size: 10
      })
      if (data.status === 'Success') {
        
        console.log(data);
        setsubscription(data.data.final_data)
        setcounts(Math.ceil(data.data.total_data / 10))
        setloading(false)
      } else {
        setsubscription([])
        setcounts(0)
        setloading(false)
      }
    }

    useEffect(() => {
      if(query){
        searchfilter(query)
        settemp(true)
      }
    }, [page,temp])

  return (
    <>
    <div className="content border-bottom mb-2">
            <div className="container-fluid">
              <div className="row">
                <div id="testkar" className="col-12 heading-me-outer d-flex align-items-center">
                  <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                  Professional Subscription
                  </h1>
                
                  <div className="ms-auto">

                  <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                    <div class="container-fluid">

                      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                      </button>
                      <div class="collapse navbar-collapse" id="navbarSupportedContent">

                        {/* <form class="d-flex" role="search">
                        <input style={{ width: "250px" }} class="form-control me-2" type="search" onChange={(e) => {
                            searchfilter(e.target.value)
                            setpage(1)
                            setquery(e.target.value)
                            setloading(true)
                          }} placeholder="Search By Name" aria-label="Search" />
                     
                        </form> */}
                      
                      </div>
                    </div>
                  </nav>
                </div>
       
                </div>
              </div>
            </div>
          </div>
    {loading ?

      <div style={{
        display: "flex",
        justifyContent: "center", marginTop: "24%"
      }}>

        <Spinner animation="border" />

      </div> : (
        <>

          
          {!subscription.length? (<>
            <Typography id='nodatafound'>No Data Found</Typography>
            </>):
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="table-chat">
                    <div className="table-chat-body table-responsive p-0">
                      <table id="result_list" className="table table-quadra">
                        <tr>
                          
                          <th
                            className="sorting_asc"
                            tabindex="0"
                            rowspan="1"
                            colspan="1"

                          >
                            S No.
                          </th>
                         

                          <th
                            className="sortin"
                            tabindex="0"
                            rowspan="1"
                            colspan="1"
                          >
                            Name
                          </th>
              
                          <th
                            className="sortin"
                            tabindex="0"
                            rowspan="1"
                            colspan="1"
                          >
                            Plan Type
                          </th>

                          <th
                            className="sortin"
                            tabindex="0"
                            rowspan="1"
                            colspan="1"
                          >
                            Service Charge
                          </th>

                          <th
                            className="sortin"
                            tabindex="0"
                            rowspan="1"
                            colspan="1"
                          >
                            Storage
                          </th>

                          <th
                            className="sortin"
                            tabindex="0"
                            rowspan="1"
                            colspan="1"
                          >
                            Amount
                          </th>

                          {/* <th
                            className="sortin"
                            tabindex="0"
                            rowspan="1"
                            colspan="1"
                          >
                            Action
                          </th> */}
                        </tr>
                        {
                          subscription.map((curEle, i) => {
                            const { id, amount,name,plan_type,price_id,service_charge,storage } = curEle
                            // console.log(rating);

                            return (
                              <tr id="tableRow" key={i}>
                                
                                <td className="checkbox-select">
                                  {(page - 1) * 10 + i + 1}
                                </td>
                              
                                <td className="checkbox-select">
                                {/* {name} */}
                                {
                                  name.split(" ").map((word)=>{
                                      return (
                                      <>
                                      
                                      {" "}  {word.slice(0,1).toUpperCase() + word.slice(1,25)}</>
                                  )})
                                  
                                 }

                                </td>
                                <td className="checkbox-select">
                                  {/* {plan_type} */}
                                  {
                                  plan_type.split(" ").map((word)=>{
                                      return (
                                      <>
                                      
                                      {" "}  {word.slice(0,1).toUpperCase() + word.slice(1,25)}</>
                                  )})
                                  
                                 }
                                </td>

                                <td className="checkbox-select">
                                  {service_charge}
                                </td>
                                <td className="checkbox-select">
                                  {storage}
                                </td>
                                
                                <td className="checkbox-select">
                                  {amount}
                                </td>
                                
                                {/* <td className="akign-center nowrap">
                                  <div style={{ display: "flex" }}>
                                  
                                    <button
                                      style={{ marginLeft: "10px" }}
                                      id={id}
                                      onClick={(e) => {
                                                                            }}
                                    >
                                      <i class="fa-solid fa-trash" id={id}></i>
                                    </button>
                                  </div>
                                </td> */}
                              </tr>
                            )
                          })
                        }
                      </table>


                  
                      {counts > 1 && <Pagination
                        count={counts}
                        page={page}
                        onChange={(e, val) => {
                          console.log(val);
                          sendpageinquery(val)
                          setpage(val)
                        }}
                        id='pagination'
                        color='primary'
                        showLastButton
                        showFirstButton
                        style={{ marginLeft: "300px", marginBottom: "40px" }}
                      />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
                      }
        </>
      )
    }
  </>
  )
}

export default Subscription