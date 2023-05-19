import React from "react";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import Pagination from "react-bootstrap/Pagination";
const ChatMessage = () => {
  return (
    <>
      <div className="content border-bottom mb-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-auto d-flex flex-grow-1 align-items-center heading-me-outer">
              <h1 className="h4  pr-3 mr-3 border-right heading-me">
                Chat messages
              </h1>

              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/admin/" className="active">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">Chat messages</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="table-chat">
                <div className="table-chat-body table-responsive p-0">
                  <table id="result_list" className="table table-quadra">
                    <tr>
                      <th
                        className="checkbox-select"
                        tabindex="0"
                        rowspan="1"
                        colspan="1"
                      >
                        <input type="checkbox" id="action-toggle" />
                      </th>
                      <th
                        className="sorting_asc"
                        tabindex="0"
                        rowspan="1"
                        colspan="1"
                      >
                        Id <FaSortAlphaDownAlt />
                      </th>
                      <th
                        className="sortin"
                        tabindex="0"
                        rowspan="1"
                        colspan="1"
                      >
                        Room
                      </th>
                      <th
                        className="sortin"
                        tabindex="0"
                        rowspan="1"
                        colspan="1"
                      >
                        Message
                      </th>
                      <th
                        className="sortin"
                        tabindex="0"
                        rowspan="1"
                        colspan="1"
                      >
                        Attachments
                      </th>
                      <th
                        className="sortin"
                        tabindex="0"
                        rowspan="1"
                        colspan="1"
                      >
                        Client
                      </th>
                      <th
                        className="sortin"
                        tabindex="0"
                        rowspan="1"
                        colspan="1"
                      >
                        Professional
                      </th>
                      <th
                        className="sortin"
                        tabindex="0"
                        rowspan="1"
                        colspan="1"
                      >
                        Created at
                      </th>
                    </tr>

                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>
                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>
                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>

                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>

                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>
                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>
                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>
                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>
                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>
                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>
                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>
                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>

                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>

                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>

                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>

                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>

                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>

                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>

                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>

                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>

                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>

                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>

                    <tr>
                      <td className="checkbox-select">
                        <input
                          type="checkbox"
                          name="_selected_action"
                          value="745"
                          className="action-select"
                        />
                      </td>
                      <td className="field-id">745</td>
                      <td className="field-room nowrap">
                        13bf3519-debe-443a-8be8-512252df2887
                      </td>
                      <td className="field-message">hello</td>
                      <td className="field-attachments nowrap">-</td>
                      <td className="field-client nowrap">kunal Client</td>
                      <td className="field-professional nowrap">-</td>
                      <td className="field-created_at nowrap">
                        Dec. 16, 2022, 6:22 a.m.
                      </td>
                    </tr>
                  </table>
                  <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />

                    <Pagination.Ellipsis />

                    <Pagination.Item active>{1}</Pagination.Item>

                    <Pagination.Ellipsis />

                    <Pagination.Next />
                    <Pagination.Last />
                  </Pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
