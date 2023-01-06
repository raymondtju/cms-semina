import React from "react";
import { Form } from "react-bootstrap";

import TextInputWithLabel from "../../components/TextInputWithLabel";
import SButton from "../../components/Button";

export default function SForm({ handleChange, handleSubmit, loading }) {
  return (
    <Form>
      <TextInputWithLabel
        label="Email Address"
        type="email"
        placeholder="Enter email"
        onChange={handleChange}
        name="email"
      />
      <TextInputWithLabel
        label="Password"
        type="password"
        placeholder="Enter password"
        onChange={handleChange}
        name="password"
      />
      <SButton
        variant="primary"
        action={handleSubmit}
        disabled={loading}
        loading={loading}
      >
        Submit
      </SButton>
    </Form>
  );
}
