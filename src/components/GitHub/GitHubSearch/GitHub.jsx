import { useState } from "react";
import UserCard from "../UserCard/UserCard";
import { useEffect } from "react";
import { USERSLINK, fetchData, showError } from "../../../api";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import './GitHub.css'


const minutes = 15 * 60*1000
const sortA_Z = (a, b) => {
  if (a.login > b.login) return 1;
  if (a.login < b.login) return -1;
  return 0;
};

const sortZ_A = (a, b) => {
  if (a.login > b.login) return -1;
  if (a.login < b.login) return 1;
  return 0;
}
//name
//avatar_url

// useEffect 



export default function GitHub() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const [value, setValue] = useState('');
  const [userData, setUserData] = useState(users);
  const [isloading, setIsLoading] = useState(false);
  const [selectValue, setSelectValue] = useState('normal');
  const [error, setError] = useState("");



  useEffect(() => {
    sortUsers();
  }, [selectValue]);


  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(userData));

  }, [userData])

  const onChange = (e) => {
    setValue(e.target.value);

  }



  async function getUserdata(e) {

    e.preventDefault();

    if (!value.trim()) return showError('Pole empty!', setError)
    setIsLoading(true);

    try {

      const data = await fetchData(USERSLINK + value)
      const isExist = userData.some((user) => user.id === data.id);

      if (!isExist) {
        setUserData([...userData, { time: Date.now() + minutes, id: data.id, name: data.name, avatar_url: data.avatar_url, login: data.login }]);
      } else {
        showError('User exists', setError)
      }


    } catch (e) {
      showError(e.is ? e.text : 'no connection', setError)
    } finally {
      setIsLoading(false);
    }

  }

  const deleteUser = (id) => {
    const filteredArr = userData.filter((el) => el.id !== id);
    setUserData(filteredArr);
  }
  const onSelectChange = (e) => {
    setSelectValue(e.target.value);

  }


  const sortUsers = () => {

    const copyArrToSort = [...userData];
    const callback = selectValue === 'A-Z' ? sortA_Z : sortZ_A;
    copyArrToSort.sort(callback);
    setUserData(copyArrToSort);

  }
  return (



    <section className="github-section">

      <ErrorMessage errorClass={`error ${error ? 'slide' : null}`} error={error} />
      <form className="elems" onSubmit={getUserdata}>
        <label htmlFor="sort-users" className="visually-hidden">Сортировка</label>

        <select id='sort-users' onChange={onSelectChange} value={selectValue}>
          <option value='normal' hidden>normal</option>
          <option value='A-Z'>A-Z</option>
          <option value='Z-A'>Z-A</option>
        </select>
        <label htmlFor="search-user" className="visually-hidden">Логин пользователя</label>

        <input id="search-user" placeholder='enter your login... ' type="search" onChange={onChange} value={value} />
        <button className='searchBtn ' onClick={getUserdata}>Search</button>
        {isloading && <div className="loader"></div>}

      </form>


      <ul className="gridColumns">
        { userData.map((el) =>
          
          <li key={el.id}>
            <UserCard key={el.id} deleteUser={() => deleteUser(el.id)} user={el} />
          </li>
        )}

      </ul>

    </section>
  )

}
