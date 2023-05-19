import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";


import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { Pagination } from '@mui/material';
import axios from "axios"
import { Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { baseurl } from '../../Baseurl';

const Language = () => {
  const history = createBrowserHistory()
  const location = useLocation()
  const querypage = new URLSearchParams(location.search)
  const cookie = new Cookies()
  const token = cookie.get('token')
  const [page, setpage] = useState(querypage.get('page') ? parseInt(querypage.get('page')) : 1)
  const [counts, setcounts] = useState(0)
  const [id, setid] = useState(null)
  const [language, setlanguage] = useState([])
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))
  const [addmodalShow, setaddmodalShow] = useState(false)
  const [addlanguage, setaddlanguage] = useState("")
  const [editlanguage, seteditlanguage] = useState("")
  const [editid, seteditid] = useState("")
  const [editmodalshow, seteditmodalshow] = useState(false)
  const [loading, setloading] = useState(true)
  const [editloading, seteditloading] = useState(false)
  const [temp, settemp] = useState(true)
  const [open, setOpen] = useState(false);
  const [languagecreateloading, setlanguagecreateloading] = useState(false)
  const [languageErrdisplay, setlanguageErrdisplay] = useState("none")
  const navigate = useNavigate()
  const getlanguage = async () => {
setloading(true)
    const res = await axios.post(`${baseurl}/admin/static/languages/`, {
      ...localClients, page: page, page_size: 10
    });
    console.log(res);
    if (res.data.status === "Success") {
      setloading(false)
      let data = res.data
      setlanguage(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    }
    else {
      console.log("suraj");
      setlanguage([])
      setloading(false)
    }
  }
  useEffect(() => {
    if (!token) {
      history.push("/")
      navigate("/")
    }
  }, [])
  const languagecreate = async (e) => {
    e.preventDefault()
    if (!addlanguage) {
      setlanguageErrdisplay("block")

    }
    else {

      setlanguagecreateloading(true)
      const res = await axios.put(`${baseurl}/admin/static/languages/`, {
        ...localClients, language: addlanguage
      });
      console.log(res);
      if (res.data.status === "Success") {
        console.log("suraj");
        setaddmodalShow(false)
        setaddlanguage(null)
        setlanguagecreateloading(false)
        settemp(false)
      }
    }

  }

  const languagedelete = async (id) => {
    const res = await axios.put(`${baseurl}/admin/static/languages/edit/`, {
      ...localClients, language_id: id
    });
    console.log(res);
    if (res.data.status === "Success") {
      settemp("temp")
      setOpen(false)
      getlanguage()
    }
  }

  const single_language_fetch = async (id) => {
    const { data } = await axios.post(`${baseurl}/admin/static/single_fetch_language`, {
      ...localClients, language_id: id
    })
    console.log(data);
    if (data.status === "Success") {
      console.log("status");
      seteditlanguage(data.data.final_data[0].language)
      seteditid(data.data.final_data[0].id)
    }
  }
  const sendpageinquery = (val) => {
    navigate({
      pathname: '/dashboard/language',
      search: `?page=${val}`
    })
  }
  useEffect(() => {
    getlanguage()
    settemp(true)
  }, [page, temp])

  const show = () => setaddmodalShow(true)
  const handleclose = () => {
    setaddlanguage(null)
    setlanguagecreateloading(false)
    setaddmodalShow(false);
    setlanguageErrdisplay("none")
  }

  const handlecloseeditmodal = () => {
    seteditmodalshow(false)
    seteditlanguage("")
    seteditloading(false)
    setlanguageErrdisplay("none")

  }

  const updatelanguage = async (e) => {
    e.preventDefault()
    if (editlanguage === "") {
      setlanguageErrdisplay("block")
    }
    else {
    seteditloading(true)

      const { data } = await axios.post(`${baseurl}/admin/static/languages/edit/`, {
        ...localClients, language: editlanguage, language_id: editid
      })
      if (data.status === 'Success') {
        seteditloading(false)
        seteditlanguage("")
        seteditmodalshow(false)
        settemp(false)
        seteditid("")
      }
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="content border-bottom mb-2 mt-5">
        <div className="container-fluid">
          <div className="row">
            <div id="testkar" className="heading-me-outer d-flex align-items-center mt-0">
              <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                Language
              </h1>

              <div className="ms-auto">

                <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                  <div class="container-fluid">

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">




                      {/* <form class="d-flex" role="search">
                        <input style={{ width: "250px" }} class="form-control me-2" type="search" placeholder="Search By Name" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                      </form> */}
                      <button className='extra-add-btn ms-2' onClick={show} >Add Language</button >

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
                              Language
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
                            language.map((curEle, i) => {
                              const { id, language } = curEle
                              // console.log(rating);

                              return (
                                <tr id="tableRow" key={i}>

                                  <td className="checkbox-select">
                                    {(page - 1) * 10 + i + 1}
                                  </td>

                                  <td className="checkbox-select">
                                    {language?.slice(0, 1).toUpperCase() + language?.slice(1, 25)}


                                  </td>

                                  <td className="akign-center nowrap">
                                    <div style={{ display: "flex" }}>


                                      <button id={id
                                      }
                                        onClick={(e) => {
                                          console.log(e.target.id);
                                          single_language_fetch(e.target.id)
                                          seteditmodalshow(true)
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

                        {/*update modal*/}

                        <Modal
                          show={editmodalshow}
                          className="rating_detail_modal"
                          onHide={handlecloseeditmodal}
                          size="lg"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                              Language Details
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form onSubmit={updatelanguage}>
                              <lable id="labelsinmodal" >Enter Language</lable>
                              <input id='Footerlinks1' value={editlanguage} placeholder="Enter New Language" onChange={(e) => {
                                seteditlanguage(e.target.value)
                                setlanguageErrdisplay("none")
                              }} type="text" />
                              <label htmlFor="" className={languageErrdisplay}>Required</label>
                              <button id='Footerlinks2' type='submit'>{editloading ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              /> : "update"}</button>
                            </form>

                          </Modal.Body>
                        </Modal>


                        <Modal
                          show={addmodalShow}
                          className="rating_detail_modal"
                          onHide={handleclose}
                          size="lg"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                              Language
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form onSubmit={languagecreate}>

                              <input id='Footerlinks1' value={addlanguage} placeholder="Enter New Language" onChange={(e) => {
                                setaddlanguage(e.target.value)
                                setlanguageErrdisplay("none")
                              }} type="text" />
                              <label htmlFor="" className={languageErrdisplay}>Required</label>
                              <button id='Footerlinks2' type='submit'>{languagecreateloading ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              /> : "Add"}</button>
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
                              Are you sure you want to delete this language ?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>cancel</Button>
                            <Button onClick={() => languagedelete(id)}>ok</Button>
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
        )
      }
    </>
  )
}

export default Language
