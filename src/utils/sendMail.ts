export const sendMail = (name: string, email: string, message: string) => {
  return new Promise((resolve, reject) => {
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    })
      .then(async response => {
        if (!response.ok) {
          return reject('')
        }
        const { success } = await response.json()
        success ? resolve('') : reject('')
      })
      .catch(reject)
  })
}
