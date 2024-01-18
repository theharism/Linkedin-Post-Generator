import React from "react";
import Form from "react-bootstrap/Form";

const FormField = ({ label, name, placeholder, value, onChange, as }) => {
  return (
    <Form.Group className="Group">
      <Form.Label className="LeftAlignedLabel">{label}</Form.Label>
      <Form.Control
        as={as}
        type="text"
        name={name}
        placeholder={placeholder}
        className="FormInput"
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default FormField;
