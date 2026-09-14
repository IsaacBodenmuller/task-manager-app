import PropTypes from "prop-types"

export function Header(props) {
  return <header className="mt-9 bg-red-500">{props.children}</header>
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
}
