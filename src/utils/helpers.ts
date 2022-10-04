import * as bcrypt from 'bcrypt';

export async function hachPassword(rawPassword: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(rawPassword, salt);
}

export async function conparePassword(
  rawPassword: string,
  hachPassword: string,
) {
  return await bcrypt.compare(rawPassword, hachPassword);
}
