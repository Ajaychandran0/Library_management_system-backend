import MemberModel from "../models/member.js";

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function memberRepositoryMongoDB() {
  const findByProperty = (params) => MemberModel.find(omit(params, "page", "pageSize"))
    .sort({ _id: -1 })
    .skip(params.pageSize * params.page)
    .limit(params.pageSize);

  const findByEmail = (email) => MemberModel.findOne({ email }).select("password email name");

  const countAll = (params) => MemberModel.countDocuments(omit(params, "page", "pageSize"));

  const findById = (id) => MemberModel.findById(id);

  const add = (member) => {
    const newMember = new MemberModel({
      name: member.getName(),
      collegeId: member.getCollegeId(),
      email: member.getEmail(),
      password: member.getPassword(),
      phone: member.getPhone(),
      department: member.getDepartment(),
      address: member.getAddress(),
      profilePic: member.getProfilePic(),
      collegeIdCard: member.getCollegeIdCard(),
      createdAt: member.getCreatedAt()
    });

    return newMember.save();
  };

  const deleteById = (id) => MemberModel.deleteOne({ _id: id });

  const updateById = (id, updatedMember) => MemberModel.updateOne({ _id: id }, updatedMember);

  return {
    findByProperty,
    findByEmail,
    countAll,
    findById,
    add,
    deleteById,
    updateById
  };
}
