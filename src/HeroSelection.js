import heroes from "./heroes";
import Lukeskywalker from "./assets/Lukeskywalker.png"
import moana from "./assets/moana.png"

const HeroSelection = (props) => {

  return (
    <>
      <section className="heroSelect">
        <div className="wrapper">
        <form action="submit" onSubmit={props.handleHeroChoice}>
          <fieldset onChange={props.handleHeroSelection} className="heroSelectForm">
            
              <input type="radio" id="hero1" name="hero" value="0" />
              <label className="heroInputContainer" htmlFor="hero1" aria-label="Input to select a hero for example text">{heroes[0].name}<img className="heroPortrait" src={Lukeskywalker} alt="portrait of Luke Skywalker" /></label>
  
              <input type="radio" id="hero2" name="hero" value="1"/>
              <label className="heroInputContainer" htmlFor="hero2" aria-label="Input to select a hero for example text">{heroes[1].name}<img className="heroPortrait" src={moana} alt="Portrait of Moana" /></label>
          
          </fieldset>
            <button className="chooseHero" aria-label="This button locks in your choice of example hero">Choose Hero</button>
        </form>
        </div>
      </section>
    </>
  )
}

export default HeroSelection