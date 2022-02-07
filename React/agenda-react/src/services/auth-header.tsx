export default function authHeader(){
  const token = localStorage.getItem('toekn');
  if(token){
    return { Authorization: `Bearer ${token}` }
  } else {
    return {};
  }
}