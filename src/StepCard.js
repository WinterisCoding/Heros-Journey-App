import steps from "./steps"

const StepCard = (prop) => {
  

  return (
    
    <div>
      <h1 className="draggable">{steps[prop.stage].stepTitle}</h1>
      <p>{prop.description}</p>
    </div>
    
  )
}

export default StepCard