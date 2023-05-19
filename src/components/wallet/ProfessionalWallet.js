import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { Pagination, Typography } from '@mui/material';
import axios from "axios"
import { Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import { baseurl } from '../../Baseurl';

const ProfessionalWallet = () => {
    const [wallet, setwallet] = useState([])
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
    
  
    
    const [wallet_id, setwallet_id] = useState("")
    const [walletupdateloading, setwalletupdateloading] = useState(false)
    const [editmodalShow,seteditmodalShow]=useState(false)
    const [editearning,seteditearning]=useState("")
    const [open, setOpen] = useState(false);
    const [query,setquery]=useState("")
    const getwallet = async () => {
      const res = await axios.post(`${baseurl}/admin/fetch_all_professional_wallet/`, {
        ...localClients, page: page, page_size: 10
      });
      console.log(res);
      if (res.data.status === "Success") {
        setloading(false)
        let data = res.data
        setwallet(data.data.final_data)
        setcounts(Math.ceil(data.data.total_data / 10))
      }
      else {
        console.log("suraj");
        setwallet([])
        setloading(false)
      }
    }
  
    const sendpageinquery=(val)=>{
      navigate({
        pathname:'/dashboard/professionalwallet',
        search:`?page=${val}`
      })
    }
  
    useEffect(() => {
      if(query===""){
        setpage(querypage.get('page') !== null ? parseInt(querypage.get('page')) : 1)

        getwallet()
        settemp(true)
      }
    }, [page,query, temp])
  
  
  
    const handleClickOpen = (id) => {
    setOpen(true);
    setid(parseInt(id))
  };
  
  const handleClose = () => {
    setOpen(false);
  };

    const walletdelete = async (id) => {
  
      const res = await axios.post(`${baseurl}/admin/delete_professional_wallet_by_professional_id/`, {
        ...localClients, professional_id:id
      });
      console.log(res);
      if (res.data.status === "Success") {
        settemp("temp")
        setOpen(false)
      }
    }
  
   
  
    const handlecloseEdit = () => {
      setwalletupdateloading(false)
      seteditmodalShow(false)
      setwallet_id("")

      
    }
    useEffect(() => {
      if (!token) {
        history.push("/")
        navigate("/")
      }
    }, [])

    const walletingle_fetch = async (id) => {
      const { data } = await axios.post(`${baseurl}/admin/fetch_professional_wallet_by_professional_id/`, {
        ...localClients, professional_id: id
      })
      console.log(data);
      if (data.status === "Success") {
        console.log(data);
        setwallet_id(data.data[0].professional_id)

        seteditearning(data.data[0].earning)
      }
    }

    const wallet_edit = async (e) => {
      e.preventDefault()
      setwalletupdateloading(true)
      const { data } = await axios.post(`${baseurl}/admin/update_professional_wallet_by_professional_id/`, {
        ...localClients, professional_id: wallet_id, earning:editearning
      })
      console.log(data);
      if (data.status === "Success") {
        seteditmodalShow(false)
        setwalletupdateloading(false)
        setwallet_id("")
        settemp(false)
      }
    }

    const searchfilter = async (query) => {
      setloading(true)
      const { data } = await axios.post(`${baseurl}/admin/search_professional_wallet/`, {
        ...localClients, purpose: "search", query: query, page: page, page_size: 10
      })
      if (data.status === 'Success') {
        
        console.log(data);
        setwallet(data.data.final_data)
        setcounts(Math.ceil(data.data.total_data / 10))
        setloading(false)
      } else {
        setwallet([])
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
                  Professional wallet
                  </h1>
                
                  <div className="ms-auto">

                  <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                    <div class="container-fluid">

                      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                      </button>
                      <div class="collapse navbar-collapse" id="navbarSupportedContent">

                        <form class="d-flex" role="search">
                        <input style={{ width: "250px" }} class="form-control me-2" type="search" onChange={(e) => {

                          if(e.target.value){
                            searchfilter(e.target.value)
                          }
                            setpage(1)
                            setquery(e.target.value)
                            setloading(true)
                          }} placeholder="Search By Name" aria-label="Search" />
                     
                        </form>
                      
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

          
          {!wallet.length? (<>
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
                            Earning($)
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
                          wallet.map((curEle, i) => {
                            const { id, professional_name,earning,professional_id } = curEle
                            // console.log(rating);

                            return (
                              <tr id="tableRow" key={i}>
                                
                                <td className="checkbox-select">
                                  {(page - 1) * 10 + i + 1}
                                </td>
                              
                                <td className="checkbox-select">
                                {/* {professional_name.slice(0,1).toUpperCase() + professional_name.slice(1,25)} */}
                                {
                                  professional_name.split(" ").map((word)=>{
                                      return (
                                      <>
                                      
                                      {" "}  {word.slice(0,1).toUpperCase() + word.slice(1,25)}</>
                                  )})
                                  
                                 }
                                </td>
                                <td className="checkbox-select">
                                  {earning}
                                </td>
                                <td className="akign-center nowrap">
                                  <div style={{ display: "flex" }}>
                                    <button id={professional_id}
                                      onClick={(e) => {
                                        setid(e.target.id)
                                        walletingle_fetch(e.target.id)
                                        seteditmodalShow(true)
                                      }}
                                    >
                                    <i class="fa-regular fa-pen-to-square" id={professional_id}></i>
                                    </button>
                                    <button
                                      style={{ marginLeft: "10px" }}
                                      id={professional_id}
                                      onClick={(e) => {
                                        handleClickOpen(professional_id)
                                        
                                      }}
                                    >
                                      <i class="fa-solid fa-trash" id={professional_id}></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )
                          })
                        }
                      </table>


                  
                      {/* update modal*/}
                      <Modal
                        show={editmodalShow}
                    className="rating_detail_modal"

                        onHide={handlecloseEdit}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title-vcenter">
                           Professional wallet Details
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <form onSubmit={wallet_edit}>
                         

                            <label id='labelsinmodal'>Earning</label>
                            <input id='Footerlinks1' type="number" value={editearning} onChange={(e) => seteditearning(e.target.value)} placeholder="Enter Earning " />

                            <button id='Footerlinks2' type="submit">{walletupdateloading ? <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            /> : "Update"}</button>
                          </form>
                        </Modal.Body>

                      </Modal>

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
                            Are you sure you want to delete this wallet ?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>cancel</Button>
                          <Button onClick={() => walletdelete(id)}>ok</Button>
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

export default ProfessionalWallet