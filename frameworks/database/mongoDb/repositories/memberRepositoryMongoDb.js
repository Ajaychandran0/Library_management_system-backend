import MemberModel from "../models/member.js";

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function memberRepositoryMongoDB() {
  const findByProperty = (params) => MemberModel.find(omit(params, "page", "perPage"))
    .skip(params.perPage * (params.page - 1))
    .limit(params.perPage);

  const findByEmail = (email) => MemberModel.findOne({ email }).select("password email");

  const countAll = (params) => MemberModel.countDocuments(omit(params, "page", "perPage"));

  const findById = (id) => MemberModel.findById(id);

  const add = (member) => {
    const newMember = new MemberModel({
      name: member.getName(),
      collegeId: member.getCollegeId(),
      email: member.getEmail(),
      password: member.getPassword(),
      phone:member.getPhone(),
      department: member.getDepartment(),
      address: member.getAddress(),
      profilePic:member.getProfilePic(),
      collegeIdCard: member.getCollegeIdCard(),
      createdAt: member.getCreatedAt(),
    });

    return newMember.save()
  };

  return {
    findByProperty,
    findByEmail,
    countAll,
    findById,
    add
  };
}
