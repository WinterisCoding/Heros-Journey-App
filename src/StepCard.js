import steps from "./steps"

const StepCard = (prop) => {


  return (
    
    <div>
      <h3>{steps[prop.title].stepTitle}</h3>
      <p>{prop.stage}</p>
      
    </div>
    
  )
}

export default StepCard