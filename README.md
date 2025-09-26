# Админ-панель бота "Я тебя слышу"

`Ссылка на проект`

## Команда

- [Василий Петрухин](https://github.com/vpetrukhin)


## Запуск проекта

В режиме разработки
```
npm ci
npm run dev
```

Прод-режим
```
npm ci
npm run build
```

## Используемый стек технологий

- Typescript
- React
- [MaterialUI](https://mui.com/material-ui)
- [Tanstack Query](https://tanstack.com/query/latest)
- [MSW](https://mswjs.io)

## Для разработки

### Архитектура

Работаем по [FSD](https://feature-sliced.github.io/documentation/)

### Mock Service Worker

В режиме разработки можно замокать ответы бекенда. Для это нужно прописать хендлеры в файле `./src/shared/lib/mocks/handlers.ts`.

```
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get("https://api.example.com/user", () => {
    return HttpResponse.json({
      id: "abc-123",
      firstName: "John",
      lastName: "Maverick",
    });
  }),
  // Сюда добавляются хендлеры запросов
];
```
