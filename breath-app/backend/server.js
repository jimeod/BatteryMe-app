require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const checkinRoutes = require('./routes/checkinRoutes')
const thoughtRoutes = require('./routes/thoughtRoutes')
const profileRoutes = require('./routes/profileRoutes')

connectDB()

const app = express()

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  }),
)

app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/checkins', checkinRoutes)
app.use('/api/thoughts', thoughtRoutes)
app.use('/api/profile', profileRoutes)

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Breathe API running' }))

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada' }))

// Error handler
app.use((err, req, res, _next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Error interno del servidor' })
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`))
