import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CONTACT_ENDPOINT, SITE } from '@/lib/site'
import { Button } from '@/components/ui/button'

const initial = { state: 'idle', message: '' }

export function ContactForm() {
  const [status, setStatus] = useState(initial)

  async function onSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data.website) return

    if (CONTACT_ENDPOINT) {
      setStatus({ state: 'sending', message: 'Sending your message...' })
      try {
        const response = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: data.name, email: data.email, message: data.message }),
        })
        if (!response.ok) throw new Error(String(response.status))
        form.reset()
        setStatus({ state: 'success', message: 'Thank you. We received your message and will reply within one business day.' })
      } catch {
        setStatus({
          state: 'error',
          message: `Something went wrong. Please email us directly at ${SITE.email}.`,
        })
      }
      return
    }

    const subject = `Project enquiry from ${data.name}`
    const body = `${data.message}\n\n--\n${data.name}\n${data.email}`
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus({
      state: 'success',
      message: `Your email app should open with the message ready to send. If nothing happens, write to ${SITE.email}.`,
    })
  }

  return (
    <form
      className="form-card"
      onSubmit={onSubmit}
      action={`mailto:${SITE.email}`}
      method="post"
      encType="text/plain"
      aria-labelledby="form-title"
    >
      <h3 id="form-title" className="form-card__title">Tell us about your project</h3>
      <div className="form-two">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" autoComplete="name" required placeholder="Jane Doe" />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Work email</label>
          <input id="cf-email" type="email" name="email" autoComplete="email" required placeholder="jane@company.com" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-message">How can we help?</label>
        <textarea id="cf-message" name="message" required placeholder="Tell us about the product, the workflow, the goal." />
      </div>
      <div className="field field--trap" aria-hidden="true">
        <label htmlFor="cf-website">Leave this field empty</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" disabled={status.state === 'sending'}>
        Send message <ArrowRight aria-hidden="true" />
      </Button>
      <p className={`form-status form-status--${status.state}`} role="status" aria-live="polite">
        {status.message}
      </p>
      <p className="form-note">
        We reply within one business day. No newsletter, no spam. See our{' '}
        <Link to="/privacy/">Privacy Policy</Link>.
      </p>
    </form>
  )
}
