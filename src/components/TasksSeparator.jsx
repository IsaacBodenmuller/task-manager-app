const TasksSeparator = ({ title, icon }) => {
  return (
    <div className="flex gap-2 border-b border-solid border-[#f4f4f5] pb-1">
      {icon}
      <p className="text-sm text-[#9a9c9f]">{title}</p>
    </div>
  )
}

export default TasksSeparator
