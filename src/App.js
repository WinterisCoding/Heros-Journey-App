import { useState, useEffect } from 'react';
import heroes from "./heroes";
import steps from './steps';
import realtime from './firebase';
import { ref, onValue, push} from 'firebase/database'
import './App.css';
import StepCard from './StepCard';
import Header from './Header';


function App() {

  // State objects for which questions we are on and for the user's input
  const [currentStep, setCurrentStep] = useState(0);
  const [stepUserInput, setStepUserInput] = useState("");
  const [heroJourney, setHeroJourney] = useState([]);
  const [exampleHero, setExampleHero] = useState(heroes[2]);
  const [heroSelection, setHeroSelection] = useState();
  const [inputDisplay, setInputDisplay] = useState(true)


  
  // We call use effect with an empty dependancy array, which means it will only execute it's callback function one time, when the component first mounts.
  useEffect( () => {
    // create a reference to our realtime database (ie. a thing that POINTS to our specific database):
    const dbRef = ref(realtime);

    // Set a listener to see and parse changes on our db
    onValue(dbRef, (snapshot) => {
      const dbData = snapshot.val()
    
    const heroData = dbData.userHero
    
    const heroArray = []

    for(let property in heroData) {
      const stage = heroData[property]
      
      heroArray.push(stage)
    }
    setHeroJourney(heroArray)
    })
  },[]);

// This is what happens when the user clicks "Complete Step"
  const completeStepClick = (event) => {
    // Prevent the page from refreshing
    event.preventDefault();
    // Take the user info from the textArea
    
    const dbRefUserHero = ref(realtime, `userHero`)
    push(dbRefUserHero, stepUserInput)
    
    setStepUserInput("")
    // Move to the next Step
    const nextStep = currentStep + 1;

    // Error handling so the user can't go beyond the last step.
    if (currentStep <= 10) {
      setCurrentStep(nextStep);
      
    } else {
      setCurrentStep(nextStep)
      setInputDisplay(false);
    }
  }

  // Allows us to track what is happening in the input so that we can push to firebase
  const handleChange = (e) => {
    setStepUserInput(e.target.value)
  }

  // Manages the submission of the choice of hero and sets the exmaple text on the page by updating state of example hero
  const handleHeroChoice = (e) => {
    e.preventDefault();
    
    setExampleHero(heroes[heroSelection])
    }

  // Gets the index value for the selected hero in the hero array and sets the state so it can be used in form submission
  const handleHeroSelection = (e) => {
    setHeroSelection(e.target.value)
  }

  return (
    <div >
      <Header />
      
      <>
      <form action="submit" onSubmit={handleHeroChoice}>
        <fieldset onChange={handleHeroSelection}>
          <input type="radio" id="hero1" name="hero" value="0" />
          <label htmlFor="hero1">{heroes[0].name}</label>
          <input type="radio" id="hero2" name="hero" value="1"/>
          <label htmlFor="hero2">{heroes[1].name}</label>
          <button>Choose Hero</button>
        </fieldset>
      </form>
      </>

      <>
      <section className="stepBox">
        <div className="stepTitle">{steps[currentStep].stepTitle}</div>
        <div className="stepDescription">{steps[currentStep].stepDescription}</div>
        {
        inputDisplay? <div className="exampleName">{exampleHero.name}</div> : null 
        }
        <div className="exampleStep">{exampleHero.stage[currentStep]}</div>
        {
          inputDisplay? <form action="submit" onSubmit={completeStepClick}> 
          <label htmlFor="userStep">Write your hero's version of this step</label>
          <textarea name="userStep" id="userStep" cols="30" rows="10" value={stepUserInput} onChange={handleChange}></textarea>
          <button>Complete Step</button>
        </form> : null
        }
      </section>
      </>

      <>
      {heroJourney.map((description, index) => {
        return (
          <StepCard  
          description={description} 
          stage={index}/>
        )
      })}
      </>
    
    </div>


  );
}

export default App;


