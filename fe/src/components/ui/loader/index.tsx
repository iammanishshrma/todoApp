import styles from "./loader.module.css";

const Loader = () => {
    return (
        <div className={styles.loader__backdrop}>
            <span className={styles.loader}></span>
        </div>
    );
};

export default Loader;
