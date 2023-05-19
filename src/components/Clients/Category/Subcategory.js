import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import axios from "axios"


import { Pagination } from '@mui/material';
import { Modal, Spinner } from 'react-bootstrap';
import { ImUpload2 } from 'react-icons/im';
import { Formik } from 'formik';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { GiCancel } from 'react-icons/gi'
import avtar from '../../../images/avtar.png'
import { baseurl } from '../../../Baseurl'

const Subcategory = () => {
    const history = createBrowserHistory()
    const cookie = new Cookies()
    const location = useLocation()
    const querypage = new URLSearchParams(location.search)
    const token = cookie.get('token')
    const activeiconRef = useRef()
    const inactiveiconRef = useRef()
    const [id, setid] = useState(null)
    const [editid, seteditid] = useState(null)
    const [category, setcategory] = useState([])
    const localClients = JSON.parse(localStorage.getItem("adminLogin"))
    const [page, setpage] = useState(querypage.get('page') ? parseInt(querypage.get('page')) : 1)
    const [loading, setloading] = useState(true)

    const [createloading, setcreateloading] = useState(false)
    const [counts, setcounts] = useState(0)
    const [activeicon, setactiveicon] = useState("")
    const [inactiveicon, setinactiveicon] = useState("")


    const [catenameErr, setcatenameErr] = useState('none')
    const [activiconErr, setactiviconErr] = useState('none')
    const [unactive_iconErr, setunactive_iconErr] = useState('none')
    const [selectcategoryErr, setselectcategoryErr] = useState('none')
    const [category_Ids, setcategory_Ids] = useState([])
    const [open, setOpen] = useState(false);
    const [editsubcategory, seteditsubcategory] = useState('')
    const [editactiveicon, seteditactiveicon] = useState('')
    const [editunactiveicon, seteditunactiveicon] = useState('')
    const [editcategory_id, seteditcategory_id] = useState("")
    const [editmodalShow, seteditmodalShow] = useState(false)
    const [role, setrole] = useState("")
    const navigate = useNavigate()
    const [temp, settemp] = useState(true)
    const getcategory = async () => {

        const res = await axios.post(`${baseurl}/admin/sub-categories/`, {
            ...localClients, page: page, page_size: 10
        });
        if (res.data.status === "Success") {
            setloading(false)
            let data = res.data
            console.log("clist", data.data.final_data)
            setcategory(data.data.final_data)
            setcounts(Math.ceil(data.data.total_data / 10))
        }
    }
    useEffect(() => {
        getcategory()
        settemp(true)
    }, [page, temp])
    let initialValues = {
        subcategory: "",
        activeicon: "",
        inactiveicon: "",
        categoryid: ""
    }
    useEffect(() => {
        if (!token) {
            history.push("/")
            navigate("/")
        }
    }, [])

    const singlesubcategory = async (id) => {
        const { data } = await axios.put(`${baseurl}/admin/sub-categories/`, {
            ...localClients, id: id
        })
        if (data.status === 'Success') {
            console.log("succuess");
            seteditid(data.data.id)

            seteditsubcategory(data.data.sub_category)
            setactiveicon(data.data.active_icon)
            setinactiveicon(data.data.unactive_icon)
            seteditcategory_id(data.data.category_id)
            seteditactiveicon(data.data.active_icon)
            seteditunactiveicon(data.data.unactive_icon)

        }
    }

    const fetchallMaincategorys = async () => {
        const { data } = await axios.post(`${baseurl}/admin/fetch_category/`, {
            ...localClients
        })
        if (data.status === 'Success') {
            console.log(data);
            setcategory_Ids(data.data)
        }
    }
    useEffect(() => {
        fetchallMaincategorys()
    }, [])

    const deletesubcategory = async (id) => {
        const { data } = await axios.put(`${baseurl}/admin/sub-categories/edit/`, {
            ...localClients, id
        })
        if (data.status === 'Success') {
            setOpen(false)
            settemp(false)
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sendpageinquery = (val) => {
        navigate({
            pathname: '/dashboard/subcategory',
            search: `?page=${val}`
        })
    }

    const handlecloseEdit = () => {
        seteditmodalShow(false);


        setactiveicon("")
        setinactiveicon("")
        setcatenameErr('none')
        setunactive_iconErr('none')
        setactiviconErr('none')
        setselectcategoryErr('none')
        setcreateloading(false)
    };
    const show = () => {
        seteditmodalShow(true)
        setrole('add')
    }
    const handleclose = () => {
        setactiveicon("")
        setinactiveicon("")



        setcreateloading(false)
        setcatenameErr('none')
        setunactive_iconErr('none')
        setactiviconErr('none')
        setselectcategoryErr('none')
    }

    const updatesubcatgory = async (e) => {
        e.preventDefault()
        if (!editsubcategory) {
            setcatenameErr(true)

        }
        if (!editactiveicon) {
            setactiviconErr(true)

        }
        if (!editunactiveicon) {
            setunactive_iconErr(true)

        }
        if (!editcategory_id) {
            setselectcategoryErr(true)

        }
        else if(!editsubcategory || !editactiveicon || !editunactiveicon  || !editcategory_id){
                return false
        }else{
        setcreateloading(true)
        const formdata = new FormData()
        formdata.set("admin_id", localClients.admin_id)
        formdata.set("admin_token", localClients.admin_token)
        formdata.set('sub_category', editsubcategory)
        formdata.set('active_icon', editactiveicon)
        formdata.set('unactive_icon', editunactiveicon)
        formdata.set('category_id', editcategory_id)
        formdata.set('sub_category_id', editid)
        // formdata.set('sub_category', editsubcategory)
        // formdata.set('sub_category', editsubcategory)
        const { data } = await axios.post(`${baseurl}/admin/update_sub_categories_table/`, formdata)
        if (data.status === 'Success') {
            setcreateloading(false)
            seteditmodalShow(false)
            settemp(false)
        }
    }
    }
    return (
        <>
            <div className="content border-bottom mb-2">
                <div className="container-fluid">
                    <div className="row">
                        <div id="testkar" className=" d-flex align-items-center heading-me-outer">
                            <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                                Subcategory
                            </h1>
                            <div className="ms-auto">

                                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                                    <div class="container-fluid">

                                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                        <div class="collapse navbar-collapse" id="navbarSupportedContent">

                                            {/* <form class="d-flex" role="search">
                                                <input style={{ width: "250px" }} class="form-control me-2" type="search" placeholder="Search By Name" aria-label="Search" />
                                                <button class="btn btn-outline-success" type="submit">Search</button>
                                            </form> */}
                                        </div>
                                    </div>
                                </nav>
                            </div>
                            <button className='extra-add-btn' onClick={show}>Add Subcategory</button >

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
                                    <div className="table-chat ">
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
                                                        Subcategory Name
                                                    </th>
                                                    <th
                                                        className="sortin"
                                                        tabindex="0"
                                                        rowspan="1"
                                                        colspan="1"
                                                    >
                                                        Active Icons
                                                    </th>
                                                    <th
                                                        className="sortin"
                                                        tabindex="0"
                                                        rowspan="1"
                                                        colspan="1"
                                                    >
                                                        UnActive Icons
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
                                                        const { id, sub_category, active_icon, unactive_icon } = curEle;
                                                        console.log(curEle);
                                                        return (
                                                            <tr key={i}>

                                                                <td className="field-id">
                                                                    {(page - 1) * 10 + i + 1}
                                                                </td>
                                                                <td className="field-id">
                                                                    {sub_category}
                                                                    {/* {sub_category.slice(0, 1).toUpperCase() + sub_category.slice(1, 25)} */}

                                                                </td>
                                                                <td className="field-id">

                                                                    <img id='archi_image2' src={active_icon} />

                                                                </td>
                                                                <td className="field-id">


                                                                    <img id='archi_image2' src={unactive_icon} />
                                                                </td>

                                                                <td className="akign-center nowrap">
                                                                    <div style={{ display: "flex" }}>
                                                                        <button id={id
                                                                        }
                                                                            onClick={(e) => {
                                                                                singlesubcategory(e.target.id)
                                                                                setrole("edit")
                                                                                seteditmodalShow(true)
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

                                                            </tr>
                                                        )
                                                    })
                                                }

                                            </table>



                                            {/* modal */}
                                            <Modal
                                                show={editmodalShow}
                                                className="add_subcategories_details_modal"
                                                onHide={handlecloseEdit}
                                                size="lg"
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title id="contained-modal-title-vcenter">
                                                        {role === "edit" ? "Update Subcategories Details" : "Add Subcategories Details"}
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    {role === 'edit' ?
                                                        <form onSubmit={updatesubcatgory}>
                                                            <div className='sub_categories_main'>

                                                                <div className='sub_categories_one'>
                                                                    <div className='sub_categories_details'>
                                                                        <img src={activeicon ? activeicon : avtar} alt="active icon" />
                                                                        <GiCancel onClick={() => {

                                                                            setactiveicon("")
                                                                            seteditactiveicon("")
                                                                            activeiconRef.current.value = null
                                                                        }} />
                                                                    </div>
                                                                    <label htmlFor='active-iocn'><ImUpload2 size={40} />Upload Actice Icon</label>
                                                                    {activiconErr?
                                                                    <span className={activiconErr} style={{ color: "red" }}>Active Icon Required</span>:""}
                                                                    <input type="file" name='activeicon' ref={activeiconRef} onChange={(e) => {
                                                                        seteditactiveicon(e.target.files[0])
                                                                        let prev = URL.createObjectURL(e.target.files[0])
                                                                        setactiveicon(prev)
                                                                        setactiviconErr('')

                                                                    }} id='active-iocn' hidden />
                                                                </div>

                                                                <div className='sub_categories_one'>

                                                                    <div className='sub_categories_details'>
                                                                        <img src={inactiveicon ? inactiveicon : avtar} alt="inactive icon" />
                                                                        <GiCancel onClick={() => {

                                                                            setinactiveicon("")
                                                                            seteditunactiveicon("")
                                                                            inactiveiconRef.current.value = null
                                                                        }} />
                                                                    </div>
                                                                    <label htmlFor='Inactive-iocn'><ImUpload2 size={40} />Upload InActice Icon</label>


                                                                    <input ref={inactiveiconRef} type="file" name='inactiveicon' onChange={(e) => {
                                                                        seteditunactiveicon(e.target.files[0])
                                                                        let prev = URL.createObjectURL(e.target.files[0])
                                                                        setunactive_iconErr('')
                                                                        setinactiveicon(prev)

                                                                    }} id='Inactive-iocn' hidden />
                                                                    {unactive_iconErr ?
                                                                    <span className={unactive_iconErr} style={{ color: "red" }}>Inactive Icon Required</span>
                                                                                                :""}

                                                                </div>
                                                            </div>
                                                            <div className='architectural-select'>
                                                                <div className='architectural-select-one'>

                                                                    <select name='categoryid' defaultValue={editcategory_id} value={editcategory_id}
                                                                        onChange={(e) => {
                                                                            setselectcategoryErr('none')
                                                                            seteditcategory_id(e.target.value)
                                                                        }
                                                                        }
                                                                    >
                                                                        {category_Ids && category_Ids.map((val) => {
                                                                            return (
                                                                                <option value={val.id}>{val.category.slice(0, 1).toUpperCase() + val.category.slice(1, 20)}</option>)
                                                                        })}

                                                                    </select>
                                                                    <span className={selectcategoryErr} style={{ color: "red" }}>Please Select Category</span>
                                                                </div>
                                                                <div className='architectural-select-to'>
                                                                    <input type={'text'} hidden value={editid} />
                                                                    <input type="text" name='subcategory' value={editsubcategory} onChange={(e) => {
                                                                        setcatenameErr('')
                                                                        seteditsubcategory(e.target.value)
                                                                    }} placeholder='Enter Sub Category Name' />
                                                                    {catenameErr?
                                                                    <span className={catenameErr} style={{ color: "red" }}>Category Required</span>:""}
                                                                </div>
                                                            </div>
                                                            <button className='extra-add-btn w-100 mt-2' type='submit'>{createloading ? <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                            /> : "Update"}</button>

                                                        </form> : (
                                                            <Formik
                                                                initialValues={initialValues}

                                                                onSubmit={async (values) => {
                                                                    console.log("suraj");
                                                                    if (!values.subcategory) {
                                                                        setcatenameErr('block')

                                                                    }
                                                                    if (!values.activeicon) {
                                                                        setactiviconErr('block')

                                                                    }
                                                                    if (!values.inactiveicon) {
                                                                        setunactive_iconErr('block')

                                                                    }
                                                                    if (!values.categoryid) {
                                                                        setselectcategoryErr('block')

                                                                    }
                                                                    else {
                                                                        setcreateloading(true)

                                                                        try {
                                                                            const formdata = new FormData()
                                                                            formdata.set("admin_id", localClients.admin_id)
                                                                            formdata.set("admin_token", localClients.admin_token)
                                                                            formdata.set("sub_category", values.subcategory)
                                                                            formdata.set("active_icon", values.activeicon)
                                                                            formdata.set("unactive_icon", values.inactiveicon)
                                                                            formdata.set("categery_id", values.categoryid)

                                                                            let { data } = await axios.post("http://13.52.16.160:8082/admin/sub-categories/edit/", formdata)
                                                                            console.log(data);
                                                                            if (data.status === "Success") {
                                                                                setcreateloading(false)
                                                                                settemp(false)
                                                                                seteditmodalShow(false)


                                                                                setactiveicon("")
                                                                                setinactiveicon("")
                                                                            }
                                                                        } catch (error) {
                                                                            console.log(error);
                                                                        }
                                                                    }
                                                                }}
                                                            >
                                                                {({ values, setFieldValue, handleSubmit, errors, }) => (
                                                                    <form onSubmit={handleSubmit}>
                                                                        <div style={{
                                                                            display: "flex",
                                                                            flexDirection: "column",
                                                                            rowGap: "20px"
                                                                        }}>


                                                                            <div className='sub_categories_main'>



                                                                                <div className='sub_categories_one'>
                                                                                    <div className='sub_categories_details'>
                                                                                        <img src={activeicon ? activeicon : avtar} alt="active icon" />
                                                                                        <GiCancel onClick={() => {

                                                                                            setactiveicon("")
                                                                                            activeiconRef.current.value = null
                                                                                        }} />
                                                                                    </div>
                                                                                    <label htmlFor='active-iocn'><ImUpload2 size={40} />Upload Active Icon</label>

                                                                                    <span className={activiconErr} style={{ color: "red" }}>Active Icon Required</span>
                                                                                    <input ref={activeiconRef} type="file" name='activeicon' onChange={(e) => {
                                                                                        setFieldValue('activeicon', e.target.files[0])
                                                                                        let prev = URL.createObjectURL(e.target.files[0])
                                                                                        setactiveicon(prev)
                                                                                        setactiviconErr('none')

                                                                                    }} id='active-iocn' hidden />
                                                                                </div>

                                                                                <div className='sub_categories_one'>
                                                                                    <div className='sub_categories_details'>
                                                                                        <img src={inactiveicon ? inactiveicon : avtar} alt="inactive icon" />
                                                                                        <GiCancel onClick={() => {

                                                                                            setinactiveicon("")
                                                                                            inactiveiconRef.current.value = null
                                                                                        }} />
                                                                                    </div>



                                                                                    <label htmlFor='Inactive-iocn'><ImUpload2 size={40} />Upload UnActive Icon</label>

                                                                                    <input ref={inactiveiconRef} type="file" name='inactiveicon' onChange={(e) => {
                                                                                        setFieldValue('inactiveicon', e.target.files[0])
                                                                                        let prev = URL.createObjectURL(e.target.files[0])
                                                                                        setunactive_iconErr('none')
                                                                                        setinactiveicon(prev)

                                                                                    }} id='Inactive-iocn' hidden />
                                                                                    <span className={unactive_iconErr} style={{ color: "red" }}>Inactive Icon Required</span>

                                                                                </div>
                                                                            </div>



                                                                            <div className='architectural-select'>
                                                                                <div className='architectural-select-one'>

                                                                                    <select name='categoryid' value={values.categoryid}
                                                                                        onChange={(e) => {
                                                                                            setselectcategoryErr('none')
                                                                                            setFieldValue('categoryid', e.target.value)
                                                                                        }}
                                                                                    >
                                                                                        <option >Select Category</option>
                                                                                        <option value='1'>Architectural</option>
                                                                                        <option value='2'>Visulization</option>
                                                                                        <option value='3'>Buysale</option>
                                                                                    </select>
                                                                                    <span className={selectcategoryErr} style={{ color: "red" }}>Please Select Category</span>
                                                                                </div>
                                                                                <div className='architectural-select-to'>
                                                                                    <input type="text" name='subcategory' value={values.subcategory} onChange={(e) => {
                                                                                        setcatenameErr('none')

                                                                                        setFieldValue('subcategory', e.target.value)
                                                                                    }} placeholder='Enter Sub Category Name' />
                                                                                    <span className={catenameErr} style={{ color: "red" }}>Category Required</span>
                                                                                </div>
                                                                            </div>
                                                                            <button type='submit' className='extra-add-btn w-100 mt-2'>{createloading ? <Spinner
                                                                                as="span"
                                                                                animation="border"
                                                                                size="sm"
                                                                                role="status"
                                                                                aria-hidden="true"
                                                                            /> : "Add"}</button>
                                                                        </div>
                                                                    </form>)
                                                                }
                                                            </Formik>

                                                        )}

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
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-slide-description">
                                                        Are you sure you want to delete this Subcategory ?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>cancel</Button>
                                                    <Button onClick={() => deletesubcategory(id)}>ok</Button>
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

export default Subcategory
