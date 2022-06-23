import jwt from 'jsonwebtoken';

const senhaSecreta = 'SenhaSuperSecreta123';

const jwtConfig: object = { expiresIn: '7d', algorithm: 'HS256' };

const createToken = (payload: { id: number, username: string, classe: string, level: number }) => {
  const token = jwt.sign(payload, senhaSecreta, jwtConfig);

  return token;
};

export default createToken;