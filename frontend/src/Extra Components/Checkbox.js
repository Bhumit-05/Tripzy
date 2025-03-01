import React from 'react';
import styled from 'styled-components';

const Checkbox = ({ checked, onChange }) => {
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
    --input-focus: #2d8cf0;
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

  /* Hover effect when unchecked */
  .container:hover .checkmark {
    background-color: #999; /* Darker gray for hover when unchecked */
  }

  /* Background color when checked */
  .container input:checked ~ .checkmark {
    background-color: var(--input-focus);
  }

  /* Hover effect when checked */
  .container input:checked:hover ~ .checkmark {
    background-color: #2563eb; /* Darker blue */
  }

  .checkmark:after {
    content: "";
    width: 7px;
    height: 15px;
    position: absolute;
    top: 2px;
    left: 8px;
    display: none;
    border: solid var(--bg-color);
    border-width: 0 2.5px 2.5px 0;
    transform: rotate(45deg);
  }

  .container input:checked ~ .checkmark:after {
    display: block;
  }
`;

export default Checkbox;
