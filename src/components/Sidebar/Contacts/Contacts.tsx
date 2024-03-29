import { isEmpty } from "lodash";
import React from "react";
import { useAnalytics } from "../../../hooks/use-analytics";
import { getContactHref, getIcon } from "../../../utils";
import Icon from "../../Icon";
import styles from "./Contacts.module.scss";

interface ContactsProps {
    contacts: {
        [name: string]: string;
    };
}

const Contacts = (props: ContactsProps) => {
    const { contacts } = props;
    const { linkClicked } = useAnalytics();
    const links = Object.entries(contacts).filter(
        ([_name, contact]) => !isEmpty(contact)
    );
    return (
        <div className={styles["contacts"]}>
            <ul className={styles["contacts__list"]}>
                {links.map(([name, contact]) => {
                    const href = getContactHref(name, contact);
                    return (
                        <li
                            className={styles["contacts__list-item"]}
                            key={name}>
                            <a
                                className={styles["contacts__list-item-link"]}
                                href={href}
                                onClick={linkClicked({
                                    name,
                                    url: href,
                                })}
                                rel="noopener noreferrer"
                                target="_blank">
                                <Icon name={name} icon={getIcon(name)} />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Contacts;
