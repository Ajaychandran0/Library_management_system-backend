import addMember from "../../application/use_cases/member/add.js";
import findByProperty from "../../application/use_cases/member/findByProperty.js";
import countAll from "../../application/use_cases/member/countAll.js";

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
      .then((member) => res.status(200).json({ member }))
      .catch((err) => {
        console.log(err);
      res.status(err.statusCode || 500).json({message:err.message ||err});

      })
      
  };

  const fetchMembersByProperty = (req, res, next) => {
    const params = {};
    const response = {};

    // Dynamically created query params based on endpoint params
    for (const key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        params[key] = req.query[key];
      }
    }
    // predefined query params (apart from dynamically) for pagination
    params.page = params.page ? parseInt(params.page, 10) : 1;
    params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;

    findByProperty(params, dbRepository)
      .then((members) => {
        response.members = members;
        return countAll(params, dbRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = Math.ceil(totalItems / params.perPage);
        response.itemsPerPage = params.perPage;
        return res.json(response);
      })
      .catch((error) => res.status(500).json({message:error}));
  };

  return {
    addNewMember,
    fetchMembersByProperty,
  };
}
