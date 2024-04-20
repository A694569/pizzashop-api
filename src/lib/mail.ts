import nodemailer from 'nodemailer'

const account = await nodemailer.createTestAccount()

const transporter = nodemailer.createTransport({
  host: account.smtp.host,
  port: account.smtp.port,
  secure: account.smtp.secure,
  debug: true,
  auth: {
    user: account.user,
    pass: account.pass,
  },
})

export const mail = transporter
