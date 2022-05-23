const isValidInput = (input, inputType = 'default') => {
  let pattern;
  switch (inputType) {
    case 'id':
      pattern = /^[1-9]+$/;
      break;
    case 'username':
      pattern = /^[A-Za-z][A-Za-z0-9]+$/;
      break;
    case 'password':
      pattern = /^[A-Za-z1-9@$!%*#?&]{6,}$/;
      break;
    case 'key':
      pattern = /^[A-Za-z0-9]+$/;
      break;
    default:
      pattern = /^.+$/;
  }

  if (!input.toString().match(pattern)) {
    return false;
  }

  return true;
};

module.exports = isValidInput;
