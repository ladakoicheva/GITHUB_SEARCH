import { Link } from 'react-router-dom';
import './UserCard.css'

export default function User({ deleteUser, user }) {
  const { name, avatar_url,login } = user;
 
  return (

    <article  className="card">
      <Link to={login} className="card-info">
        <img src={avatar_url} alt="avatar" />
      <h3>{name||login}</h3>
      </Link>
      <span className = 'closeBtn 'onClick={deleteUser}>✕</span>
      

    </article>

  )
}
