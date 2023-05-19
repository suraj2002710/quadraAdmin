import {  useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios"
import { Pagination, Typography } from '@mui/material';
import { Modal, Spinner } from 'react-bootstrap';

import { Formik } from 'formik';
import { ImUpload2 } from 'react-icons/im';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { baseurl } from '../../Baseurl';
const Social_media = () => {
  const location = useLocation()
  const navigate=useNavigate()
  const [showdesc,setshowdesc]=useState("")

  const querypage = new URLSearchParams(location.search)
  const [social, setsocial] = useState([])
  const [loading, setloading] = useState(true)
  const [counts, setcounts] = useState(0)
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))
  
  const [page, setpage] = useState(querypage.get('page') ? parseInt(querypage.get('page')) : 1)
  const [id, setid] = useState("")
  
  const [mediaicon, setMediaicon] = useState('')
  const [createloading, setcreateloading] = useState(false)
  const [icondisplay, seticondisplay] = useState('none')
  const [temp, settemp] = useState(true)
  const [editmedia_link, seteditmedia_link] = useState("")
  const [editmedia_name, seteditmedia_name] = useState("")
  const [editmedia_icon, seteditmedia_icon] = useState("")
  const [editmedia_id, seteditmedia_id] = useState("")
  
  const [addmodalShow, setaddmodalShow] = useState(false)
  const [editmodalshow, seteditmodalshow] = useState(false)
  const [open, setOpen] = useState(false);
  const [medianameErr, setmedianameErr] = useState('none')
  const [mediaiconErr, setmediaiconErr] = useState('none')
  const [medialinkErr, setmedialinkErr] = useState('none')
  const [updateloading, setupdateloading] = useState(false)
  const getsociallinks = async () => {
    const res = await axios.put(`${baseurl}/admin/static/footer-media-data/`, {
      ...localClients,
    })
    if (res.data.status === "Success") {
      let data = res.data
      console.log("suraj");
      setloading(false)
      console.log(data.data)
      console.log("clist", data.data)
      setsocial(data.data)
    }

  }
  useEffect(() => {
    getsociallinks()
  }, [temp])

  const show = () => setaddmodalShow(true)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleclose = () => {
    setMediaicon("")
    setaddmodalShow(false);
    setmediaiconErr('none')
    setmedialinkErr("none")
    setmedianameErr('none')
    seticondisplay('none')
  }
  const handlecloseeditmodal = () => {
    seteditmodalshow(false)
    setmediaiconErr('none')
    setmedialinkErr("none")
    seticondisplay('none')

    setmedianameErr('none')
    setupdateloading(false)
  }

  let initialValues = {
    media_icon: "",
    media_name: "",
    media_link: "",
  }

  const sendpageinquery = (val) => {
    navigate({
      pathname: '/dashboard/social_links',
      search: `?page=${val}`
    })
  }

  const single_media_link = async (id) => {
    const { data } = await axios.post(`${baseurl}/admin/static/single_fetch-footer-media-data/`, {
      ...localClients, media_id: id
    })
    if (data.status === 'Success') {
      console.log(data);

      seteditmedia_icon(data.data[0].icon)
      seteditmedia_link(data.data[0].media_link)
      seteditmedia_name(data.data[0].media_name)
      seteditmedia_id(data.data[0].id)
      setMediaicon(data.data[0].icon)
      seticondisplay('block')
    }
  }

  const medialinkdelte = async (id) => {
    const res = await axios.put(`${baseurl}/admin/static/footer-media-data/edit/`, {
      ...localClients, media_id: id
    });
    console.log(res);
    if (res.data.status === "Sucsess") {
      settemp(false)
      setOpen(false)
    }
    else {
      console.log("suraj");
      let data = res.data
      alert(data.message)
    }
  }

  useEffect(() => {
    getsociallinks()
    settemp(true)
  }, [temp])

  const updatemedial_link = async (e) => {
    e.preventDefault()
    if (!editmedia_icon) {
      setmediaiconErr('block')

    }
    if (!editmedia_link) {
      setmedialinkErr('block')

    }
    if (!editmedia_name) {
      setmedianameErr('block')

    }
    else {
      setupdateloading(true)
      const formdata = new FormData()
      formdata.set('admin_id', localClients.admin_id)
      formdata.set('admin_token', localClients.admin_token)
      formdata.set('media_name', editmedia_name)
      formdata.set('media_icon', editmedia_icon)
      formdata.set('media_link', editmedia_link)
      formdata.set('media_id', editmedia_id)
      e.preventDefault()


      console.log(id)
      const { data } = await axios.post(`${baseurl}/admin/static/footer-media-data/edit/`, formdata)
      console.log(data);
      if (data.status === 'Sucsess') {

        seteditmedia_icon("")
        setmediaiconErr('none')
        setmedialinkErr("none")
        setmedianameErr('none')
        seteditmodalshow(false)
        settemp(false)
        setupdateloading(false)
      }
    }

  }

  return (
    <>
       <div className="content border-bottom mb-2">
            <div className="container-fluid">
              <div className="row">
                <div className="d-flex flex-grow-1 align-items-center heading-me-outer">
                  <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                    Social Media
                  </h1>
                  <button className='extra-add-btn ms-auto' onClick={show}>Add Socialmedia Link</button >

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

        </div>
        :

        <>
       
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
                            Media Name
                          </th>
                          <th
                            className="sortin"
                            tabindex="0"
                            rowspan="1"
                            colspan="1"
                          >
                            Medial Link
                          </th>
                          <th
                            className="sortin"
                            tabindex="0"
                            rowspan="1"
                            colspan="1"
                          >
                            Icon
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
                          social.length > 0 && social.map((curEle, i) => {
                            const { id, media_id, icon, media_link, media_name, media_icon } = curEle;
                            return (
                              <tr key={i}>
                                <td className="checkbox-select">
                                  {(page - 1) * 10 + i + 1}
                                </td>
                               
                                <td className="checkbox-select">
                                {media_name.slice(0,1).toUpperCase() + media_name.slice(1,25)}

                 
                                </td>
                                <td className="checkbox-select">
                                  
                                {
                                    
                                    media_link ==="" ? <Typography>No Media Link</Typography>:
                                    showdesc=== i+1 ? <span>
                                      {media_link} <span className='showless' id={i+1} onClick={(e)=>{
                                        setshowdesc("")
                                      }}>show less</span>
                                    </span>      :
                                   <span>
                                   {media_link.length>50 ? media_link.slice(0,50)+'.....':media_link} {media_link.length<50 ?null :<span className='showless' id={i+1} onClick={(e)=>{
                                     setshowdesc(parseInt(e.target.id))
                                   }}>show</span>}
                                 </span>    }

                                </td>
                                <td className="checkbox-select">
                                  <img src={icon} alt="icon" />
                                </td>
                                <td className="akign-center nowrap">

                                  <div style={{ display: "flex" }}>
                                    <button id={id
                                    }
                                      onClick={(e) => {
                                        seteditmodalshow(true)
                                        single_media_link(e.target.id)
                                        // updatemedial_link(e.target.id)
                                      }}
                                    >
                                      <i class="fa-regular fa-pen-to-square" id={id}></i>
                                    </button>
                                    <button
                                      style={{ marginLeft: "10px" }}
                                      id={id}
                                      onClick={(e) => {
                                        setid(e.target.id)
                                        handleClickOpen()
                                      }}
                                    >
                                      <i class="fa-solid fa-trash" id={id}></i>
                                    </button>
                                  </div>
                                </td>
                                <td className="akign-center nowrap">

                                </td>
                              </tr>
                            )
                          })
                        }
                      </table>

                      <Modal
                        show={addmodalShow}
                        onHide={handleclose}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title-vcenter">
                            Add Social Media Link
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Formik
                            initialValues={initialValues}

                            onSubmit={async (values) => {
                              console.log("suraj");
                              if (!values.media_name) {
                                setmedianameErr('block')
                              }
                              if (!values.media_icon) {
                                setmediaiconErr('block')
                              }
                              if (!values.media_link) {
                                setmedialinkErr('block')
                              }
                              else {
                                setcreateloading(true)
                                setMediaicon("")
                                try {
                                  const formdata = new FormData()
                                  formdata.set("admin_id", localClients.admin_id)
                                  formdata.set("admin_token", localClients.admin_token)
                                  formdata.set("media_icon", values.media_icon)
                                  formdata.set("media_link", values.media_link)
                                  formdata.set("media_name", values.media_name)
                                  formdata.set("media_id", values.media_id)

                                  let { data } = await axios.post("http://13.52.16.160:8082/admin/static/footer-media-data/", formdata)
                                  console.log(data);
                                  if (data.status === "Success") {
                                    setcreateloading(false)
                                    settemp(false)
                                    setMediaicon("")
                                    setaddmodalShow(false);
                                    seticondisplay('none')
                                  }
                                } catch (error) {
                                  console.log(error);
                                }
                              }
                            }}
                          >
                            {({ values, setFieldValue, handleSubmit, errors, }) => (
                              <form onSubmit={handleSubmit}>



                                <div className="architectural-select">
                                  <div className="architectural-select-one">
                                    <input type="text" name='media_name' value={values.media_name} onChange={(e) => {

                                      setmedianameErr('none')
                                      setFieldValue('media_name', e.target.value)
                                    }} placeholder='Enter Social Media Name' />
                                    <span className={medianameErr} style={{ color: "red" }}>Media Name Required</span>
                                  </div>
                                  <div className="architectural-select-to">
                                    <input type="text" placeholder='Enter Link Here' value={values.media_link} name='media_link' onChange={(e) => {
                                      setFieldValue('media_link', e.target.value)
                                      setmedialinkErr("none")
                                    }} />
                                    <span className={medialinkErr} style={{ color: "red" }}>Media Link Required</span>
                                  </div>
                                </div>



                                <div className="social_media_upload">

                                  <img className={icondisplay} style={{ width: "10%" }} src={mediaicon} alt="inactive icon" />
                                  <label htmlFor='Inactive-iocn'><ImUpload2 size={40} />Upload Media Icon</label>
                                  <span className={mediaiconErr} style={{ color: "red" }}>Media Icon Required</span>

                                  <input type="file" name='media_icon' onChange={(e) => {
                                    setFieldValue('media_icon', e.target.files[0])
                                    let prev = URL.createObjectURL(e.target.files[0])
                                    setMediaicon(prev)
                                    setmediaiconErr('none')

                                    seticondisplay("block")
                                  }} id='Inactive-iocn' hidden />

                                </div>
                                <button type='submit' className="extra-add-btn w-100 mt-2"
                                >{createloading ? <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                /> : "submit"}</button>
                              </form>)
                            }
                          </Formik>
                        </Modal.Body>
                      </Modal>
                      <Modal />


                      {/*update modal */}

                      <Modal
                        show={editmodalshow}
                        className="add_subcategories_details_modal "
                        onHide={handlecloseeditmodal}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title-vcenter">
                            Update Social Sedia Links
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <form onSubmit={updatemedial_link}>
                            <div className="architectural-select">
                              <div className="architectural-select-one">
                              <label id='labelsinmodal'>Social Media Name</label>
                                <input
                                  type="text"
                                  name="editmedia_name"
                                  value={editmedia_name}
                                  onChange={(e) => {
                                    setmedianameErr("none");
                                    seteditmedia_name(e.target.value);
                                  }}
                                  placeholder="Enter Social media Name"
                                />
                                <span
                                  className={medianameErr}
                                  style={{ color: "red" }}
                                >
                                  Media Name Required
                                </span>
                              </div>
                              <div className="architectural-select-to">
                              <label id='labelsinmodal'>Social Media Link</label>
                                <input
                                  type="text"
                                  placeholder="Enter Link here"
                                  value={editmedia_link}
                                  name="editmedia_link"
                                  onChange={(e) => {
                                    seteditmedia_link(e.target.value);
                                    setmedialinkErr("none");
                                  }}
                                />
                                <span
                                  style={{ color: "red" }}
                                  className={medialinkErr}
                                >
                                  Medialink Are Required
                                </span>
                              </div>
                            </div>

                            <div className="social_media_upload">
                              <img
                                className={icondisplay}
                                src={mediaicon}
                                alt="inactive icon"
                              />
                              <label htmlFor="Inactive-iocn">
                                <ImUpload2 size={40} />
                                Upload Media Icon
                              </label>
                              <span
                                className={mediaiconErr}
                                style={{ color: "red" }}
                              >
                                Media Icon Are Required
                              </span>

                              <input
                                type="file"
                                name="media_icon"
                                onChange={(e) => {
                                  seteditmedia_icon(e.target.files[0]);
                                  setmediaiconErr("none");
                                  let prev = URL.createObjectURL(
                                    e.target.files[0]
                                  );
                                  setMediaicon(prev);
                                  seticondisplay("block");
                                }}
                                id="Inactive-iocn"
                                hidden
                              />
                            </div>

                            <button
                              className="extra-add-btn w-100 mt-2"
                              type="submit"
                            >
                              {updateloading ? (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                "submit"
                              )}
                            </button>
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
                            Are you sure you want to delete this Social Media Link ?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>cancel</Button>
                          <Button onClick={() => medialinkdelte(id)}>ok</Button>
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
        </>
      }
    </>
  )
}

export default Social_media
