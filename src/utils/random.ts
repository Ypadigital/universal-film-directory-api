import crypto from "crypto";

export const random = () => {
  let range = Array.from(Array(10).keys());
  let token = "";
  for (let i = 0; i < 3; i++) {
    let randomIndex = Math.floor(Math.random() * range.length);
    token += range[randomIndex];
  }
  return token;
};

export const getRandomKey = (length: number = 7) => {
  return crypto.randomBytes(length).toString("hex");
};
