import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SITE, WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '@/lib/site'
import { Button } from '@/components/ui/button'

const SUBJECT = 'New project inquiry — CompTeq Digital'
const initial = { state: 'idle', message: '' }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(fields) {
  const errors = {}
  if (!fields.name) errors.name = 'Please enter your name.'
  if (!fields.email) errors.email = 'Please enter your work email.'
  else if (!EMAIL_PATTERN.test(fields.email)) errors.email = 'Please enter a valid email address.'
  if (!fields.message) errors.message = 'Please tell us how we can help.'
  return errors
}

export function ContactForm() {
  const [status, setStatus] = useState(initial)
  const [errors, setErrors] = useState({})
  const statusRef = useRef(null)
  const sending = useRef(false)

  useEffect(() => {
    if (status.state === 'success' || status.state === 'error') {
      if (status.state === 'error' && Object.keys(errors).length > 0) return
      statusRef.current?.focus()
    }
  }, [status, errors])

  async function onSubmit(event) {
    event.preventDefault()
    if (sending.current) return

    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (String(data.website || '').trim()) {
      form.reset()
      setErrors({})
      setStatus({
        state: 'success',
        message: 'Thank you. We received your message and will reply within one business day.',
      })
      return
    }

    const fields = {
      name: String(data.name || '').trim(),
      email: String(data.email || '').trim(),
      message: String(data.message || '').trim(),
    }
    const nextErrors = validate(fields)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus({ state: 'error', message: 'Please correct the highlighted fields before sending.' })
      const fieldId = { name: 'cf-name', email: 'cf-email', message: 'cf-message' }
      const first = ['name', 'email', 'message'].find((key) => nextErrors[key])
      requestAnimationFrame(() => document.getElementById(fieldId[first])?.focus())
      return
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setErrors({})
      setStatus({
        state: 'error',
        message: `The contact form is unavailable right now. Please email ${SITE.email} and we will reply within one business day.`,
      })
      return
    }

    sending.current = true
    setStatus({ state: 'sending', message: 'Sending your message…' })

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: fields.name,
          email: fields.email,
          message: fields.message,
          subject: SUBJECT,
          from_name: fields.name,
          replyto: fields.email,
        }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.success) {
        throw new Error('submit failed')
      }
      form.reset()
      setErrors({})
      setStatus({
        state: 'success',
        message: 'Thank you. We received your message and will reply within one business day.',
      })
    } catch {
      setStatus({
        state: 'error',
        message: `Something went wrong and your message was not sent. Please email ${SITE.email} and we will reply within one business day.`,
      })
    } finally {
      sending.current = false
    }
  }

  const sendingNow = status.state === 'sending'

  return (
    <form
      className="form-card"
      onSubmit={onSubmit}
      action="#contact"
      method="post"
      noValidate
      aria-labelledby="form-title"
      aria-busy={sendingNow}
    >
      <h3 id="form-title" className="form-card__title">Tell us about your project</h3>
      <div className="form-two">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Jane Doe"
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
            disabled={sendingNow}
          />
          {errors.name ? <p id="cf-name-error" className="field-error">{errors.name}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="cf-email">Work email</label>
          <input
            id="cf-email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={254}
            placeholder="jane@company.com"
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            disabled={sendingNow}
          />
          {errors.email ? <p id="cf-email-error" className="field-error">{errors.email}</p> : null}
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-message">How can we help?</label>
        <textarea
          id="cf-message"
          name="message"
          required
          maxLength={5000}
          placeholder="Tell us about the product, the workflow, the goal."
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          disabled={sendingNow}
        />
        {errors.message ? <p id="cf-message-error" className="field-error">{errors.message}</p> : null}
      </div>
      <div className="field field--trap" aria-hidden="true">
        <label htmlFor="cf-website">Leave this field empty</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" disabled={sendingNow}>
        {sendingNow ? 'Sending…' : 'Send message'}
        {sendingNow ? null : <ArrowRight aria-hidden="true" />}
      </Button>
      <p
        ref={statusRef}
        tabIndex={-1}
        className={`form-status form-status--${status.state}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status.message}
      </p>
      <p className="form-note">
        We reply within one business day. No newsletter, no spam. See our{' '}
        <Link to="/privacy/">Privacy Policy</Link>.
      </p>
    </form>
  )
}
