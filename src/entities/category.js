export default function category(category) {
    return {
      getName: () => category.name,
      getDescription: () => category.description,
      getImageUrl: () => category.imageUrl,
      getCreatedAt: () => category.createdAt,
      getUpdatedAt: () => category?.updatedAt,
    };
  }
  