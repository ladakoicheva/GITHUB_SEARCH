import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchData, USERSLINK, showError } from "../../api";
import './CurrentUserPage.css';
import Charts from "../Chart/Charts";



export default function CurrentUser() {

  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const params = useParams();

  useEffect(() => {
    Promise.all([getCurrentUser(), getUserRepos()])

      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  async function getUserRepos() {
    try {
      const data = await fetchData(USERSLINK + params.login + '/repos');
      setRepos(data);
    } catch (e) {
      showError(e.is ? e.text : 'no connection', setError);
    }


  }
  async function getCurrentUser() {
    try {

      const data = await fetchData(USERSLINK + params.login);
      setUser(data);

    } catch (e) {
      showError(e.is ? e.text : 'no connection', setError);
    }




  }
  return (
    <>
      <ErrorMessage errorClass={`error ${error ? 'slide' : null}`} error={error} />
      <Link className="BackBtn searchBtn" to='/gitHub'> ← Back</Link>
      {isloading && <div className="loader2"></div>}
      {
        user &&

        <article className="userInfo">


          <section className="UserData">
            <img className="avatar" src={user.avatar_url} alt="avatar" />

            <div className="descr">
              <h1>{user.name || params.login}</h1>

              <ul className="user-details">
                <li><span > Location:</span>{user.location ? user.location : 'Unavailable'}</li>
                <li><span >BIO:</span>{user.bio ? user.bio : 'No bio'}</li>


              </ul>

              <div className="other">

                <h2>Other info</h2>
                <ul className="other-info">
                  <li>Followers: {user.followers}</li>
                  <li>Following: {user.following}</li>
                  <li>Company: {user.company ? user.company : 'Unavailable'}</li>
                  <li>Blog: {user.blog ? <a href={user.blog}>{user.blog}</a> : 'Unavailable'}</li>

                </ul>
              </div>

            </div>


          </section>
        </article>


      }
      {
        repos &&
        <section className="statistics">
          {user &&
            <h1>  {repos.length > 0 ? 'Repository Statistics' : 'No repos'}</h1>
          }
          <Charts repos={repos} />
        </section>
      }


    </>
  )
}
