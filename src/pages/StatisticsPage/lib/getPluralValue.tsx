import { pluralizeIntl } from "@/shared/lib/pluralIntl";

export const getPluralValue = (count: number) => {
  return `${count} ${pluralizeIntl(count, {
    one: 'человек',
    few: 'человека',
    many: 'человек',
  })}`;
}
