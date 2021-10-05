import heroes from "./heroes";


const HeroSelection = (props) => {

  return (
    <>
      <section className="heroSelect">
        <div className="wrapper">
        <form action="submit" onSubmit={props.handleHeroChoice}>
          <fieldset onChange={props.handleHeroSelection} className="heroSelectForm">
            <input type="radio" id="hero1" name="hero" value="0" />
            <label htmlFor="hero1">{heroes[0].name}</label>
            <input type="radio" id="hero2" name="hero" value="1"/>
            <label htmlFor="hero2">{heroes[1].name}</label>
          </fieldset>
            <button className="chooseHero">Choose Hero</button>
        </form>
        </div>
      </section>
    </>
  )
}

export default HeroSelection