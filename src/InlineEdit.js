import { useState } from "react"

const InlineEdit = ({ value, setValue}) => {
  const [editingValue, setEditingValue] = useState(value)

  const onChange = (event) => setEditingValue(event.target.value)

  const onKeyDown = (event) => {    
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();    
    }  
  }

  // This handles the event that the user enters an empty string
  const onBlur = (event) => {
    if (event.target.value.trim() === "") {
      setValue(value);
    } else {
      setValue(event.target.value)
    }
  }

  return (
    <textarea className="editable"
      rows={1}
      aria-label="Step Description"
      value={editingValue}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      />
  )
}

export default InlineEdit;

// Code found on a tutorial by Emma Goto at the link below
// https://www.emgoto.com/react-inline-edit/?fbclid=IwAR0fL0KUk0113EijpAtQS5vvOaQKF1l8BjfhAeD-cddnvwQvLOshm7KA4iE