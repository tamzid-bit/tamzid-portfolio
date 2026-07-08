export default {
  name: 'track',
  title: 'Track',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: r => r.required() },
    { name: 'artist', title: 'Artist', type: 'string', validation: r => r.required() },
    { name: 'genre', title: 'Genre', type: 'reference', to: [{ type: 'genre' }], validation: r => r.required() },
    { name: 'year', title: 'Year', type: 'number' },
    {
      name: 'roles', title: 'Roles', type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['Mix', 'Master', 'Produce'], layout: 'grid' },
      validation: r => r.required().min(1),
    },
    { name: 'youtube', title: 'YouTube link', type: 'url', description: 'The song on YouTube (opens from the track row)' },
    { name: 'cover', title: 'Cover art', type: 'image', options: { hotspot: true }, description: 'Square artwork. If empty, a generated cover is shown.' },
  ],
  preview: {
    select: { title: 'title', artist: 'artist', genre: 'genre.title', media: 'cover' },
    prepare: ({ title, artist, genre, media }) => ({ title, subtitle: `${artist} · ${genre || ''}`, media }),
  },
};
