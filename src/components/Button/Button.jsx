
import React from 'react';
import css from './Button.module.css';

class Button extends React.Component {
  render() {
    const { onClick, label } = this.props;

    return (
      <button className={css.loadmorebtn} onClick={onClick}>
        {label}
      </button>
    );
  }
}

export default Button;
