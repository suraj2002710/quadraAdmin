import React, { useState, useEffect, useRef } from "react";
import "./Datagrid.css"
// import Pagination from "react-bootstrap/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"

import { Pagination, Typography } from "@mui/material";
import { Modal, Spinner } from "react-bootstrap";
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Switch from '@mui/material/Switch';
import { MultiSelect } from 'react-multi-select-component';

import avtar from '../../images/avtar.png'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import './Professionals.css'
import { GrAddCircle } from "react-icons/gr"
import { AiFillDelete } from 'react-icons/ai'

import { baseurl } from "../../Baseurl";
import { GoUnverified, GoVerified } from "react-icons/go"
const Professionals = () => {
  const history = createBrowserHistory()
  const location = useLocation()
  const querypage = new URLSearchParams(location.search)

  const profileRef = useRef()
  const backgroundimageRef = useRef()
  const navigate = useNavigate()
  const cookie = new Cookies()
  const token = cookie.get('token')
  const [modalShow, setModalShow] = React.useState(false);
  const [professionals, setProfessionals] = useState([])
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))
  const [page, setpage] = useState(querypage.get('page') ? parseInt(querypage.get('page')) : 1)
  const [id, setid] = useState(null)
  const [counts, setcounts] = useState(0)
  const [loading, setloading] = useState(true)
  const [name, setname] = useState("")
  const [last_name, setlast_name] = useState("")
  const [email, setemail] = useState("")
  const [bio, setbio] = useState("")
  const [education, seteducation] = useState("")
  const [experience, setexperience] = useState("")
  const [job_description, setjob_description] = useState("")
  const [joined, setjoined] = useState("")
  const [mobile, setmobile] = useState("")
  const [nation, setnation] = useState("")
  const [profile, setprofile] = useState("")
  const [languages, setlanguages] = useState([])
  const [email_verify, setemail_verify] = useState("")
  const [mobile_verify, setmobile_verify] = useState("")
  
  const [image, setimage] = useState("")
  const [skills, setskills] = useState([])
  const [professionalupdateloading, setprofessionalupdateloading] = useState(false)
  
  const [languageoption, setlanguageoption] = useState([])
  const [languagevalue, setlanguagevalue] = useState([])
  const [imagepreview, setimagepreview] = useState("")
  const [backgroundimagepreview, setbackgroundimagepreview] = useState("")
  const [backgroundimage, setbackgroundimage] = useState("")
  const localProfessional = JSON.parse(localStorage.getItem("adminLogin"))
  const [skilloption, setskilloption] = useState([])
  const [skillvalue, setskillvalue] = useState([])
  const [open, setOpen] = useState(false);
  const [temp, settemp] = useState(true)
  const [fileuploadDisplay, setfileuploadDisplay] = useState('none')
  const [Ceritfiactelink, setCeritfiactelink] = useState("")
  const [filename, setfilename] = useState("")
  const [errbio, seterrbio] = useState("none")
  const [errexprince, seterrexprince] = useState("none")
  const [errjobdescription, seterrjobdescription] = useState("none")
  const [errmobile, seterrmobile] = useState("none")
  const [errimage, seterrimage] = useState("none")
  const [errbackgroundimg, seterrbackgroundimg] = useState("none")
  const [errlanguages, seterrlanguages] = useState("none")
  const [errskills, seterrskills] = useState("none")
  const [verifyopen, setverifyopen] = useState(false)
  const [userverify, setuserverify] = useState(false)
  const [educatinoFilename, seteducatinoFilename] = useState("")
  const [othereducatino, setothereducatino] = useState("none")
  const [errMsgjobdescription, seterrMsgjobdescription] = useState("Required")
  const [education_certificate, seteducation_certificate] = useState("")
  
  let skils
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

  let educations = ["Student", "Bachelore", "Masters", "Other"]
  const getSingleProfessional = async (id) => {
    setprofessionalupdateloading("dataloading")
    let res = await axios.put(`${baseurl}/admin/professionals/`, {
      ...localProfessional, professioanl_id: id
    })
    let data = res.data
    if (data.status === 'Success') {

      setprofessionalupdateloading("")

      console.log(data.data.mobile)
      setname(data.data.first_name)
      setlast_name(data.data.last_name)
      seteducation(data.data.education)
      setemail(data.data.email)
      setbio(data.data.bio)
      setmobile(data.data.mobile)
      setjob_description(data.data.job_description)
      setexperience(data.data.experience)
      setnation(data.data.nation)
      setprofile(data.data.profile)

      console.log("136", data.data.education_certificate);
      let a = data.data.education_certificate
      let lbl = a.slice(59, 73) + "......"

      setfilename(lbl)

      setCeritfiactelink(data.data.education_certificate, lbl)

      setbackgroundimage(data.data.background_image)
      var langug_string = data.data.languages.replace(/'/g, '"')
      let langu = JSON.parse(langug_string)
      console.log(JSON.parse(langug_string))
      setjoined(new Date(data.data.joined).toISOString().slice(0, 10))
      setlanguages(langu)
      let language_val = []
      langu.map((it) => {
        language_val.push({ label: it, value: it })
      })
      setlanguagevalue(language_val)
      setmobile_verify(data.data.mobile_verify)
      setemail_verify(data.data.email_verify)



      let skil = data.data.skills.replace(/'/g, '"')
      skils = JSON.parse(skil)
      console.log(skils);
      setskills(skils)
      let skillval = []
      skils.map((it) => {
        console.log('skillvalue', it);
        skillval.push({ label: it, value: it })
      })
      setskillvalue(skillval)
      console.log("🚀 ~ file: EditProfessional.js:18 ~ getSingleProfessional ~ data:", data)

    }
  }


  const getproffesionals = async () => {
    setloading(true)
    const res = await axios.post(`${baseurl}/admin/professionals/`, {
      ...localClients, page: page, page_size: 10
    });
    if (res.data.status === "Success") {
      setloading(false)
      let data = res.data
      setcounts(Math.ceil(data.data.total_data / 10))
      setProfessionals(data.data.final_data)
    }
  }
  let style = {
    outline: "0",
    borderTop: "0",
    borderRight: "0",
    borderLeft: "0",
    borderBottom: "1px solid gray",
  }

  const deleteprofessional = async (id) => {
    const { data } = await axios.post(`${baseurl}/admin/user/delete/`, {
      ...localClients, user_id: id, role: 'professional'
    })
    if (data.status === 'Success') {
      settemp(false)
      setOpen(false)
    }
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

    let file = e.target.files[0]
    setprofile(file)
    imgconverter(file)
    seterrimage("none")
  }

  const handelchangebackgroun = (e) => {

    let file = e.target.files[0]
    setbackgroundimage(file)
    let preview = URL.createObjectURL(file)
    setbackgroundimagepreview(preview)
    seterrbackgroundimg("none")
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickVerifyOpen = (id) => {
    setid(id)
    setverifyopen(true);
  };

  const handleVerifyClose = () => {
    setverifyopen(false);
  };

  useEffect(() => {
    if (!token) {
      history.push("/")
      navigate("/")
    }
  }, [])

  const savechange = async (e) => {
    console.log(languages, skills, "backgroundimage", backgroundimage, "image", image)
    if (!experience) {
      console.log("exprience");
      seterrexprince("block")
    } if (!mobile.length) {
      seterrmobile("block")
    } if (!profile) {
      seterrimage("block")
    } if (!backgroundimage) {
      seterrbackgroundimg("block")
    }
    if (!bio.length) {
      seterrbio("block")
    } if (bio.length < 100) {

    } if (!job_description.length) {
      seterrjobdescription("block")
    } if (job_description.length < 100) {
      seterrjobdescription("block")

      seterrMsgjobdescription("Minimum Length 100 words")
    }
    if (!languages.length) {
      console.log("suraj1");
      seterrlanguages("block")
    }
    if (!skills.length) {
      console.log("suraj2");
      seterrskills("block")
    }
    else if (!experience || !mobile || !profile || !bio || !job_description || job_description.length < 100 || !backgroundimage || !languages.length || !skills.length) {
      return false
    }
    else {
      const localProfessional = JSON.parse(localStorage.getItem("adminLogin"))
      setprofessionalupdateloading("update")
      console.log(localProfessional);
      const formdata = new FormData()
      formdata.set("admin_id", localProfessional.admin_id)
      formdata.set("admin_token", localProfessional.admin_token)
      formdata.set("professional_id", id)
      formdata.set("first_name", name)
      formdata.set("education", education)
      formdata.set("last_name", last_name)
      formdata.set("email", email)
      formdata.set("email_verify", email_verify)
      formdata.set("nation", nation)
      formdata.set("mobile_no", mobile)
      formdata.set("mobile_verify", mobile_verify)
      formdata.set("bio", bio)
      formdata.set("job_description", job_description)
      formdata.set("experience", experience)
      formdata.set("image", profile)
      formdata.set("skills", skills)
      formdata.set("background_image", backgroundimage)
      formdata.set("languages", [...languages])

      console.log(image)
      console.log(languages, skills, mobile);
      const { data } = await axios.post(`${baseurl}/admin/professional/update/`, formdata)
      console.log(data);
      if (data.status === 'Success') {
        // setprofessionalupdateloading(false)
        // setModalShow(false)
        // settemp(false)
        // setfileuploadDisplay("none")
        // seteducatinoFilename("")
        // seterrbio("none")
        // setbackgroundimagepreview("")
        // setimagepreview("")

        const formdatas=new FormData()
        formdatas.set("admin_id", localProfessional.admin_id)
        formdatas.set("admin_token", localProfessional.admin_token)
        formdatas.set("professional_id", id)
        formdatas.set("certificate", education_certificate)
        const { data } = await axios.post(`${baseurl}/admin/professional_certificate_admin/`, formdatas)
        console.log(data);
        if (data.status === 'Success') {
          setprofessionalupdateloading("")
          setModalShow(false)
          settemp(false)
          setfileuploadDisplay("none")
          seteducatinoFilename("")
          seterrbio("none")
          setbackgroundimagepreview("")
          setimagepreview("")
        }
      }
    }
    // console.log(data);
  }

  const verifieduser = async (id, userverify) => {
    const { data } = await axios.post(`${baseurl}/admin/professional/verify`, {
      ...localClients, professional_id: id, verify: userverify
    })
    if (data.status === 'Success') {
      setverifyopen(false)
      settemp(false)
      setid("")
    }
  }


  useEffect(() => {
    if (query === "" && !nationName) {
      setpage(querypage.get('page') !== null ? parseInt(querypage.get('page')) : 1)
      console.log("conditional query");
      getproffesionals()
      settemp(true)
    }
  }, [page,query, nationName, temp])

  console.log(professionals)

  const alllanguage = async () => {
    const { data } = await axios.post(`${baseurl}/admin/static/languages/`, {
      ...localClients, page: 1, page_size: 200
    })
    let langoption = []
    if (data.status === "Success") {
      let langu = data.data.final_data
      langu.map((it) => {

        langoption.push({ label: it.language, value: it.language })
      })
      setlanguageoption(langoption)
    }
  }

  const allskills = async () => {
    const { data } = await axios.post(`${baseurl}/admin/static/skills/`, {
      ...localClients, page: 1, page_size: 200
    })
    let skillopt = []
    if (data.status === "Success") {
      let langu = data.data.final_data
      langu.map((it) => {
        skillopt.push({ label: it.skill, value: it.skill })
      })
      setskilloption(skillopt)
    }
  }

  const sendpageinquery = (val) => {
    navigate({
      pathname: '/dashboard/professionalss',
      search: `?page=${val}`
    })
  }

  useEffect(() => {
    alllanguage()
    allskills()
  }, [])


  const searchfilter = async (query) => {
    setloading(true)
    const { data } = await axios.post(`${baseurl}/admin/professional_search_filter/`, {
      ...localClients, purpose: "search", query: query, page: page, page_size: 10
    })
    if (data.status === 'Success') {
      setloading(false)
      console.log(data);
      setProfessionals(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    } else {
      setloading(false)
      setProfessionals([])
      setcounts(0)
    }
  }

  const searchfilterBynation = async (query) => {
    setloading(true)
    console.log(query)
    const { data } = await axios.post(`${baseurl}/admin/professional_search_filter/`, {
      ...localClients, purpose: "filter", query: query === "All" ? "" : query, page: page, page_size: 10
    })
    if (data.status === 'Success') {
      console.log(data);
      setloading(false)
      setProfessionals(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    } else {
      setloading(false)
      setProfessionals([])
      setcounts(0)
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
      <div id="" className="content table-content border-bottom mb-2">
        <div className="container-fluid">
          <div className="row">
            <div id="testkar" className="col-12 col-md-auto d-flex flex-grow-1 align-items-center heading-me-outer">
              <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                Professionals List
              </h1>

              <div className="ms-auto">

                <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                  <div class="container-fluid">

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

                      <input style={{ width: "250px" }} class="form-control me-2" type="search" onChange={(e) => {
                        setpage(1)
                        searchfilter(e.target.value)
                        setquery(e.target.value)
                        setnationName("")
                      }} placeholder="Search By Name" aria-label="Search" />
                      <select className="counteryselect" onChange={(e) => {
                        setpage(1)
                        searchfilterBynation(e.target.value)
                        setnationName(e.target.value)
                        setquery("")
                      }}>
                        <option disabled>Search By Countery</option>
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

              {/*
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/admin/" className="active">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">Chat messages</li>
              </ol> */}
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



          {!professionals.length ? (<>
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
                            { /* <th
                             className="sorting_asc"
                             tabindex="0"
                             rowspan="1"
                             colspan="1"
                           >
                             Client_Id
                       
            </th>*/}

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
                              Mobile
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
                              Experience
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
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Education
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
                            professionals.map((curEle, i) => {

                              const { id, bio
                                , client_id, mobile_verify
                                , education, nation, profile, skills, joined, job_description
                                , email, email_verify, first_name, last_name, mobile,
                                experience, verified
                              } = curEle;
                              console.log(email_verify);
                              return (
                                <tr id="tableRow" key={i}>
                                  {/* `/dashboard/clients/${id}`  */}
                                  <td className="field-id">
                                    {(page - 1) * 10 + i + 1}</td>
                                  {/*<td className="field-id">{id}</td>*/}
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
                                    {mobile}
                                  </td>
                                  <td className="field-message">
                                    {email_verify ? "Verified" : "Unverified"}
                                  </td>

                                  <td className="field-message">
                                    {experience}
                                  </td>
                                  <td className="field-message">
                                    {nation.slice(0, 1).toUpperCase() + nation.slice(1, 25)}
                                  </td>

                                  <td className="field-message">
                                    {education.slice(0, 1).toUpperCase() + education.slice(1, 25)}
                                  </td>

                                  <td id="tableButoon" className="akign-center nowrap">

                                    <div className="action-button" style={{ display: "flex", columnGap: "12px" }}>
                                      <button id={id
                                      }
                                        onClick={(e) => {
                                          setid(e.target.id)
                                          console.log(e.target.id);
                                          getSingleProfessional(e.target.id)
                                          setModalShow(true)
                                        }}
                                      >
                                        <i class="fa-regular fa-pen-to-square" id={id}></i>
                                      </button>
                                      <button
                                        style={{}}
                                        id={id}
                                        onClick={(e) => {
                                          setid(e.target.id)
                                          handleClickOpen()
                                        }}
                                      >
                                        <i class="fa-solid fa-trash" id={id}></i>
                                      </button>

                                      <button
                                        style={{}}
                                        id={id}
                                        onClick={(e) => {

                                          setuserverify(verified)
                                          handleClickVerifyOpen(id)
                                        }}
                                      >
                                        {verified ?
                                          <GoVerified size={18} id={id} /> :
                                          <GoUnverified size={18} id={id} />}
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
                          onHide={() => {
                            setbackgroundimagepreview("")
                            setimagepreview("")
                            setModalShow(false)
                            seterrbackgroundimg("none")
                            seterrimage("none")
                            seterrbio("none")
                            seterrexprince("none")
                            setfileuploadDisplay("none")
                            setprofessionalupdateloading(false)
                          }}
                          size="lg"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                              Professional Details
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>

                            {professionalupdateloading==="dataloading"?
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
                                      <div className="table-chat-body table-responsive p-0 professional_details_table ">

                                        <div className="table-form-input">
                                          <lable>First Name</lable>
                                          <input type="text" disabled name="first_name" onChange={(e) => setname(e.target.value)} value={name} style={style} />
                                        </div>

                                        <div className="table-form-input">
                                          <lable>Last Name</lable>
                                          <input type="text" disabled name="last_name" onChange={(e) => setlast_name(e.target.value)} value={last_name} style={style} />
                                        </div>

                                        <div className="table-form-input">
                                          <lable>Education</lable>
                                          <select className="education_select" value={education} onChange={(e) => {
                                            seteducation(e.target.value)
                                            setfileuploadDisplay('block')
                                            setothereducatino(e.target.value === "Other" ? "block" : "none")
                                          }
                                          }>
                                            <option selected="true" disabled="disabled">Education</option>
                                            {educations.map((educat) => {
                                              return (
                                                <option value={educat}>{educat}</option>
                                              )
                                            })}
                                          </select>

                                          <div className={fileuploadDisplay}>
                                            <div id="btndiv" >
                                              <label className="uploadbtn" htmlFor="education">{educatinoFilename === "" ? "Upload File" : educatinoFilename.slice(0, 9) + "..."}</label>

                                              {/* <Typography id="spantext">{educatinoFilename}</Typography> */}
                                              <input hidden type="file" name="" onChange={(e) => {
                                                seteducatinoFilename(e.target.files[0].name)
                                                console.log(e.target.files[0]);
                                                seteducation_certificate(e.target.files[0])
                                              }} id="education" />
                                              <input type="text" name="" placeholder=" Education" className={`othereducation ${othereducatino}`} onChange={(e)=>{""}} id="" />
                                            </div>
                                          </div>

                                        </div>
                                        <div className="table-form-input">
                                          <lable>Email</lable>
                                          <input type="email" disabled name="email" onChange={(e) => setemail(e.target.value)} value={email} style={style} />
                                        </div>
                                        <div className="table-form-input">
                                          <lable>Joining Date</lable>
                                          <input type="date" disabled name="joined" onChange={(e) => setjoined(e.target.value)} value={joined} style={style} />
                                        </div>

                                        <div className="table-form-input">
                                          <lable>Nation</lable>
                                          <input disabled type="text" name="nation" onChange={(e) => setnation(e.target.value)} value={nation} style={style} />
                                        </div>

                                        <div className="table-form-input">
                                          <lable>Experience</lable>

                                          <input type="number" name="experience" onChange={(e) => {
                                            seterrexprince('none')
                                            setexperience(e.target.value)
                                          }} value={experience} style={style} />
                                          <span className={errexprince}>experience</span>
                                        </div>


                                        <div className="table-form-input">
                                          <lable>Mobile</lable>
                                          <lable>
                                            <PhoneInput
                                              value={mobile}
                                              disabled
                                              onChange={phone => {
                                                console.log(phone);
                                                setmobile(phone)
                                                seterrmobile("none")
                                              }}

                                            />
                                          </lable>
                                          <span className={errmobile}>mobile</span>

                                        </div>

                                        <div className="table-form-input">
                                          <lable>Languages</lable>

                                          <MultiSelect
                                            options={languageoption}
                                            value={languagevalue}
                                            onChange={(val) => {
                                              console.log(val);
                                              setlanguagevalue(val)
                                              let lang = []
                                              val.map((it) => {
                                                lang.push(it.value)
                                              })
                                              seterrlanguages("none")
                                              setlanguages(lang)
                                            }}
                                            labelledBy="Select"
                                          />
                                          <span className={errlanguages}>Language Required</span>
                                        </div>


                                        <div className="table-form-input">
                                          <label>Skills</label>

                                          <MultiSelect
                                            options={skilloption}
                                            value={skillvalue}
                                            onChange={(val) => {
                                              console.log(val);
                                              seterrskills("none")
                                              setskillvalue(val)
                                              let arr = []
                                              val.map((it) => {
                                                arr.push(it.value)
                                              })
                                              setskills(arr)
                                            }}
                                            labelledBy="Select"
                                          />

                                          <span className={errskills}>Skills Required</span>
                                        </div>

                                        <div className="table-form-input">
                                          <label>Download Your Document</label>

                                          <a id="dwldlink" href={Ceritfiactelink} download={Ceritfiactelink} target="_blank">{filename}</a>
                                          {/*<button className="btndwnld" onClick={()=>{
                                            
                                            fileDownload(Ceritfiactelink,filename)}}>
                                            <RiFileDownloadFill size={20}/>
                                         
                                          </button>*/}


                                        </div>


                                        <div className="uplode-pic">
                                          <div className="Profile_Picture">
                                            <label>Profile Picture</label>




                                            <div id="Allimages">
                                              <img id="imagesofI" src={imagepreview ? imagepreview : profile ? profile : avtar} />

                                              <div className="delete-icon">
                                                {imagepreview || profile ?
                                                  <AiFillDelete id="imageofdel" size={15} cursor={'pointer'} onClick={() => {
                                                    profileRef.current.value = null
                                                    setimage("")
                                                    setprofile("")
                                                    setimagepreview("")
                                                  }} /> :
                                                  <label id="imageofAdd" htmlFor='pic' ><GrAddCircle cursor={'pointer'} size={20} /></label>}
                                              </div>
                                              <span className={errimage}>Image</span>




                                              <input ref={profileRef} id="pic" style={{ display: "none" }} type="file" onChange={handelchange} />
                                            </div>
                                          </div>

                                          <div className="Profile_Picture Profile_Picture_second ">
                                            <lable>Background Image</lable>
                                            <div id="Allimages" className="mt-3">
                                              <img id="imagesofI" src={backgroundimagepreview ? backgroundimagepreview : backgroundimage ? backgroundimage : avtar} />
                                              <div style={{ display: 'flex' }}>

                                                {backgroundimagepreview || backgroundimage ?
                                                  <AiFillDelete id="imageofdel" cursor={'pointer'} size={20} onClick={() => {
                                                    setbackgroundimage("")
                                                    setbackgroundimagepreview("")
                                                    profileRef.current.value = null
                                                  }} /> :

                                                  <label id="imageofAdd" htmlFor='pic2' ><GrAddCircle cursor={'pointer'} size={20} /></label>}
                                              </div>
                                              <span className={errbackgroundimg}>backgroundimage</span>

                                              <input ref={backgroundimageRef} id="pic2" style={{ display: "none" }} type="file" onChange={handelchangebackgroun} />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="table-form-email">
                                          <lable>Email Verify</lable>
                                          <lable>  <Switch
                                            checked={email_verify}
                                            onChange={(e) => setemail_verify(e.target.checked)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                          /></lable>
                                        </div>

                                        <div className="table-form-email">
                                          <lable>Mobile Verify</lable>
                                          <lable>
                                            <Switch
                                              checked={mobile_verify}
                                              onChange={(e) => setmobile_verify(e.target.checked)}
                                              inputProps={{ 'aria-label': 'controlled' }}
                                            /></lable>
                                        </div>

                                        <div className="table-form-textarea">
                                          <lable>Bio</lable>
                                          <textarea type="text" name="bio" onChange={(e) => {
                                            seterrbio("none")
                                            setbio(e.target.value)
                                          }} value={bio} style={style} ></textarea>

                                          <span className={errbio}>bio</span>

                                        </div>


                                        <div className="table-form-textarea">
                                          <label>Job Description</label>
                                          <textarea type="text" name="job_description" onChange={(e) => {
                                            seterrjobdescription("none")
                                            setjob_description(e.target.value)
                                          }} value={job_description} ></textarea>
                                          <span className={errjobdescription}>{errMsgjobdescription}</span>

                                        </div>


                                        <button className="table-form-btn" onClick={savechange} style={{}}>{professionalupdateloading === 'update' ? <Spinner
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
      }
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
                              Are You Sure You Want To Delete This User And All Data Delete Related This User?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>cancel</Button>
                            <Button onClick={() => deleteprofessional(id)}>ok</Button>
                          </DialogActions>
                        </Dialog>

                        <Dialog
                          open={verifyopen}
                          // TransitionComponent={Transition}
                          keepMounted
                          onClose={handleVerifyClose}
                          aria-describedby="alert-dialog-slide-description"
                        >
                          <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                              <div className="userverify">
                                {/* <lable>User Verification</lable> */}
                                {userverify ? "Unverify" : "Verify"} this user ?
                                <lable>  <Switch
                                  checked={userverify}
                                  onChange={(e) => setuserverify(e.target.checked)}
                                  inputProps={{ 'aria-label': 'controlled' }}
                                /></lable>
                              </div>
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleVerifyClose}>cancel</Button>
                            <Button onClick={() => verifieduser(id, userverify)}>ok</Button>
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
      }

    </>
  );
};

export default Professionals;
