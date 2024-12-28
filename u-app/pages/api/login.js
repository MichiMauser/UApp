import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET_KEY = 'razvanricu';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body.user;
    // console.log(req.body)
    if (!username || !password) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const token = jwt.sign(req.body, SECRET_KEY, { expiresIn: '1h' });

    const cookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60*5, // 5 minute
      path: '/',
      sameSite: 'lax', 
    });

    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({ message: 'Successfully logged in', token });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
