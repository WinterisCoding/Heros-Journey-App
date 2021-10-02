import { useState, useEffect } from 'react';
import heroes from "./heroes";
import steps from './steps';
import realtime from './firebase';
import { ref, onValue, push} from 'firebase/database'
import './App.css';


function journeyApp() {

  // State objects for which questions we are on and for the user's input
  const [currentStep, setCurrentStep] = useState(0);
  const [stepUserInput, setStepUserInput] = useState("")


// This is what happens when the user clicks "Complete Step"
  const completeStepClick = (event) => {
    // Prevent the page from refreshing
    event.preventDefault();
    // Take the user info from the textArea
    console.log(stepUserInput)

    setStepUserInput("")
    // Move to the next Step
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  }

  // Allows us to track what is happening in the input so that we can push to firebase
  const handleChange = (e) => {
    setStepUserInput(e.target.value)
  }

  return (
    <div >
      <h1>The Hero's Journey</h1>
      <>

      <section className="stepBox">
        <div className="stepTitle">{steps[currentStep].stepTitle}</div>
        <div className="stepDescription">{steps[currentStep].stepDescription}</div>
        <div className="exampleName">{heroes[0].name}</div>
        <div className="exampleStep">{heroes[0].stage[currentStep]}</div>
        <form action="submit" onSubmit={completeStepClick}>
          <label htmlFor="userStep">Write your hero's version of this step</label>
          <textarea name="userStep" id="userStep" cols="30" rows="10" value={stepUserInput} onChange={handleChange}></textarea>
          <button>Complete Step</button>
        </form>
      </section>
      </>
    
    </div>


  );
}

export default journeyApp;
