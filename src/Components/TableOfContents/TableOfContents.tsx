import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./style.scss";
import { Link } from "@justfixnyc/component-library";

type TableOfContentsProps = {
  children: React.ReactNode;
};
export const TableOfContents: React.FC<TableOfContentsProps> = ({
  children,
}) => {
  const scrolledRef = useRef(false);
  const { hash } = useLocation();
  const hashRef = useRef(hash);
  useEffect(() => {
    if (hash) {
      // We want to reset if the hash has changed
      if (hashRef.current !== hash) {
        hashRef.current = hash;
        scrolledRef.current = false;
      }

      // only attempt to scroll if we haven't yet (this could have just reset above if hash changed)
      if (!scrolledRef.current) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          scrolledRef.current = true;
        }
      }
    }
  });
  return <div className="table-of-contents">{children}</div>;
};

type TOCHeaderProps = {
  children: React.ReactNode;
};
export const TOCHeader: React.FC<TOCHeaderProps> = ({ children }) => {
  return <h3 className="table-of-contents__header">{children}</h3>;
};

type TOCListProps = {
  children: React.ReactNode;
};
export const TOCList: React.FC<TOCListProps> = ({ children }) => {
  return <ul className="table-of-contents__list">{children}</ul>;
};

type TOCItemProps = {
  children: React.ReactNode;
  href: string;
};
export const TOCItem: React.FC<TOCItemProps> = ({ children, href }) => {
  return (
    <li className="table-of-contents__list__item">
      <Link href={href}>{children}</Link>
    </li>
  );
};
