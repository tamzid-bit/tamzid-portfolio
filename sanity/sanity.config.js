import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Tamzid Rahman — Portfolio',
  projectId: 'REPLACE_WITH_PROJECT_ID', // from sanity.io/manage
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
