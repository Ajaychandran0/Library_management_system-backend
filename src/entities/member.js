export default function user(member) {
  return {
    getName: () => member.name,
    getCollegeId: () => member.collegeId,
    getPassword: () => member.password,
    getEmail: () => member.email,
    getPhone: () => member.phone,
    getDepartment: () => member.department,
    getAddress: () => member.address,
    getProfilePic: () => member.profilePic,
    getCollegeIdCard: () => member.collegeIdCard,
    getCreatedAt: () => member.createdAt,
  };
}
