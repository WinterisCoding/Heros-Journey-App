import heroes from "./heroes";

const NameHero = () => {
  return (
    <div>
      <form action="submit">
        <label htmlFor="heroName">What is your hero's name?</label>
        <input type="text"/>
        <button></button>
      </form>
    </div>
  )
}

export default NameHero