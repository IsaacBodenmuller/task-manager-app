import PropTypes from "prop-types"

const InputErrorMessage = ({ children }) => {
  return <p className="brand-danger-500 text-left text-xs">{children}</p>
}

InputErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
}

export default InputErrorMessage
