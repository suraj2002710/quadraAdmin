import {  useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios"
import { Spinner } from 'react-bootstrap';
import { Pagination, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { baseurl } from '../../Baseurl';
import DetailModal from './DetailModal';
const Clientnotification = () => {
    const [maindata, setMaindata] = useState([])
  const location=useLocation()
  const navigate = useNavigate()

  const querypage=new URLSearchParams(location.search)

  const [loading, setloading] = useState(true)

  const [id, setid] = useState("")
  const [page, setpage] = useState(querypage.get('page')?parseInt(querypage.get('page')):1)
  const [counts, setcounts] = useState(0)
  const [open, setOpen] = useState(false);
  const [query, setquery] = useState("")

  const [modalShow, setModalShow] = useState(false)
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))
  const [temp, setTemp] = useState(true)
  useEffect(() => {
    if(query === ""){
      setpage(querypage.get('page')!==null?parseInt(querypage.get('page')):1)
    axios.post(`${baseurl}/admin/all-notifications/`, { ...localClients, user_role: "client", page: page, page_size: 10 })
      .then(res => {
        console.log(res.data.data.total_data);
        if (res.data.status == "Success") {
          setMaindata(res.data.data.final_data)
          console.log(Math.ceil(res.data.data.total_data / 10));
          setcounts(Math.ceil(res.data.data.total_data / 10))
          setloading(false)
        }
        console.log(maindata);
      })
      .catch(error => (console.log(error)))
    setTemp(true)
    }
  }, [page,temp,query])
  
  const sendpageinquery=(val)=>{
    navigate({
      pathname:'/dashboard/notification/client',
      search:`?page=${val}`
    })
  }
 
  const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

  const deletenotification = (id) => {
    axios.post(`${baseurl}/admin/notification/delete/`, { ...localClients, notification_id: id }).then((res) => {
      if(res.data.status==="Success"){
      console.log(res);
      setTemp(false)
      setOpen(false)
      }else{
        let data=res.data
        alert(data.message)
      }
    }).catch(error => {
      console.log(error);
    })
  }



  const searchfilter = async (query) => {
    setloading(true)
    const { data } = await axios.post(`${baseurl}/admin/search_notification_client/`, {
      ...localClients, query: query, page: page, page_size: 10
    })
    if (data.status === 'Success') {
      console.log(data);

      setMaindata(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
      setloading(false)
    } else {
      setloading(false)

      setMaindata([])
      setcounts(0)
    }
  }


  useEffect(() => {
  
    if(query){
      
      searchfilter(query)
      setTemp(true)
    }
    }, [temp,page])
  return (
    <>
     <div className="content border-bottom mb-2">
            <div className="container-fluid">
              <div className="row">
                <div className=" d-flex  align-items-center heading-me-outer search">
                  <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                   Client Notification
                  </h1>

                  <input style={{ width: "250px" }} onChange={(e) => {
                    setquery(e.target.value)
                    setpage(1)
                    if(e.target.value){
                      searchfilter(e.target.value)
                    }
                  }} class="form-control me-2" type="search" placeholder="Search By Name" aria-label="Search" />

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

      </div> :(
        <>
          {!maindata.length ? (<>
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
                            S no.
                          </th>
                          

                       
                          <th
                            className="sortin"
                            tabindex="0"
                            rowspan="1"
                            colspan="1"
                          >
                            Name
                          </th>
                          <th
                            className="sortin"
                            tabindex="0"
                            rowspan="1"
                            colspan="1"
                          >
                            Notification
                          </th>

                          <th
                            className="sortin"
                            tabindex="0"
                            rowspan="1"
                            colspan="1"
                          >
                            Seen
                          </th>

                          <th
                          className="sortin"
                          tabindex="0"
                          rowspan="1"
                          colspan="1"
                        >
                          Dates
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
                            const { id, client_id, created_at, professional_id, name, notification, seen, total_data } = curEle;

                            return (
                              <tr key={i}>
                                
                                <td className="checkbox-select">
                                  {(page - 1) * 10 + i + 1}
                                </td>
                               

                               
                                <td className="checkbox-select">
                                {/* {name.slice(0,1).toUpperCase() + name.slice(1,25)} */}
                                {
                                  name.split(" ").map((word)=>{
                                      return (
                                      <>
                                      
                                      {" "}  {word.slice(0,1).toUpperCase() + word.slice(1,25)}</>
                                  )})
                                  
                                 }
                                </td>
                                <td className="checkbox-select">
                                {notification}
                                </td>
                                <td className="checkbox-select">
                                  {seen?"True":"False"}
                                </td>
                                <td className="checkbox-select">
                                {new Date(created_at).toLocaleDateString()}
                              </td>
                                <td className="akign-center nowrap">
                                <div style={{ display: "flex" }}>
                                     
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

                        <DetailModal role={"notification"} id={id} show={modalShow}
                          onHide={() => setModalShow(false)} />


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
                              Are you sure you want to delete this notification ?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>cancel</Button>
                            <Button onClick={() =>  deletenotification(id)}>ok</Button>
                          </DialogActions>
                        </Dialog>
                      </table>

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

export default Clientnotification
