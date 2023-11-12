import { JSONSchemaType } from 'ajv';

export const userSchema: JSONSchemaType<User> = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    email: { type: 'string', nullable: true },
  },
  required: ['id', 'name'],
  additionalProperties: false,
};
