export const regexp = {
  email: new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: new RegExp(
    /^[^\s]{5,16}$/,
    // /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
  ),
  validate_password: new RegExp(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)\S*$/,
  ),
  phone: new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
};
