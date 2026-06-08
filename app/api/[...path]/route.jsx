import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

let client
let db

async function getDb() {
  if (db) return db
  client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  db = client.db(process.env.DB_NAME || 'portfolio')
  return db
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() })
}

export async function GET(request, { params }) {
  try {
    const path = (params?.path || []).join('/')
    const db = await getDb()

    if (path === 'visitors') {
      const col = db.collection('site_meta')
      const doc = await col.findOneAndUpdate(
        { _id: 'visitors' },
        { $inc: { count: 1 } },
        { upsert: true, returnDocument: 'after' }
      )
      const count = (doc?.value?.count) ?? (doc?.count) ?? 1
      return NextResponse.json({ count }, { headers: corsHeaders() })
    }

    if (path === 'visitors/count') {
      const col = db.collection('site_meta')
      const doc = await col.findOne({ _id: 'visitors' })
      return NextResponse.json({ count: doc?.count || 0 }, { headers: corsHeaders() })
    }

    if (path === 'messages') {
      const col = db.collection('messages')
      const items = await col.find({}).sort({ createdAt: -1 }).limit(50).toArray()
      return NextResponse.json({ items }, { headers: corsHeaders() })
    }

    if (path === '' || path === 'health') {
      return NextResponse.json({ status: 'ok', service: 'parth-portfolio-api' }, { headers: corsHeaders() })
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders() })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: corsHeaders() })
  }
}

export async function POST(request, { params }) {
  try {
    const path = (params?.path || []).join('/')
    const db = await getDb()
    const body = await request.json().catch(() => ({}))

    if (path === 'contact') {
      const { name, email, subject, message } = body || {}
      if (!name || !email || !message) {
        return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400, headers: corsHeaders() })
      }
      const doc = {
        id: uuidv4(),
        name: String(name).slice(0, 200),
        email: String(email).slice(0, 200),
        subject: String(subject || '').slice(0, 300),
        message: String(message).slice(0, 5000),
        createdAt: new Date().toISOString(),
      }
      await db.collection('messages').insertOne(doc)
      return NextResponse.json({ ok: true, id: doc.id }, { headers: corsHeaders() })
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders() })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: corsHeaders() })
  }
}
