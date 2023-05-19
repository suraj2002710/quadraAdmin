import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../../Baseurl";
import Spinner from "react-bootstrap/Spinner";
import { Typography } from "@mui/material";
import { MdKeyboardBackspace, MdOutlineArrowBack } from "react-icons/md";


const AlldesginCategory = () => {
  const { id } = useParams();
  const navigate=useNavigate()
  const [category, setcategory] = useState([]);
  const [loading, setloading] = useState(false);
  const localClients = JSON.parse(localStorage.getItem("adminLogin"));
  const [headerName, setheaderName] = useState("")
  const getdesginCategory = async () => {
    const { data } = await axios.post(
      `${baseurl}/admin/professional/count_all_projects/`,
      {
        ...localClients,
        professional_id: id,
      }
    );
    if (data.status === "Success") {
      setcategory(data.data);
      console.log("ttttttttttttttttttt", data.data);
      setheaderName(data.data.Professional_name)
    }
  };

  useEffect(() => {
    getdesginCategory();
  }, []);

  return (
    <>
    {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "24%",
          }}
        >
          <Spinner animation="border" />
        </div>
      ) : (
        <>
      <div id="" className="content table-content border-bottom mb-2">
        <div className="container-fluid">
          <div className="row">
            <div
              id="testkar"
              className="col-12 col-md-auto d-flex flex-grow-1 align-items-center heading-me-outer"
            >
                    < MdKeyboardBackspace size={30} cursor="pointer" onClick={()=>{
                      navigate(-1)
                    }}/>
                    {/* <span style={{color:"black",fontSize:"40px",paddingRight:"20px",display:"flex",cursor:"pointer"}} onClick={()=>Navigate(-1)}>< MdKeyboardBackspace/></span> */}

              <h1
              style={{marginLeft:"20px"}}
                id="professionalss"
                className="h4  pr-3 mr-3 border-right heading-me"
              >
               {headerName.slice(0,1).toUpperCase()+headerName.slice(1,30)}
              </h1>
              
              <div className="ms-auto">
                <nav class="navbar navbar-expand-lg bg-body-tertiary pe-0">
                  <div class="container-fluid">
                    <button
                      class="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span class="navbar-toggler-icon"></span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      
     
          {!category ? (
            <>
              <Typography id="nodatafound">No Data Found</Typography>
            </>
          ) : (
            <div className="content">
              <div className="container-fluid">
                <div className="row">
              

                  <table className="table  ">
                    <thead>
                      <tr>
                        <th scope="col">Category Name</th>
                        <th scope="col">Number Of Projects</th>
                        <th scope="col">Operation </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Architectural Designs</td>
                        <td>{category?.Architecture_Design}</td>
                        <td>
                        <Link to={`/dashboard/architectural/${id}`}>View Designs</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Buy Sale Designs</td>
                        <td>{category?.Buy_sell_Design}</td>
                        <td>
                        <Link to={`/dashboard/buysell/${id}`}>View Designs</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Visualization Designs</td>
                        <td>{category?.Visualization_Design}</td>
                        <td>
                        <Link to={`/dashboard/visulization/${id}`}>View Designs</Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AlldesginCategory;