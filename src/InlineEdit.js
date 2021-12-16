import { useState } from "react"
import  realtime  from './firebase';
import { ref, update } from "firebase/database"



const InlineEdit = ({value, setValue, name, id}) => {
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

  const handleUpdate = () => {
    update(ref(realtime, `${name}/${id}`), {
      input: editingValue,
      }
    )
  }

  return (
    <div>
      <textarea className="editable"
        rows={1}
        aria-label="Step Description"
        value={editingValue}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        />
        <button onClick={handleUpdate}>Save your Changes!</button>
    </div>
  )
}

export default InlineEdit;

// Code found on a tutorial by Emma Goto at the link below
// https://www.emgoto.com/react-inline-edit/?fbclid=IwAR0fL0KUk0113EijpAtQS5vvOaQKF1l8BjfhAeD-cddnvwQvLOshm7KA4iE