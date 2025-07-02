const setAuthCookie = (res, token) => {
  res.cookie("access_token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
  });
};
export default setAuthCookie;
