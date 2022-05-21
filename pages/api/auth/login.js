import { withSessionRoute } from "../../../lib/withSession";

export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {
  const { username, password } = req.body;
  if (username === process.env.NEXTAUTH_USERNAME && password === process.env.NEXTAUTH_PASSWORD) {
    // get user from database then:
    req.session.user = {
      id: 1,
      admin: true,
    };
    await req.session.save();
    res.status(200).send();
  }
  else{
    res.status(400).send();
  }
}