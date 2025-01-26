import { createClient } from 'next-sanity'

export const client = createClient({
  projectId:"2q1moi34",
  dataset:"production",
  apiVersion:"2021-08-31",
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
