import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { Pagination, Typography } from '@mui/material';
import axios from "axios"

import Spinner from 'react-bootstrap/Spinner';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import { baseurl } from '../../Baseurl';
import { TroubleshootSharp } from '@mui/icons-material';
import ReactPlayer from 'react-player'

const BuysellpaymentProfessional = () => {

  const history = createBrowserHistory()
  const cookie = new Cookies()
  const location = useLocation()
  const querypage = new URLSearchParams(location.search)
  const token = cookie.get('token')
  
  const [page, setpage] = useState(querypage.get('page') ? parseInt(querypage.get('page')) : 1)
  const [counts, setcounts] = useState(0)
  const [id, setid] = useState(null)
  const [buysellpayment, setbuysellpayment] = useState([])
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))
  
  
  
  const [loading, setloading] = useState(true)
  const [temp, settemp] = useState(true)
  
  const [buysellpaymentEmail, setbuysellpaymentEmail] = useState("")
  
  
  
  
  
  const [holdpaymentid,setholdpaymentid]=useState("")
  const [open, setOpen] = useState(false);
  const [query, setquery] = useState("")
  const [openholdpayment, setOpenholdpayment] = useState(false)
  const navigate = useNavigate()
  const [sub_cat_id, setsub_cat_id] = useState("")
  const [design_no, setdesign_no] = useState("")

  const getbuysellpayment = async () => {
    console.log(localClients);
    const res = await axios.post(`${baseurl}/admin/buysell_design_payment_professional/`, {
      ...localClients, page: page, page_size: 10
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

  const handleClickOpen = (professioanl_id,subcateid,design_no) => {
    setOpen(true);
    setid(professioanl_id)
    setsub_cat_id(subcateid)
    setdesign_no(design_no)
  };

  const handleClose = () => {
    setOpen(false);
  };
  const buysellpaymentdelete = async (id, subcateid, design_no) => {
console.log(subcateid,id);
    const res = await axios.post(`${baseurl}/admin/delete_buy_sell_payment_professinoal/`, {
      ...localClients, professioanl_id: id, sub_cat_id:subcateid,design_no:design_no
    });
    console.log(res);
    if (res.data.status === "Success") {
      settemp("temp")
      setOpen(false)
    }
  }
  useEffect(() => {
    if (query==="") {
      setpage(querypage.get('page')!==null?parseInt(querypage.get('page')):1)
      getbuysellpayment()
      settemp(true)
    }
  }, [page,query, temp])

  
  
  useEffect(() => {
    if (!token) {
      history.push("/")
      navigate("/")
    }
  }, [])

  const sendpageinquery = (val) => {
    navigate({
      pathname: '/dashboard/buysellpaymentProfessional',
      search: `?page=${val}`
    })
  }

  


  const searchfilter = async (query) => {
    setloading(TroubleshootSharp)
    const { data } = await axios.post(`${baseurl}/admin/search_buy_sell_payment_professional/`, {
      ...localClients, query: query, page: page, page_size: 10
    })
    if (data.status === 'Success') {
      console.log(data);
      setbuysellpayment(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
      setloading(false)
    } else {
      setbuysellpayment([])
      setcounts(0)
      setloading(false)
    }
  }

  useEffect(() => {
    if (query) {
      searchfilter(query)
      settemp(true)
    }
  }, [page, temp])


const handleholdpaymentOpen=(id)=>{
  setOpenholdpayment(true)
  setholdpaymentid(id)
}


  const paymentHolddata=async(id)=>{
    const {data}=await axios.post(`${baseurl}/admin/hold-payment/`,{
      ...localClients,buysell_payment_id:id
    })
    if(data.status === 'Success'){
      console.log(data);
     setOpenholdpayment(false)
      settemp(false)
    }
  }

  return (
    <>
      <div className="content border-bottom mb-2">
        <div className="container-fluid">
          <div className="row">
            <div id="testkar" className="col-12 heading-me-outer d-flex align-items-center">
              <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
              Buysell Designs Payments List

              </h1>

              <div className="ms-auto">

                <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                  <div class="container-fluid">

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

                      <form class="d-flex" role="search">
                        <input style={{ width: "250px" }} onChange={(e) => {
                          setquery(e.target.value)
                          setpage(1)
                          if(e.target.value){

                            searchfilter(e.target.value)
                          }
                        }} class="form-control me-2" type="search" placeholder="Search By Name" aria-label="Search" />

                      </form>
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


            {!buysellpayment.length ? (<>
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
                                Professinal Name
                              </th>

                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Sub-Category Name
                              </th>




                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Images
                              </th>
                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Video
                              </th>

                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Project
                              </th>


                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Price($)
                              </th>

                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Purchase By(ClientName)
                              </th>
                              <th
                                className="sortin"
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
                                Status
                              </th>
                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Action
                              </th>
                            </tr>
                            {
                              buysellpayment.map((curEle, i) => {
                                const { id, category_name, category_id, client_id, client_name, sub_category_id,design_no, purchase_date, project, professional_name, sub_category_name, professional_id, price, payment_date, image, video, payment_status } = curEle
                                // console.log(rating);
                                return (
                                  <tr id="tableRow" key={i}>

                                    <td className="checkbox-select">
                                      {(page - 1) * 10 + i + 1}
                                      {/* {sub_category_id} */}
                                    </td>

                                    <td className="checkbox-select">
                                    {/* {professional_name?.slice(0,1).toUpperCase() + professional_name?.slice(1,25)} */}
                                    {
                                  professional_name.split(" ").map((word)=>{
                                      return (
                                      <>
                                      
                                      {" "}  {word.slice(0,1).toUpperCase() + word.slice(1,25)}</>
                                  )})
                                  
                                 }
                                    </td>

                                    <td className="checkbox-select">
                                    {sub_category_name?.slice(0,1).toUpperCase() + sub_category_name?.slice(1,25)}
                                    </td>

                                    <td  className="checkbox-select">
                                      <div style={{ width: "70px" , height:"70px", borderRadius:"50%"}}>
                                      <img src={image} alt='img' style={{ borderRadius:"50%",height:"100%",aspectRatio:"3/3"}}/>
                                        </div>
                                      
                                    </td>
                                    <td className="checkbox-select">
                                      {video === undefined ? <Typography>Video Not Required</Typography> :
                                        <ReactPlayer url={video} playIcon controls width={150} height={100} />}
                                    </td>
                                    <td className="checkbox-select">
                                      {project === undefined ? <Typography>Project Not Required</Typography> :

                                        <a style={{width:"120px"}}  href={project} download={project} target="_blank">{project.slice(65, 80) }</a>
                                      }
                                    </td>

                                    <td className="checkbox-select">
                                      {price}
                                    </td>

                                    <td className="checkbox-select">
                                    {/* {client_name?.slice(0,1).toUpperCase() + client_name?.slice(1,25)} */}
                                    {
                                  client_name.split(" ").map((word)=>{
                                      return (
                                      <>
                                      
                                      {" "}  {word.slice(0,1).toUpperCase() + word.slice(1,25)}</>
                                  )})
                                  
                                 }
                                    
                                    </td>

                                    <td className="checkbox-select">
                                      {payment_date}
                                    </td>

                                    <td className="checkbox-select">   
                                    
                                    {payment_status==='reported'?
                                       <button
                                       className='report'
                                       style={{ marginLeft: "10px" }}
                                       id={id}
                                       onClick={(e) => {
                                        handleholdpaymentOpen(id)
                                       
                                       }}
                                     >
                                       <i class="fa-regular fa-pen-to-square" id={id}></i>
                                     </button>
                                     
                                       : payment_status?.slice(0,1).toUpperCase() + payment_status?.slice(1,25)}

                              
                                    </td>
                                    <td className="akign-center nowrap">
                                      <div style={{ display: "flex" }}>
                                    
                                        <button
                                          style={{ marginLeft: "10px" }}
                                          id={id}
                                          onClick={(e) => {
                                            handleClickOpen(professional_id,sub_category_id,design_no)
                                           
                                          }}
                                        >
                                          <i class="fa-solid fa-trash" id={id}></i>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </table>



                          {/*confirmation for delete */}
                          <Dialog
                            open={open}
                            // TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                          >
                            <DialogContent>
                              <DialogContentText id="alert-dialog-slide-description">
                                Are you sure you want to delete this buysellpayment ?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>Cancel</Button>
                              <Button onClick={() =>  buysellpaymentdelete(id,sub_cat_id,design_no)}>Ok</Button>
                            </DialogActions>
                          </Dialog>


  {/*hold payment information */}
  <Dialog
                            open={openholdpayment}
                            // TransitionComponent={Transition}
                            keepMounted
                            onClose={()=>setOpenholdpayment(false)}
                            aria-describedby="alert-dialog-slide-description"
                          >
                            <DialogContent>
                              <DialogContentText id="alert-dialog-slide-description">
                              Are you sure you want to hold this Payment ?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={()=>setOpenholdpayment(false)}>Cancel</Button>
                              <Button onClick={() => paymentHolddata(holdpaymentid)}>Ok</Button>
                            </DialogActions>
                          </Dialog>

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

export default BuysellpaymentProfessional