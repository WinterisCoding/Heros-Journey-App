
const Header = (props) => {
  return (
    <header>
      <div className="wrapper">
        <h1>The Hero's Journey</h1>
        <button onClick={props.signingOut} className="logoutButton">Log Out</button>
      </div>
      
    </header>
  );
}

export default Header;