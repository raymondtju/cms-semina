import { Alert } from "react-bootstrap";

function SAlert({ variant, message }) {
  return <Alert variant={variant}>{message}</Alert>;
}

export default SAlert;
