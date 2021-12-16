import { useState, useEffect } from 'react';
import heroes from "./heroes";
import steps from './steps';
import realtime from './firebase';
import { ref, onValue, push, remove} from 'firebase/database'
import { getAuth, signOut} from "firebase/auth"
import 'react-vertical-timeline-component/style.min.css'
import './App.css';
import Login from './Login';
import InlineEdit from './InlineEdit';
import Header from './Header';
import HeroSelection from './HeroSelection';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import Footer from './Footer';


function App() {

  // State to determine if the user is signed in.
  const [signedIn, setSignedIn] = useState(false);
  // State to determine username for db purposes
  const [userName, setUserName] = useState();
  // State objects for which questions we are on and for the user's input
  const [currentStep, setCurrentStep] = useState(0);
  // State that holds what the user Entered for the current step
  const [stepUserInput, setStepUserInput] = useState("");
  // State to hold the value of the 
  const [heroJourney, setHeroJourney] = useState([]);
  // State which determines which example hero is displayed by default is empty
  const [exampleHero, setExampleHero] = useState(heroes[2]);
  // State which holds the numerical value of the hero chosen.
  const [heroSelection, setHeroSelection] = useState();
  // State that removes the input box if all steps have been completed
  const [inputDisplay, setInputDisplay] = useState(true);
  // Once hero is selected changes to false to display the rest of the page
  const [heroSelected, setHeroSelected] = useState(true);
  // Holds the value to allow users to live edit their steps
  const [value, setValue] = useState();

  // We call use effect with an empty dependancy array, which means it will only execute it's callback function one time, when the component first mounts.
  useEffect( () => {
    // create a reference to our realtime database (ie. a thing that POINTS to our specific database):
    const dbRef = ref(realtime);

    // Set a listener to see and parse changes on our db
    onValue(dbRef, (snapshot) => {
      const dbData = snapshot.val()

    const heroData = dbData[`${userName}`]
    const heroArray = []
    
    for(let property in heroData) {
      const heroObject = {
        key: property,
        title: [heroData[property].step],
        stage: heroData[property].input}
      heroArray.push(heroObject)
    }
    setHeroJourney(heroArray)
    })
  },[userName]);

// This is what happens when the user clicks "Complete Step"
  const completeStepClick = (event) => {
    // Prevent the page from refreshing
    event.preventDefault();
    // Take the user info from the textArea
    const dataObject = {
      step: currentStep, 
      input: stepUserInput}
    const dbRefUserHero = ref(realtime, `${userName}`)
    push(dbRefUserHero, dataObject)
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
    
    setExampleHero(heroes[heroSelection]);
    setHeroSelected(false);
    }

  // Gets the index value for the selected hero in the hero array and sets the state so it can be used in form submission
  const handleHeroSelection = (e) => {
    setHeroSelection(e.target.value)
  }

  // This function handles what happens when the user wishes to start over, it resets everything to the state when the site initially loads
  // And deletes the UserHero branch from Firebase to prepare for a new hero
  const handleStartOver = () => {
    const userHero = ref(realtime, userName)
    remove(userHero)
    setCurrentStep(0)
    setInputDisplay(true)
    setHeroSelected(true)
    setExampleHero(heroes[2])
  }

  // function to handle the login event
  const handleLogin = (value) => {
    setSignedIn(value)
  }
  const auth = getAuth();

  // function to handle when the user logs out
  const signingOut = () => {
    signOut(auth)
    setSignedIn(false);
}

// A function to handle setting the user ID
const handleUserName = (input) => {
  setUserName(input)
}

// A function to handle the update click
// const handleUpdate = () = > {

// }

  return (
    <div>
      {
        signedIn?
      
      <>
        <Header signingOut={signingOut} />
        {
        heroSelected? <HeroSelection 
        handleHeroChoice={handleHeroChoice}
        handleHeroSelection={handleHeroSelection} /> : null
        }

        <>
        <section className="stepBox">
          <div className="wrapper stepBoxContainer">
            <h2 className="stepTitle">{steps[currentStep].stepTitle}</h2>
            <p className="stepDescription">{steps[currentStep].stepDescription}</p>
            {
              inputDisplay? <h4 className="exampleName">{exampleHero.name}</h4> : null 
            }
            <p className="exampleStep">{exampleHero.stage[currentStep]}</p>
            {
              inputDisplay? <form action="submit" onSubmit={completeStepClick} className="stepBoxForm"> 
              <label htmlFor="userStep">Write your hero's version of this step</label>
              <textarea name="userStep" id="userStep" value={stepUserInput} onChange={handleChange}></textarea>
              <button>Complete Step</button>
            </form> : null
            }
          </div>
        </section>
        </>

        {
          currentStep? 
        <>
        <section className="timeline">
          <div className="wrapper">
            <VerticalTimeline>
              {
                heroJourney.map((heroObject) => {
                  console.log(heroObject)
                  return (
                    <VerticalTimelineElement
                      key={heroObject.key}
                      
                    >
                      <h3 className="vertical-timeline-element-title">{steps[heroObject.title].stepTitle}</h3>
                      <InlineEdit id={heroObject.key} value={heroObject.stage} setValue={setValue} name={userName}  />
                      <p className="guide">* You can edit your entry here!</p>
                    </VerticalTimelineElement>
                  )
                })
              }
            </VerticalTimeline>
          </div>
        </section>
        </> : null 
        }

        <>
        {
          currentStep? <div className="buttonSection wrapper">
            <button onClick={handleStartOver}>Start Your Journey Over!</button>
          
          </div> : null
        }
        </>
        
        <Footer value={value}/>
      </>:
      <Login handleLogin={handleLogin} handleUserName={handleUserName} />
      }
    </div> 
  );
}

export default App;


