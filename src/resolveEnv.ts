import fs from 'fs-extra'
import path from 'path'
import dotenv from 'dotenv'
import consola from 'consola'

export default function resolveEnv() {
  const env = process.env.NODE_ENV || 'development'

  const envPath = path.resolve(process.cwd(), '.env')
  const envPathByMode = path.resolve(process.cwd(), `.env.${env}`)

  const readPath = fs.existsSync(envPathByMode) ? envPathByMode : envPath

  let parsed = {}
  try {
    parsed = dotenv.parse(fs.readFileSync(readPath, 'utf8'))
  } catch (error) {
    if (error.code !== 'ENOENT') {
      consola.error('There was a problem processing the .env file', error)
    }
  }

  return Object.freeze(parsed)
}