import { Form } from "react-bootstrap";
import TextInput from "../TextInput";

function TextInputWithLabel({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <Form.Group>
      <Form.Label className="mb-2">{label}</Form.Label>
      <TextInput
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
}

export default TextInputWithLabel;
