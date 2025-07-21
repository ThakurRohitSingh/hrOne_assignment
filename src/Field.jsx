import React from "react";
import { Input, Select, Button, Space, Card } from "antd";

const { Option } = Select;

const Field = ({ field, onChange, onDelete }) => {
  const handleKeyChange = (e) => {
    onChange({ ...field, key: e.target.value });
  };

  const handleTypeChange = (value) => {
    const updatedField = {
      ...field,
      type: value,
      children: value === "nested" ? [] : undefined,
    };
    onChange(updatedField);
  };

  const addNestedField = () => {
    const newChildren = [
      ...(field.children || []),
      { key: "", type: "string", children: [] },
    ];
    onChange({ ...field, children: newChildren });
  };

  const updateNestedField = (updatedField, idx) => {
    const newChildren = [...field.children];
    newChildren[idx] = updatedField;
    onChange({ ...field, children: newChildren });
  };

  const deleteNestedField = (idx) => {
    const newChildren = [...field.children];
    newChildren.splice(idx, 1);
    onChange({ ...field, children: newChildren });
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Space>
        <Input
          placeholder="Field Name"
          value={field.key}
          onChange={handleKeyChange}
          style={{ width: 200 }}
        />

        <Select
          value={field.type}
          onChange={handleTypeChange}
          style={{ width: 150 }}
        >
          <Option value="string">String</Option>
          <Option value="number">Number</Option>
          <Option value="float">Float</Option>
          <Option value="boolean">Boolean</Option>
          <Option value="objectId">ObjectId</Option>
          <Option value="nested">Nested</Option>
        </Select>

        <Button danger onClick={onDelete}>
          Delete
        </Button>
      </Space>

      {field.type === "nested" && (
        <Card
          size="small"
          type="inner"
          title="Nested Fields"
          extra={
            <Button size="small" onClick={addNestedField}>
              Add Nested Field
            </Button>
          }
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            {field.children.map((child, idx) => (
              <Field
                key={idx}
                index={idx}
                field={child}
                onChange={(updated) => updateNestedField(updated, idx)}
                onDelete={() => deleteNestedField(idx)}
              />
            ))}
          </Space>
        </Card>
      )}
    </Space>
  );
};

export default Field;
    