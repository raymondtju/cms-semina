import React from "react";
import { Form } from "react-bootstrap";

import TextInputWithLabel from "../../components/TextInputWithLabel";
import SButton from "../../components/Button";

export default function CategoriesForm({
  handleChange,
  handleSubmit,
  loading,
  form,
  edit,
}) {
  return (
    <Form>
      <TextInputWithLabel
        label={"Enter Category Name"}
        type="text"
        placeholder="Enter category"
        onChange={handleChange}
        name="name"
        value={form.name}
      />

      <SButton
        variant="primary"
        action={handleSubmit}
        loading={loading}
        disabled={loading}
      >
        {edit ? "Change" : "Save"}
      </SButton>
    </Form>
  );
}
