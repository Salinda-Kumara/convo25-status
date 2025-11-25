# Convocation Document Status System

A modern, real-time web application for tracking graduate student document submissions for university convocation. Built with Next.js 14, TypeScript, and Google Sheets API.

## ✨ Features

- 🔄 **Auto-Refresh**: Data updates automatically every 30 seconds
- 🔍 **Smart Search**: Filter students by name, registration number, department, or program
- 📊 **Live Statistics**: Real-time dashboard showing completion rates
- 🎨 **Premium Design**: Modern UI with glassmorphism, gradients, and smooth animations
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Performance**: Optimized with Next.js 14 App Router

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Google Cloud Project with Sheets API enabled
- A Google Sheet with student data

### Installation

1. **Clone or navigate to the project**:
   ```bash
   cd d:\web\convocation-status
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `env.example` to `.env.local`
   - Fill in your Google Sheets API credentials (see setup guide below)

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Google Sheets Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

### Step 2: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details and click "Create"
4. Skip the optional steps and click "Done"
5. Click on the created service account
6. Go to the "Keys" tab
7. Click "Add Key" > "Create New Key"
8. Choose "JSON" format and download the file

### Step 3: Configure Your Google Sheet

1. Open your Google Sheet with student data
2. Click "Share" in the top right
3. Add the service account email (from the JSON file: `client_email`)
4. Give it "Viewer" access
5. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```

### Step 4: Set Environment Variables

Create a `.env.local` file in the project root:

```env
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id-here
GOOGLE_SHEET_RANGE=Sheet1!A:Z
```

**Important**: Copy the entire private key from the JSON file, including the header and footer.

## 📋 Google Sheet Structure

Your Google Sheet should have the following columns:

| Column | Description | Example |
|--------|-------------|---------|
| A | Registration Number | REG2025001 |
| B | Student Name | John Doe |
| C | Department | Computer Science |
| D | Program | B.Tech |
| E | Document 1 Status | Submitted |
| F | Document 2 Status | Pending |
| G | Document 3 Status | Approved |
| ... | Additional documents | ... |

### Supported Status Values

- **Submitted**: Document has been submitted
- **Pending**: Awaiting review
- **Approved**: Document approved
- **Rejected**: Document rejected
- **Not Submitted**: Not yet submitted (or empty cell)

The system automatically normalizes variations like "submit", "approve", etc.

## 🎨 Customization

### Update University Information

Edit `components/Header.tsx`:

```typescript
<h1>Your University Name</h1>
<h2>December 2025</h2>
```

### Modify Document Types

Edit `lib/googleSheets.ts` to match your sheet structure:

```typescript
const documentColumns = [
  { name: 'Your Document 1', index: 4 },
  { name: 'Your Document 2', index: 5 },
  // Add more documents...
];
```

### Adjust Auto-Refresh Interval

Edit `app/page.tsx`:

```typescript
const interval = setInterval(() => {
  fetchData();
}, 30000); // Change to desired milliseconds
```

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set Environment Variables**:
   - Go to your project on Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add all variables from `.env.local`

5. **Redeploy**:
   ```bash
   vercel --prod
   ```

### Alternative: Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

4. Set environment variables in Netlify dashboard

## 🛠️ Development

### Project Structure

```
convocation-status/
├── app/
│   ├── api/students/route.ts    # API endpoint
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main page
│   └── globals.css              # Global styles
├── components/
│   ├── Header.tsx               # Header component
│   ├── SearchBar.tsx            # Search component
│   ├── StatusCard.tsx           # Student card
│   ├── StatusGrid.tsx           # Grid layout
│   └── LoadingSpinner.tsx       # Loading state
├── lib/
│   └── googleSheets.ts          # Google Sheets integration
├── types/
│   └── student.ts               # TypeScript types
└── .env.local                   # Environment variables
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### "Failed to fetch student data"

- Check that your Google Sheets API credentials are correct
- Verify the service account has access to the sheet
- Ensure the Sheet ID and range are correct

### "Invalid credentials"

- Make sure the private key includes `\n` for line breaks
- Verify the service account email is correct
- Check that the Sheets API is enabled in Google Cloud

### Data not updating

- Check the browser console for errors
- Verify the sheet structure matches the expected format
- Ensure status values are recognized (see supported values above)

## 📄 License

MIT License - feel free to use this project for your university!

## 🤝 Support

For issues or questions, please check the troubleshooting section or create an issue in the repository.

---

**Built with ❤️ for universities worldwide**
