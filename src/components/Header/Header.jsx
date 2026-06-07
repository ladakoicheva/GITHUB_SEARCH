import { Link } from "react-router-dom";
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/gitHub">GitHub</Link>
        
      </nav>

    </header>
  )
}
