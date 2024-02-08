import styles from './CurrentState.module.scss'

const CurrentState = ({ currentComponent }) => {
  return <div className={styles.currentstate_design}>
    {currentComponent}
  </div>;
};

export default CurrentState;