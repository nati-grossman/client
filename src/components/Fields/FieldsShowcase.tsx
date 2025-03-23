import React, { useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import {
  TextField,
  NumberField,
  SelectField,
  CheckboxField,
  RadioGroupField,
  TextareaField,
  PriceField,
  PhoneField,
} from "./FormFields";

const FieldsShowcase: React.FC = () => {
  const [formValues, setFormValues] = useState({
    text: "",
    number: "",
    select: "",
    checkbox: false,
    radio: "",
    textarea: "",
    price: "",
    phone: "",
  });

  const handleChange = (field: string) => (value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const selectOptions = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  return (
    <Container className="py-5">
      <h1 className="mb-4">Fields Showcase</h1>
      <Row>
        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Text Field</Card.Title>
              <TextField
                label="Text Input"
                name="text"
                value={formValues.text}
                onChange={handleChange("text")}
                placeholder="Enter text"
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Number Field</Card.Title>
              <NumberField
                label="Number Input"
                name="number"
                value={formValues.number}
                onChange={handleChange("number")}
                placeholder="Enter number"
                min={0}
                max={100}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Select Field</Card.Title>
              <SelectField
                label="Select Input"
                name="select"
                value={formValues.select}
                onChange={handleChange("select")}
                options={selectOptions}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Checkbox Field</Card.Title>
              <CheckboxField
                label="Checkbox Input"
                name="checkbox"
                value={formValues.checkbox}
                onChange={handleChange("checkbox")}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Radio Group Field</Card.Title>
              <RadioGroupField
                label="Radio Input"
                name="radio"
                value={formValues.radio}
                onChange={handleChange("radio")}
                options={selectOptions}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Textarea Field</Card.Title>
              <TextareaField
                label="Textarea Input"
                name="textarea"
                value={formValues.textarea}
                onChange={handleChange("textarea")}
                placeholder="Enter long text"
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Price Field</Card.Title>
              <PriceField
                label="Price Input"
                name="price"
                value={formValues.price}
                onChange={handleChange("price")}
                placeholder="Enter price"
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Phone Field</Card.Title>
              <PhoneField
                label="Phone Input"
                name="phone"
                value={formValues.phone}
                onChange={handleChange("phone")}
                placeholder="Enter phone number"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Current Form Values</Card.Title>
          <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FieldsShowcase;
