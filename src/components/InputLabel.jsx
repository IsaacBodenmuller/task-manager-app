import PropTypes from "prop-types"

const InputLabel = (props) => {
  return (
    <label {...props} className="text-sm font-semibold text-brand-dark-blue">
      {props.children}
    </label>
  )
}

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
}

export default InputLabel
