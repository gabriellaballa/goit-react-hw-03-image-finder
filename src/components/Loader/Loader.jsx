// Loader.js

import { TailSpin } from 'react-loader-spinner';
import React, { Component } from 'react';
import css from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={css.loader}>
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }
}

export default Loader;
