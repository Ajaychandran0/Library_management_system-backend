export default function getWishlist(memberId, wishlistRepository) {
  return wishlistRepository.getWishlist(memberId);
}

export function getWishlistIds(memberId, wishlistRepository) {
  return wishlistRepository.getWishlistIds(memberId);
}
