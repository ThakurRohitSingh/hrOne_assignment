import React, { useState } from "react";
import Field from "./Field";
import { Button, Card, Typography, Space } from "antd";
import "./App.css";

const { Title } = Typography;

const App = () => {
  const [schema, setSchema] = useState([]);

  const addField = () => {
    setSchema([...schema, { key: "", type: "string", children: [] }]);
  };

  const updateSchema = (updatedField, index) => {
    const newSchema = [...schema];
    newSchema[index] = updatedField;
    setSchema(newSchema);
  };

  const deleteField = (index) => {
    const newSchema = [...schema];
    newSchema.splice(index, 1);
    setSchema(newSchema);
  };

  const convertToJSON = (fields) => {
    const json = {};
    fields.forEach(({ key, type, children }) => {
      let value;
      switch (type) {
        case "string":
          value = "string";
          break;
        case "number":
          value = 0;
          break;
        case "float":
          value = 0.0;
          break;
        case "boolean":
          value = false;
          break;
        case "objectId":
          value = 'ObjectId("...")';
          break;
        case "nested":
          value = convertToJSON(children || []);
          break;
        default:
          value = null;
      }
      json[key || "untitled"] = value;
    });
    return json;
  };

  return (
    <div className="app-container">
      <Title level={2}>JSON Schema Builder</Title>

      <Button
        type="primary"
        onClick={addField}
        style={{ marginBottom: "20px" }}
      >
        Add Field
      </Button>

      <Space direction="vertical" style={{ width: "100%" }}>
        {schema.map((field, index) => (
          <Card size="small" key={index}>
            <Field
              index={index}
              field={field}
              onChange={(updated) => updateSchema(updated, index)}
              onDelete={() => deleteField(index)}
            />
          </Card>
        ))}
      </Space>

      <Title level={3} style={{ marginTop: "30px" }}>
        JSON Preview
      </Title>
      <pre className="json-preview">
        {JSON.stringify(convertToJSON(schema), null, 2)}
      </pre>
    </div>
  );
};

export default App;
