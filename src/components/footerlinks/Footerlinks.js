import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import { Pagination, Typography } from '@mui/material';
import axios from "axios"
import { Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import './Footerlinks.css'
import { baseurl } from '../../Baseurl';
import { MdOutlineFilterList } from "react-icons/md"
import Dropdown from 'react-bootstrap/Dropdown';
const Footerlinks = () => {
  const history = createBrowserHistory()
  const location = useLocation()
  const querypage = new URLSearchParams(location.search)
  const cookie = new Cookies()
  const token = cookie.get('token')
  const [editmodalShow, seteditmodalShow] = useState(false)
  const [page, setpage] = useState(querypage.get('page') ? parseInt(querypage.get('page')) : 1)
  const [counts, setcounts] = useState(0)
  const [id, setid] = useState(null)
  const [footerlinks, setfooterlinks] = useState([])
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))
  const [addmodalShow, setaddmodalShow] = useState(false)
  const [addfooterlinkname, setaddfooterlinkname] = useState("")
  const [addfooterlinktype, setaddfooterlinktype] = useState("")
  const [addfooterlinkurl, setaddfooterlinkurl] = useState("")
  const [loading, setloading] = useState(true)
  const [temp, settemp] = useState(true)
  const [footerlinkscreateloading, setfooterlinkscreateloading] = useState(false)
  const [footerlinkid, setfooterlinkid] = useState("")
  const [open, setOpen] = useState(false);
  const [query, setquery] = useState("")
  const [type, settype] = useState("")
  const [footerlinkNameErrdisplay, setfooterlinkNameErrdisplay]=useState("none")
  const [footertypeErrdisplay, setfootertypeErrdisplay]=useState("none")
  const [footerUrlErrdisplay, setfooterlinkUrlErrdisplay]=useState("none")
  const navigate = useNavigate()

  const getfooterlinks = async () => {
    const res = await axios.post(`${baseurl}/admin/static/footer-data/`, {
      ...localClients, page: page, page_size: 10
    });
    console.log(res);
    if (res.data.status === "Success") {
      setloading(false)
      let data = res.data
      setfooterlinks(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    }
    else {
      console.log("suraj");
      setfooterlinks([])
      setloading(false)
    }
  }
  const footerlinkscreate = async (e) => {
    e.preventDefault()
    console.log(addfooterlinkname,addfooterlinkname,addfooterlinkurl);
    if(!addfooterlinkname){
      
      setfooterlinkNameErrdisplay("block")
    }
    if(!addfooterlinktype){
      setfootertypeErrdisplay("block")
    }
    if(!addfooterlinkurl){
      setfooterlinkUrlErrdisplay("block")
    }
    else if(!addfooterlinkname|| !addfooterlinktype || !addfooterlinkurl){
      return false
    }
    else{
    setfooterlinkscreateloading(true)
    const res = await axios.put(`${baseurl}/admin/static/footer-data/`, {
      ...localClients, type: addfooterlinktype, name: addfooterlinkname, url: addfooterlinkurl
    });
    console.log(res);
    if (res.data.status === "Success") {
      console.log("suraj");
      setfooterlinkscreateloading(false)
      setaddfooterlinktype("")
      setaddfooterlinkname("")
      setaddfooterlinkurl("")
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
  const footerlinksdelete = async (id) => {

    const res = await axios.put(`${baseurl}/admin/static/footer-data/edit/`, {
      ...localClients, link_id: id
    });
    console.log(res);
    if (res.data.status === "Success") {
      settemp("temp")
      setfooterlinkupdateloading(false)
      seteditmodalShow(false)
      setOpen(false)
    }
  }
  useEffect(() => {
    if(query==="" && !type){
      setpage(querypage.get('page')!==null?parseInt(querypage.get('page')):1)

      getfooterlinks()
      settemp(true)
    }
    }, [page, temp])



  const show = () => setaddmodalShow(true)
  const handleclose = () => {
    setaddfooterlinktype("")
    setaddfooterlinkname("")
    setaddfooterlinkurl("")
    setfooterlinkscreateloading(false)
    setaddmodalShow(false);
    setfooterlinkNameErrdisplay("none")
    setfooterlinkUrlErrdisplay("none")
    setfootertypeErrdisplay("none")
  }

  const handlecloseEdit = () => {
    setfooterlinkupdateloading(false)
    seteditmodalShow(false)
    setfooterlinkname("")
    setfooterlinktype("")
    seturl("")
  }
  useEffect(() => {
    if (!token) {
      history.push("/")
      navigate("/")
    }
  }, [])



  const [footerlinkname, setfooterlinkname] = useState("")
  const [footerlinktype, setfooterlinktype] = useState("")
  const [footerlinkupdateloading, setfooterlinkupdateloading] = useState(false)
  const [url, seturl] = useState("")
  const getsinglefooterlinks = async (id) => {
    const res = await axios.post(`${baseurl}/admin/static/single-fetch-footer-link/`, {
      ...localClients, footer_link_id: id
    });
    console.log(res.data.data.final_data[0]);
    if (res.data.status === "Success") {
      setloading(false)
      let data = res.data
      setfooterlinkid(res.data.data.final_data[0].id)
      setfooterlinkname(res.data.data.final_data[0].name)
      setfooterlinktype(res.data.data.final_data[0].type)
      seturl(res.data.data.final_data[0].url)
    }
    else {
      console.log("suraj");
      setloading(false)
    }
  }

  const sendpageinquery = (val) => {
    navigate({
      pathname: '/dashboard/footerlinks',
      search: `?page=${val}`
    })
  }


  const footerlinkupdate = async (e) => {
    e.preventDefault()
    console.log(footerlinktype,footerlinkname);
    if(footerlinkname===""){
      setfooterlinkNameErrdisplay("block")
    }
    if(footerlinktype===""){
      setfootertypeErrdisplay("block")
    }
    if(url===""){
      console.log("surnaj");
      setfooterlinkUrlErrdisplay("block")
    }
    else if(footerlinkname==="" || footerlinktype==="" || url===""){
      return false
    }
    else{
    setfooterlinkupdateloading(true)
    const res = await axios.post(`${baseurl}/admin/static/footer-data/edit/`, {
      ...localClients, link_id: id,
      type: footerlinktype,
      name: footerlinkname,
      url: url
    });
    console.log(res);
    if (res.data.status === "Success") {
      setfooterlinkupdateloading(false)
      settemp(false)
      seteditmodalShow(false)
    }
  }
  }


  const searchfilter = async (query) => {
    setloading(true)

    const { data } = await axios.post(`${baseurl}/admin/static/search_filter_footer_link/`, {
      ...localClients, purpose: "search", query: query, page: page, page_size: 10
    })
    if (data.status === 'Success') {
      console.log(data);
      setloading(false)

      setfooterlinks(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    } else {
      setloading(false)

      setfooterlinks([])
      setcounts(0)
    }
  }

  const searchfilterBycategory = async (query) => {
    setloading(true)
    const { data } = await axios.post(`${baseurl}/admin/static/search_filter_footer_link/`, {
      ...localClients, purpose: "filter", query: query, page: page, page_size: 10
    })
    if (data.status === 'Success') {
      setloading(false)
      console.log(data);
      setfooterlinks(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    } else {
      setloading(false)
      setfooterlinks([])
      setcounts(0)
    }
  }

  useEffect(() => {
    if(query){
      searchfilter(query)
      settemp(true)
    }
    }, [page,temp])

    useEffect(() => {
      if(type){
        searchfilterBycategory(type)
        settemp(true)
      }
      }, [page,temp])
  return (
    <>
    <div className="content border-bottom mb-2">
              <div className="container-fluid">
                <div className="row">
                  <div id="testkar" className="d-flex align-items-center heading-me-outer">
                    <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                      FooterLinks
                    </h1>

                    <div className="ms-auto">

                      <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                        <div class="container-fluid">

                          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                          </button>
                          <div class="collapse navbar-collapse" id="navbarSupportedContent">

                            <form class="d-flex" role="search">
                              <input style={{ width: "250px" }} value={query} onChange={(e) => {
                                setquery(e.target.value)
                                settype("")
                                setpage(1)
                                searchfilter(e.target.value)
                              }} class="form-control me-2" type="search" placeholder="Search By Name" aria-label="Search" />
                              
                              <Dropdown onSelect={(e) => {
                                console.log(e)
                                setquery("")
                                settype(e)
                                setpage(1)
                                searchfilterBycategory(e)
                              }}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic"  >
                                  <MdOutlineFilterList size={30} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                  <Dropdown.Item eventKey="Support" >Support</Dropdown.Item>
                                  <Dropdown.Item eventKey="Explore">Explore</Dropdown.Item>
                                  <Dropdown.Item eventKey="Explore Resources">Explore Resources</Dropdown.Item>
                                  <Dropdown.Item eventKey="Categories">Categories</Dropdown.Item>

                                </Dropdown.Menu>
                              </Dropdown>
                            </form>
                            <button className='extra-add-btn ms-2' onClick={show} >Add Footerlinks</button >
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
            {!footerlinks.length ? (<>
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


                            {/* <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Type
                            </th> */}
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
                              Url
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
                            footerlinks.map((curEle, i) => {
                              const { id, type, name,url } = curEle
                              // console.log(rating);

                              return (
                                <tr id="tableRow" key={i}>

                                  <td className="checkbox-select">
                                    {(page - 1) * 10 + i + 1}
                                  </td>

                                  {/* <td className="checkbox-select">
                                    {type}
                                  </td> */}
                                  <td className="checkbox-select">
                                    {name}
                                  </td>
                                  <td className="checkbox-select">
                                    {url}
                                  </td>
                                  <td className="akign-center nowrap">
                                    <div style={{ display: "flex" }}>
                                      <button id={id
                                      }
                                        onClick={(e) => {
                                          setid(e.target.id)
                                          getsinglefooterlinks(e.target.id)
                                          seteditmodalShow(true)
                                          // setmodalShow(true)
                                        }}
                                      >
                                        <i class="fa-regular fa-pen-to-square" id={id}></i>
                                      </button>
                                      <button
                                        style={{ marginLeft: "10px" }}
                                        id={id}
                                        onClick={(e) => {
                                          console.log(e.target.id);
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


                        <Modal
                          show={addmodalShow}
                          onHide={handleclose}
                          size="lg"
                          className="rating_detail_modal"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                              Add Footerlink
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form onSubmit={footerlinkscreate}>
                              <div>
                                <lable id='labelsinmodal' className='lbl'> Name</lable>
                                <input value={addfooterlinkname} id='Footerlinks1' placeholder="Enter Footerlink name" onChange={(e) => { 
                                  setfooterlinkNameErrdisplay("none")
                                  setaddfooterlinkname(e.target.value) }} type="text" />
                                <label htmlFor="" className={footerlinkNameErrdisplay} >Name is Rquired</label>
                              </div>

                              <div>
                                <lable id='labelsinmodal'

                                  className='lbl'> Type</lable>
                                <select style={{ backgroundColor: "white" }} name="" id='Footerlinks1' onChange={(e) => {
                                  console.log(e.target.value);
                                  setaddfooterlinktype(e.target.value)
                                  setfootertypeErrdisplay("none")
                                }}>
                                  <option  selected="true" disabled="disabled">Select Type</option>
                                  <option value="Support">Support</option>
                                  <option value="Explore">Explore</option>
                                  <option value="Explore Resources">Explore Resources</option>
                                  <option value="Categories">Categories</option>
                                </select>
                                <label htmlFor="" className={footertypeErrdisplay} >Type is Rquired</label>
                              </div>
                              <div>
                                <lable id='labelsinmodal'
                                  className='lbl'> Url</lable>
                                <input value={addfooterlinkurl} id='Footerlinks1' placeholder="Enter Footerlink Url" onChange={(e) => {
                                  setfooterlinkUrlErrdisplay("none")
                                   setaddfooterlinkurl(e.target.value) }} type="text" />
                                <label htmlFor="" className={footerUrlErrdisplay} >Url is Rquired</label>
                              </div>
                              <button id='Footerlinks2' t qq ype='submit'>{footerlinkscreateloading ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              /> : "Add"}</button>
                            </form>

                          </Modal.Body>

                        </Modal>


                        {/*update modal*/}

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
                               Details
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form onSubmit={footerlinkupdate}>
                              <div className='gap'>
                                <input hidden type="text" id='Footerlinks1' value={footerlinkid} readOnly placeholder="Enter Footerlink Name" name="" />
                                
                              </div>
                              <div className='gap'>
                                <lable id='labelsinmodal'

                                  className='lbl'> Name</lable>
                                <input type="text" value={footerlinkname} id='Footerlinks1' onChange={(e) => {setfooterlinkname(e.target.value)
                                setfooterlinkNameErrdisplay("none")}
                                } placeholder="Enter Footerlink Name" name="" />
                                <label htmlFor="" className={footerlinkNameErrdisplay} >Name is Rquired</label>
                              </div>
                              <div className='gap'>
                                <lable id='labelsinmodal'

                                  className='lbl'> Type</lable>

                                <select value={footerlinktype} style={{ backgroundColor: "white", }} name="" id='Footerlinks1' onChange={(e) => {                                 
                                  setfooterlinktype(e.target.value)
                                }}>
                                  <option disabled >Select Type</option>
                                  <option value="Support">Support</option>
                                  <option value="Explore">Explore</option>
                                  <option value="Explore Resources">Explore Resources</option>
                                  <option value="Categories">Categories</option>
                                </select>
                                <label htmlFor="" className={footertypeErrdisplay} >Type is Rquired</label>
                              </div>
                              <div className='gap'>
                                <lable id='labelsinmodal'

                                  className='lbl'> Url</lable>
                                <input type="text" id='Footerlinks1' name="" value={url} onChange={(e) => {seturl(e.target.value)
                                setfooterlinkUrlErrdisplay("none")
                                }} placeholder="Enter Footerlink Type" />
                                <label htmlFor="" className={footerUrlErrdisplay} >Url is Rquired</label>
                              </div>
                              <button id='Footerlinks3' type="submit">{footerlinkupdateloading ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              /> : "update"}</button>
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
                              Are you sure you want to delete this footer link ?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>cancel</Button>
                            <Button onClick={() => footerlinksdelete(id)}>ok</Button>
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

export default Footerlinks
