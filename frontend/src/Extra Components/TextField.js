import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Input = forwardRef(({ width, height }, ref) => {
  return (
    <StyledWrapper width={width} height={height}>
      <div className="form-control">
        <input
          ref={ref}
          className="input input-alt"
          placeholder="Enter Friend's username"
          required
          type="text"
        />
        <span className="input-border-alt" />
      </div>
    </StyledWrapper>
  );
});

const StyledWrapper = styled.div`
  .form-control {
    position: relative;
    width: ${({ width }) => width || '300px'}; /* Default width if none is passed */
  }

  .input {
    color: black;
    font-size: 0.9rem;
    background-color: transparent;
    width: 100%; /* Takes full width of form-control */
    box-sizing: border-box;
    padding-inline: 0.5em;
    padding-block: 0.7em;
    border: none;
    border-bottom: var(--border-height) solid var(--border-before-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: ${({ height }) => height || '50px'}; /* Default height if none is passed */
  }

  .input-border-alt {
    position: absolute;
    background: linear-gradient(90deg, #FF6464 0%, #FFBF59 50%, #47C9FF 100%);
    width: 0%; /* Start at 0 width */
    height: 3px;
    bottom: 0;
    left: 0;
    transition: width 0.4s cubic-bezier(0.42, 0, 0.58, 1.00);
  }

  .input:focus {
    outline: none;
  }

  /* Trigger the border animation when the input is focused */
  .input:focus + .input-border-alt {
    width: 100%; /* Expand the border when focused */
  }

  .input-alt {
    font-size: 1.2rem;
    padding-inline: 1em;
    padding-block: 0.8em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export default Input;
