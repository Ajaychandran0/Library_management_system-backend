export default function updateMember(id, updatedMember, memberRepository) {
  return memberRepository.updateById(id, updatedMember);
}
