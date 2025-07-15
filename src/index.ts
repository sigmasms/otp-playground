import path from 'path'
import { fileURLToPath } from 'url'

import cors from 'cors'
import express from 'express'

const {
  SigmaOtpSDK,
  SigmaOtpSDKEnvironmentEnum,
  registerExpressRoutes
} = await import('@sigmamessaging/otp-sdk')

const SIGMA_API_TOKEN = process.env.SIGMA_API_TOKEN ?? 'YOUR_API_TOKEN'
const SIGMA_API_URL = process.env.SIGMA_API_URL ?? 'https://online.sigmasms.ru'

// Создаем express приложение, оно будет принимать все запросы - и на фронт, и на бэк
const app = express()

// Настраиваем CORS, чтобы разрешить запросы с любого источника
app.use(cors({ origin: '*' }))

// Настраиваем парсинг JSON тела запросов
app.use(express.json())

// Раздаем статические файлы из папки public для запросов на корневой путь
// Это позволяет нам обслуживать фронтенд приложения
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use('/', express.static(path.join(__dirname, '../public')))

// Настраиваем переменные для SDK
const sigmaOtpSdkSettings = {
  apiToken: SIGMA_API_TOKEN,
  apiUrl: `${SIGMA_API_URL}/api/n/otp-handler`,
  environment: SigmaOtpSDKEnvironmentEnum.production,
  prefix: process.env.WIDGET_PREFIX
}

// Подключаем маршруты SDK к express приложению
registerExpressRoutes(app, sigmaOtpSdkSettings)

// Симуляция отправки формы
app.post('/formSubmit', async (req, res) => {
  const { requestId, recipient } = req.body
  try {
    const client = new SigmaOtpSDK(sigmaOtpSdkSettings)
    const data = await client.checkStatusAndComplete(requestId, recipient)

    // Здесь, по резульатам проверки статуса, можно выполнить дополнительные действия, 
    // которые зависят от успешности проверки OTP

    res.json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})


const OTP_PLAYGROUND_PORT = process.env.OTP_PLAYGROUND_PORT ?? 32768
// Запускаем сервер на указанном порту
app.listen(OTP_PLAYGROUND_PORT, () => {
  console.log(`Server running on port ${OTP_PLAYGROUND_PORT}`) // eslint-disable-line no-console
  console.log(`You can access the SDK at your host, port ${OTP_PLAYGROUND_PORT}`) // eslint-disable-line no-console
})
