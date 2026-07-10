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
    { name: 'link', title: 'Watch / listen link (YouTube)', type: 'url', description: 'Card thumbnail is auto-derived from this if no cover is set' },
    { name: 'cover', title: 'Cover art', type: 'image', options: { hotspot: true }, description: 'Optional override. If empty, the YouTube thumbnail is used.' },
  ],
  preview: {
    select: { title: 'title', type: 'type', client: 'client', media: 'cover' },
    prepare: ({ title, type, client, media }) => ({ title, subtitle: `${type} · ${client || ''}`, media }),
  },
};
