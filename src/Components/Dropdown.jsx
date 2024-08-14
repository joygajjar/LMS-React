import React, { useState } from "react";
import styled from "styled-components";
import { Label } from "../Views/CourseView/CourseAddEditView";

// Styled Components
const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.div`
  font-size: 1rem;
  color: #333;
  background: #f9f9f9;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  display: ${({ open }) => (open ? "block" : "none")};
`;

const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background: #007bff;
    color: white;
  }
`;

// Dropdown Component
export const Dropdown = ({ id, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <DropdownWrapper>
      <Label htmlFor={id}>{id}</Label>
      <DropdownButton onClick={handleToggle}>
        {value || "Select an option"}
        <span>{isOpen ? "▲" : "▼"}</span>
      </DropdownButton>
      <DropdownList open={isOpen}>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownWrapper>
  );
};
