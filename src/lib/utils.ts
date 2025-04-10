import axios from 'axios'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function firstUpper(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const fetchData = async (url: string) => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error: unknown) {
    console.log(error)
  }
}
