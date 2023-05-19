import { Pagination } from '@material-ui/lab'
import { Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { baseurl } from '../../Baseurl'

const Reports = () => {

  const [report, setreport] = useState([])
  const localClients = JSON.parse(localStorage.getItem("adminLogin"))
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const querypage = new URLSearchParams(location.search)
  const [page, setpage] = useState(querypage.get('page') ? parseInt(querypage.get('page')) : 1)
  const [counts, setcounts] = useState(0)
  const [showdesc,setshowdesc]=useState("")
  const singlereport = async () => {
    const { data } = await axios.post(`${baseurl}/admin/buysale_report_by_id/`, {
      ...localClients, report_id: querypage.get('state')
    })
    if (data.status === 'Success') {
      console.log(data);
      setreport([data.data])
    }
  }

  const getReport = async () => {
    setloading(true)
    const { data } = await axios.post(
      `${baseurl}/admin/reports/`, {
      ...localClients, page: page, page_size: 10
    }
    )
    if (data.status === 'Success') {
      setloading(false)
      console.log(data.data.final_data);
      setreport(data.data.final_data)
      setcounts(Math.ceil(data.data.total_data / 10))
    }
    else {
      setloading(false)
      setreport([])
    }
  }

  useEffect(() => {
    if(querypage.get('state')){
      singlereport()
      // return false
    }else{

      getReport()
    }
  }, [page, page])

  useEffect(() => {
    if (querypage.get('state')) {
      console.log(querypage.get('state'));
    }
  })


  const sendpageinquery = (val) => {
    navigate({
      pathname: '/dashboard/reports',
      search: `?page=${val}`
    })
  }

  let rows
  // report && report.forEach((it) => {
  //   if (it.id === parseInt(querypage.get('state'))) {
  //     console.log(querypage.get('state'))
  //     let row = document.getElementById(querypage.get('state'))
  //     console.log(row);
  //     rows = row
  //   }
  // })
  console.log(rows)


  return (
    <>
      <div className="content border-bottom mb-2">
        <div className="container-fluid">
          <div className="row">
            <div id="testkar" className="col-12 heading-me-outer d-flex align-items-center">
              <h1 id="professionalss" className="h4  pr-3 mr-3 border-right heading-me">


                All Reports
              </h1>
              {/*                   
                    <div className="ms-auto">

                    <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                      <div class="container-fluid">
  
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
  
                          <form class="d-flex" role="search">
                          <input style={{ width: "250px" }} onChange={(e)=>{
                            }} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                         
                          </form>
                          
                        </div>
                      </div>
                    </nav>
                  </div> */}

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


            {!report.length ? (<>
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
                                Query
                              </th>

                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Attachment
                              </th>

                              <th
                                className="sortin"
                                tabindex="0"
                                rowspan="1"
                                colspan="1"
                              >
                                Date
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
                              report.map((curEle, i) => {
                                const { id, attachment, buysell_id, date, professional_id, query } = curEle
                                // console.log(rating);
                                return (
                                  <tr id={""} key={i}>

                                    <td className="checkbox-select">
                                      {(page - 1) * 10 + i + 1}
                                    </td>

                                    <td className="checkbox-select onlythis">
                                        
                                {
                                    query ==="" ? <Typography>No Query</Typography>:
                                    showdesc=== i+1 ? <span>
                                      {query} <span className='showless' id={i+1} onClick={(e)=>{
                                        setshowdesc("")
                                      }}>show less</span>
                                    </span>      :
                                   <span>
                                   {query.length>50 ? query.slice(0,50)+'.....':query} {query.length<50 ?null :<span className='showless' id={i+1} onClick={(e)=>{
                                     setshowdesc(parseInt(e.target.id))
                                   }}>show</span>}
                                 </span>    }
                                    </td>

                                    <td className="checkbox-select">

                                      <a href={attachment} download={attachment} target='_blank'>{attachment.slice(47, 75)}</a>
                                    </td>

                                    <td className="checkbox-select">
                                      {new Date(date).toLocaleDateString()}
                                    </td>

                                    <td className="akign-center nowrap">

                                      <div style={{ display: "flex" }}>
                                        <Link to="/dashboard/buysellpaymentProfessional">View Designs</Link>

                                      </div>
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

export default Reports