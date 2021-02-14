import React from 'react';
import styles from '../styles/headers.module.css';
import Colors from '../board/Colors.jsx';

const Headers = ({globalTemplate}) => {
  return (
    <div className={styles.headers}>
      <Colors colors={globalTemplate}/>
    </div>
  );
};

export default Headers;