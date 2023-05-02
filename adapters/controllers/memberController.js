import addMember from "../../application/use_cases/member/add.js";

export default function memberController(
  memberDbRepository,
  memberDbRepositoryImpl,
  authServiceInterface,
  authServiceImpl
) {
  const dbRepository = memberDbRepository(memberDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());

  const addNewMember = (req, res, next) => {
    const memberDetails = req.body;

    addMember(memberDetails, dbRepository, authService)
      .then((user) => res.status(200).json({ user }))
      .catch((err) => {
        console.log(err);
      res.status(err.statusCode || 500).json({message:err.message ||err});

      })
      
  };

  return {
    addNewMember,
  };
}
