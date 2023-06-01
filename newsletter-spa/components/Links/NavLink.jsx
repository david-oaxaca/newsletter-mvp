import { useRouter } from "next/router";
import { Link } from "next/link";
import PropTypes from "prop-types";
import { Children } from "react";

const NavLink = ({ children, activeClassName, ...props }) => {
  const asPath = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || "";

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

NavLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
};

export default NavLink;
