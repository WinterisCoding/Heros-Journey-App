import steps from "./steps"

const StepCard = (prop) => {
  
  return (

    <div>
      <h3>{steps[prop.title].stepTitle}</h3>
      <p>{prop.stage}</p>
      <button onClick={() => prop.handleDelete(prop.id)}>Delete me</button>
      
    </div>
    
  )
}

export default StepCard