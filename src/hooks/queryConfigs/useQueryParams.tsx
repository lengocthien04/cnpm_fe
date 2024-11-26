import { useSearchParams } from 'react-router-dom'

export default function useQueryParams() {
  const [searchParams] = useSearchParams()
  const entries = [...searchParams.entries()]

  // Create an object that groups parameters with the same key as arrays if needed
  return entries.reduce(
    (acc, [key, value]) => {
      if (acc[key]) {
        // If the key already exists, push the value into an array
        acc[key] = Array.isArray(acc[key]) ? [...acc[key], value] : [acc[key], value]
      } else {
        acc[key] = value
      }
      return acc
    },
    {} as Record<string, string | string[]>
  )
}
