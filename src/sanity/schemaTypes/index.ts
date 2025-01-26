import { type SchemaTypeDefinition } from 'sanity'
import car from './car'
import category from './category'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [car,category],
}
