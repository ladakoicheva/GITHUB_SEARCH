
import IOSSwitch from "../Switch/Switch";
import './Repo.css'


export default function Repo({ deleteRepo, add, repo, index, config }) {
  
  
  
  const change = (e) => {
    if (!e.target.checked) {
      deleteRepo(repo, index)

    } else {
      add(repo, index)
    }
  }

  
 

  return (



    <li className="repo-item">


      <label htmlFor={repo.id} className="repo-label">
        {repo.name}
      </label>
      <IOSSwitch
        id={repo.id}
        onChange={change}
        checked={config[index].isActive }
      />

    </li>

  )
}





