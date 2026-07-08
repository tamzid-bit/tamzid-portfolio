export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'type', title: 'Type', type: 'string',
      options: { list: ['Netflix', 'Theatre', 'Ad', 'Content'], layout: 'radio' },
      validation: r => r.required(),
    },
    { name: 'title', title: 'Title', type: 'string', validation: r => r.required() },
    { name: 'client', title: 'Client / Brand', type: 'string' },
    { name: 'year', title: 'Year', type: 'number' },
    { name: 'role', title: 'Your role', type: 'string', description: 'e.g. "Audio post", "BGM mix & master"' },
    { name: 'note', title: 'Note', type: 'string' },
    { name: 'link', title: 'Watch / listen link', type: 'url' },
  ],
  preview: {
    select: { title: 'title', type: 'type', client: 'client' },
    prepare: ({ title, type, client }) => ({ title, subtitle: `${type} · ${client || ''}` }),
  },
};
