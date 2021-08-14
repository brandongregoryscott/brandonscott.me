import React, { useRef, useEffect, PropsWithChildren } from "react";
import styles from "./Page.module.scss";

type Props = {
    showTitle?: boolean;
    title?: string;
};

const Page = (props: PropsWithChildren<Props>) => {
    const { title, showTitle, children } = props;
    const pageRef = useRef<HTMLDivElement>();

    useEffect(() => {
        pageRef.current.scrollIntoView();
    });

    return (
        <div ref={pageRef} className={styles["page"]}>
            <div className={styles["page__inner"]}>
                {title != null && showTitle === true && (
                    <h1 className={styles["page__title"]}>{title}</h1>
                )}
                <div className={styles["page__body"]}>{children}</div>
            </div>
        </div>
    );
};

export default Page;
