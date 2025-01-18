import React from 'react';
import styled from 'styled-components';

const CrossCheckbox = ({ checked, onChange }) => {
  return (
    <StyledWrapper>
      <label className="container">
        <input checked={checked} onChange={onChange} type="checkbox" />
        <div className="checkmark" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    --input-focus: #f44336;
    --input-out-of-focus: #ccc;
    --bg-color: #fff;
    --bg-color-alt: #666;
    --main-color: #323232;
    position: relative;
    cursor: pointer;
  }

  .container input {
    position: absolute;
    opacity: 0;
  }

  .checkmark {
    width: 28px;
    height: 28px;
    position: relative;
    top: 0;
    left: 0;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    box-shadow: 4px 4px var(--main-color);
    background-color: var(--input-out-of-focus);
    transition: all 0.3s;
  }

  .container:hover .checkmark {
    background-color: #999;
  }

  .container input:checked ~ .checkmark {
    background-color: var(--input-focus);
  }

  .container input:checked:hover ~ .checkmark {
    background-color: #e53935;
  }

  .checkmark:after {
    content: "";
    width: 15px; /* Wider for the cross */
    height: 2px; /* Thicker lines for cross */
    position: absolute;
    top: 50%; /* Vertically centered */
    left: 50%; /* Horizontally centered */
    transform: translate(-50%, -50%) rotate(45deg);
    background-color: #fff; /* White color for the cross */
    display: none; /* Initially hidden */
  }

  .container input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:before {
    content: "";
    width: 15px;
    height: 2px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    background-color: #fff;
    display: none;
  }

  .container input:checked ~ .checkmark:before {
    display: block;
  }
`;

export default CrossCheckbox;
