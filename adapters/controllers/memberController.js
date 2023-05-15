import addMember from "../../application/use_cases/member/add.js";
import findByProperty from "../../application/use_cases/member/findByProperty.js";
import countAll from "../../application/use_cases/member/countAll.js";

export default function memberController(dbRepository, authService) {
  const addNewMember = (req, res) => {
    const memberDetails = req.body;

    addMember(memberDetails, dbRepository, authService)
      .then((member) => res.status(200).json({ member }))
      .catch((err) => {
        res.status(err.statusCode || 500).json({ message: err.message || err });
      });
  };

  const fetchMembersByProperty = (req, res) => {
    const params = {};
    const response = {};

    // Dynamically created query params based on endpoint params
    Object.keys(req.query).forEach((key) => {
      params[key] = req.query[key];
    });

    // predefined query params (apart from dynamically) for pagination
    params.page = params.page ? parseInt(params.page, 10) : 1;
    params.pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 10;

    findByProperty(params, dbRepository)
      .then((members) => {
        response.members = members;
        return countAll(params, dbRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = Math.ceil(totalItems / params.pageSize);
        response.itemsPerPage = params.pageSize;
        return res.json(response);
      })
      .catch((error) => res.status(500).json({ message: error }));
  };

  return {
    addNewMember,
    fetchMembersByProperty
  };
}
