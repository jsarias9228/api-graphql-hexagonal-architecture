import { makeSchema, objectType, scalarType } from 'nexus'
import { GraphQLUpload } from 'graphql-upload-minimal'
import { join } from 'path'
import { readdirSync } from 'fs'
// import graphql from '.'

// Define el nuevo tipo File.

const S3File = objectType({
  name: 'S3File',
  definition(t) {
    t.nonNull.string('Key')
    t.nonNull.int('Size')
  }
})

const Upload = scalarType({
  name: 'Upload',
  description: 'The `Upload` scalar type represents a file upload.',
  parseValue: GraphQLUpload.parseValue,
  serialize: (value) => value,
  parseLiteral: GraphQLUpload.parseLiteral
})
// Obtener la lista de todos los módulos disponibles
const moduleNames = readdirSync(join(__dirname, '../modules'));

// Crear arrays para almacenar los types, queries y mutations
const allTypesSchema = [];

for (const moduleName of moduleNames) {
  const modulePath = join(__dirname, '../modules', moduleName, 'presentation');
  try {
    const types = require(join(modulePath, 'graphql'))

    if (types) allTypesSchema.push({...types});
  } catch (error) {
    console.error(`Error loading GraphQL schema elements from module ${moduleName}:`, error);
  }
}

export const schema = makeSchema({
  // types: [Query, Mutation, JsonScalar, { ...TypeSchema }, Upload, S3File],
  types: [...allTypesSchema],
  outputs: {
    schema: join(__dirname, 'generated/schema.gen.graphql'),
    typegen: join(__dirname, 'generated/nexusTypes.gen.ts')
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context'
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma'
      }
    ]
  }
  /*plugins: [

    // ... other plugins
    connectionPlugin({

      extendConnection: {

        totalCount: { type: 'Int' },

      },
      includeNodesField: true,
    }),

  ],*/
})
