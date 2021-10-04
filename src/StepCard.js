import steps from "./steps"

const StepCard = (prop) => {
  
  console.log(prop)

  return (
    
    <div>
      {/* <h1>{steps[prop.stage].stepTitle}</h1> */}
      <p>{prop.stage}</p>
      
    </div>
    
  )
}

export default StepCard