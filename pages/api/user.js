export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies.OhelShemJWT;

  if (!jwt) {
    return res.json({ message: "Invalid token!" });
  }

  return res.json({ data: "Top secret data!" });
}
