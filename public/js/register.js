import { supabase } from '/src/lib/supabaseClient.js'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#register-form')
  const message = document.querySelector('#message')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = form.email.value
    const password = form.password.value

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      message.textContent = error.message
      message.className = 'text-red-600'
    } else {
      message.textContent = '¡Cuenta creada con éxito! Revisa tu correo.'
      message.className = 'text-green-600'
      form.reset()
    }
  })
})
