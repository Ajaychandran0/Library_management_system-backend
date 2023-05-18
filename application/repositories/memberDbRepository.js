export default function memberRepository(repository) {
  const findByProperty = (params) => repository.findByProperty(params);
  const findByEmail = (email) => repository.findByEmail(email);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (member) => repository.add(member);
  const block = (id) => repository.block(id);
  const deleteById = (id) => repository.deleteById(id);
  const updateById = (id, updatedMember) => repository.updateById(id, updatedMember);

  return {
    findByProperty,
    findByEmail,
    countAll,
    findById,
    add,
    block,
    deleteById,
    updateById
  };
}
