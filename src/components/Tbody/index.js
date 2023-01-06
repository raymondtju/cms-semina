import React from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
// import moment from "moment";

import SButton from "../Button";
// import { config } from "../../configs";

function Tbody({
  data,
  display,
  editUrl,
  deleteAction,
  customAction,
  actionNotDisplay,
  status,
}) {
  const navigate = useNavigate();
  return (
    <tbody>
      {status === "process" ? (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: "center" }}>
            <div className="flex items-center justify-center">
              <Spinner animation="border" variant="primary" />
            </div>
          </td>
        </tr>
      ) : data.length ? (
        data.map((data, index) => {
          return (
            <tr key={index}>
              {Object.keys(data).map(
                (key) =>
                  display.indexOf(key) > -1 && (
                    // <td key={key}>
                    //   {key === "avatar" ? (
                    //     <Image
                    //       height={40}
                    //       width={40}
                    //       roundedCircle
                    //       src={`${config.api_image}/${data[key]}`}
                    //     />
                    //   ) : key === "date" ? (
                    //     moment(data[key]).format("DD-MM-YYYY, h:mm:ss a")
                    //   ) : (
                    //     data[key]
                    //   )}
                    // </td>
                    <td key={key}>{data[key]}</td>
                  )
              )}
              {!actionNotDisplay && (
                <td>
                  {customAction && customAction(data._id, data.statusEvent)}
                  {editUrl && (
                    <SButton
                      variant="success"
                      size={"sm"}
                      action={() => navigate(`${editUrl}/${data._id}`)}
                    >
                      Edit
                    </SButton>
                  )}
                  {deleteAction && (
                    <SButton
                      className={"mx-2"}
                      variant="danger"
                      size={"sm"}
                      action={() => deleteAction(data._id)}
                    >
                      Delete {data._id}
                    </SButton>
                  )}
                </td>
              )}
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: "center" }}>
            Data Not found
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default Tbody;
