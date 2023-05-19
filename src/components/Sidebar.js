import React, { useEffect, useState } from "react";
import {
  FaUserTie,
  FaChevronCircleRight,
  FaUsers,
  FaLanguage,
  FaMendeley,
  FaTelegramPlane,
  FaUserClock,
} from "react-icons/fa";
import { BsFillArrowRightCircleFill, BsFillBellFill } from "react-icons/bs";
import { AiFillNotification, AiFillStar, AiOutlineAntDesign, AiOutlineFieldTime, AiOutlineUser } from "react-icons/ai";
import { FiCommand, FiList } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import AdminLTELogo from "../images/AdminLTELogo.png";
import { TreeItem, TreeView } from "@material-ui/lab";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import "./Sidebar.css";
import MainLogo from "../images/MainLogo.png";
import slidelogo from "../images/slidelogo.png";
import {MdPayment,MdOutlineCancelPresentation,MdSubscriptions ,MdDoneOutline ,MdOutlineIncompleteCircle, MdOutlinePendingActions ,MdCategory, MdOutlinePhonelinkSetup, MdDragIndicator, MdQueryStats } from "react-icons/md";
import { RiProjectorFill, RiProfileLine } from 'react-icons/ri'
import { TfiWallet } from 'react-icons/tfi'
import {FaRunning} from 'react-icons/fa'
import { AiFillLike } from "react-icons/ai"
import {GrCompliance} from 'react-icons/gr'
import {TiCancel} from "react-icons/ti"
import {TbListDetails} from "react-icons/tb"
const Sidebar = () => {
  const [miniBar, setMiniBar] = useState(false);
  const [category_Ids, setcategory_Ids] = useState([]);
  const localClients = JSON.parse(localStorage.getItem("adminLogin"));
  const [addclass, setaddclass] = useState("");
  const [active , setActive] = useState(false);
  const[activeclass, setActiveclass] =useState("")

  const activeClasses=(e)=>{
    const et=e.target
      let active=document.querySelector(".actives");
      if(active){
        active.classList.remove("actives");
      }
      et.classList.add("actives");
  }

  const fetchallMaincategorys = async () => {
    const { data } = await axios.post(
      "http://13.52.16.160:8082/admin/fetch_category/",
      {
        ...localClients,
      }
    );
    if (data.status === "Success") {
      console.log(data);
      setcategory_Ids(data.data);
    }
  };
  useEffect(() => {
    fetchallMaincategorys();
  }, []);

  const changsidebar = () => {
    console.log("suraj");
    if (addclass === "changsidebar") {
      setaddclass("");
    } else {
      setaddclass("changsidebar");
    }
  };
  return (
    <>
 
      <aside
        onMouseOver={() => setMiniBar(true)}
        id="mySidebar"
        className={`main-sidebar elevation-4 sidebar-dark-teal ${addclass} `}
      >
        <div className="navbar-teal" >
          <NavLink id="link" to={"/dashboard"} className="brand-link navbar-teal active">
            <img id="imag" src={MainLogo} alt="logo" />{" "}
            <img id="imag1" className="slide_logo" src={slidelogo} alt="logo" />
          </NavLink>
        </div>
        <div className="humberger_icon">
          <button onClick={changsidebar}>
            <i
              style={{ cursor: "pointer" }}
              class="fa fa-bars"
              aria-hidden="true"
            ></i>
            <img src="https://img.icons8.com/material-outlined/24/ffffff/multiply--v1.png" />
          </button>
        </div>
        <div className={`sidebar `}>
        

          <nav className="sidenav">
            <ul className="nav nav-pills nav-sidebar flex-column nav-legacy  nav-compact focusonlink">
              <li className="nav-item">
                
             
                  <span className="nav-link" >Quadra Admin</span>
            
                <ul className="focusonlink">
                  <li>
                    <NavLink className="navlinkchild " to="/dashboard/Alladmin">
                      <FaUsers className="logoofsidebar"></FaUsers>
                      <span>All Users</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="navlinkchild "  to="/dashboard/adminsession">
                    <FaUserClock className="logoofsidebar" />
                      <span>AdminSession</span>
                    </NavLink>
                  </li>

               
                  <li>
                    <NavLink className="navlinkchild "  to="/dashboard/adminnotification">
                    <BsFillBellFill className="logoofsidebar" />
                      <span>Notification</span>
                    </NavLink>
                  </li>
           
                </ul>
              </li>

              <li className="nav-item"> 
          
                
                  <span className="nav-link"> Quadra Professionals</span>
          
                <ul className="focusonlink">
                  <li className="nav-item">
                  <NavLink className="navlinkchild "  to={"/dashboard/professionalss"}>
                      
                      <AiOutlineUser className="logoofsidebar"  />
                      <span>All Professionals</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink className="navlinkchild "  to={"/dashboard/LogPro"}>
                      
                      <TbListDetails   className="logoofsidebar"  />
                      <span>Login Details</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navlinkchild "  to={"/dashboard/professionals/category"}>
                      <MdCategory className="logoofsidebar" />
                      <span>SubCategories</span>
                    </NavLink>
                  </li>
                  <li>
                  <NavLink className="navlinkchild "  to={"/dashboard/professionalwallet"}>

                      <TfiWallet className="logoofsidebar" />
                      <span>Wallet</span>
                    </NavLink>
                  </li>
                  <li>

                    <NavLink className="navlinkchild "  to={'/dashboard/notification/professional'}>
                      <AiFillNotification className="logoofsidebar" />
                      <span>
                        Notifications
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navlinkchild "  to={"/dashboard/stripe"}>
                      <RiProfileLine className="logoofsidebar" />
                      <span>Connect Account</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="navlinkchild "  to={"/dashboard/professionalsession"}>
                      <AiOutlineFieldTime className="logoofsidebar"></AiOutlineFieldTime>
                      <span>Session</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="navlinkchild "  to={"/dashboard/buysellpaymentProfessional"}>
                    <MdPayment className="logoofsidebar"/>
                     <span>
                     BuysaleDesgins Payment
                      </span>
                 
                    </NavLink>
                  </li>
                
                  <li className="nav-item">
                  <NavLink className="navlinkchild "   to="/dashboard/alldesgin">
                      <RiProjectorFill className="logoofsidebar" />
                      <span>All Designs</span>
                    </NavLink>
              </li>

              <li className="nav-item">
                  <NavLink className="navlinkchild "  to={"/dashboard/purchasesubscription"}>
                      
                      <AiOutlineUser className="logoofsidebar"  />
                      <span>Purchase Subscription</span>
                    </NavLink>
                  </li>
                </ul>
              </li>


           

              <li className="nav-item">
              
                  <span className="nav-link"> Quadra Clients</span>
               
                <ul className="focusonlink">
                  <li className="nav-item">
                    <NavLink className="navlinkchild "   to="/dashboard/clients">
                      <AiOutlineUser className="logoofsidebar" />
                      <span>All Clients</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navlinkchild "   to="/dashboard/LogCli">
                      <TbListDetails className="logoofsidebar" />
                      <span>Login Details</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navlinkchild "   to={"/dashboard/client/category"}>
                      <MdCategory className="logoofsidebar"/>
                      <span>SubCategories</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="navlinkchild "  to={"/dashboard/clientwallet"}>

                      <TfiWallet className="logoofsidebar"/>
                      <span>Wallet</span>
                    </NavLink>
                  </li>
                  <li>

                    <NavLink className="navlinkchild "  to={'/dashboard/notification/client'}>
                      <AiFillNotification className="logoofsidebar"/>
                      <span>
                        Notifications
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navlinkchild "  to={"/dashboard/customer"}>
                      <RiProfileLine className="logoofsidebar"/>
                      <span>Customer Account</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="navlinkchild "  to={"/dashboard/clientsession"}>
                         <AiOutlineFieldTime className="logoofsidebar"></AiOutlineFieldTime>
                 <span>Session</span>
                    </NavLink>
                  </li>
                 
                  <li className="nav-item">
                    <NavLink className="navlinkchild "   to="/dashboard/reports">
                      <AiOutlineUser className="logoofsidebar" />
                      <span>All Reports</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink className="navlinkchild "  to={"/dashboard/buysellpaymentClient"}>
                      <MdPayment className="logoofsidebar"></MdPayment>
                    <span> Purchased Designs</span>
                    </NavLink>
                  </li>
                </ul>
              </li>


              <li className="nav-item">
          
             
                  <span className="nav-link">Quadra Projects</span>
          
                <ul className="focusonlink">

                  <li>
                    <NavLink className="navlinkchild " state={{data:1}} to="/dashboard/allprojects/pending">
                    <MdOutlinePendingActions className="logoofsidebar" />
                      <span>Pending</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="navlinkchild " state={{data:1}} to="/dashboard/allprojects/approved">
                    <FaRunning className="logoofsidebar" />
                      <span>Running</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="navlinkchild " state={{data:1}} to="/dashboard/allprojects/completed">
                    <MdOutlineIncompleteCircle className="logoofsidebar" />
                      <span>Completed</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="navlinkchild " state={{data:1}} to="/dashboard/allprojects/declined">
                    <TiCancel className="logoofsidebar"/>
                      <span>Declined</span>
                    </NavLink>
                  </li>

                 
                  <li>
                    <NavLink className="navlinkchild " state={{data:1}} to="/dashboard/allprojects/accepted">
                    <MdDoneOutline className="logoofsidebar" />
                      <span>Accepted</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="navlinkchild "  to="/dashboard/projectreject">
                    <MdOutlineCancelPresentation className="logoofsidebar"/>
                      <span>Milestone Reject Reasons</span>
                    </NavLink>
                  </li>
            
                </ul>
              </li>



              <li className="nav-item">
               
             
                  <span className="nav-link"> Quadra Main</span>
             
                <ul className="focusonlink">
                  <li className="nav-item">
                    <NavLink className="navlinkchild "  to={"/dashboard/like"}>
                      <AiFillLike className="logoofsidebar"/>
                      <span>All Likes</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navlinkchild "  to={"/dashboard/ratings"}>
                      <AiFillStar className="logoofsidebar"/>
                      <span>All Ratings</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navlinkchild "  to={"/dashboard/userquerys"}>
                      <MdQueryStats className="logoofsidebar"/>
                      <span>User Query</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                 <NavLink className="navlinkchild "  to={"/dashboard/professionalhelp"}>
                   <AiFillLike className="logoofsidebar"/>
                   <span>Professional Help</span>
                 </NavLink>
               </li>
               <li className="nav-item">
                 <NavLink className="navlinkchild "  to={"/dashboard/clienthelp"}>
                   <AiFillStar className="logoofsidebar"/>
                   <span>Client Help</span>
                 </NavLink>
               </li>
               <li className="nav-item">
                 <NavLink className="navlinkchild "  to={"/dashboard/laststep"}>
                   <MdQueryStats className="logoofsidebar"/>
                   <span>Last Step</span>
                 </NavLink>
               </li>

               <li className="nav-item">
                 <NavLink className="navlinkchild "  to={"/dashboard/earnreview"}>
                   <MdQueryStats className="logoofsidebar"/>
                   <span>Earn Review</span>
                 </NavLink>
               </li>

                </ul>
              </li>


              <li className="nav-item">
           
                
                  <span className="nav-link"> Quadra Static</span>
               
                <ul className="focusonlink">
                  <li>
                    <NavLink className="navlinkchild " to={"/dashboard/categories"} >
                     <MdDragIndicator className="logoofsidebar" ></MdDragIndicator>
                      <span>Categories</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navlinkchild "  to={"/dashboard/subcategory"}>
                      <FaMendeley className="logoofsidebar"/>
                      <span>Subcategories</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navlinkchild "  to={"/dashboard/social_links"}>
                      <FaTelegramPlane className="logoofsidebar"/>
                      <span>SocialMedia links</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navlinkchild "  to={"/dashboard/footerlinks"}>
                      <MdOutlinePhonelinkSetup className="logoofsidebar"/>
                      <span>All Footerlinks</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navlinkchild "  to={"/dashboard/profilecreate"}>
                      <RiProfileLine className="logoofsidebar"/>
                      <span>Profile Points</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="navlinkchild "  to={"/dashboard/skills"}>
                      <FiCommand className="logoofsidebar"/>
                      <span>All Skills</span>
                    </NavLink>
                  </li>


                  <li className="nav-item">
                    <NavLink className="navlinkchild "  to={"/dashboard/language"}>
                      <FaLanguage className="logoofsidebar"/>
                      <span>Signup Languages</span>
                    </NavLink>
                  </li>
                  <li>
                  <NavLink className="navlinkchild "  to="/dashboard/subscription">
                  <MdSubscriptions className="logoofsidebar" />
                    <span>Subscription Plan</span>
                  </NavLink>
                </li>

                </ul>
              </li>
              
              {/* <li className="nav-item">
               
             
               <span className="nav-link"> Quadra Help</span>
          
             <ul className="focusonlink">
               <li className="nav-item">
                 <NavLink className="navlinkchild "  to={"/dashboard/professionalhelp"}>
                   <AiFillLike className="logoofsidebar"/>
                   <span>Professional Help</span>
                 </NavLink>
               </li>
               <li className="nav-item">
                 <NavLink className="navlinkchild "  to={"/dashboard/clienthelp"}>
                   <AiFillStar className="logoofsidebar"/>
                   <span>Client Help</span>
                 </NavLink>
               </li>
               <li className="nav-item">
                 <NavLink className="navlinkchild "  to={"/dashboard/laststep"}>
                   <MdQueryStats className="logoofsidebar"/>
                   <span>Last Step</span>
                 </NavLink>
               </li>
             </ul>
           </li> */}

           
              

                <li><hr /></li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
