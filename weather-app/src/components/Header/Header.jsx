import "./Header.css";

export default function Header(props) {
  let str = props.state;
  return (
    <header className="masthead">
      <h1>React Weather {props.state} App</h1>
    </header>
  );
}
