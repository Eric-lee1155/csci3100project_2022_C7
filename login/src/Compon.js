import React from 'react';
import styles from './index.module.css';

// class Para extends React.Component {
//     render() {
//       return <p className={styles.form_box}> {this.props.name}</p>;
//     }
//   }

  function Para (props) {
    
    return (
        <p className={styles.para}> {props.paraCon}</p>
    )
  }

  export default Para;