import './Home.css'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className='wrapper'>
      <h1>Welcome to GitHub Search App</h1>
      <p>
        To explore users  press button below
      </p>
      <Link to='gitHub' className='searchBtn'><h3>Search</h3></Link>
    </main>

  )
}
