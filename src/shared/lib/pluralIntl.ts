const pluralRules = new Intl.PluralRules('ru-RU');

export function pluralizeIntl(
  count: number,
  forms: {
    one: string;
    few: string;
    many: string;
    other?: string;
  }
): string {
  const rule = pluralRules.select(count);

  switch (rule) {
    case 'one':
      return forms.one;
    case 'few':
      return forms.few;
    case 'many':
      return forms.many;
    default:
      return forms.other ?? forms.many;
  }
}
