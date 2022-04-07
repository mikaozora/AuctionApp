const isLogin = () => {
  if (localStorage.getItem("userLogin")) {
    return true;
  }

  return false;
};

const isLoginAdmin = () => {
  if (
    localStorage.getItem("userLogin") &&
    (localStorage.getItem("role") === "admin" ||
      localStorage.getItem("role") === "petugas")
  ) {
    return true;
  }

  return false;
};
const isLoginMasyarakat = () => {
  if (
    !localStorage.getItem("userLogin") ||
    (localStorage.getItem("userLogin") &&
      localStorage.getItem("role") === "masyarakat")
  ) {
    return true;
  }

  return false;
};

export { isLogin, isLoginAdmin, isLoginMasyarakat };
