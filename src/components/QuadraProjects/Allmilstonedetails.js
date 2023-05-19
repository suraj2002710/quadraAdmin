import {Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import { Pagination, Typography } from '@mui/material';
import axios from "axios"

import Spinner from 'react-bootstrap/Spinner';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import { baseurl } from '../../Baseurl';
import { Modal } from 'react-bootstrap';
import { MdKeyboardBackspace } from 'react-icons/md';
const Allmilstonedetails = () => {

  const history = createBrowserHistory()
  const cookie = new Cookies()
  const location = useLocation()
  const navigate = useNavigate()
  const querypage = new URLSearchParams(location.search)
  const token = cookie.get('token')
  const [clientpaymentDisplay, setclientpaymentDisplay] = useState(false)
  const [professionalpaymentDisplay, setprofessionalpaymentDisplay] = useState(false)

  const [page, setpage] = useState(querypage.get('page') ? parseInt(querypage.get('page')) : 1)
  const [counts, setcounts] = useState(0)

  const [milsestone, setmilsestone] = useState([])
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))

  const [loading, setloading] = useState(true)

  const [payment_date, setpayment_date] = useState("")
  const [price, setprice] = useState("")
  const [status, setstatus] = useState("")
  const [invoice, setinvoice] = useState("")

  const openClientpayment = (pay_dt, price, status, invoic) => {
    setpayment_date(pay_dt===null? "Pending" : pay_dt)
    setprice(price)
    setstatus(status)
    let inv=invoic==="" ? "No invoice" :invoic
    setinvoice(inv )
    setclientpaymentDisplay(true)
  }
  const openProfessionalpayment = (pay_dt, price, status) => {
    console.log(pay_dt, price, status);
    setpayment_date(pay_dt===undefined? "Pending" : pay_dt)
    setprice(price===undefined? "Pending":price)
    setstatus(status===undefined ?"Pending":status)
    setprofessionalpaymentDisplay(true)
  }
  const [modalShow, setmodalShow] = useState(false)

  const milestonedetail_fetch = async () => {
    const { data } = await axios.post(`${baseurl}/admin/project_milstone_details/`, {
      ...localClients, project_id: parseInt(querypage.get('state')), page: 1, page_size: 10
    })
    console.log(data);
    if (data.status === "Success") {
      setloading(false)
      setmilsestone(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    }
    else{
      setloading(false)
      setmilsestone([])
      
    }
  }


  useEffect(() => {
    if (!token) {
      history.push("/")
      navigate("/")
    }
  }, [])

  const sendpageinquery = (val) => {
    navigate({
      pathname: '/dashboard/milsestoneProfessional',
      search: `?page=${val}`
    })
  }

  useEffect(() => {
    milestonedetail_fetch()
  }, [page])


  return (
    <>
      <div className="content border-bottom mb-2">
        <div className="container-fluid">
          <div className="row">
            <div id="testkar" className="col-12 heading-me-outer d-flex align-items-center">
            <span style={{color:"black",fontSize:"40px",paddingRight:"20px",display:"flex",cursor:"pointer"}} onClick={()=>navigate(-1)}>< MdKeyboardBackspace/></span>
              
              <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                All Milestones

              </h1>

              <div className="ms-auto">

                <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                  <div class="container-fluid">

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
{/* 
                      <form class="d-flex" role="search">
                        <input style={{ width: "250px" }} onChange={(e) => {
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


            {!milsestone.length ? (<>
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
                                Name
                              </th>
                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                File
                              </th>

                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Estimate Date
                              </th>
                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Cost
                              </th>




                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Completed Date
                              </th>



                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Status
                              </th>
                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Client Payment
                              </th>
                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Professional Payment
                              </th>



                            </tr>
                            {
                              milsestone.map((curEle, i) => {
                                const { client_payment_date, client_payment_price, client_payment_status, cost, created_at, estimated_date, invoice, milestone_file, milestone_id, milestone_name, profesional_payment_status, professional_payment_date, professional_payment_price, completed_date,
                                  status } = curEle
                                // console.log(rating);
                                return (
                                  <tr id="tableRow" key={i}>

                                    <td className="checkbox-select">
                                      {(page - 1) * 10 + i + 1}
                                    </td>

                                    <td className="checkbox-select">
                                      {milestone_name.slice(0, 1).toUpperCase() + milestone_name.slice(1, 30)}
                                    </td>
                                    <td className="checkbox-select">
                                    {milestone_file.slice(60, 70)==="" ? <span>No File</span> : <a href={milestone_file} target="_blank" download={milestone_file}>{milestone_file.slice(60, 70) + "....."}</a>}
                                      

                                    </td>
                                    <td className="checkbox-select">

                                      {estimated_date}
                                    </td>
                                    <td className="checkbox-select">

                                      {cost}
                                    </td>

                                    <td className="checkbox-select">
                                      {!completed_date?"Not Completed":completed_date}
                                    </td>
                                    <td className="checkbox-select">
                                    {status.slice(0, 1).toUpperCase() + status.slice(1, 30)}
                                    
                                    </td>




                                    <td className="akign-center nowrap">
                                      <span  style={{color:"blue" ,cursor:'pointer'}} onClick={() => {
                                        openClientpayment(client_payment_date, client_payment_price, client_payment_status, invoice)
                                      }}>View</span>
                                    </td>

                                    <td className="akign-center nowrap">
                                      <span style={{color:"blue" ,cursor:'pointer'}} to="" onClick={() => {
                                        openProfessionalpayment(professional_payment_date, professional_payment_price, profesional_payment_status)
                                      }}>View</span>
                                    </td>
                                  </tr>
                                )
                              })
                            }

                          </table>

                          {/* client payment details */}

                          <Modal
                            show={clientpaymentDisplay}
                            className="rating_detail_modal"

                            onHide={() => {
                              setclientpaymentDisplay(false)
                            }}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title id="contained-modal-title-vcenter">
                                Client Payment Detail
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>


                              <table id="result_list" className="table table-quadra">
                                <tr>

                                  <th
                                    className="sorting_asc"
                                    tabindex="0"
                                    rowspan="1"
                                    colspan="1"

                                  >
                                    Payment Date
                                  </th>
                                  <th
                                    className="sortin"
                                    tabindex="0"
                                    rowspan="1"
                                    colspan="1"
                                  >
                                    Price
                                  </th>
                                  <th
                                    className="sortin"
                                    tabindex="0"
                                    rowspan="1"
                                    colspan="1"
                                  >
                                    Status
                                  </th>

                                  <th
                                    className="sortin"
                                    tabindex="0"
                                    rowspan="1"
                                    colspan="1"
                                  >
                                    Invoice
                                  </th>

                                </tr>
                                <tr id="tableRow">

                                  <td className="checkbox-select">
                                    {payment_date}
                                  </td>
                                  <td className="checkbox-select">
                                    {price}
                                  </td>


                                  <td className="checkbox-select">

                                    {status}
                                  </td>

                                  <td className="checkbox-select">
                                  {
                                    invoice==="No invoice"?"No invoice":
                                 
                                  <a href={invoice} id='Footerlinks1' target='_blank' download={invoice}>{
                                  invoice.slice(49, 70)}</a>}
                                  </td>

                                </tr>

                              </table>

                             
                            </Modal.Body>
                          </Modal>

                          {/* profession payment details */}

                          <Modal
                            show={professionalpaymentDisplay}
                            className="rating_detail_modal"

                            onHide={() => {
                              setprofessionalpaymentDisplay(false)
                            }}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title id="contained-modal-title-vcenter">
                                Professional Payment Detail
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                              <table id="result_list" className="table table-quadra">
                                <tr>

                                  <th
                                    className="sorting_asc"
                                    tabindex="0"
                                    rowspan="1"
                                    colspan="1"

                                  >
                                    Payment Date
                                  </th>
                                  <th
                                    className="sortin"
                                    tabindex="0"
                                    rowspan="1"
                                    colspan="1"
                                  >
                                    Price
                                  </th>
                                  <th
                                    className="sortin"
                                    tabindex="0"
                                    rowspan="1"
                                    colspan="1"
                                  >
                                    Status
                                  </th>


                                </tr>
                                <tr id="tableRow">

                                  <td className="checkbox-select">
                                    {payment_date}
                                  </td>
                                  <td className="checkbox-select">
                                    {price}
                                  </td>


                                  <td className="checkbox-select">

                                    {status}
                                  </td>





                                </tr>



                              </table>


                            </Modal.Body>
                          </Modal>


                          <Modal
                            show={modalShow}
                            className="rating_detail_modal"

                            onHide={() => {
                              setmodalShow(false)
                            }}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title id="contained-modal-title-vcenter">
                                MilestonePayment Detail
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div>
                                <input type="text" name="" id="" />
                                <input type="text" name="" id="" />
                                <input type="text" name="" id="" />
                                <input type="text" name="" id="" />
                                <input type="text" name="" id="" />
                                <input type="text" name="" id="" />
                              </div>
                            </Modal.Body>
                          </Modal>

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

export default Allmilstonedetails