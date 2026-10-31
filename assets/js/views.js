const counter = document.querySelector('[data-views]')
const slug = counter.dataset.views
const key = `viewed-${slug}`

let viewed = false
try {
  viewed = sessionStorage.getItem(key) !== null
  sessionStorage.setItem(key, 'true')
} catch {}

fetch(`/api/views/${slug}`, { method: viewed ? 'GET' : 'POST' })
  .then((res) => (res.ok ? res.json() : { status: 'error' }))
  .then(({ views, status }) => {
    if (!status) counter.textContent = `${views.toLocaleString()} view${views === 1 ? '' : 's'}`
  })
  .catch(() => {})
