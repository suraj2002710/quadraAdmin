import {  useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Pagination, Typography } from '@mui/material';
import axios from "axios"

import Spinner from 'react-bootstrap/Spinner';
import { Cookies } from 'react-cookie'
import { createBrowserHistory } from "history"
import { baseurl } from '../../../Baseurl';

const Category = () => {

    const history = createBrowserHistory()
    const cookie = new Cookies()
    const location=useLocation()
    const querypage=new URLSearchParams(location.search)
    const token = cookie.get('token')
    const [page, setpage] = useState(querypage.get('page')?parseInt(querypage.get('page')):1)
    const [counts, setcounts] = useState(0)
    const [categories,setcategories]=useState([])
    const localClients = JSON.parse(localStorage.getItem("adminLogin"))
    
    const [loading, setloading] = useState(true)
    const [temp, settemp] = useState(true)

  

    
    const navigate = useNavigate()
    const fetchallMaincategorys = async () => {
        setloading(true)
        const { data } = await axios.post(`${baseurl}/admin/fetch_category/`, {
            ...localClients
        })
        if (data.status === 'Success') {
        setloading(false)
            console.log(data);
            setcategories(data.data)
            setcounts()
        }
        else{
        setloading(false)

        }
    }
 
    useEffect(() => {
     
        fetchallMaincategorys()
        settemp(true)
     
    }, [page, temp])
  
  
 
    useEffect(() => {
      if (!token) {
        history.push("/")
        navigate("/")
      }
    }, [])
  
    const sendpageinquery=(val)=>{
      navigate({
        pathname:'/dashboard/Alladmin',
        search:`?page=${val}`
      })
    }
  
  


 
  
   

  return (
    <>
     <div className="content border-bottom mb-2">
              <div className="container-fluid">
                <div className="row">
                  <div id="testkar" className="col-12 heading-me-outer d-flex align-items-center">
                    <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">
                    Categories
                      
                    </h1>
                  
                    <div className="ms-auto">

                    <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                      <div class="container-fluid">
  
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
  
                        
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

        </div> :(
        <>

           
            {!categories.length? (<>
              <Typography id='nodatafound'>No Data Found</Typography>
              </>):
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
                              Category
                            </th>
                       

                            <th
                              className="sortin"
                              tabindex="0"
                              rowspan="1"
                              colspan="1"
                            >
                              Created At
                            </th>
                          </tr>
                          {
                            categories.map((curEle, i) => {
                              const { id, category,created_at } = curEle
                            
                              return (
                                <tr id="tableRow" key={i}>
                                  
                                  <td className="checkbox-select">
                                    {(page - 1) * 10 + i + 1}
                                  </td>
                                
                                  <td className="checkbox-select">
                                    {category.slice(0,1).toUpperCase() + category.slice(1,25)}
                                  </td>
                                  
                                  <td className="akign-center nowrap">
                                  {new Date(created_at).toLocaleDateString()}
                                  
                                  </td>
                                </tr>
                              )
                            })
                          }
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

export default Category