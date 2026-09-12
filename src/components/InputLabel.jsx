const InputLabel = (props) => {
  return (
    <label {...props} className="text-sm font-semibold text-[#35383e]">
      {props.children}
    </label>
  )
}

export default InputLabel
