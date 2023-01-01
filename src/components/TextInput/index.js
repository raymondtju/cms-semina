import { Form } from "react-bootstrap";

function TextInput({ type, name, placeholder, value, onChange }) {
  return (
    <Form.Control
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextInput;
