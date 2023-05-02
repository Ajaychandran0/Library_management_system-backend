export default function userRepository(repository) {
  const findByProperty = (params) => repository.findByProperty(params);
  const findByEmail = (email) => repository.findByEmail(email);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (member) => repository.add(member);

  return {
    findByProperty,
    findByEmail,
    countAll,
    findById,
    add
  };
}
