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
            <div className="heroInputContainer" >
              <label htmlFor="hero1">{heroes[0].name}</label>
              <label htmlFor="hero1"><img className="heroPortrait" src={Lukeskywalker} alt="portrait of Luke Skywalker" /></label>
              <input type="radio" id="hero1" name="hero" value="0" />
            </div>
            <div className="heroInputContainer">
              <label htmlFor="hero2">{heroes[1].name}</label>
              <label htmlFor="hero2"><img className="heroPortrait" src={moana} alt="Portrait of Moana" /></label>
              <input type="radio" id="hero2" name="hero" value="1"/>
            </div>
          </fieldset>
            <button className="chooseHero">Choose Hero</button>
        </form>
        </div>
      </section>
    </>
  )
}

export default HeroSelection