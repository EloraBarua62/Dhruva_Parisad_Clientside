import styles from './Container.module.scss';

const Container = ({children}) => {
    return <div className={styles.container_design}>
        {children}
    </div>;
};

export default Container;