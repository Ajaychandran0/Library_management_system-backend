export default function adminRepositry(repository) {
  const findByEmail = (email) => repository.findByEmail(email);
  const add = (user) => repository.add(user);

  return {
    findByEmail,
    add
  };
}
