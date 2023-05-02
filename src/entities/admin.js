export default function admin(email, password, date) {
  return {
    getEmail: () => email,
    getPassword: () => password,
    getDate: () => date,
  };
}
