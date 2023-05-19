import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { Pagination, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { ImUpload2 } from 'react-icons/im'
import { baseurl } from '../../Baseurl'
import { MdKeyboardBackspace } from 'react-icons/md'

const VisualizationDesgins = () => {

    const location = useLocation()
    const {pid}=useParams()
    const navigate = useNavigate()
    const querypage = new URLSearchParams(location.search)
    const [maindata, setMainData] = useState([])
    const localClients = JSON.parse(localStorage.getItem("adminLogin"))
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(querypage.get('page')?parseInt(querypage.get('page')):1)
    const [counts, setcounts] = useState("")
    const [id, setid] = useState(Number)
    const [proid, setproid] = useState(Number)
    const [subid, setsubid] = useState(Number)
    const [projno, setprojno] = useState(Number)
    const [open, setOpen] = useState(false);
    const [temp, settemp] = useState(true)
    const [editprofessionalName, seteditprofessionalName] = useState("")
    const [editcategoryName, seteditcategoryName] = useState("")
    const [editimage, seteditimage] = useState("")
    const [editprice, seteditprice] = useState("")
    const [modalshow, setmodalshow] = useState(false)
    const [imgprview, setimgprview] = useState("")
    const [pronameErr, setpronameErr] = useState("none")
    const [catenameErr, setcatenameErr] = useState("none")
    const [imgErr, setimgErr] = useState("none")
    
    const [vidpreview, setvidpreview] = useState("")
    const [editvid, seteditvid] = useState("")
    const [editloading, seteditloading] = useState(false)
    const [editproid, seteditproid] = useState("")
    const [editcateid, seteditcateid] = useState("")
    const [editsubcateid, seteditsubcateid] = useState("")
    const [editprojectno, seteditprojectno] = useState("")
    const [query, setquery] = useState("")
    const handleClickOpen = (professional_id, category, project_no, sub_category) => {
      setprojno(project_no)
      setsubid(sub_category)
      setproid(professional_id)
      setid(category)
      setOpen(true);
    };
    const sendpageinquery = (val) => {
      navigate({
        pathname: '/dashboard/visulization',
        search: `?page=${val}`
      })
    }
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleclosemodal = () => {
      setmodalshow(false)
      setimgprview("")
      setvidpreview("")
    }
    const single_fetch = async (id, subid, project_no) => {
      const { data } = await axios.post(`${baseurl}/admin/professional/visulization_designs_single_fetch/`, { ...localClients, professional_id: id, sub_category_id: subid, project_no: project_no })
      if (data.status = "Success") {
        console.log('status:', data);
        seteditcategoryName(data.data[0].sub_category_name)
        seteditprofessionalName(data.data[0].professional_name)
        seteditprice(data.data[0].price)
        seteditimage(data.data[0].image)
        seteditvid(data.data[0].video)
        seteditproid(data.data[0].professional_id)
        seteditcateid(data.data[0].category)
        seteditsubcateid(data.data[0].sub_category)
        seteditprojectno(data.data[0].project_no)
      }
  
    }
  
    const deletevisualization = async (cateid, sub_cat_id, project_no, pid) => {
      console.log(pid);
      const { data } = await axios.post(`${baseurl}/admin/professional/visualization-designs/delete/`, {
        ...localClients, cat_id: cateid,
        sub_cat_id: sub_cat_id
        , project_no: project_no,
        professional_id: pid
      })
      if (data.status === 'Success') {
        setOpen(false)
        settemp(false)
      }
    }
  
    const visulization = async () => {
      const { data } = await axios.post(`${baseurl}/admin/professional/visulization_design_all_project_fetch/`, { ...localClients,professional_id:pid ,page: page, page_size: 10 })
      if (data.status = "Success") {
        console.log('status:');
  
        setloading(false)
        setMainData(data.data.final_data)
        setcounts(Math.ceil(data.data.total_data / 10))
      }
  
      console.log(data)
    }
  
    useEffect(() => {
      if (!query) {
        visulization()
        settemp(true)
      }
    }, [page, temp])
  
    const updatevisualization = async (e) => {
      e.preventDefault()
      seteditloading(true)
      const formdata = new FormData()
      formdata.set('admin_id', localClients.admin_id)
      formdata.set('admin_token', localClients.admin_token)
      formdata.set("professional_id", editproid)
      formdata.set("category_id", editcateid)
      formdata.set("image", editimage)
      formdata.set("price", editprice)
      formdata.set("sub_category_id", editsubcateid)
      formdata.set("index_no", editprojectno)
      formdata.set("video", editvid)
      const { data } = await axios.post(`${baseurl}/admin/professional/update_visulization_design/`, formdata)
      if (data.status === 'Success') {
        seteditloading(false)
        settemp(false)
        setmodalshow(false)
        setimgprview("")
      }
    }
  
    const searchfilter = async (query) => {
      setloading(true)
      const { data } = await axios.post(`${baseurl}/admin/professional/search_visulizationDesign/`, {
        ...localClients, purpose: "search", query: query, page: page, page_size: 10
      })
      if (data.status === 'Success') {
        console.log(data);
        setloading(false)
        setMainData(data.data.final_data)
        setcounts(Math.ceil(data.data.total_data / 10))
      } else {
        setloading(false)
        setMainData([])
        setcounts(0)
      }
    }
  
    useEffect(() => {
      if (query) {
        searchfilter(query)
        settemp(true)
      }
    }, [page, temp])

  return (
    <>
    <div className="content border-bottom mb-2">
      <div className="container-fluid">
        <div className="row">
          <div id="testkar" className="col-12 col-md-auto d-flex flex-grow-1 align-items-center heading-me-outer search">
          < MdKeyboardBackspace size={30} cursor="pointer" onClick={()=>{
                      navigate(-1)
                    }}/>
           
            <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
              Visualization Designs
            </h1>

            <div>

              {/* <div>

                <input style={{ width: "250px" }} class="form-control me-2" type="search" onChange={(e) => {
                  // searchfilter(e.target.value)
                  // setpage(1)
                  // setquery(e.target.value)
                }} placeholder="Search By Name" aria-label="Search" />

              </div> */}
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

      {!maindata.length ? (<>
           <Typography id='nodatafound'>No Data Found</Typography>
         </>):
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
                          className="sortin"
                          tabindex="0"
                          rowspan="1"
                          colspan="1"
                        >
                          S.No
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
                          Sub Category Name
                        </th>
                        <th
                          className="sortin"
                          tabindex="0"
                          rowspan="1"
                          colspan="1"
                        >
                          Image
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
                          Price($)
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
                        maindata.map((curEle, i) => {
                          console.log(curEle);
                          const { id
                            , professional_name
                            , sub_category_name, professional_id, project_no, category, sub_category
                            , image, video,
                            price
                          } = curEle;

                          return (
                            <tr key={i}>

                              {/* `/dashboard/clients/${id}`  */}
                              <td className="field-id">
                                {(page - 1) * 10 + i + 1}
                              </td>

                              <td className="field-room nowrap">
                              {professional_name.slice(0,1).toUpperCase() + professional_name.slice(1,25)}

                            
                              </td>
                              <td className="field-created_at nowrap">
                              {sub_category_name.slice(0,1).toUpperCase() + sub_category_name.slice(1,25)}

                        
                              </td>
                              <td className="field-message">
                                <img id='archi_image' src={image} />

                              </td>
                              <td>
                                {video === undefined ? <Typography>Video Not Required</Typography> :
                                  <ReactPlayer url={video} playIcon controls width={150} height={100} />}
                              </td>


                              <td className="field-message">
                                {price}
                              </td>
                              <td className="akign-center nowrap">
                                <div style={{ display: "flex" }}>
                                  <button onClick={(e) => {
                                    setmodalshow(true)

                                    single_fetch(professional_id, sub_category, project_no)
                                  }}
                                  >
                                    <i class="fa-regular fa-pen-to-square" id={id}></i>
                                  </button>
                                  <button
                                    style={{ marginLeft: "10px" }} professional_idprofessional_id

                                    onClick={(e) => {

                                      handleClickOpen(professional_id, category, project_no, sub_category)
                                    }}
                                  >
                                    <i class={`fa-solid fa-trash `}  ></i>
                                  </button>
                                </div>



                              </td>

                            </tr>
                          )
                        })
                      }
                    </table>

                    <Modal
                      show={modalshow}
                      className="add_subcategories_details_modal "
                      onHide={handleclosemodal}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                          Visualization Details
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form onSubmit={updatevisualization}>

                          <div className="architectural-select">
                            <div className="architectural-select-one">
                              <label id='labelsinmodal'>Professional Name</label>
                              <input disabled type="text" name='media_name' value={editprofessionalName} onChange={(e) => {
                                setpronameErr("none")
                                seteditprofessionalName(e.target.value)
                              }} placeholder='Enter Social media Name' />
                              <span className={pronameErr} style={{ color: "red" }}>media_name required</span>
                            </div>



                            <div className="architectural-select-to">
                              <label id='labelsinmodal'>Catogry Name</label>
                              <input disabled type="text" placeholder='Enter Link here' value={editcategoryName} name='media_link' onChange={(e) => {
                                seteditcategoryName(e.target.value)
                                setcatenameErr('none')
                              }} />
                              <span className={catenameErr} style={{ color: "red" }}>media_link required</span>
                            </div>

                            <div className="architectural-select-to">
                              <label id='labelsinmodal'>Price($)</label>
                              <input type="Number" placeholder='Enter Link here' value={editprice} name='media_link' onChange={(e) => {
                                seteditprice(e.target.value)
                              
                              }} />
                              <span className={catenameErr} style={{ color: "red" }}>media_link required</span>
                            </div>
                          </div>


                          <div className="filecont">
                            <div className="social_media_upload">

                              <img style={{ width: "30%" }} src={imgprview ? imgprview : editimage} alt="inactive icon" />
                              <label htmlFor='Inactive-iocn'><ImUpload2 size={40} />Upload Media Icon</label>
                              <span className={imgErr} style={{ color: "red" }}>media_icon required</span>

                              <input type="file" name='media_icon' onChange={(e) => {
                                seteditimage(e.target.files[0])
                                setimgErr('none')
                                let prev = URL.createObjectURL(e.target.files[0])
                                setimgprview(prev)



                              }} id='Inactive-iocn' hidden />

                            </div>

                            <div className="social_media_upload">

                              {editvid === undefined ? <Typography>Video Not Required</Typography> : <>
                                <ReactPlayer url={vidpreview ? vidpreview : editvid} playIcon controls width={150} height={100} />
                                <label id='lbl' htmlFor='video'><ImUpload2 size={40} />Upload Video</label> </>}
                              <span className={imgErr} style={{ color: "red" }}>Video required</span>

                              <input type="file" onChange={(e) => {
                                console.log("suraj");
                                seteditvid(e.target.files[0])
                              
                                let prev = URL.createObjectURL(e.target.files[0])
                                console.log(prev);
                                setvidpreview(prev)

                              }} id='video' hidden />
                            </div>
                          </div>

                          <button type='submit' className="extra-add-btn w-100 mt-2"
                          >{editloading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          /> : "Update"}</button>
                        </form>
                      </Modal.Body>
                    </Modal>

                    {/*delete confirmation */}

                    <Dialog
                      open={open}
                      // TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{"Confirmation for delete client"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          Are you sure you want to delete this user ?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>cancel</Button>
                        <Button onClick={() => deletevisualization(id, subid, projno, proid)}>ok</Button>
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
      </>}
      </>
    }
  </>
  )
}

export default VisualizationDesgins