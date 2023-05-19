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

const Skills = () => {
  const history = createBrowserHistory()
  const cookie = new Cookies()
  const location=useLocation()
  const querypage=new URLSearchParams(location.search)
  const token = cookie.get('token')
  const [editmodalShow, seteditmodalShow] = useState(false)
  const [page, setpage] = useState(querypage.get('page')?parseInt(querypage.get('page')):1)
  const [counts, setcounts] = useState(0)
  const [id, setid] = useState(null)
  const [skills, setskills] = useState([])
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))
  const [addmodalShow, setaddmodalShow] = useState(false)
  const [addskills, setaddskills] = useState("")
  const [loading, setloading] = useState(true)
  const [temp, settemp] = useState(true)
  
  const [editskill_name, seteditskill_name] = useState("")
  const [skill_id, setskill_id] = useState("")    
  const [skillcreateloading, setskillcreateloading] = useState(false)
  const [skillupdateloading, setskillupdateloading] = useState(false)
  const [open, setOpen] = useState(false);
  const [query,setquery]=useState("")
  const [skillsErrdisplay, setskillsErrdisplay] = useState("none")
  const navigate = useNavigate()
  const getskills = async () => {
    setloading(true)
    const res = await axios.post(`${baseurl}/admin/static/skills/`, {
      ...localClients, page: page, page_size: 10
    });
    console.log(res);
    if (res.data.status === "Success") {
      setloading(false)
      let data = res.data
      setskills(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    }
    else {
      console.log("suraj");
      setskills([])
      setloading(false)
    }
  }
  const skillscreate = async (e) => {
    e.preventDefault()
    if(!addskills) {
      setskillsErrdisplay("block")
    } else if(!addskills){
      return false
    }else{
    setskillcreateloading(true)
    const res = await axios.put(`${baseurl}/admin/static/skills/`, {
      ...localClients, skill: addskills
    });
   
    console.log(res);
    if (res.data.status === "Success") {
      console.log("suraj");
      setskillcreateloading(false)
      setaddskills(null)
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
  const skilldelete = async (id) => {

    const res = await axios.put(`${baseurl}/admin/static/skills/edit/`, {
      ...localClients, skill_id: id
    });
    console.log(res);
    if (res.data.status === "Success") {
      // settemp("temp")
      getskills()
      setOpen(false)
    }
  }
  useEffect(() => {
    if(!query){
      getskills()
      settemp(true)
    }
  }, [page, temp])

  const show = () => setaddmodalShow(true)
  const handleclose = () => {
    setaddskills(null)
    setskillcreateloading(false)
    setskillsErrdisplay("none")
    setaddmodalShow(false);
  }

  const handlecloseEdit = () => {
    setskillupdateloading(false)
    seteditmodalShow(false)
    setskill_id("")

  }
  useEffect(() => {
    if (!token) {
      history.push("/")
      navigate("/")
    }
  }, [])

  const sendpageinquery=(val)=>{
    navigate({
      pathname:'/dashboard/skills',
      search:`?page=${val}`
    })
  }


  const skillSingle_fetch = async (id) => {
    const { data } = await axios.post(`${baseurl}/admin/static/single_fetch_skill`, {
      ...localClients, skill_id: id
    })
    console.log(data);
    if (data.status === "Success") {
      setskill_id(data.Data[0].id)
      seteditskill_name(data.Data[0].skill)
    }
  }

  const skill_edit = async (e) => {
    e.preventDefault()
    if(editskill_name===""){
      setskillsErrdisplay("block")
    }
    else{

      setskillupdateloading(true)
      const { data } = await axios.post(`${baseurl}/admin/static/skills/edit/`, {
        ...localClients, skill_id: skill_id, skill: editskill_name
      })
      console.log(data);
      if (data.status === "Success") {
        seteditmodalShow(false)
        setskillupdateloading(false)
        setskill_id("")

        settemp(false)
      }
    }
  }
  const searchfilter = async (query) => {
    const { data } = await axios.post(`${baseurl}/admin/static/search_all_skills/`, {
      ...localClients, query: query, page: page, page_size: 10
    })
    if (data.status === 'Success') {
      console.log(data);
      setskills(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
      setloading(false)
    } else {
      setskills([])
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
                      Skills
                    </h1>
                  
                    <div className="ms-auto">

                    <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                      <div class="container-fluid">
  
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
  
                          <form class="d-flex" role="search">
                          <input style={{ width: "250px" }} onChange={(e)=>{
                            setquery(e.target.value)
                            setpage(1)
                              searchfilter(e.target.value)
                              setloading(true)
                            }} class="form-control me-2" type="search" placeholder="Search By Name" aria-label="Search" />
                       
                          </form>
                          <button className='extra-add-btn ms-2' onClick={show}>Add Skills</button >
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

           
            {!skills.length? (<>
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
                              Skills
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
                            skills.map((curEle, i) => {
                              const { id, skill } = curEle
                              // console.log(rating);

                              return (
                                <tr id="tableRow" key={i}>
                                  
                                  <td className="checkbox-select">
                                    {(page - 1) * 10 + i + 1}
                                  </td>
                                
                                  <td className="checkbox-select">
                                    
                                    {skill?.slice(0,1).toUpperCase() + skill?.slice(1,25)}

                                  </td>
                                  <td className="akign-center nowrap">
                                    <div style={{ display: "flex" }}>
                                      <button id={id
                                      }
                                        onClick={(e) => {
                                          setid(e.target.id)
                                          skillSingle_fetch(e.target.id)
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
                              Add Skills
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form onSubmit={skillscreate}>
                              <input id='Footerlinks1' value={addskills} placeholder="Enter New Skills" onChange={(e) => { setaddskills(e.target.value) 
                              
                              setskillsErrdisplay("none")
                              }} type="text" />
                              <label htmlFor="" className={skillsErrdisplay}>Required</label>
                              <button id='Footerlinks2' type='submit'>{skillcreateloading ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              /> : "Add"}</button>
                            </form>

                          </Modal.Body>

                        </Modal>

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
                              Skills Details
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form onSubmit={skill_edit}>
                            
                              <input hidden id='Footerlinks1' type="text" value={skill_id} readOnly />
                              <label id='labelsinmodal'>Skills</label>
                              <input id='Footerlinks1' type="text" value={editskill_name} onChange={(e) => {
                                seteditskill_name(e.target.value)
                                setskillsErrdisplay("none")
                              }
                              } placeholder="Enter Skill" />
                        
                           
                              <label htmlFor="" className={skillsErrdisplay}>Required</label>
                              <button id='Footerlinks2' type="submit">{skillupdateloading ? <Spinner
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
                              Are you sure you want to delete this Skill ?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => skilldelete(id)}>Ok</Button>
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

export default Skills