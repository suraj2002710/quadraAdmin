import {useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Pagination, Typography } from '@mui/material';
import axios from "axios"

import { Modal, Spinner } from 'react-bootstrap';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import { MultiSelect } from 'react-multi-select-component';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { baseurl } from '../../../Baseurl'

const Category = () => {
  const history = createBrowserHistory()
  const cookie = new Cookies()
  const token = cookie.get('token')
  const location = useLocation()
  const querypage = new URLSearchParams(location.search)

  const [professionalid, setprofessionalid] = useState("")
  const [modalShow, setModalShow] = useState(false)
  const [professioanl_name, setprofessioanl_name] = useState("")
  const [architechture, setarchitechture] = useState([])
  const [visulization, setvisulization] = useState([])
  const [buysale, setbuysale] = useState([])
  let lblvalue_archi = []
  let lblvalue_visual = []
  let lblvalue_buysale = []
  const [archiselect, setarchiselect] = useState([])
  const [vsualselect, setvsualselect] = useState([])
  const [buysaleselect, setbuysaleselect] = useState([])
  const [category, setcategory] = useState([])
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))
  const [loading, setloading] = useState(true)
  const [counts, setcounts] = useState(0)
  const [archi_Id, setarchi_Id] = useState([])
  const [visual_Id, setvisual_Id] = useState([])
  const [buysale_Id, setbuysale_Id] = useState([])
  const [submitloading, setsubmitloading] = useState(false)
  const [temp, settemp] = useState(true)
  const [open, setOpen] = useState(false);
  const [client_id, setclient_id] = useState("")

  const [page, setpage] = useState(querypage.get('page') ? parseInt(querypage.get('page')) : 1)
  const navigate = useNavigate()
  const [query, setquery] = useState("")
  const getProfessional = async () => {
    setloading(true)
    const res = await axios.post(`${baseurl}/admin/professioanl/selected_category/`, {
      ...localClients, page: page, page_size: 10
    });

    if (res.data.status === "Success") {
      setloading(false)
      let data = res.data
      setcategory(data.data.final_data)
      console.log("clist", data.data.total_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    }
  }

  const sendpageinquery = (val) => {
    navigate({
      pathname: '/dashboard/professionals/category',
      search: `?page=${val}`
    })
  }

  const searchfileter = async (query) => {
    const { data } = await axios.post(`${baseurl}/admin/professional/search_sel_sub_categories/`, {
      ...localClients, purpose: "search", query: query, page: page, page_size: 10
    })
    if (data.status === 'Success') {
      console.log(data);
      setcategory(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
      setloading(false)
    } else {
      setcategory([])
      setcounts(0)
      setloading(false)
    }
  }

  useEffect(() => {
    if (query==="") {
      setpage(querypage.get('page')!==null?parseInt(querypage.get('page')):1)
      getProfessional()
      settemp(true)
    }
  }, [page,query, temp])
  useEffect(() => {
    if (!token) {
      history.push("/")
      navigate("/")
    }
  }, [])
  const getSingleProfessional = async (id) => {
    const res = await axios.put(`${baseurl}/admin/professioanl/selected_category/`, {
      ...localClients, professional_id: id
    });
    let data = res.data
    setprofessionalid(id)
    console.log(data);
    if (data.status === "Success") {
      console.log(data?.data[0]?.sel_sub_cat);
      let obj = []
      data?.data[0]?.sel_sub_cat[0]?.architectural && data?.data[0]?.sel_sub_cat[0]?.architectural.forEach((it) => {
        console.log(it);
        obj.push(it.subcat_id)
        lblvalue_archi.push({ label: it.subcat_name, value: it.subcat_id })
      })
      setarchi_Id(obj)
      setarchiselect(lblvalue_archi)
      let obj1 = []
      data?.data[0]?.sel_sub_cat[1]?.visulization && data?.data[0]?.sel_sub_cat[1]?.visulization.forEach((it) => {
        obj1.push(it.subcat_id)
        lblvalue_visual.push({ label: it.subcat_name, value: it.subcat_id })
      })
      setvisual_Id(obj1)
      setvsualselect(lblvalue_visual)
      let obj2 = []
      data?.data[0]?.sel_sub_cat[2]?.buysale && data?.data[0]?.sel_sub_cat[2]?.buysale.forEach((it) => {
        obj2.push(it.subcat_id)
        lblvalue_buysale.push({ label: it.subcat_name, value: it.subcat_id })
      })
      setbuysale_Id(obj2)
      setbuysaleselect(lblvalue_buysale)
      setprofessioanl_name(data?.data[0]?.professional_name)
    }
  }
  const getachitechrul = async () => {
    const res = await axios.post(`${baseurl}/admin/sub_categories_table/`, {
      ...localClients, category_id: 1
    });

    let data = res.data
    if (data.status === "Success") {
      console.log(data);
      setarchitechture(data.data)
    }
  }
  const getvisulization = async () => {
    const res = await axios.post(`${baseurl}/admin/sub_categories_table/`, {
      ...localClients, category_id: 2
    });

    let data = res.data
    if (data.status === "Success") {

      setvisulization(data.data)
    }
    // setclientname(data?.data[0]?.client_name)
    // setcategory(data?.data[0]?.sel_sub_cat)
  }
  const getbuysale = async () => {
    const res = await axios.post(`${baseurl}/admin/sub_categories_table/`, {
      ...localClients, category_id: 3
    });

    let data = res.data
    if (data.status === "Success") {

      setbuysale(data.data)
    }
    // setclientname(data?.data[0]?.client_name)
    // setcategory(data?.data[0]?.sel_sub_cat)
  }


  const handleClickOpen = (id) => {
    console.log("suraj")
    setclient_id(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const deletecategory = async () => {
    const { data } = await axios.post(`${baseurl}/admin/professional/delete_selected_sub_category/`, {
      ...localClients, professional_id: client_id
    })
    if (data.status === "Success") {
      setOpen(false)
      setclient_id("")
      settemp(false)
    }
  }



  useEffect(() => {
    getachitechrul()
    getvisulization()
    getbuysale()
  }, [])

  let archoption = []
  architechture && architechture.forEach((it) => {
    let obj = { label: it.sub_category, value: it.id }
    archoption.push(obj)
  })
  let visualoption = []
  visulization && visulization.forEach((it) => {
    let obj = { label: it.sub_category, value: it.id }
    visualoption.push(obj)
  })
  let buysaleoption = []
  buysale && buysale.forEach((it) => {
    let obj = { label: it.sub_category, value: it.id }
    buysaleoption.push(obj)
  })
  //codes for getting sub category

  const datasubmit = async (e) => {
    e.preventDefault()
    setsubmitloading(true)
    console.log(archi_Id, visual_Id, buysale_Id);
    const { data } = await axios.post(`${baseurl}/admin/professional/update/selected_category/`, {
      ...localClients, professional_id: professionalid, sel_sub_cat: {
        1: [...archi_Id], 2: [...visual_Id], 3: [...buysale_Id]
      }, category: { cat_id: [1, 2, 3] }
    })
    if (data.status === 'Success') {
      setsubmitloading(false)
      settemp(false)
      setModalShow(false)
    }
  }

  useEffect(() => {
    if (query) {
      searchfileter(query)
      settemp(true)
    }
  }, [page, temp])




  return (
    <>
      <div className="content border-bottom mb-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-auto d-flex flex-grow-1 align-items-center heading-me-outer search">
              <h1 id='professionalss' className="h4  pr-3 mr-3 border-right heading-me">
                Professional Selected Categories
              </h1>
              <div >
                <input style={{ width: "250px" }} class="form-control me-2" type="search" onChange={(e) => {
                if(e.target.value){   searchfileter(e.target.value)}
                  setpage(1)
                  setquery(e.target.value)
                  setloading(true)
                }} placeholder="Search By Name" aria-label="Search" />
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

        </div>
        :(
          <>


          {!category.length ? (<>
            <Typography id='nodatafound'>No Data Found</Typography>
          </>):

       

          <div id='Contentdata' className="content">
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
                            className="sorting_asc"
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
                            Architectural
                          </th>
                          <th
                            className="sortin"
                            tabindex="0"
                            rowspan="1"
                            colspan="1"
                          >
                            Visulization
                          </th>

                          <th
                            className="sortin"
                            tabindex="0"
                            rowspan="1"
                            colspan="1"
                          >
                            Buysale
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
                          category.map((curEle, i) => {
                            const { id, professional_id, professional_name, selected_category, sel_sub_cat, total_data } = curEle;
                            // console.log(curEle);
                            return (
                              <tr key={i}>

                                <td className="field-id">{(page - 1) * 10 + i + 1}</td>
                                <td className="field-id">
                                  {/* {professional_name.slice(0, 1).toUpperCase() + professional_name.slice(1, 25)} */}
                                  {
                                  professional_name.split(" ").map((word)=>{
                                      return (
                                      <>
                                      
                                      {" "}  {word.slice(0,1).toUpperCase() + word.slice(1,25)}</>
                                  )})
                                  
                                 }
                                </td>

                                {/* <td className="field-created_at nowrap">
                                  <ul className='d-flex align-items-center justify-content-around mb-0'>
                                    {selected_category && selected_category.map((it) => {
                                      return (

                                        ""
                                        // <li>{it.slice(0,1).toUpperCase()+it.slice(1,20)}</li>


                                      )
                                    })}
                                  </ul>
                                </td> */}


                                <td id='fieldmassages'>
                                  {
                                    Object.values(sel_sub_cat[0]).map((val) => {
                                      console.log(val);
                                      return (
                                        <>
                                          <div className=''>
                                            <select>
                                              {val.map((its) => {
                                                return (
                                                  <>
                                                    <option>{its}</option>

                                                  </>)

                                              })}


                                            </select>


                                          </div>
                                        </>
                                      )
                                    })
                                  }

                                </td>

                                <td id='fieldmassages'>
                                  {
                                    Object.values(sel_sub_cat[1]).map((val) => {
                                      console.log(val);
                                      return (
                                        <>
                                          <div className=''>
                                            <select>
                                              {val.map((its) => {
                                                return (
                                                  <>
                                                    <option>{its}</option>

                                                  </>)

                                              })}


                                            </select>


                                          </div>
                                        </>
                                      )
                                    })
                                  }

                                </td>

                                <td id='fieldmassages'>
                                  {
                                    Object.values(sel_sub_cat[2]).map((val) => {
                                      console.log(val);
                                      return (
                                        <>
                                          <div className=''>
                                            <select>
                                              {val.map((its) => {
                                                return (
                                                  <>
                                                    <option>{its}</option>

                                                  </>)

                                              })}


                                            </select>


                                          </div>
                                        </>
                                      )
                                    })
                                  }

                                </td>




                                <td className="akign-center nowrap">

                                  <div style={{ display: "flex" }}>
                                    <button id={professional_id
                                    }


                                      onClick={(e) => {

                                        getSingleProfessional(e.target.id)
                                        setModalShow(true)
                                      }}
                                    >
                                      <i class="fa-solid fa-pen-to-square" id={professional_id
                                      }></i>
                                    </button>
                                    <button onClick={() => {
                                      handleClickOpen(professional_id)
                                    }}>
                                      <i class="fa-solid fa-trash" ></i>
                                    </button>
                                  </div>

                                </td>

                              </tr>
                            )
                          })
                        }

                      </table>

                      <Modal
                        show={modalShow}
                        className="rating_detail_modal"
                        onHide={() => setModalShow(false)}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        backdrop="static"
                        keyboard={false}

                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title-vcenter">
                            Update Category
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                          <div className="container">
                            <form onSubmit={datasubmit}>
                              <label id='labelsinmodal'>Professional Name</label>
                              <input disabled type="text" value={professioanl_name} placeholder='Enter name' />

                              <label id='labelsinmodal'>Architectural</label>
                              <MultiSelect

                                options={archoption}
                                value={archiselect}
                                onChange={(val) => {
                                  setarchiselect(val)
                                  console.log((val));
                                  let obj = []
                                  val.map(((vl) => {
                                    obj.push(vl.value)
                                  }))
                                  setarchi_Id(obj)

                                }}
                                labelledBy="Select"
                              />
                              <label id='labelsinmodal'>Visulization</label>
                              <MultiSelect
                                options={visualoption}
                                value={vsualselect}
                                onChange={(val) => {
                                  console.log((val));
                                  setvsualselect(val)
                                  let obj = []
                                  val.map(((vl) => {
                                    obj.push(vl.value)
                                  }))
                                  setvisual_Id(obj)
                                }}
                                labelledBy="Select"
                              />
                              <label id='labelsinmodal'>Buysale</label>
                              <MultiSelect
                                options={buysaleoption}
                                value={buysaleselect}
                                onChange={(val) => {
                                  console.log((val));
                                  setbuysaleselect(val)
                                  let obj = []
                                  val.map(((vl) => {
                                    obj.push(vl.value)
                                  }))
                                  setbuysale_Id(obj)
                                }}
                                labelledBy="Select"
                              />

                              <button type='submit'>{submitloading ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              /> : "Update"}</button>
                            </form>

                          </div>
                        </Modal.Body>
                      </Modal>

                      <Dialog
                        open={open}
                        // TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to delete this Sub Category ?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={() => deletecategory(client_id)}>Ok</Button>
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

export default Category
