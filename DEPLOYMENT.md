# Deployment Guide

Complete step-by-step guide for deploying the Convocation Document Status System.

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Google Cloud Project created
- [ ] Google Sheets API enabled
- [ ] Service account created with JSON key
- [ ] Google Sheet prepared with student data
- [ ] Service account has access to the sheet

## Part 1: Google Cloud Setup

### 1.1 Create Google Cloud Project

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name (e.g., "Convocation Status")
4. Click "Create"

### 1.2 Enable Google Sheets API

1. In your project, go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

### 1.3 Create Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Enter details:
   - **Name**: convocation-service
   - **ID**: (auto-generated)
   - **Description**: Service account for convocation status system
4. Click **Create and Continue**
5. Skip optional steps, click **Done**

### 1.4 Generate Service Account Key

1. Click on the newly created service account
2. Go to the **Keys** tab
3. Click **Add Key** → **Create New Key**
4. Select **JSON** format
5. Click **Create** - a JSON file will download
6. **Keep this file secure!** It contains sensitive credentials

### 1.5 Share Google Sheet

1. Open your Google Sheet
2. Click **Share** button
3. Copy the `client_email` from your JSON file (looks like: `xxx@xxx.iam.gserviceaccount.com`)
4. Paste it in the share dialog
5. Set permission to **Viewer**
6. Uncheck "Notify people"
7. Click **Share**

## Part 2: Local Development Setup

### 2.1 Configure Environment Variables

1. Navigate to project directory:
   ```bash
   cd d:\web\convocation-status
   ```

2. Copy the example file:
   ```bash
   copy env.example .env.local
   ```

3. Open `.env.local` and fill in:

   ```env
   GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEET_ID=your-sheet-id-here
   GOOGLE_SHEET_RANGE=Sheet1!A:Z
   ```

   **How to get each value:**

   - **GOOGLE_CLIENT_EMAIL**: From JSON file → `client_email`
   - **GOOGLE_PRIVATE_KEY**: From JSON file → `private_key` (copy entire value including `-----BEGIN` and `-----END`)
   - **GOOGLE_SHEET_ID**: From your sheet URL: `https://docs.google.com/spreadsheets/d/[THIS_IS_THE_ID]/edit`
   - **GOOGLE_SHEET_RANGE**: Adjust if your data is in a different sheet/range

### 2.2 Test Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open browser to [http://localhost:3000](http://localhost:3000)

3. Verify:
   - [ ] Page loads without errors
   - [ ] Student data appears
   - [ ] Search functionality works
   - [ ] Statistics are correct
   - [ ] Auto-refresh works (check console for updates)

## Part 3: Deploy to Vercel (Recommended)

### 3.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 3.2 Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### 3.3 Initial Deployment

1. From project directory:
   ```bash
   vercel
   ```

2. Answer the prompts:
   - **Set up and deploy?** → Yes
   - **Which scope?** → Select your account
   - **Link to existing project?** → No
   - **Project name?** → convocation-status (or your choice)
   - **Directory?** → ./ (press Enter)
   - **Override settings?** → No

3. Wait for deployment to complete

### 3.4 Configure Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Name: `GOOGLE_CLIENT_EMAIL`
   - Value: (paste from .env.local)
   - Environment: Production, Preview, Development
   - Click **Save**

5. Repeat for all variables:
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SHEET_RANGE`

> **Important**: For `GOOGLE_PRIVATE_KEY`, paste the entire value including quotes and `\n` characters.

### 3.5 Redeploy with Environment Variables

```bash
vercel --prod
```

### 3.6 Verify Production Deployment

1. Visit your production URL (shown in terminal)
2. Test all functionality:
   - [ ] Data loads correctly
   - [ ] Search works
   - [ ] Auto-refresh active
   - [ ] Responsive on mobile

## Part 4: Alternative - Deploy to Netlify

### 4.1 Install Netlify CLI

```bash
npm install -g netlify-cli
```

### 4.2 Login to Netlify

```bash
netlify login
```

### 4.3 Build the Project

```bash
npm run build
```

### 4.4 Deploy

```bash
netlify deploy
```

Follow prompts:
- **Create new site?** → Yes
- **Team?** → Select your team
- **Site name?** → convocation-status
- **Publish directory?** → .next

### 4.5 Configure Environment Variables

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add all four environment variables

### 4.6 Deploy to Production

```bash
netlify deploy --prod
```

## Part 5: Custom Domain (Optional)

### For Vercel:

1. Go to project **Settings** → **Domains**
2. Click **Add**
3. Enter your domain
4. Follow DNS configuration instructions

### For Netlify:

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Follow DNS configuration instructions

## Part 6: Monitoring and Maintenance

### Check Logs

**Vercel:**
- Dashboard → Project → Deployments → Click deployment → Functions tab

**Netlify:**
- Dashboard → Site → Functions → View logs

### Update Data Structure

If you change your Google Sheet structure:

1. Update `lib/googleSheets.ts`:
   ```typescript
   const documentColumns = [
     { name: 'New Document', index: X },
     // Update indices
   ];
   ```

2. Commit and push changes
3. Vercel/Netlify will auto-deploy

### Troubleshooting

**Error: "Failed to fetch student data"**
- Check environment variables are set correctly
- Verify service account has sheet access
- Check Sheet ID is correct

**Error: "Invalid credentials"**
- Ensure private key includes `\n` characters
- Verify client email is correct
- Check Sheets API is enabled

**Data not updating**
- Check Google Sheet is shared with service account
- Verify sheet range is correct
- Check browser console for errors

## Security Best Practices

1. ✅ Never commit `.env.local` to version control
2. ✅ Keep service account JSON file secure
3. ✅ Use environment variables for all secrets
4. ✅ Limit service account permissions to "Viewer"
5. ✅ Regularly rotate service account keys
6. ✅ Monitor API usage in Google Cloud Console

## Success Checklist

- [ ] Application deployed and accessible
- [ ] Data loads from Google Sheets
- [ ] Auto-refresh working (30-second interval)
- [ ] Search functionality operational
- [ ] Responsive design works on mobile
- [ ] No console errors
- [ ] Environment variables secured
- [ ] Custom domain configured (if applicable)

---

**Congratulations! Your convocation status system is now live! 🎉**
