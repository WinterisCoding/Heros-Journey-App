import { useState, useEffect } from 'react';
import heroes from "./heroes";
import steps from './steps';
import realtime from './firebase';
import { ref, onValue, push, remove} from 'firebase/database'
import 'react-vertical-timeline-component/style.min.css'
import './App.css';
// import StepCard from './StepCard';
import Header from './Header';
import HeroSelection from './HeroSelection';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import Footer from './Footer';




function App() {

  // State objects for which questions we are on and for the user's input
  const [currentStep, setCurrentStep] = useState(0);
  const [stepUserInput, setStepUserInput] = useState("");
  const [heroJourney, setHeroJourney] = useState([]);
  const [exampleHero, setExampleHero] = useState(heroes[2]);
  const [heroSelection, setHeroSelection] = useState();
  const [inputDisplay, setInputDisplay] = useState(true)
  const [heroSelected, setHeroSelected] = useState(true)

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
      const heroObject = {
        key: property,
        title: [heroData[property].step],
        stage: heroData[property].input}
      
      heroArray.push(heroObject)
    }
    setHeroJourney(heroArray)
    })
  },[]);

// This is what happens when the user clicks "Complete Step"
  const completeStepClick = (event) => {
    // Prevent the page from refreshing
    event.preventDefault();
    // Take the user info from the textArea
    
    const dataObject = {
      step: currentStep, 
      input: stepUserInput}

    const dbRefUserHero = ref(realtime, `userHero`)
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

  // For the depreciated Step Card feature. Did all that work to figure out delete from database only for it to not be necessary lol
  // const handleDelete = (id) => {
  //   const userStep = ref(realtime, `userHero/${id}`)
  //   remove(userStep)
  // }

  const handleStartOver = () => {
    const userHero = ref(realtime, 'userHero')
    remove(userHero)
    setCurrentStep(0)
    setInputDisplay(true)
    setHeroSelected(true)
    setExampleHero(heroes[2])
  }

  return (
    <div >
      <Header  />
      
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
                return (
                  <VerticalTimelineElement
                    key={heroObject.key}
                    
                  >
                    <h3 className="vertical-timeline-element-title">{steps[heroObject.title].stepTitle}</h3>
                    <p>{heroObject.stage}</p>
                  </VerticalTimelineElement>
                )
              })
            }
          </VerticalTimeline>
        </div>
      </section>
      </> : null 
      }

      {/* This was the original way of displaying the solution, it has been surplanted by an infinitly sexier version */}
      {/* <>
      <section>
        <div className="wrapper">
          {heroJourney.map((heroObject) => {
            return (
                <StepCard 
                key={heroObject.key}
                id={heroObject.key}
                title={heroObject.title}
                stage={heroObject.stage}
                handleDelete={handleDelete}
                />
              )
          })}
        </div>
      </section>
      </> */}
      <>
      {
        currentStep? <div className="buttonSection wrapper">
          <button onClick={handleStartOver}>Start Your Journey Over!</button>
        </div> : null
      }
      </>

      
      <Footer />
    </div> 
  );
}

export default App;


