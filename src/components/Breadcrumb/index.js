import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SBreadcrumb({ second, third, secondUrl }) {
  const navigate = useNavigate();
  return (
    <Breadcrumb>
      <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
      {!third && <Breadcrumb.Item active>{second}</Breadcrumb.Item>}
      {third && (
        <Breadcrumb.Item onClick={() => navigate(secondUrl)}>
          {second}
        </Breadcrumb.Item>
      )}
      {third && <Breadcrumb.Item active>{third}</Breadcrumb.Item>}
    </Breadcrumb>
  );
}
