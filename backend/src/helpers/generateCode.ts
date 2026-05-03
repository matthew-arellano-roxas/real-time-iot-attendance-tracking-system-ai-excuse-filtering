import { nanoid } from 'nanoid';

export const generateCode = (startingChars?: string) => {
  return `${startingChars || ''}${startingChars ? '-' : ''}${nanoid(6)}`;
};
