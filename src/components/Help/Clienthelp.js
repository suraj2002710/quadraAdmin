import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";

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
import { ImUpload2 } from 'react-icons/im';
import ReactPlayer from 'react-player'


const Clienthelp = () => {
  const history = createBrowserHistory()
  const cookie = new Cookies()
  const location = useLocation()
  const querypage = new URLSearchParams(location.search)
  const token = cookie.get('token')
  const [editmodalShow, seteditmodalShow] = useState(false)
  const [page, setpage] = useState(querypage.get('page') ? parseInt(querypage.get('page')) : 1)
  const [counts, setcounts] = useState(0)
  const [id, setid] = useState(null)
  const [clienthelp, setclienthelp] = useState([])
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))
  const [addmodalShow, setaddmodalShow] = useState(false)
  const [addvideo, setaddvideo] = useState("")
  const [loading, setloading] = useState(true)
  const [temp, settemp] = useState(true)
  const [mediapreview, setmediapreview] = useState("")
  const [editclienthelp_video, seteditclienthelp_video] = useState("")
  const [clienthelp_id, setclienthelp_id] = useState("")
  const [clienthelpcreateloading, setclienthelpcreateloading] = useState(false)
  const [clienthelpupdateloading, setclienthelpupdateloading] = useState(false)
  const [open, setOpen] = useState(false);
  const [query, setquery] = useState("")
  const [clienthelpErrdisplay, setclienthelpErrdisplay] = useState("none")
  const navigate = useNavigate()
  const video = useRef()
  const regex = /\.(mp4|avi|mkv|mov|wmv|flv|)$/i;
  const getclienthelp = async () => {
    setloading(true)
    const res = await axios.post(`${baseurl}/admin/page_media_fetch/`, {
      ...localClients, page_type: "Client_help", page_size: 10
    });
    console.log(res);
    if (res.data.status === "Success") {
      setloading(false)
      let data = res.data
      setclienthelp(data.data)
      setcounts(Math.ceil(data.data.total_data / 10) ? Math.ceil(data.data.total_data / 10) : 1)
    }
    else {
      console.log("suraj");
      setclienthelp([])
      setloading(false)
    }
  }
  const clienthelpcreate = async (e) => {
    e.preventDefault()
    if (!addvideo) {
      setclienthelpErrdisplay("block")
    } else if (!addvideo) {
      return false
    } else {
      setclienthelpcreateloading(true)
      const formdata = new FormData()
      formdata.set("admin_id", localClients.admin_id)
      formdata.set("admin_token", localClients.admin_token)
      formdata.set("media", addvideo)
      formdata.set("page_type", "Client_help")
      const res = await axios.post(`${baseurl}/admin/page_media_add/`, formdata);

      console.log(res);
      if (res.data.status === "Success") {
        console.log("suraj");
        setclienthelpcreateloading(false)
        setaddvideo(null)
        setmediapreview("")
        settemp(false)
        setaddmodalShow(false)
      }
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const clienthelpdelete = async (id) => {

    const res = await axios.post(`${baseurl}/admin/page_media_delete/`, {
      ...localClients, id: id
    });
    console.log(res);
    if (res.data.status === "Success") {
      // settemp("temp")
      getclienthelp()
      setOpen(false)
    }
  }
  useEffect(() => {
    if (!query) {
      getclienthelp()
      settemp(true)
    }
  }, [page, temp])

  const show = () => setaddmodalShow(true)
  const handleclose = () => {
    setaddvideo(null)
    setclienthelpcreateloading(false)
    setclienthelpErrdisplay("none")
    setaddmodalShow(false);
  }

  const handlecloseEdit = () => {
    setclienthelpupdateloading(false)
    seteditmodalShow(false)
    setclienthelp_id("")
    setmediapreview("")

  }
  useEffect(() => {
    if (!token) {
      history.push("/")
      navigate("/")
    }
  }, [])

  const sendpageinquery = (val) => {
    navigate({
      pathname: '/dashboard/clienthelp',
      search: `?page=${val}`
    })
  }


  const clienthelpingle_fetch = async (id) => {
    const { data } = await axios.put(`${baseurl}/admin/page_media_fetch/`, {
      ...localClients, id: id, page_type: "Client_help"
    })
    console.log(data);
    if (data.status === "Success") {
      setclienthelp_id(data.data.id)
      seteditclienthelp_video(data.data.media)
      seteditclienthelp_video(data.Data[0].media)
    }
  }

  const clienthelp_edit = async (e) => {
    e.preventDefault()
    if (editclienthelp_video === "") {
      setclienthelpErrdisplay("block")
    }
    else {
      const formdata = new FormData()
      formdata.set("admin_id", localClients.admin_id)
      formdata.set("admin_token", localClients.admin_token)
      formdata.set("media", editclienthelp_video)
      formdata.set("pages", "Client_help")
      formdata.set("id", clienthelp_id)

      setclienthelpupdateloading(true)
      const { data } = await axios.post(`${baseurl}/admin/page_media_update/`, formdata)
      console.log(data);
      if (data.status === "Success") {
        seteditmodalShow(false)
        setclienthelpupdateloading(false)
        setclienthelp_id("")

        settemp(false)
      }
    }
  }
 
  return (
    <>
      <div className="content border-bottom mb-2">
        <div className="container-fluid">
          <div className="row">
            <div id="testkar" className="col-12 heading-me-outer d-flex align-items-center">
              <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                Client Help
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
                          <input style={{ width: "250px" }} onChange={(e)=>{
                            setquery(e.target.value)
                            setpage(1)
                              searchfilter(e.target.value)
                              setloading(true)
                            }} class="form-control me-2" type="search" placeholder="Search By Name" aria-label="Search" />
                       
                          </form>*/}
                      <button className='extra-add-btn ms-2' onClick={show}>Add Media</button >
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


            {!clienthelp.length ? (<>
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
                                Media
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
                              clienthelp.map((curEle, i) => {
                                const { id, media, page } = curEle
                                // console.log(rating);
                                let str = media.slice(50)
                                return (
                                  <tr id="tableRow" key={i}>

                                    <td className="checkbox-select">
                                      {/* {(page - 1) * 10 + i + 1} */} {i + 1}
                                    </td>

                                    <td className="checkbox-select">

                                      {str.slice(str.length - 3) === 'mp4' || str.slice(str.length - 3) === 'mkv' || str.slice(str.length - 3) === 'avi' || str.slice(str.length - 3) === 'wmv' || str.slice(str.length - 3) === 'mov' ?
                                        <ReactPlayer url={media} playIcon controls width={150} height={100} />
                                        :
                                        <div style={{ width: "100px", height: '100px' }}>
                                          <img src={media} alt='img' style={{ borderRadius: "50%", height: "100%", aspectRatio: "3/3" }} />
                                        </div>
                                      }

                                    </td>
                                    <td className="akign-center nowrap">
                                      <div style={{ display: "flex" }}>
                                        <button id={id
                                        }
                                          onClick={(e) => {
                                            setid(e.target.id)
                                            clienthelpingle_fetch(e.target.id)
                                            seteditmodalShow(true)
                                          }}
                                        >
                                          <i class="fa-regular fa-pen-to-square" id={id}></i>
                                        </button>
                                        <button
                                          style={{ marginLeft: "10px" }}
                                          id={id}
                                          onClick={(e) => {
                                            handleClickOpen()
                                            setid(e.target.id)
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



                          {/* update modal*/}
                          <Modal
                            show={editmodalShow}
                            className="rating_detail_modal"

                            onHide={handlecloseEdit}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            backdrop="static"
                          >
                            <Modal.Header closeButton>
                              <Modal.Title id="contained-modal-title-vcenter">
                                Details
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <form onSubmit={clienthelp_edit}>

                                <input hidden id='Footerlinks1' type="text" value={clienthelp_id} readOnly />
                                {/* <label id='labelsinmodal'>clienthelp</label> */}
                                {regex.test(editclienthelp_video) || regex.test(video?.current?.files[0]?.name) ?
                                <div style={{ width: "100px",margin:"auto" }}>
                                  <ReactPlayer url={mediapreview ? mediapreview : editclienthelp_video} playIcon controls width={150} height={100} /></div>
                                  :
                                  <div style={{ width: "100px", height: '100px' ,margin:"auto"}}>
                                    <img src={mediapreview ? mediapreview : editclienthelp_video} alt='img' style={{ borderRadius: "50%", height: "100%", aspectRatio: "3/3" }} />
                                  </div>
                                }

                                <div>
                                  <input type="file" ref={video} hidden name="" id="vid" onChange={(e) => {
                                    console.log(e.target.files[0])
                                    seteditclienthelp_video(e.target.files[0])
                                    let prve = URL.createObjectURL(e.target.files[0])
                                    setmediapreview(prve)
                                  }} />

                                  <label htmlFor='vid' className='vides'><ImUpload2 size={40} />Upload Data</label>
                                </div>


                                <label htmlFor="" className={clienthelpErrdisplay}>Required</label>
                                <button id='Footerlinks2' type="submit">{clienthelpupdateloading ? <Spinner
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
                                Are you sure you want to delete this Media files ?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>Cancel</Button>
                              <Button onClick={() => clienthelpdelete(id)}>Ok</Button>
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
      <Modal
        show={addmodalShow}
        onHide={handleclose}
        size="lg"
        className="rating_detail_modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Media
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={clienthelpcreate}>
            <div>
              <input type="file" ref={video} hidden name="" id="vid" onChange={(e) => {
                setaddvideo(e.target.files[0])
                setmediapreview(URL.createObjectURL(e.target.files[0]))
              }} />
              {video?.current?.files[0] ? regex.test(video?.current?.files[0]?.name) ?
               <div style={{ width: "100px",margin:"auto" }}>
                <ReactPlayer url={mediapreview} playIcon controls width={150} height={100} /></div>
                :
                <div style={{ width: "100px", height: '100px' ,margin:"auto"}}>
                  <img src={mediapreview} alt='img' style={{ borderRadius: "50%", height: "100%", aspectRatio: "3/3" }} />
                </div>:""
              }
              {/* {video?.current?.files[0]?.name ?
                <span className='nofile'>{video?.current?.files[0]?.name ? video?.current?.files[0]?.name : "No File Found"}</span> : ""} */}
              <label htmlFor='vid' className='vides'><ImUpload2 size={40} />Upload Data</label>
            </div>

            <label htmlFor="" className={clienthelpErrdisplay}>Required</label>
            <button id='Footerlinks2' type='submit'>{clienthelpcreateloading ? <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            /> : "Add"}</button>
          </form>

        </Modal.Body>

      </Modal>

    </>
  )
}

export default Clienthelp