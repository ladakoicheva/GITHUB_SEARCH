export const USERSLINK = 'https://api.github.com/users/';
export const TOKEN = import.meta.env.VITE_TOKEN;

export async function fetchData(link) {

  const response = await fetch(link, {
    headers: {
      'Authorization': TOKEN,
    }
  });
  const data = await response.json();

  if (!response.ok) {
    throw { is: true, text: data.message }
  }
  return data;


}

export  const showError = (err,callback) => {
  callback(err);
  setTimeout(() => {
    callback("")
  }, 2000)

}