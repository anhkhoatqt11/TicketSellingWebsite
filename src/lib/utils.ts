import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import numeral from 'numeral';
import jwt from 'jsonwebtoken';
import toast from 'react-hot-toast';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const regexPasswordSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
export const regexPasswordNumber = /[0-9]/;
export const regexPasswordUpperCase = /[A-Z]/;
export function checkEmail(email) {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(email);
}
export function checkPhoneNumber(str:string) {
  for (let i = 0; i < str.length ; i++)
  {
    if (str[i]<'0'|| str[i]>'9')
    return false;
  }
  return true;
}

export function currencyFormat(num) {
  return `${numeral(num).format('0,0')} VND`;
}
export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: 'accurate' | 'normal' = 'normal'
) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
  }`;
}
export function isArrayOfFile(files: unknown): files is File[] {
  const isArray = Array.isArray(files);
  if (!isArray) return false;
  return files.every((file) => file instanceof File);
}
export const parseJSON = (str: string, out = []) => {
  try {
    const val = JSON.parse(str);
    return val ?? out;
  } catch (error) {
    return out;
  }
};

export const verifyJwt = (token: string) => {
  console.log(process.env.NEXT_PUBLIC_JWT_SECRET);
  let email = '';
  let name = '';
  try {
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        toast.error('Invalid token');
        return;
      }
      email = decoded?.email;
      name = decoded?.name;

      toast.error('Your account is not registered yet');
      return { email, name };
    });
  } catch (err) {
    console.log(err);
  }
  return { email, name };
};

export const convertTimeStamps = (time: any) => {
  return (Date.parse(time) / 1000).toString();
};

export const convertTimeStampToDate = (time: any) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;
  const date = new Date(time * 1000); // multiply by 1000 to convert seconds to milliseconds
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};

export const combineDateTime = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(':').map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes);
  return newDate;
};
export function formatNumberWithCommas(numStr) {
  // Remove all non-numeric characters (except for decimal point)
  const sanitizedStr = numStr.replace(/[^0-9.]/g, '');

  // Convert sanitized string to an array of characters
  // eslint-disable-next-line prefer-const
  let parts = sanitizedStr.split('.');

  // Add commas for thousands, millions, etc.
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join the array back into a string
  return parts.join('.');
}

export const getImageKey = (url) => {
  const filename = url.split('/').pop();
  return filename;
};

export const convertDateTimeToDate = (type) => {
  return new Date(type).toLocaleDateString("en-GB");
}

export const prismaDateToNextDate = (type) => {
  const time = convertDateTimeToDate(type).split("/");
  const year =  parseInt(time[2]);
  const month = parseInt(time[1]) - 1;
  const day =  parseInt(time[0]);
  return new Date(year,month,day);
}

export const convertDateInUI = (type) => {
    const time = convertDateTimeToDate(type).split("/");
    return time[0]+"-"+time[1]+"-"+time[2]
}

export const convertDateUIToDate = (type) => {
  const time = type.split("-");
  const day =  parseInt(time[2]);
  const month = parseInt(time[1])-1;
  const year =  parseInt(time[0]);
  return new Date(year,month,day);
}



