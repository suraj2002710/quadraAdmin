import React, { useState, useEffect, useRef } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import { Pagination, Typography } from "@mui/material";
import {  Spinner } from "react-bootstrap";
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import 'react-phone-input-2/lib/style.css'

import { baseurl } from "../../Baseurl";

const Alldesgins = () => {

    const history = createBrowserHistory()
    const location = useLocation()
    const querypage = new URLSearchParams(location.search)
  
   
    const navigate = useNavigate()
    const cookie = new Cookies()
    const token = cookie.get('token')
    const [professionals, setProfessionals] = useState([])
    const localClients = JSON.parse(localStorage.getItem("adminLogin"))
    const [page, setpage] = useState(querypage.get('page') ? parseInt(querypage.get('page')) : 1)
    const [counts, setcounts] = useState(0)
    const [loading, setloading] = useState(true)
  
   
   
    
   
   
  

  
    const getproffesionals = async () => {
      setloading(true)
      const res = await axios.post(`${baseurl}/admin/professionals/`, {
        ...localClients, page: page, page_size: 10
      });
      if (res.data.status === "Success") {
        setloading(false)
        let data = res.data
        setcounts(Math.ceil(data.data.total_data / 10))
        setProfessionals(data.data.final_data)
      }
    }
    let style = {
      outline: "0",
      borderTop: "0",
      borderRight: "0",
      borderLeft: "0",
      borderBottom: "1px solid gray",
    }
  
 useEffect(() => {
   
    getproffesionals()
 }, [page])
 
  
    useEffect(() => {
      if (!token) {
        history.push("/")
        navigate("/")
      }
    }, [])
  
  
 


    const sendpageinquery = (val) => {
      navigate({
        pathname: '/dashboard/alldesgin',
        search: `?page=${val}`
      })
    }
  


  return (
    <>
     <div id="" className="content table-content border-bottom mb-2">
            <div className="container-fluid">
              <div className="row">
                <div id="testkar" className="col-12 col-md-auto d-flex flex-grow-1 align-items-center heading-me-outer">
                  <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                    Professionals Designs
                  </h1>

                  <div className="ms-auto">

                    <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                      <div class="container-fluid">

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                       
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

        </div> :
        <>

         

          {!professionals.length ? (<>
            <Typography id='nodatafound'>No Data Found</Typography>
          </>) :
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
                              className="sortin text-center"
                              tabindex="0"
                              rowspan="1"
                              colspan="2"
                            >
                              Action
                            </th>
                          </tr>
                          {
                            professionals.map((curEle, i) => {

                              const { id, bio
                                , client_id, mobile_verify
                                , education, nation, profile, skills, joined, job_description
                                , email, email_verify, first_name, last_name, mobile,
                                experience,verified
                              } = curEle;
                              console.log(email_verify);
                              return (
                                <tr id="tableRow" key={i}>
                                  {/* `/dashboard/clients/${id}`  */}
                                  <td className="field-id">
                                    {(page - 1) * 10 + i + 1}</td>
                                  {/*<td className="field-id">{id}</td>*/}
                                  <td className="field-room nowrap">
                                  {first_name.slice(0,1).toUpperCase() + first_name.slice(1,25)} {last_name.slice(0,1).toUpperCase() + last_name.slice(1,25)}

                                  </td>
                     
                                

                           

                          

                                  <td id="tableButoon" className="akign-center nowrap">

                                    <div className="action-button" style={{display:"flex" ,columnGap:"12px"}}>
                                    <Link to={`/dashboard/alldesgins/${id}`}>View Designs</Link>


                                    </div>
                                  </td>

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
      }

    </>
  )
}

export default Alldesgins