import React from 'react';
import PropTypes from 'prop-types';
import { Btn, BtnWrapper } from './Button.styled';

const Button = ({ onClick }) => (
  <BtnWrapper>
    <Btn type="button" onClick={onClick}>
      Load more
    </Btn>
  </BtnWrapper>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
