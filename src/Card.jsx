import { AiFillBook, AiOutlineBook, AiOutlineUser } from "react-icons/ai";
import {
  FaLanguage,
  FaTelegramPlane,
  FaUserAlt,
  FaUsers,
} from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Cookies } from "react-cookie";
import { createBrowserHistory } from "history";
import { baseurl } from "./Baseurl";
import { Formik } from "formik";
import { ImUpload2 } from "react-icons/im";
import { MdOutlinePhonelinkSetup } from "react-icons/md";
import { FiCommand } from "react-icons/fi";
import { BsBorderAll } from "react-icons/bs";
const Cards = () => {
  const history = createBrowserHistory();
  const cookie = new Cookies();
  const location = useLocation();
  const querypage = new URLSearchParams(location.search);
  const token = cookie.get("token");
  const [editmodalShow, seteditmodalShow] = useState(false);
  const [page, setpage] = useState(
    querypage.get("page") ? parseInt(querypage.get("page")) : 1
  );
  const [loading,setloading]=useState(false)
  const [counts, setcounts] = useState(0);
  const [id, setid] = useState(null);
  const [skills, setskills] = useState([]);
  const localClients = JSON.parse(localStorage.getItem("adminLogin"));
  const [addmodalShow, setaddmodalShow] = useState(false);
  const [addmodalShow2, setaddmodalShow2] = useState(false);
  const [addmodalShow3, setaddmodalShow3] = useState(false);
  const [addmodalShow4, setaddmodalShow4] = useState(false);
  const [addmodalShow5, setaddmodalShow5] = useState(false);

  const [modalShow, setmodalShow] = useState(false);
  const [addskills, setaddskills] = useState("");
  const [temp, settemp] = useState(true);
  const [skill_name, setskill_name] = useState("");
  const [editskill_name, seteditskill_name] = useState("");
  const [skill_id, setskill_id] = useState("");
  const [skillcreateloading, setskillcreateloading] = useState(false);
  const [skillupdateloading, setskillupdateloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setquery] = useState("");
  const [skillsErrdisplay, setskillsErrdisplay] = useState("none");
  const navigate = useNavigate();

  /////////////////////////////
  const [mediaicon, setMediaicon] = useState("");
  const [createloading, setcreateloading] = useState(false);
  const [icondisplay, seticondisplay] = useState("none");
  const [medianameErr, setmedianameErr] = useState("none");
  const [mediaiconErr, setmediaiconErr] = useState("none");
  const [medialinkErr, setmedialinkErr] = useState("none");
  ///////////////
  const [addfooterlinkname, setaddfooterlinkname] = useState("");
  const [addfooterlinktype, setaddfooterlinktype] = useState("");
  const [addfooterlinkurl, setaddfooterlinkurl] = useState("");
  const [footerlinkscreateloading, setfooterlinkscreateloading] =
    useState(false);
  const [footerlinkNameErrdisplay, setfooterlinkNameErrdisplay] =
    useState("none");
  const [footertypeErrdisplay, setfootertypeErrdisplay] = useState("none");
  const [footerUrlErrdisplay, setfooterlinkUrlErrdisplay] = useState("none");

  //////////////////////////////
  const [language, setlanguage] = useState([]);
  const [addlanguage, setaddlanguage] = useState("");
  const [editloading, seteditloading] = useState(false);
  const [languageErrdisplay, setlanguageErrdisplay] = useState("none");
  const [languagecreateloading, setlanguagecreateloading] = useState(false);

  /////////////////////////////////////
  const [Email, setEmail] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [password, setpassword] = useState("");
  const [errDisplayEmail, seterrDisplayEmail] = useState("none");
  const [errDisplayFirstname, seterrDisplayFirstname] = useState("none");
  const [errDisplayLastname, seterrDisplayLastname] = useState("none");
  const [errDisplaypassword, seterrDisplaypassword] = useState("none");
  const [admincreateloading, setadmincreateloading] = useState(false);
  const [data,setData]=useState([])
  const show = () => setaddmodalShow(true);
  const handleclose = () => {
    setaddskills(null);
    setskillcreateloading(false);
    setaddmodalShow(false);
    setaddmodalShow2(false);
    setaddmodalShow3(false);
    setaddmodalShow4(false);
    setaddmodalShow5(false);
  };
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
  let initialValues = {
    media_icon: "",
    media_name: "",
    media_link: "",
  };

  const footerlinkscreate = async (e) => {
    e.preventDefault();
    if (addfooterlinkname === "") {
      setfooterlinkNameErrdisplay("block");
    }
    if (addfooterlinktype === "") {
      setfootertypeErrdisplay("block");
    }
    if (addfooterlinkurl === "") {
      setfooterlinkUrlErrdisplay("block");
    } else if (
      addfooterlinkname === "" ||
      addfooterlinktype === "" ||
      addfooterlinkurl === ""
    ) {
      return false;
    } else {
      setfooterlinkscreateloading(true);
      const res = await axios.put(`${baseurl}/admin/static/footer-data/`, {
        ...localClients,
        type: addfooterlinktype,
        name: addfooterlinkname,
        url: addfooterlinkurl,
      });
      console.log(res);
      if (res.data.status === "Success") {
        console.log("suraj");
        setfooterlinkscreateloading(false);
        setaddfooterlinktype("");
        setaddfooterlinkname("");
        setaddfooterlinkurl("");
        settemp(false);
        setaddmodalShow3(false);
      }
    }
  };
  const languagecreate = async (e) => {
    e.preventDefault();
    if (addlanguage === "") {
      setlanguageErrdisplay("block");
    } else {
      setlanguagecreateloading(true);
      const res = await axios.put(`${baseurl}/admin/static/languages/`, {
        ...localClients,
        language: addlanguage,
      });
      console.log(res);
      if (res.data.status === "Success") {
        console.log("suraj");
        setaddmodalShow4(false);
        setaddlanguage(null);
        setlanguagecreateloading(false);
        settemp(false);
      }
    }
  };
  let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const addAdmin = async (e) => {
    console.log(regex.test(password));
    e.preventDefault()
    if (!Firstname.length) {
      seterrDisplayFirstname("block")
    }
    if (!Lastname.length) {
      
      seterrDisplayLastname("block")
    }
    if (!Email.length) {
      seterrDisplayEmail("block")
    } if (!regex.test(password)) {
      seterrDisplaypassword("block")
    } else if (!Firstname.length || !Lastname.length || !Email.length || !regex.test(password)) {
      return false
    }
    else {
      setadmincreateloading(true)
      const { data } = await axios.post(`${baseurl}/admin/signup/`, {
        first_name: Firstname,
        last_name: Lastname,
        email: Email.toLowerCase(),
        password: password
      })

      if (data.status === "Success") {
        setadmincreateloading(false)
        setaddmodalShow5(false)
        settemp(false)
        setFirstname("")
        setLastname("")
        setEmail("")
        setpassword("")
      }
    }
  }

  const addsocialmeida = () => setaddmodalShow2(true);
  const addfooterlinks = () => setaddmodalShow3(true);
  const addlanguages = () => setaddmodalShow4(true);
  const addadmins = () => setaddmodalShow5(true);

useEffect(()=>{
  setloading(true)
  const res = axios.post(`${baseurl}/admin/quadra_count/`, {
    ...localClients, page: page, page_size: 10
  }).then(res=>{
    console.log(res);
    if(res.data.status === 'Success'){
      setData(res.data.data[0])
      setloading(false)    
    }else{
      setloading(false)
    }
  })
},[])
    
console.log(data)    
  
  return (
    <div className="cards-wrapper py-4 pl-3">
      {loading ? <div style={{
         display: "flex",
         justifyContent: "center", marginTop: "24%"
       }}>

         <Spinner animation="border" />

       </div>: 
      <div className="container-fluid">
        <div className="row pb-2">
        <div className="col-lg-4">
            <div
              className="card container  text-white"
              style={{ backgroundColor: "#01B590" }}
            >
              <div
                className=" row "
                style={{ borderBottom: "2px solid white" }}
              >
                <div
                  className="col-6 py-2 pl-4"
                  style={{ borderRight: "1px solid white" }}
                >
                  <FaUsers className="" />
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center ">
                  <span>
                    <Link
                      to={"/dashboard/professionalss"}
                      className=" text-white fw-normal"
                    >
                      View Details
                    </Link>
                  </span>
                </div>
              </div>
              <div className="card-body mt-3">
               <h6>Professional Count</h6>
               <h2>{data.Professional_count}</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="card container  text-white"
              style={{ backgroundColor: "#01B590" }}
            >
              <div
                className=" row "
                style={{ borderBottom: "2px solid white" }}
              >
                <div
                  className="col-6 py-2 pl-4"
                  style={{ borderRight: "1px solid white" }}
                >
                  <AiOutlineUser className="" />
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center ">
                  <span>
                    <Link
                      to={"/dashboard/clients"}
                      className=" text-white fw-normal"
                    >
                      View Details
                    </Link>
                  </span>
                </div>
              </div>
              <div className="card-body mt-3">
               <h6>Client Count</h6>
               <h2>{data.Client_count}</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
          <div
            className="card container  text-white"
            style={{ backgroundColor: "#01B590" }}
          >
            <div
              className=" row "
              style={{ borderBottom: "2px solid white" }}
            >
              <div
                className="col-6 py-2 pl-4"
                style={{ borderRight: "1px solid white" }}
              >
                <BsBorderAll className="" />
              </div>
              <div className="col-6 d-flex justify-content-center align-items-center ">
                <span>
                  <Link
                    to={"/dashboard/allprojects/pending"}
                    className=" text-white fw-normal"
                  >
                    View Details
                  </Link>
                </span>
              </div>
            </div>
            <div className="card-body mt-3">
             <h6>Total Project</h6>
             <h2>{data.Total_Project_count}</h2>
            </div>
          </div>
        </div>
 
        
        <div className="col-lg-4">
        <div className="card card-box-me">
        <div className="card-body">
          <table className="table table-sm" style={{marginBottom:"0rem"}}>
            <tbody>
              <tr>
                <td>
                  <div style={{color:"black"}}><span>Admin</span></div>
                </td>
                <td>
                <div className="btn-group float-right">
                <span id="dashboardspantag"
                onClick={addadmins}
              >
                Add
              </span>
              <Link style={{marginTop:"5px"}}to={"/dashboard/Alladmin"}
                className=" text-white fw-normal"
              >
              <span id="dashboardspantag2">
                View
                </span>
                </Link>
                </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        </div>
          <div className="col-lg-4">
          <div className="card card-box-me">
          <div className="card-body">
            <table className="table table-sm" style={{marginBottom:"0rem"}}>
              <tbody>
                <tr>
                  <td>
                    <div style={{color:"black"}}><span>Language</span></div>
                  </td>
                  <td>
                  <div className="btn-group float-right">
                  <span id="dashboardspantag"
                  onClick={addlanguages}
                >
                  Add
                </span>
                <Link style={{marginTop:"5px"}}to={"/dashboard/language"}
                  className=" text-white fw-normal"
                >
                <span id="dashboardspantag2">
                  View
                  </span>
                  </Link>
                  </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
          </div>
         
          <div className="col-lg-4">
          <div className="card card-box-me">
          <div className="card-body">
            <table className="table table-sm" style={{marginBottom:"0rem"}}>
              <tbody>
                <tr>
                  <td>
                    <div style={{color:"black"}}><span>Social Media Links</span></div>
                  </td>
                  <td>
                  <div className="btn-group float-right">
                  <span id="dashboardspantag"
                  onClick={addsocialmeida}
                >
                  Add
                </span>
                <Link style={{marginTop:"5px"}}to={"/dashboard/social_links"}
                  className=" text-white fw-normal"
                >
                <span id="dashboardspantag2">
                  View
                  </span>
                  </Link>
                  </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
          </div>
          <div className="col-lg-4">
          <div className="card card-box-me">
          <div className="card-body">
            <table className="table table-sm" style={{marginBottom:"0rem"}}>
              <tbody>
                <tr>
                  <td>
                    <div style={{color:"black"}}><span>Skills</span></div>
                  </td>
                  <td>
                  <div className="btn-group float-right">
                  <span id="dashboardspantag"
                  onClick={show}
                >
                  Add
                </span>
                <Link style={{marginTop:"5px"}}to={"/dashboard/skills"}
                  className=" text-white fw-normal"
                >
                <span id="dashboardspantag2">
                  View
                  </span>
                  </Link>
                  </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
          </div>
          <div className="col-lg-4">
          <div className="card card-box-me">
          <div className="card-body">
            <table className="table table-sm" style={{marginBottom:"0rem"}}>
              <tbody>
                <tr>
                  <td>
                    <div style={{color:"black"}}><span>Footerlinks</span></div>
                  </td>
                  <td>
                  <div className="btn-group float-right">
                  <span id="dashboardspantag"
                  onClick={addfooterlinks}
                >
                  Add
                </span>
                <Link style={{marginTop:"5px"}}to={"/dashboard/footerlinks"}
                  className=" text-white fw-normal"
                >
                <span id="dashboardspantag2">
                  View
                  </span>
                  </Link>
                  </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
          </div>

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
                <input
                  id="Footerlinks1"
                  value={addskills}
                  placeholder="Enter New skills"
                  onChange={(e) => {
                    setaddskills(e.target.value);

                    setskillsErrdisplay("none");
                  }}
                  type="text"
                />
                <label htmlFor="" className={skillsErrdisplay}>
                  Required
                </label>
                <button id="Footerlinks2" type="submit">
                  {skillcreateloading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Add"
                  )}
                </button>
              </form>
            </Modal.Body>
          </Modal>
          <Modal
            show={addmodalShow2}
            onHide={handleclose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Subcategories Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                  console.log("suraj");
                  if (!values.media_name) {
                    setmedianameErr("block");
                  }
                  if (!values.media_icon) {
                    setmediaiconErr("block");
                  }
                  if (!values.media_link) {
                    setmedialinkErr("block");
                  } else {
                    setcreateloading(true);
                    setMediaicon("");
                    try {
                      const formdata = new FormData();
                      formdata.set("admin_id", localClients.admin_id);
                      formdata.set("admin_token", localClients.admin_token);
                      formdata.set("media_icon", values.media_icon);
                      formdata.set("media_link", values.media_link);
                      formdata.set("media_name", values.media_name);
                      formdata.set("media_id", values.media_id);

                      let { data } = await axios.post(
                        "http://13.52.16.160:8082/admin/static/footer-media-data/",
                        formdata
                      );
                      console.log(data);
                      if (data.status === "Success") {
                        setcreateloading(false);
                        settemp(false);
                        setMediaicon("");
                        setaddmodalShow2(false);
                        seticondisplay("none");
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }}
              >
                {({ values, setFieldValue, handleSubmit, errors }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="architectural-select">
                      <div className="architectural-select-one">
                        <input
                          type="text"
                          name="media_name"
                          value={values.media_name}
                          onChange={(e) => {
                            setmedianameErr("none");
                            setFieldValue("media_name", e.target.value);
                          }}
                          placeholder="Enter Social media Name"
                        />
                        <span className={medianameErr} style={{ color: "red" }}>
                          media_name required
                        </span>
                      </div>
                      <div className="architectural-select-to">
                        <input
                          type="text"
                          placeholder="Enter Link here"
                          value={values.media_link}
                          name="media_link"
                          onChange={(e) => {
                            setFieldValue("media_link", e.target.value);
                            setmedialinkErr("none");
                          }}
                        />
                        <span className={medialinkErr} style={{ color: "red" }}>
                          media_link required
                        </span>
                      </div>
                    </div>

                    <div className="social_media_upload">
                      <img
                        className={icondisplay}
                        style={{ width: "10%" }}
                        src={mediaicon}
                        alt="inactive icon"
                      />
                      <label htmlFor="Inactive-iocn">
                        <ImUpload2 size={40} />
                        Upload Media Icon
                      </label>
                      <span className={mediaiconErr} style={{ color: "red" }}>
                        media_icon required
                      </span>

                      <input
                        type="file"
                        name="media_icon"
                        onChange={(e) => {
                          setFieldValue("media_icon", e.target.files[0]);
                          let prev = URL.createObjectURL(e.target.files[0]);
                          setMediaicon(prev);
                          setmediaiconErr("none");

                          seticondisplay("block");
                        }}
                        id="Inactive-iocn"
                        hidden
                      />
                    </div>
                    <button type="submit" className="extra-add-btn w-100 mt-2">
                      {createloading ? (
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
                )}
              </Formik>
            </Modal.Body>
          </Modal>
          <Modal />
          <Modal
            show={addmodalShow3}
            onHide={handleclose}
            size="lg"
            className="rating_detail_modal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Footerlink Add
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={footerlinkscreate}>
                <div>
                  <lable id="labelsinmodal" className="lbl">
                    {" "}
                    Name
                  </lable>
                  <input
                    value={addfooterlinkname}
                    id="Footerlinks1"
                    placeholder="Enter footerlink name"
                    onChange={(e) => {
                      setfooterlinkNameErrdisplay("none");
                      setaddfooterlinkname(e.target.value);
                    }}
                    type="text"
                  />
                  <label htmlFor="" className={footerlinkNameErrdisplay}>
                    Name is Rquired
                  </label>
                </div>

                <div>
                  <lable id="labelsinmodal" className="lbl">
                    {" "}
                    Type
                  </lable>
                  <select
                    style={{ backgroundColor: "white" }}
                    name=""
                    id="Footerlinks1"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setaddfooterlinktype(e.target.value);
                      setfootertypeErrdisplay("none");
                    }}
                  >
                    <option selected="true" disabled="disabled">
                      Select Type
                    </option>
                    <option value="Support">Support</option>
                    <option value="Explore">Explore</option>
                    <option value="Explore Resources">Explore Resources</option>
                    <option value="Categories">Categories</option>
                  </select>
                  <label htmlFor="" className={footertypeErrdisplay}>
                    Type is Rquired
                  </label>
                </div>
                <div>
                  <lable id="labelsinmodal" className="lbl">
                    {" "}
                    Url
                  </lable>
                  <input
                    value={addfooterlinkurl}
                    id="Footerlinks1"
                    placeholder="Enter footerlink url"
                    onChange={(e) => {
                      setfooterlinkUrlErrdisplay("none");
                      setaddfooterlinkurl(e.target.value);
                    }}
                    type="text"
                  />
                  <label htmlFor="" className={footerUrlErrdisplay}>
                    Url is Rquired
                  </label>
                </div>
                <button id="Footerlinks2" t qq ype="submit">
                  {footerlinkscreateloading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Add"
                  )}
                </button>
              </form>
            </Modal.Body>
          </Modal>
          <Modal
            show={addmodalShow4}
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
                <input
                  id="Footerlinks1"
                  value={addlanguage}
                  placeholder="Enter New Language"
                  onChange={(e) => {
                    setaddlanguage(e.target.value);
                    setlanguageErrdisplay("none");
                  }}
                  type="text"
                />
                <label htmlFor="" className={languageErrdisplay}>
                  Required
                </label>
                <button id="Footerlinks2" type="submit">
                  {languagecreateloading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Add"
                  )}
                </button>
              </form>
            </Modal.Body>
          </Modal>
          <Modal
                            show={addmodalShow5}
                            className="rating_detail_modal"

                            onHide={handleclose}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title id="contained-modal-title-vcenter">
                                Admin Detail
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <form onSubmit={addAdmin}>
                                <label id='labelsinmodal'>First Name</label>
                                <input id='Footerlinks1' type="text" value={Firstname} onChange={(e) => {
                                  seterrDisplayFirstname("none")
                                  setFirstname(e.target.value)
                                }} />
                                <span className={errDisplayFirstname}>Required</span>

                                <label id='labelsinmodal'>Last Name</label>
                                <input id='Footerlinks1' type="text" value={Lastname}
                                  onChange={(e) => {
                                    seterrDisplayLastname("none")

                                    setLastname(e.target.value)
                                  }} />
                                <span className={errDisplayLastname}>Required</span>

                                <label id='labelsinmodal'>Email</label>
                                <input id='Footerlinks1' type="email" value={Email}
                                  onChange={(e) => {
                                    seterrDisplayEmail("none")

                                    setEmail(e.target.value)
                                  }}
                                />
                                <span className={errDisplayEmail}>Required</span>

                                <label id='labelsinmodal'>Password</label>
                                <input id='Footerlinks1' type="text" value={password}
                                  onChange={(e) => {
                                    seterrDisplaypassword("none")
                                    setpassword(e.target.value)
                                  }}
                                />
                                <span className={errDisplaypassword}>Password must be 8 characters and use special character, letter, digit(MY@ddf@12df) </span>
                                {/* <input id='Footerlinks1' type="text" value={adminLastname} onChange={(e) => seteditadmin_name(e.target.value)} placeholder="Enter Footerlink Name" /> */}
                                <button id='Footerlinks2' type="submit">{admincreateloading ? <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                /> : "Submit"}</button>
                              </form>
                            </Modal.Body>

                          </Modal>
        </div>
      </div>}
    </div>
  );
};

export default Cards;
