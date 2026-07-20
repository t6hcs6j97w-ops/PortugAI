# PortugAI
Learn Portuguese from zero with interactive lessons, flashcards, exercises and more

## Deploy to Production

### Prerequisites
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster — copy the connection string as `MONGODB_URI`
- A [Google Cloud](https://console.cloud.google.com) OAuth 2.0 Web Client — copy the Client ID and Secret

### 1. Deploy backend to Render (Blueprint)

1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click **New → Blueprint** and select this repository
3. Render will detect `render.yaml` and create the **portugai-backend** web service automatically
4. In the service's **Environment** tab, fill in the placeholder variables:

   | Variable | Value |
   |---|---|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | Any long random string |
   | `GOOGLE_CLIENT_ID` | From Google Cloud Console |
   | `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |
   | `CLIENT_URL` | Your Vercel frontend URL (fill in after step 2) |

5. After deploy, note your backend URL, e.g. `https://portugai-backend.onrender.com`

### 2. Deploy frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project** → select this repository
3. Set **Root Directory** to `client`
4. Add environment variables:

   | Variable | Value |
   |---|---|
   | `VITE_API_URL` | `https://portugai-backend.onrender.com/api` |
   | `VITE_GOOGLE_CLIENT_ID` | From Google Cloud Console |

5. Click **Deploy** — Vercel will detect `client/vercel.json` and configure the SPA rewrites automatically
6. Note your frontend URL, e.g. `https://portugai.vercel.app`

### 3. Connect them

- In Render, update `CLIENT_URL` to your Vercel frontend URL (e.g. `https://portugai.vercel.app`)
- In Google Cloud Console → Credentials → your OAuth client, add `https://portugai.vercel.app` to **Authorised JavaScript origins**

### 4. Seed the database (optional)

In the Render dashboard, open **Shell** for the backend service and run:
```
npm run seed
```
