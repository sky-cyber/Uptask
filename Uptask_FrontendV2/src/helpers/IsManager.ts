export const IsManager = (Manager: string = "", user: string = "") => {
   const result = Manager === user;
   return result;
};
