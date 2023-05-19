import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import { Pagination, Typography } from '@mui/material';
import axios from "axios"

import Spinner from 'react-bootstrap/Spinner';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import { baseurl } from '../../Baseurl';
import MetaData from '../../MetaData';

const Allmilstone = () => {

const {key}=useParams()
    const history = createBrowserHistory()
    const cookie = new Cookies()
    const location=useLocation()
    const querypage=new URLSearchParams(location.search)
    const token = cookie.get('token')
    
    const [page, setpage] = useState(parseInt(querypage.get('page')) ? parseInt(querypage.get('page')) :1)
    const [counts, setcounts] = useState(0)
 
    const [buysellpayment, setbuysellpayment] = useState([])
    const localClients = JSON.parse(localStorage.getItem("adminLogin"))
   
    const [loading, setloading] = useState(true)
    const [temp, settemp] = useState(true)

    const navigate = useNavigate()
    
    console.log(location?.state?.data);
    const getbuysellpayment = async () => {
      console.log(localClients);
      setloading(true)
      const res = await axios.post(`${baseurl}/admin/all_projects_details/`, {
        ...localClients, page, page_size: 10,filter_with:key
      });
      console.log(res);
      if (res.data.status === "Success") {
        setloading(false)
        let data = res.data
        setbuysellpayment(data.data.final_data)
        setcounts(Math.ceil(data.data.total_data / 10))
      }
      else {
        console.log("suraj");
        setbuysellpayment([])
        setloading(false)
      }
    }
   
   
    useEffect(() => {
  
        getbuysellpayment()
        settemp(true)
    
    }, [page,key, temp])
  
  
    useEffect(() => {
      if (!token) {
        history.push("/")
        navigate("/")
      }
    }, [])
  
    const sendpageinquery=(val)=>{
      navigate({
        pathname:`/dashboard/allprojects//${key}`,
        search:`?page=${val}`
      })
    }
  
  return (
    <>
    <MetaData title={key==="pending" ?"Pending Projects": key==="approved" ? "Running Projects" : key==="completed" ? "Completed Project" : key==="declined" ? "Declined Project" : key==="accepted" ? "Accepted Project" : null}/>
     <div className="content border-bottom mb-2">
              <div className="container-fluid">
                <div className="row">
                  <div id="testkar" className="col-12 heading-me-outer d-flex align-items-center">
                    <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                      {key==="pending" ?"Pending Projects": key==="approved" ? "Running Projects" : key==="completed" ? "Completed Project" : key==="declined" ? "Declined Project" : key==="accepted" ? "Accepted Project" : null}
                      
                      
                    </h1>
                  
                    <div className="ms-auto">

                    <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                      <div class="container-fluid">
  
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
  
                          {/* <form class="d-flex" role="search">
                          <input style={{ width: "250px" }} onChange={(e)=>{
                            }} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                         
                          </form> */}
                          {/* <button className='extra-add-btn ms-2' onClick={show}>Add buysellpayment</button > */}
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

           
            {!buysellpayment.length? (<>
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
                              Professional Name
                            </th>


                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Client Name
                            </th>
                            
                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Project Name
                            </th>

                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Project Cost($)
                            </th>

                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                             Work Assign
                            </th>
                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Area
                            </th>

                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Esitmated Date
                            </th>
                            {key==="completed" ?
                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Completed Date
                            </th>:null}

                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Status
                            </th>

                            
                            {key==="completed" || key==="approved"?
                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                            Milestones
                            </th>:null}
                          </tr>
                          {
                            buysellpayment.map((curEle, i) => {
                              const { id,area,client_id,client_name,completed_date,estimate_date,professional_id,professional_name,project_cost,project_name,started_at,status,work_assigned } = curEle
                              // console.log(rating);
                              return (
                                <tr id="tableRow" key={i}>
                                  
                                  <td className="checkbox-select">
                                    {(page - 1) * 10 + i + 1}
                                  </td>
                                
                                  <td className="checkbox-select">
                                    {/* {professional_name} */}
                                    {
                                  professional_name.split(" ").map((word)=>{
                                      return (
                                      <>
                                      
                                      {" "}  {word.slice(0,1).toUpperCase() + word.slice(1,25)}</>
                                  )})
                                  
                                 }
                                  </td>
                                  <td className="checkbox-select">
                                    {/* {client_name} */}
                                    {
                                  client_name.split(" ").map((word)=>{
                                      return (
                                      <>
                                      
                                      {" "}  {word.slice(0,1).toUpperCase() + word.slice(1,25)}</>
                                  )})
                                  
                                 }
                                  </td>
                                  <td className="checkbox-select">
                                    {project_name}
                                  </td>
                                  <td className="checkbox-select">
                                    {project_cost}
                                  </td>
                                  <td className="checkbox-select">
                                    {work_assigned}
                                  </td>
                                  <td className="checkbox-select">
                                    {area}
                                  </td>
                                  <td className="checkbox-select">
                                    
                                    {new Date(estimate_date).toLocaleDateString()}
                                  </td>
                                  {key==="completed" ?
                                  <td className="checkbox-select">
                                    {
                                     new Date(completed_date).toLocaleDateString() }
                                  </td>: null}
                                  
                                  

                                  <td className="checkbox-select">
                                    {status.slice(0,1).toUpperCase()+status.slice(1,20)}
                                  </td>
                                  {key==="completed" || key==="approved"?
                                  <td className="akign-center nowrap">
                                    
                                    <div style={{ display: "flex" }}>
                                      
                                      <Link
                                        style={{ marginLeft: "10px" }}
                                        
                                        to={`/dashboard/milestones?state=${id}`}
                                      >
                                        View
                                      </Link>
                                    </div>
                                  </td>:null}
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

export default Allmilstone