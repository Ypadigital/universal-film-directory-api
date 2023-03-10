import jwt from "jsonwebtoken";
import env from "../config/env";

interface ITokenOptions {
  length: number;
  range: string[] | number[];
  prefix: string;
}

const generateToken = ({ length, range, prefix }: ITokenOptions) => {
  prefix = prefix || "";
  let token = "";
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * range.length);
    token += range[randomIndex];
  }
  return prefix + token;
};

const generateSignUpToken = () => {
  let range = Array.from(Array(10).keys());
  let tokenOptions = { length: 5, range, prefix: "UFD-" };
  let newToken = generateToken(tokenOptions);

  return newToken;
};

const generateAuthToken = (user: any) => {
  let dataToSign = {
    id: user._id,
    wallet: user.wallet,
    role: user.role,
  };
  const token = jwt.sign({ ...dataToSign }, env.JWT_SECRET_KEY, {
    expiresIn: "1year",
  });
  console.log({ token });
  return token;
};

export { generateSignUpToken, generateAuthToken };
