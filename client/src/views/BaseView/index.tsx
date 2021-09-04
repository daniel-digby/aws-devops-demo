import React from "react";
import styles from "./BaseView.module.css";

const BaseView = (): JSX.Element => {
    // api call
    return (
        <div>
            <div className={styles.container}>hello world</div>
        </div>
    );
};
export default BaseView;
