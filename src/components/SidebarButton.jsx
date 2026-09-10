const SidebarButton = ({ children, variant }) => {
  const getVariantClasses = () => {
    if (variant === "unselected") {
      return "text-[#35383e]"
    }
    if (variant === "selected") {
      return "bg-[#e6f7f8] text-[#00adb5]"
    }
  }

  return (
    <a href="#" className={`rounded-lg px-6 py-3 ${getVariantClasses()}`}>
      {children}
    </a>
  )
}

export default SidebarButton
