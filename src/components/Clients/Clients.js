import React, { useState, useEffect, useRef } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import { Pagination, Typography } from "@mui/material";
import { Modal, Spinner } from "react-bootstrap";
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Switch from '@mui/material/Switch';
import avtar from '../../images/avtar.png'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { baseurl } from "../../Baseurl";
const Clients = () => {
  const history = createBrowserHistory()
  const navigate = useNavigate()
  const location = useLocation()
  const querypage = new URLSearchParams(location.search)
  const profileRef = useRef()

  const [clients, setClients] = useState([])
  const [id, setid] = useState(null)
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))
  const [modalShow, setModalShow] = React.useState(false);
  const [page, setpage] = useState(querypage.get('page') ? parseInt(querypage.get('page')) : 1)
  const [counts, setcounts] = useState(0)
  const [loading, setloading] = useState(true)

  const [first_name, setfirst_name] = useState("")
  const [last_name, setlast_name] = useState("")
  const [email, setemail] = useState("")
  const [bio, setbio] = useState("")

  const [joined, setjoined] = useState("")
  const [mobile, setmobile] = useState("")
  const [nation, setnation] = useState("")
  const [profile, setprofile] = useState("")

  const [email_verify, setemail_verify] = useState("")
  const [mobile_verify, setmobile_verify] = useState("")
  const [image, setimage] = useState([])
  const [imagepreview, setimagepreview] = useState("")

  const cookie = new Cookies()
  const token = cookie.get('token')
  const [clientupdateloading, setclientupdateloading] = useState(false)
  const [temp, settemp] = useState(true)
  const [open, setOpen] = useState(false);
  const [query, setquery] = useState("")
  const [nationName, setnationName] = useState("")
  const countery = [
    { "name": "Country", "code": "AF" },
    { "name": "Afghanistan", "code": "AF" },
    { "name": "land Islands", "code": "AX" },
    { "name": "Albania", "code": "AL" },
    { "name": "Algeria", "code": "DZ" },
    { "name": "American Samoa", "code": "AS" },
    { "name": "AndorrA", "code": "AD" },
    { "name": "Angola", "code": "AO" },
    { "name": "Anguilla", "code": "AI" },
    { "name": "Antarctica", "code": "AQ" },
    { "name": "Antigua and Barbuda", "code": "AG" },
    { "name": "Argentina", "code": "AR" },
    { "name": "Armenia", "code": "AM" },
    { "name": "Aruba", "code": "AW" },
    { "name": "Australia", "code": "AU" },
    { "name": "Austria", "code": "AT" },
    { "name": "Azerbaijan", "code": "AZ" },
    { "name": "Bahamas", "code": "BS" },
    { "name": "Bahrain", "code": "BH" },
    { "name": "Bangladesh", "code": "BD" },
    { "name": "Barbados", "code": "BB" },
    { "name": "Belarus", "code": "BY" },
    { "name": "Belgium", "code": "BE" },
    { "name": "Belize", "code": "BZ" },
    { "name": "Benin", "code": "BJ" },
    { "name": "Bermuda", "code": "BM" },
    { "name": "Bhutan", "code": "BT" },
    { "name": "Bolivia", "code": "BO" },
    { "name": "Bosnia and Herzegovina", "code": "BA" },
    { "name": "Botswana", "code": "BW" },
    { "name": "Bouvet Island", "code": "BV" },
    { "name": "Brazil", "code": "BR" },
    { "name": "British Indian Ocean Territory", "code": "IO" },
    { "name": "Brunei Darussalam", "code": "BN" },
    { "name": "Bulgaria", "code": "BG" },
    { "name": "Burkina Faso", "code": "BF" },
    { "name": "Burundi", "code": "BI" },
    { "name": "Cambodia", "code": "KH" },
    { "name": "Cameroon", "code": "CM" },
    { "name": "Canada", "code": "CA" },
    { "name": "Cape Verde", "code": "CV" },
    { "name": "Cayman Islands", "code": "KY" },
    { "name": "Central African Republic", "code": "CF" },
    { "name": "Chad", "code": "TD" },
    { "name": "Chile", "code": "CL" },
    { "name": "China", "code": "CN" },
    { "name": "Christmas Island", "code": "CX" },
    { "name": "Cocos (Keeling) Islands", "code": "CC" },
    { "name": "Colombia", "code": "CO" },
    { "name": "Comoros", "code": "KM" },
    { "name": "Congo", "code": "CG" },
    { "name": "Congo, The Democratic Republic of the", "code": "CD" },
    { "name": "Cook Islands", "code": "CK" },
    { "name": "Costa Rica", "code": "CR" },
    { "name": "Cote D'Ivoire", "code": "CI" },
    { "name": "Croatia", "code": "HR" },
    { "name": "Cuba", "code": "CU" },
    { "name": "Cyprus", "code": "CY" },
    { "name": "Czech Republic", "code": "CZ" },
    { "name": "Denmark", "code": "DK" },
    { "name": "Djibouti", "code": "DJ" },
    { "name": "Dominica", "code": "DM" },
    { "name": "Dominican Republic", "code": "DO" },
    { "name": "Ecuador", "code": "EC" },
    { "name": "Egypt", "code": "EG" },
    { "name": "El Salvador", "code": "SV" },
    { "name": "Equatorial Guinea", "code": "GQ" },
    { "name": "Eritrea", "code": "ER" },
    { "name": "Estonia", "code": "EE" },
    { "name": "Ethiopia", "code": "ET" },
    { "name": "Falkland Islands (Malvinas)", "code": "FK" },
    { "name": "Faroe Islands", "code": "FO" },
    { "name": "Fiji", "code": "FJ" },
    { "name": "Finland", "code": "FI" },
    { "name": "France", "code": "FR" },
    { "name": "French Guiana", "code": "GF" },
    { "name": "French Polynesia", "code": "PF" },
    { "name": "French Southern Territories", "code": "TF" },
    { "name": "Gabon", "code": "GA" },
    { "name": "Gambia", "code": "GM" },
    { "name": "Georgia", "code": "GE" },
    { "name": "Germany", "code": "DE" },
    { "name": "Ghana", "code": "GH" },
    { "name": "Gibraltar", "code": "GI" },
    { "name": "Greece", "code": "GR" },
    { "name": "Greenland", "code": "GL" },
    { "name": "Grenada", "code": "GD" },
    { "name": "Guadeloupe", "code": "GP" },
    { "name": "Guam", "code": "GU" },
    { "name": "Guatemala", "code": "GT" },
    { "name": "Guernsey", "code": "GG" },
    { "name": "Guinea", "code": "GN" },
    { "name": "Guinea-Bissau", "code": "GW" },
    { "name": "Guyana", "code": "GY" },
    { "name": "Haiti", "code": "HT" },
    { "name": "Heard Island and Mcdonald Islands", "code": "HM" },
    { "name": "Holy See (Vatican City State)", "code": "VA" },
    { "name": "Honduras", "code": "HN" },
    { "name": "Hong Kong", "code": "HK" },
    { "name": "Hungary", "code": "HU" },
    { "name": "Iceland", "code": "IS" },
    { "name": "India", "code": "IN" },
    { "name": "Indonesia", "code": "ID" },
    { "name": "Iran, Islamic Republic Of", "code": "IR" },
    { "name": "Iraq", "code": "IQ" },
    { "name": "Ireland", "code": "IE" },
    { "name": "Isle of Man", "code": "IM" },
    { "name": "Israel", "code": "IL" },
    { "name": "Italy", "code": "IT" },
    { "name": "Jamaica", "code": "JM" },
    { "name": "Japan", "code": "JP" },
    { "name": "Jersey", "code": "JE" },
    { "name": "Jordan", "code": "JO" },
    { "name": "Kazakhstan", "code": "KZ" },
    { "name": "Kenya", "code": "KE" },
    { "name": "Kiribati", "code": "KI" },
    { "name": "Korea, Democratic People'S Republic of", "code": "KP" },
    { "name": "Korea, Republic of", "code": "KR" },
    { "name": "Kuwait", "code": "KW" },
    { "name": "Kyrgyzstan", "code": "KG" },
    { "name": "Lao People'S Democratic Republic", "code": "LA" },
    { "name": "Latvia", "code": "LV" },
    { "name": "Lebanon", "code": "LB" },
    { "name": "Lesotho", "code": "LS" },
    { "name": "Liberia", "code": "LR" },
    { "name": "Libyan Arab Jamahiriya", "code": "LY" },
    { "name": "Liechtenstein", "code": "LI" },
    { "name": "Lithuania", "code": "LT" },
    { "name": "Luxembourg", "code": "LU" },
    { "name": "Macao", "code": "MO" },
    { "name": "Macedonia, The Former Yugoslav Republic of", "code": "MK" },
    { "name": "Madagascar", "code": "MG" },
    { "name": "Malawi", "code": "MW" },
    { "name": "Malaysia", "code": "MY" },
    { "name": "Maldives", "code": "MV" },
    { "name": "Mali", "code": "ML" },
    { "name": "Malta", "code": "MT" },
    { "name": "Marshall Islands", "code": "MH" },
    { "name": "Martinique", "code": "MQ" },
    { "name": "Mauritania", "code": "MR" },
    { "name": "Mauritius", "code": "MU" },
    { "name": "Mayotte", "code": "YT" },
    { "name": "Mexico", "code": "MX" },
    { "name": "Micronesia, Federated States of", "code": "FM" },
    { "name": "Moldova, Republic of", "code": "MD" },
    { "name": "Monaco", "code": "MC" },
    { "name": "Mongolia", "code": "MN" },
    { "name": "Montenegro", "code": "ME" },
    { "name": "Montserrat", "code": "MS" },
    { "name": "Morocco", "code": "MA" },
    { "name": "Mozambique", "code": "MZ" },
    { "name": "Myanmar", "code": "MM" },
    { "name": "Namibia", "code": "NA" },
    { "name": "Nauru", "code": "NR" },
    { "name": "Nepal", "code": "NP" },
    { "name": "Netherlands", "code": "NL" },
    { "name": "Netherlands Antilles", "code": "AN" },
    { "name": "New Caledonia", "code": "NC" },
    { "name": "New Zealand", "code": "NZ" },
    { "name": "Nicaragua", "code": "NI" },
    { "name": "Niger", "code": "NE" },
    { "name": "Nigeria", "code": "NG" },
    { "name": "Niue", "code": "NU" },
    { "name": "Norfolk Island", "code": "NF" },
    { "name": "Northern Mariana Islands", "code": "MP" },
    { "name": "Norway", "code": "NO" },
    { "name": "Oman", "code": "OM" },
    { "name": "Pakistan", "code": "PK" },
    { "name": "Palau", "code": "PW" },
    { "name": "Palestinian Territory, Occupied", "code": "PS" },
    { "name": "Panama", "code": "PA" },
    { "name": "Papua New Guinea", "code": "PG" },
    { "name": "Paraguay", "code": "PY" },
    { "name": "Peru", "code": "PE" },
    { "name": "Philippines", "code": "PH" },
    { "name": "Pitcairn", "code": "PN" },
    { "name": "Poland", "code": "PL" },
    { "name": "Portugal", "code": "PT" },
    { "name": "Puerto Rico", "code": "PR" },
    { "name": "Qatar", "code": "QA" },
    { "name": "Reunion", "code": "RE" },
    { "name": "Romania", "code": "RO" },
    { "name": "Russian Federation", "code": "RU" },
    { "name": "RWANDA", "code": "RW" },
    { "name": "Saint Helena", "code": "SH" },
    { "name": "Saint Kitts and Nevis", "code": "KN" },
    { "name": "Saint Lucia", "code": "LC" },
    { "name": "Saint Pierre and Miquelon", "code": "PM" },
    { "name": "Saint Vincent and the Grenadines", "code": "VC" },
    { "name": "Samoa", "code": "WS" },
    { "name": "San Marino", "code": "SM" },
    { "name": "Sao Tome and Principe", "code": "ST" },
    { "name": "Saudi Arabia", "code": "SA" },
    { "name": "Senegal", "code": "SN" },
    { "name": "Serbia", "code": "RS" },
    { "name": "Seychelles", "code": "SC" },
    { "name": "Sierra Leone", "code": "SL" },
    { "name": "Singapore", "code": "SG" },
    { "name": "Slovakia", "code": "SK" },
    { "name": "Slovenia", "code": "SI" },
    { "name": "Solomon Islands", "code": "SB" },
    { "name": "Somalia", "code": "SO" },
    { "name": "South Africa", "code": "ZA" },
    { "name": "South Georgia and the South Sandwich Islands", "code": "GS" },
    { "name": "Spain", "code": "ES" },
    { "name": "Sri Lanka", "code": "LK" },
    { "name": "Sudan", "code": "SD" },
    { "name": "Suriname", "code": "SR" },
    { "name": "Svalbard and Jan Mayen", "code": "SJ" },
    { "name": "Swaziland", "code": "SZ" },
    { "name": "Sweden", "code": "SE" },
    { "name": "Switzerland", "code": "CH" },
    { "name": "Syrian Arab Republic", "code": "SY" },
    { "name": "Taiwan, Province of China", "code": "TW" },
    { "name": "Tajikistan", "code": "TJ" },
    { "name": "Tanzania, United Republic of", "code": "TZ" },
    { "name": "Thailand", "code": "TH" },
    { "name": "Timor-Leste", "code": "TL" },
    { "name": "Togo", "code": "TG" },
    { "name": "Tokelau", "code": "TK" },
    { "name": "Tonga", "code": "TO" },
    { "name": "Trinidad and Tobago", "code": "TT" },
    { "name": "Tunisia", "code": "TN" },
    { "name": "Turkey", "code": "TR" },
    { "name": "Turkmenistan", "code": "TM" },
    { "name": "Turks and Caicos Islands", "code": "TC" },
    { "name": "Tuvalu", "code": "TV" },
    { "name": "Uganda", "code": "UG" },
    { "name": "Ukraine", "code": "UA" },
    { "name": "United Arab Emirates", "code": "AE" },
    { "name": "United Kingdom", "code": "GB" },
    { "name": "United States", "code": "US" },
    { "name": "United States Minor Outlying Islands", "code": "UM" },
    { "name": "Uruguay", "code": "UY" },
    { "name": "Uzbekistan", "code": "UZ" },
    { "name": "Vanuatu", "code": "VU" },
    { "name": "Venezuela", "code": "VE" },
    { "name": "Viet Nam", "code": "VN" },
    { "name": "Virgin Islands, British", "code": "VG" },
    { "name": "Virgin Islands, U.S.", "code": "VI" },
    { "name": "Wallis and Futuna", "code": "WF" },
    { "name": "Western Sahara", "code": "EH" },
    { "name": "Yemen", "code": "YE" },
    { "name": "Zambia", "code": "ZM" },
    { "name": "Zimbabwe", "code": "ZW" }
  ]
  const getClients = async () => {
    const res = await axios.post(`${baseurl}/admin/clients/`, {
      ...localClients, page: page, page_size: 10
    });
    console.log(res);
    if (res.data.status === "Success") {
      setloading(false)
      let data = res.data
      console.log(data);
      setClients(data.data.final_data)

      setcounts(Math.ceil(data.data.total_data / 10))
    }
  }

  const deleteclient = async (id) => {
    const { data } = await axios.post(`${baseurl}/admin/user/delete/`, {
      ...localClients, user_id: id, role: 'client'
    })
    if (data.status === 'Success') {
      settemp(false)
      setOpen(false)
    }
  }

  useEffect(() => {
    if (query === "" && !nationName) {
      setpage(querypage.get('page') !== null ? parseInt(querypage.get('page')) : 1)
      getClients()
      settemp(true)
    }
  }, [page, nationName, query, temp])

  useEffect(() => {
    if (!token) {
      history.push("/")
      navigate("/")
    }
  }, [])
  console.log(clients)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getsingleclientdata = async (id) => {
    setclientupdateloading("dataloading")
    const localProfessional = JSON.parse(localStorage.getItem("adminLogin"))
    const { data } = await axios.put(`${baseurl}/admin/clients/`,
      { ...localProfessional, client_id: id }
    )
    setfirst_name(data.data.first_name)
    setemail(data.data.email)
    setbio(data.data.bio)
    setnation(data.data.nation)
    setmobile(data.data.mobile)
    setjoined(new Date(data.data.joined).toISOString().slice(0, 10))
    // console.log(data.data);
    setclientupdateloading("")

    setemail_verify(data.data.email_verify)
    setmobile_verify(data.data.mobile_verify)
    setlast_name(data.data.last_name)
    setprofile(data.data.profile)

  }


  const imgconverter = (file) => {
    const reader = new FileReader()

    reader.onload = () => {
      console.log(reader.result)
      setimagepreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handelchange = (e) => {
    console.log("file");
    console.log(e.target.files[0])
    let file = e.target.files[0]
    setimage(file)
    imgconverter(file)
  }

  const savechange = async (e) => {
    setclientupdateloading("update")
    const localProfessional = JSON.parse(localStorage.getItem("adminLogin"))
    console.log(localProfessional);
    const formdata = new FormData()
    formdata.set("admin_id", localProfessional.admin_id)
    formdata.set("admin_token", localProfessional.admin_token)
    formdata.set("client_id", id)
    formdata.set("first_name", first_name)
    formdata.set("last_name", last_name)
    formdata.set("email", email)
    formdata.set("email_verify", email_verify)
    formdata.set("nation", nation)
    formdata.set("mobile_no", mobile)
    formdata.set("mobile_verify", mobile_verify)
    formdata.set("bio", bio)
    formdata.set("image", image)

    console.log(image)
    const { data } = await axios.post(`${baseurl}/admin/client/update/`, formdata)
    if (data.status === 'Success') {
      setclientupdateloading("")
      setModalShow(false)
      settemp(false)
    }
    else {
      alert(data.message)
    }
    console.log(data);
  }

  const sendpageinquery = (val) => {
    navigate({
      pathname: '/dashboard/clients',
      search: `?page=${val}`
    })
  }

  const searchfilter = async (query) => {
    const { data } = await axios.post(`${baseurl}/admin/client_search_filter/`, {
      ...localClients, purpose: "search", query: query, page: page, page_size: 10
    })
    if (data.status === 'Success') {
      console.log(data);
      setClients(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
      setloading(false)
    } else {
      setClients([])
      setcounts(0)
      setloading(false)

    }
  }


  const searchfilterBynation = async (query) => {
    setloading(true)
    const { data } = await axios.post(`${baseurl}/admin/client_search_filter/`, {
      ...localClients, purpose: "filter", query: query === "All" ? "" : query, page: page, page_size: 10
    })
    if (data.status === 'Success') {
      setloading(false)
      setClients(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    } else {
      setClients([])
      setcounts(0)
      setloading(false)
    }
  }

  useEffect(() => {
    if (query) {
      searchfilter(query)
      settemp(true)
    }
  }, [page, temp])

  useEffect(() => {
    if (nationName) {
      searchfilterBynation(nationName)
      settemp(true)
    }
  }, [page, temp])
  return (
    <>
      <div className="content border-bottom mb-2">
        <div className="container-fluid">
          <div className="row">
            <div id="testkar" className="col-12 col-md-auto d-flex flex-grow-1 align-items-center heading-me-outer">
              <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                Clients List
              </h1>
              {/* <div><input type="text" placeholder="Search Professional..."/>
              </div> */}

              <div className="ms-auto">

                <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                  <div class="container-fluid">

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

                      <input style={{ width: "250px" }} onChange={(e) => {
                        searchfilter(e.target.value)
                        setnationName("")
                        setquery(e.target.value)
                        setpage(1)
                        setloading(true)
                      }} class="form-control me-2" type="search" placeholder="Search By Name and Email" aria-label="Search" />

                      <select className="counteryselect" onChange={(e) => {
                        setnationName(e.target.value)
                        setpage(1)
                        setquery("")
                        setloading(true)
                        searchfilterBynation(e.target.value)
                      }}>
                        {
                          countery.map((it) => {
                            return (<option value={it.name === "Country" ? "" : it.name}>{it.name}</option>)
                          })
                        }
                      </select>
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

        </div> :
        <>

          {!clients.length ? (<>
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
                              First Name
                            </th>
                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Last Name
                            </th>
                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Email
                            </th>
                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Email Verify
                            </th>
                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Mobile
                            </th>
                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Nation
                            </th>
                            <th
                              className="sortin text-center"
                              tabindex="0"
                              rowspan="1"
                              colspan="2"
                            >
                              Action
                            </th>
                          </tr>
                          {
                            clients.map((curEle, i) => {
                              console.log(curEle);
                              const { id, bio
                                , client_id, mobile_verify
                                , education, nation, profile, skills, joined, job_description
                                , email, email_verify, first_name, last_name, mobile_no,
                                experience
                              } = curEle;
                              return (
                                <tr id="tableRow" key={i}>

                                  {/* `/dashboard/clients/${id}`  */}
                                  <td className="field-id">
                                    {(page - 1) * 10 + i + 1}</td>
                                  <td className="field-room nowrap">
                                    {first_name.slice(0, 1).toUpperCase() + first_name.slice(1, 25)}

                                  </td>
                                  <td className="field-created_at nowrap">
                                    {last_name.slice(0, 1).toUpperCase() + last_name.slice(1, 25)}

                                  </td>
                                  <td className="field-message">
                                    {email}
                                  </td>


                                  <td className="field-message">
                                    <p>
                                      {email_verify ? "Verified" : "Unverified"}
                                    </p>
                                  </td>
                                  <td className="field-message">
                                    {mobile_no}
                                  </td>

                                  <td className="field-message">
                                    {nation.slice(0, 1).toUpperCase() + nation.slice(1, 25)}

                                  </td>
                                  <td className="akign-center nowrap">
                                    <div className="action-button ">
                                      <button id={id
                                      }
                                        onClick={(e) => {
                                          setid(e.target.id)
                                          getsingleclientdata(e.target.id)
                                          setModalShow(true)
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
                          {/*<DetailModal id={id} show={modalShow}
                      onHide={() => setModalShow(false)} />*/}
                        </table>

                        <Modal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                          size="lg"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                              Client Details
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {clientupdateloading === "dataloading" ?
                              <div style={{
                                display: "flex",
                                justifyContent: "center", marginTop: "24%"
                              }}>

                                <Spinner animation="border" />

                              </div> :
                              <div className="content">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-12">
                                      <div className="table-chat">
                                        <div className="table-chat-body table-responsive p-0 professional_details_table">


                                          <input ref={profileRef} id="pic" style={{ display: "none" }} type="file" onChange={handelchange} />




                                          <div className="table-form-input">
                                            <lable>First Name</lable>
                                            <input disabled type="text" name="first_name" onChange={(e) => setfirst_name(e.target.value)} value={first_name} />
                                          </div>

                                          <div className="table-form-input">
                                            <lable>Last Name</lable>
                                            <input disabled type="text" name="last_name" onChange={(e) => setlast_name(e.target.value)} value={last_name} />
                                          </div>


                                          <div className="table-form-input">
                                            <lable>Email</lable>
                                            <input disabled type="email" name="email" onChange={(e) => setemail(e.target.value)} value={email} />
                                          </div>
                                          <div className="table-form-input">
                                            <lable>Mobile</lable>
                                            <PhoneInput
                                              disabled
                                              value={mobile}
                                              onChange={phone => setmobile(phone)}
                                            />
                                          </div>

                                          <div className="table-form-input">
                                            <lable>Joining Date</lable>

                                            <input disabled type='date' value={joined} onChange={(e) => setjoined(e.target.value)} />

                                          </div>

                                          <div className="table-form-input">
                                            <lable>Nation</lable>
                                            <lable><input disabled type="text" name="nation" onChange={(e) => setnation(e.target.value)} value={nation} /></lable>
                                            {/*<Select options={options} value={countryValue} onChange={setCountryValue} placeholder="select country"/>*/}

                                          </div>

                                          <div id="Allimages" className="Profile_Picture pb-4 ml-0 w-100">

                                            <label >Profile Picture</label>
                                            <div className="Profile_Picture_section">
                                              <img id="imagesofI" src={imagepreview ? imagepreview : profile ? profile : avtar} />
                                              {imagepreview || profile ?
                                                <AiFillDelete cursor={'pointer'} onClick={() => {
                                                  profileRef.current.value = null
                                                  setprofile("")
                                                  setimagepreview("")
                                                }} /> :
                                                <label id="imageofAdd" htmlFor='pic' ><GrAddCircle cursor={'pointer'} size={20} /></label>

                                              }
                                            </div>
                                          </div>



                                          <div className="table-form-email">
                                            <lable>Email Verify</lable>

                                            <Switch
                                              checked={email_verify}
                                              onChange={(e) => setemail_verify(e.target.checked)}
                                              inputProps={{ 'aria-label': 'controlled' }}
                                            />

                                          </div>




                                          <div className="table-form-email">
                                            <lable>Mobile Verify</lable>

                                            <Switch
                                              checked={mobile_verify}
                                              onChange={(e) => setmobile_verify(e.target.checked)}
                                              inputProps={{ 'aria-label': 'controlled' }}
                                            />

                                          </div>







                                          <div className="w-100">
                                            <button className="table-form-btn" onClick={savechange}>{clientupdateloading==="update" ? <Spinner
                                              as="span"
                                              animation="border"
                                              size="sm"
                                              role="status"
                                              aria-hidden="true"
                                            /> : "Update"}</button>
                                          </div>

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
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
                              Are you sure you want to delete this user ?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>cancel</Button>
                            <Button onClick={() => deleteclient(id)}>ok</Button>
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
                        {/* <Pagination>
                    <Pagination.First onChange={(e)=>setpage(e.target.value)} />
                    <Pagination.Prev onChange={(e)=>setpage(e.target.value)}/>
                    <Pagination.Ellipsis />

                    <Pagination.Item active>{1}</Pagination.Item>

                    <Pagination.Ellipsis />

                    <Pagination.Next onChange={(e)=>setpage(e.target.value)}/>
                    <Pagination.Last onChange={(e)=>setpage(e.target.value)}/>
                  </Pagination> */}


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </>}
    </>
  );
};

export default Clients;
