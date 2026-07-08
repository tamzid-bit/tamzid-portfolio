export default {
  name: 'genre',
  title: 'Genre',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: r => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() },
    { name: 'color', title: 'Accent colour (hex)', type: 'string', description: 'e.g. #ff5da2 — drives the UI accent', validation: r => r.required() },
    { name: 'blurb', title: 'One-line blurb', type: 'string' },
    { name: 'order', title: 'Sort order', type: 'number', initialValue: 0 },
  ],
  preview: { select: { title: 'title', subtitle: 'blurb' } },
};
