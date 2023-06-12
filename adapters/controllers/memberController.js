import addMember from "../../application/use_cases/member/add.js";
import findByProperty from "../../application/use_cases/member/findByProperty.js";
import countAll from "../../application/use_cases/member/countAll.js";
import deleteMember from "../../application/use_cases/member/delete.js";
import updateMember from "../../application/use_cases/member/update.js";

export default function memberController(memberRepository, authService) {
  const addNewMember = (req, res) => {
    const memberDetails = req.body;

    addMember(memberDetails, memberRepository, authService)
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
    params.page = params.page ? parseInt(params.page, 10) : 0;
    params.pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 100;

    findByProperty(params, memberRepository)
      .then((members) => {
        response.members = members;
        return countAll(params, memberRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = Math.ceil(totalItems / params.pageSize);
        response.itemsPerPage = params.pageSize;
        return res.json(response);
      })
      .catch((error) => res.status(500).json({ message: error }));
  };

  const deleteMemberById = (req, res) => {
    const { id } = req.params;
    deleteMember(id, memberRepository)
      .then(() => res.status(200).json({ id }))
      .catch((err) => {
        res.status(err.statusCode || 500).json({ message: err.message || err });
      });
  };

  const updateMemberById = (req, res) => {
    const { id } = req.params;
    const updatedMember = req.body;
    updateMember(id, updatedMember, memberRepository)
      .then(() => res.status(200).json({ success: true }))
      .catch((err) => {
        res.status(err.statusCode || 500).json({ message: err.message || err });
      });
  };

  const fetchMemberById = (req, res) => {
    const memberId = req.user.id;
    findByProperty({ _id: memberId }, memberRepository)
      .then((memberDetails) => res.json({ memberDetails: memberDetails[0] }))
      .catch((err) => {
        res.status(err.statusCode || 500).json({ message: err.message || err });
      });
  };

  return {
    addNewMember,
    fetchMembersByProperty,
    deleteMemberById,
    updateMemberById,
    fetchMemberById
  };
}
