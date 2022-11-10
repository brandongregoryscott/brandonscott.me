import React from "react";
import { Root } from "rehype-react/lib";
import { renderAst } from "../../../utils/react-rehype";
import styles from "./Content.module.scss";

type Props = {
    htmlAst: Root;
    title: string;
};

const Content = ({ htmlAst, title }: Props) => (
    <div className={styles["content"]}>
        <h1 className={styles["content__title"]}>{title}</h1>
        <div className={styles["content__body"]}>{renderAst(htmlAst)}</div>
    </div>
);

export default Content;
