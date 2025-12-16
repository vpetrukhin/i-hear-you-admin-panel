import slugify from 'slugify';

export const getSlug = (value: string, maxLength = 19) => slugify(Array.from(value).slice(0, maxLength).join(''), {
  lower: true,        // lowercase
  strict: true,       // убрать спецсимволы
  trim: true,
  locale: 'ru',       // корректная транслитерация
})
