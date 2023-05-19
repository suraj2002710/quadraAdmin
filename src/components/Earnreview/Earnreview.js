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
import { ImUpload2 } from 'react-icons/im';
const Earnreview = () => {

    const history = createBrowserHistory()
    const cookie = new Cookies()
    const location = useLocation()
    const querypage = new URLSearchParams(location.search)
    const token = cookie.get('token')
    const [editmodalShow, seteditmodalShow] = useState(false)
    const [page, setpage] = useState(querypage.get('page') ? parseInt(querypage.get('page')) : 1)
    const [counts, setcounts] = useState(0)
    const [id, setid] = useState(null)
    const [earnreviews, setearnreviews] = useState([])
    const localClients = JSON.parse(localStorage.getItem("adminLogin"))
    const [addmodalShow, setaddmodalShow] = useState(false)
    const [addearnreviewsQuot, setaddearnreviewsQuot] = useState("")
    const [addearnreviewsImage, setaddearnreviewsImage] = useState("")
    const [loading, setloading] = useState(true)
    const [temp, settemp] = useState(true)

    const [editearnreviewImages, seteditearnreviewimages] = useState("")
    const [imgpreview, setimgpreview] = useState("")
    const [editearnreviewQuot, seteditearnreviewQuot] = useState("")
    const [earnreview_id, setearnreview_id] = useState("")
    const [earnreviewcreateloading, setearnreviewcreateloading] = useState(false)
    const [earnreviewupdateloading, setearnreviewupdateloading] = useState(false)
    const [open, setOpen] = useState(false);
    const [query, setquery] = useState("")
    const [earnreviewsErrdisplay, setearnreviewsErrdisplay] = useState("none")
    const navigate = useNavigate()
    const getearnreviews = async () => {
        setloading(true)
        const res = await axios.post(`${baseurl}/admin/earner_review_fetch/`, {
            ...localClients, page: page, page_size: 10
        });
        console.log(res);
        if (res.data.status === "Success") {
            setloading(false)
            let data = res.data
            setearnreviews(data.data)
            setcounts(Math.ceil(data.data.total_data / 10))
        }
        else {
            console.log("suraj");
            setearnreviews([])
            setloading(false)
        }
    }
    const earnreviewscreate = async (e) => {
        e.preventDefault()
        if (!addearnreviewsQuot) {
            setearnreviewsErrdisplay("block")
        } else if (!addearnreviewsQuot) {
            return false
        } else {
            setearnreviewcreateloading(true)


            const formdata = new FormData()
            formdata.set("admin_id", localClients.admin_id)
            formdata.set("admin_token", localClients.admin_token)
            formdata.set("quote", addearnreviewsQuot)
            formdata.set("image", addearnreviewsImage)

            const res = await axios.post(`${baseurl}/admin/earner_review_add_update/`, formdata);

            console.log(res);
            if (res.data.status === "Success") {
                console.log("suraj");
                setearnreviewcreateloading(false)
                setaddearnreviewsQuot(null)
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
    const earnreviewdelete = async (id) => {

        const res = await axios.post(`${baseurl}/admin/earner_review_delete/`, {
            ...localClients, id: id
        });
        console.log(res);
        if (res.data.status === "Success") {
            // settemp("temp")
            getearnreviews()
            setOpen(false)
        }
    }
    useEffect(() => {
        if (!query) {
            getearnreviews()
            settemp(true)
        }
    }, [page, temp])

    const show = () => setaddmodalShow(true)
    const handleclose = () => {
        setaddearnreviewsQuot(null)
        setearnreviewcreateloading(false)
        setearnreviewsErrdisplay("none")
        setaddmodalShow(false);
        setimgpreview("")
        setaddearnreviewsQuot("")
    }

    const handlecloseEdit = () => {
        setearnreviewupdateloading(false)
        seteditmodalShow(false)
        setearnreview_id("")
        setimgpreview("")
        seteditearnreviewimages("")
        seteditearnreviewQuot("")
    }
    useEffect(() => {
        if (!token) {
            history.push("/")
            navigate("/")
        }
    }, [])

    const sendpageinquery = (val) => {
        navigate({
            pathname: '/dashboard/earnreviews',
            search: `?page=${val}`
        })
    }


    const earnreviewSingle_fetch = async (id) => {
        const { data } = await axios.put(`${baseurl}/admin/earner_review_fetch/`, {
            ...localClients, id: id
        })
        console.log(data);
        if (data.status === "Success") {
            setearnreview_id(data.data.id)
            seteditearnreviewQuot(data.data.quote)
            seteditearnreviewimages(data.data.image)
        }
    }

    const earnreview_edit = async (e) => {
        e.preventDefault()
        if (editearnreviewQuot === "") {
            setearnreviewsErrdisplay("block")
        }
        else {

            setearnreviewupdateloading(true)

            const formdata = new FormData()
            formdata.set("admin_id", localClients.admin_id)
            formdata.set("admin_token", localClients.admin_token)
            formdata.set("quote", editearnreviewQuot)
            formdata.set("image", editearnreviewImages)
            formdata.set("id", earnreview_id)
            const { data } = await axios.post(`${baseurl}/admin/earner_review_add_update/`, formdata)
            console.log(data);
            if (data.status === "Success") {
                seteditmodalShow(false)
                setearnreviewupdateloading(false)
                setearnreview_id("")

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
                                earnreviews
                            </h1>

                            <div className="ms-auto">

                                <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                                    <div class="container-fluid">

                                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                        <div class="collapse navbar-collapse" id="navbarSupportedContent">

                                            {/* <form class="d-flex" role="search">
                                                <input style={{ width: "250px" }} onChange={(e) => {
                                                    setquery(e.target.value)
                                                    setpage(1)
                                                    searchfilter(e.target.value)
                                                    setloading(true)
                                                }} class="form-control me-2" type="search" placeholder="Search By Name" aria-label="Search" />

                                            </form> */}
                                            <button className='extra-add-btn ms-2' onClick={show}>Add Earnreviews</button >
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


                        {!earnreviews.length ? (<>
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
                                                                earnreviews
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
                                                            earnreviews.map((curEle, i) => {
                                                                const { created_at, image, quote, id } = curEle
                                                                // console.log(rating);

                                                                return (
                                                                    <tr id="tableRow" key={i}>

                                                                        <td className="checkbox-select">
                                                                            {(page - 1) * 10 + i + 1}
                                                                        </td>

                                                                        <td className="checkbox-select">

                                                                            {quote?.slice(0, 1).toUpperCase() + quote?.slice(1, 25)}

                                                                        </td>


                                                                        <td>
                                                                            <div style={{ width: "100px", height: '100px' }}>
                                                                                <img src={image} alt='img' style={{ borderRadius: "50%", height: "100%", aspectRatio: "3/3" }} />
                                                                            </div>
                                                                        </td>
                                                                        <td className="akign-center nowrap">
                                                                            <div style={{ display: "flex" }}>
                                                                                <button id={id
                                                                                }
                                                                                    onClick={(e) => {
                                                                                        setid(e.target.id)
                                                                                        earnreviewSingle_fetch(e.target.id)
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
                                                    >
                                                        <Modal.Header closeButton>
                                                            <Modal.Title id="contained-modal-title-vcenter">
                                                                earnreviews Details
                                                            </Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <form onSubmit={earnreview_edit}>

                                                                <input hidden id='Footerlinks1' type="text" value={earnreview_id} readOnly />
                                                                <label id='labelsinmodal'>Enter Quote</label>
                                                                <input id='Footerlinks1' type="text" value={editearnreviewQuot} onChange={(e) => {
                                                                    seteditearnreviewQuot(e.target.value)
                                                                    setearnreviewsErrdisplay("none")
                                                                }
                                                                } placeholder="Enter earnreview" />

                                                                <label htmlFor="" className={earnreviewsErrdisplay}>Required</label>


                                                                <label id='labelsinmodal' style={{marginTop:"10px"}}>Enter Image</label>

                                                                <div style={{ width: "100px", height: '100px',margin:"auto" }}>
                                                                    <img style={{ borderRadius: "50%", height: "100%", aspectRatio: "3/3" }} src={imgpreview ? imgpreview : editearnreviewImages} alt="img" /> </div>
                                                                <div>

                                                                    <input type="file" hidden name="" id="vid" onChange={(e) => {
                                                                        seteditearnreviewimages(e.target.files[0])
                                                                        setimgpreview(URL.createObjectURL(e.target.files[0]))
                                                                    }} />

                                                                    <label htmlFor='vid' className='vides'><ImUpload2 size={40} />Upload Data</label>

                                                                </div>


                                                                <button id='Footerlinks2' type="submit">{earnreviewupdateloading ? <Spinner
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
                                                                Are you sure you want to delete this earnreview ?
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleClose}>Cancel</Button>
                                                            <Button onClick={() => earnreviewdelete(id)}>Ok</Button>
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
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add earnreviews
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={earnreviewscreate}>
                        <label id='labelsinmodal'>Enter Quote</label>
                        <input id='Footerlinks1' value={addearnreviewsQuot} placeholder="Enter New earnreviews" onChange={(e) => {
                            setaddearnreviewsQuot(e.target.value)

                            setearnreviewsErrdisplay("none")
                        }} type="text" />
 <label id='labelsinmodal' style={{marginTop:"10px"}}>Enter Image</label>
                        {imgpreview ? <div style={{ width: "100px", height: '100px',margin:"auto" }}>
                            <img src={imgpreview} alt='img' style={{ borderRadius: "50%", height: "100%", aspectRatio: "3/3" }} />
                        </div> : ""}

                        <div>
                           
                            <input type="file" hidden name="" id="vid" onChange={(e) => {
                                setaddearnreviewsImage(e.target.files[0])
                                setimgpreview(URL.createObjectURL(e.target.files[0]))
                            }} />

                            <label htmlFor='vid' className='vides'><ImUpload2 size={40} />Upload Data</label>
                        </div>
                        <label htmlFor="" className={earnreviewsErrdisplay}>Required</label>
                        <button id='Footerlinks2' type='submit'>{earnreviewcreateloading ? <Spinner
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

export default Earnreview