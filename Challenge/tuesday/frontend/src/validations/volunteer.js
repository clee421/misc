export default (volunteer) => {
  const fname = validName(volunteer.firstName);
  const mname = validMName(volunteer.midInit);
  const lname = validName(volunteer.lastName);
  const date = validDOB(volunteer.dob);

  return {
    valid: fname && mname && lname && date,
    firstName: fname,
    midInit: mname,
    lastName: lname,
    dob: date
  };
};

const validName = (name) => {
  return true;
};

const validMName = (middle) => {
  return true;
};

const validDOB = (dob) => {
  // Date should be in 01/01/2000 format
  const dateArr = dob.split("/");

  if (dateArr.length !== 3) {
    return false;
  }

  return true;
};

// const volunteer = {
//   firstName: this.state.firstName,
//   midInit: this.state.midInit,
//   lastName: this.state.lastName,
//   dob: this.state.dob,
//   interests
// };