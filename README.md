# OTP Playground

## Описание
OTP Playground - проект для тестирования сервиса ProPush от SigmaMessaging.

## Установка и запуск

1. Убедитесь, что у вас установлен [Docker](https://www.docker.com/get-started) и [Docker Compose](https://docs.docker.com/compose/install/).
2. Склонируйте репозиторий:
    ```bash
    git clone git@github.com:sigmasms/otp-playground.git
    cd otp-playground
    ```
3. Запустите Docker контейнер:
    ```bash
    docker compose run -it --rm --remove-orphans otp-playground-public sh
    ```
4. Установите зависимости:
    ```bash
    pnpm i
    ```
5. Запустите проект:
    ```bash
    npm run start
    ```
6. Откройте браузер и перейдите по адресу [http://localhost:32768](http://localhost:32768) (или используйте порт, указанный в переменной окружения `OTP_PLAYGROUND_PORT`).

## Настройка

Для минимальной настройки проекта, внесите изменения в два файла:

1. `src/index.ts` - настройте переменную `SIGMA_API_TOKEN`
2. `public/index.html` - настройте `widgetId` в массиве `OTP_WIDGETS`