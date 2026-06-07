import Repo from "../Repo/Repo"


export default function Setting({ repos, add, deleteRepo,toggle,config}) {

  return (
    <>
      {
        repos &&
        repos.map((repo, i) => <Repo index={i} deleteRepo={deleteRepo} add={add} repo={repo} key={repo.id}  toggle={toggle} config ={config} />)
      }

    </>
  )
}
