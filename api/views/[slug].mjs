// Post view counter, stored in Upstash Redis under `views:<slug>`.
const headers = { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` }

async function redis(command, slug) {
  const res = await fetch(`${process.env.KV_REST_API_URL}/${command}/views:${slug}`, { headers })
  if (!res.ok) throw new Error(`Upstash responded ${res.status}`)
  return Number((await res.json()).result) || 0
}

async function respond(request, command) {
  const slug = new URL(request.url).pathname.split('/').pop()
  if (!/^[a-z0-9-]{1,100}$/.test(slug)) return Response.json({ error: 'Invalid slug' }, { status: 400 })
  try {
    return Response.json({ views: await redis(command, slug) })
  } catch {
    return Response.json({ views: 0, status: 'error' })
  }
}

export const GET = (request) => respond(request, 'get')
export const POST = (request) => respond(request, 'incr')
