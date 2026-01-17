import { Hono } from 'hono'

export const pingRoute = (app: Hono) => {
  app.get('/ping', (c) =>
    c.json({
      status: 'Healthy',
      time_of_last_update: Math.floor(Date.now() / 1000),
    })
  )
}