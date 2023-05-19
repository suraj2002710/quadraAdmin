import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import "./App.css";
import "./style.css";
import "./responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatAttachment from "./QuadraChat/ChatAttachment";
import ChatMessage from "./QuadraChat/ChatMessage";
import {Cookies} from "react-cookie"
import Clients from "./components/Clients/Clients";
import Professionals from "./components/Professional/Professionals";
import ClientCategory from "./components/Clients/Category/ClientCategory";
import Professionalcategory from "./components/Clients/Category/Professionalcategory";
import Rating from "./components/ratings/Rating";
import Language from "./components/language/Language";
import Skills from "./components/skills/Skills";
import Footerlinks from "./components/footerlinks/Footerlinks";
import Subcategory from "./components/Clients/Category/Subcategory";
import {createBrowserHistory} from "history"
import Social_media from "./components/social_media/Social_media";
import ProfessionalNotification from "./components/notification/ProfessionalNotification";

import Clientnotification from "./components/notification/Clientnotification";
import Profilecreation from "./components/profilecreation/Profilecreation";
import Wallet from "./components/wallet/ClientWallet";
import ProfessionalWallet from "./components/wallet/ProfessionalWallet";
import Stripe from "./components/stripe/Stripe";
import Like from "./components/liked/Liked";
import Customer from "./components/stripe/Customer";
import Session from "./components/session.js/AdminSession";
import ClientSession from "./components/session.js/ClientSession";
import Professionalsession from "./components/session.js/Professionalsession";
import Alladmin from "./components/All_admin/Alladmin";
import Buysellpayment from "./components/Payment/BuysellpaymentClient";
import BuysellpaymentProfessional from "./components/Payment/BuysellpaymentProfessional";
import Allprojects from "./components/QuadraProjects/Allprojects"
import Allmilstonedetails from "./components/QuadraProjects/Allmilstonedetails"
import MilstonPayment from "./components/QuadraProjects/MilstonPayment"
import AdminNotification from "./components/All_admin/AdminNotification";
import ProjectReject from "./components/QuadraProjects/ProjectReject";
import Category from "./components/Clients/Category/Category";
import Alldesgins from "./components/alldesgin/Alldesgins";
import Reports from "./components/Clients/Reports";
import AlldesginCategory from "./components/alldesgin/AlldesginCategory";
import ArchitecturalDesgins from "./components/alldesgin/ArchitecturalDesgins";
import VisualizationDesgins from "./components/alldesgin/VisualizationDesgins";
import BuysellDesgins from "./components/alldesgin/BuysellDesgins";
import Subscription from "./subscription/Subscription";
import PurchaseSubscription from "./components/Professional/PurchaseSubscription";
import User_q from "./components/User_query/User_q";
import LogCli from "./components/Clients/LogCli";
import LogPro from "./components/Professional/LogPro";
import Professionalhelp from "./components/Help/Professionalhelp";
import Clienthelp from "./components/Help/Clienthelp";
import Laststep from "./components/Help/Laststep";
function App() {
  const history=createBrowserHistory()

const cookie= new Cookies()
//  const navigate=useNavigate()
  let token=cookie.get("token")
console.log(cookie.get());


  return (
    <BrowserRouter basename={'/admin'}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route
            path="/dashboard/chat-attachments"
            element={<ChatAttachment />}
          />
          <Route path="/dashboard/chat-message" element={<ChatMessage />} />
          <Route path="/dashboard/clients" element={<Clients/>} />
          <Route path="/dashboard/professionalss" element={<Professionals/>} />
          <Route path="/dashboard/client/category" element={<ClientCategory/>} />
          <Route path="/dashboard/professionals/category" element={<Professionalcategory/>} />
          <Route path="/dashboard/ratings" element={<Rating/>} />s
          <Route path="/dashboard/language" element={<Language/>} />
          <Route path="/dashboard/skills" element={<Skills/>} />
          <Route path="/dashboard/footerlinks" element={<Footerlinks/>} />
          <Route path="/dashboard/subcategory" element={<Subcategory/>} />
          <Route path="/dashboard/social_links" element={<Social_media/>} />
          <Route path="/dashboard/notification/professional" element={<ProfessionalNotification/>} />
          <Route path="/dashboard/notification/client" element={<Clientnotification/>} />
          <Route path="/dashboard/architectural/:pid" element={<ArchitecturalDesgins/>} />
          <Route path="/dashboard/visulization/:pid" element={<VisualizationDesgins/>} />
          <Route path="/dashboard/buysell/:pid" element={<BuysellDesgins/>} />
          <Route path="/dashboard/alldesgin" element={<Alldesgins/>} />
          <Route path="/dashboard/profilecreate" element={<Profilecreation/>} />
          <Route path="/dashboard/clientwallet" element={<Wallet/>} />
          <Route path="/dashboard/professionalwallet" element={<ProfessionalWallet/>} />
          <Route path="/dashboard/stripe" element={<Stripe/>} />
          <Route path="/dashboard/like" element={<Like/>} />
          <Route path="/dashboard/customer" element={<Customer/>} />
          <Route path="/dashboard/adminsession" element={<Session/>} />
          <Route path="/dashboard/clientsession" element={<ClientSession/>} />
          <Route path="/dashboard/professionalsession" element={<Professionalsession/>} />
          <Route path="/dashboard/Alladmin" element={<Alladmin/>} />
          <Route path="/dashboard/buysellpaymentClient" element={<Buysellpayment/>} />
          <Route path="/dashboard/buysellpaymentProfessional" element={<BuysellpaymentProfessional/>} />
          <Route path="/dashboard/allprojects/:key" element={<Allprojects/>} />
          <Route path="/dashboard/milestones" element={<Allmilstonedetails/>} />
          <Route path="/dashboard/adminnotification" element={<AdminNotification/>} />
          <Route path="/dashboard/projectreject" element={<ProjectReject/>} />
          <Route path="/dashboard/categories" element={<Category/>} />
          <Route path="/dashboard/reports" element={<Reports/>} />
          <Route path="/dashboard/alldesgins/:id" element={<AlldesginCategory/>} />
          <Route path="/dashboard/subscription" element={<Subscription/>} />
          <Route path="/dashboard/purchasesubscription" element={<PurchaseSubscription/>} />
          <Route path="/dashboard/userquerys" element={<User_q/>} />
          <Route path="/dashboard/LogCli" element={<LogCli/>} />
          <Route path="/dashboard/LogPro" element={<LogPro/>} />
          <Route path="/dashboard/professionalhelp" element={<Professionalhelp/>} />
          <Route path="/dashboard/clienthelp" element={<Clienthelp/>} />
          <Route path="/dashboard/laststep" element={<Laststep/>} />




        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
