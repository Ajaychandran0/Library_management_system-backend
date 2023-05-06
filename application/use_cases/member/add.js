import member from "../../../src/entities/member.js";

export default function addMember(
  memberDetails,
  memberRepository,
  authService
) {
  const {
    name,
    collegeId,
    email,
    phone,
    department,
    address,
    profilePic,
    collegeIdCard
  } = memberDetails;

  const password = collegeId;
  const createdAt = new Date();

  if (!name || !email || !phone || !department || !collegeId) {
    const error = { message: "Input fields cannot be empty", statusCode: 400 };
    throw error;
  }

  const newMember = member({
    name,
    collegeId,
    password: authService.encryptPassword(password),
    email,
    phone,
    department,
    address,
    profilePic,
    collegeIdCard,
    createdAt
  });

  return memberRepository.findByProperty({ collegeId }).then((memberExist) => {
    if (memberExist.length) {
      const error = {
        message: `User with college id: ${collegeId} already exists`,
        statusCode: 500
      };
      throw error;
    }
    return memberRepository.findByProperty({ email });
  })
    .then((memberWithEmail) => {
      if (memberWithEmail.length) {
        const error = {
          message: `User with email: ${email} already exists`,
          statusCode: 500
        };
        throw error;
      }
      return memberRepository.add(newMember);
    });
}
