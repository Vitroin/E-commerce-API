const generateMessage = (entity: string) => ({
  Found: `${entity} Found`,
  notFound: `${entity} Not Found`,
  alreadyExists: `${entity} Already Exist`,
  created: `${entity} Created Successfully`,
  updated: `${entity} Updated Successfully`,
  deleted: `${entity} Deleted Successfully`,
  failedToCreate: `Failed to Create ${entity}`,
  failedToUpdate: `Failed to Update ${entity}`,
  failedToDelete: `Failed to Delete ${entity}`,
});

export const MESSAGE = {
  Category: { ...generateMessage('Category') },
  Brand: { ...generateMessage('Brand') },
  Product: { ...generateMessage('Product') },
  User: { ...generateMessage('User') },
  Customer: { ...generateMessage('Customer') },
  Coupon: { ...generateMessage('Coupon') },
  Cart: { ...generateMessage('Cart') },
};
