# Sample Google Sheet Template

Use this template to structure your Google Sheet for the Convocation Document Status System.

## Sheet Structure

Create a Google Sheet with the following columns:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| **Registration Number** | **Student Name** | **Department** | **Program** | **Degree Certificate** | **ID Proof** | **Passport Photo** | **No Dues Certificate** | **Application Form** |
| REG2025001 | John Doe | Computer Science | B.Tech | Submitted | Approved | Submitted | Pending | Not Submitted |
| REG2025002 | Jane Smith | Electrical Engineering | B.Tech | Approved | Approved | Approved | Approved | Submitted |
| REG2025003 | Mike Johnson | Mechanical Engineering | B.Tech | Pending | Submitted | Submitted | Submitted | Pending |
| REG2025004 | Sarah Williams | Civil Engineering | B.Tech | Not Submitted | Not Submitted | Pending | Not Submitted | Not Submitted |
| REG2025005 | David Brown | Information Technology | B.Tech | Submitted | Submitted | Approved | Submitted | Submitted |

## Column Descriptions

### Required Columns (A-D)

1. **Column A - Registration Number**: Unique student identifier
   - Example: REG2025001, 2025/CS/001, etc.

2. **Column B - Student Name**: Full name of the student
   - Example: John Doe, Jane Smith

3. **Column C - Department**: Student's department
   - Example: Computer Science, Electrical Engineering

4. **Column D - Program**: Degree program
   - Example: B.Tech, M.Tech, MBA, Ph.D.

### Document Status Columns (E onwards)

Add as many document columns as needed. Each column represents one required document.

**Common documents:**
- Degree Certificate
- ID Proof (Aadhar/Passport)
- Passport Size Photos
- No Dues Certificate
- Application Form
- Fee Receipt
- Migration Certificate
- Character Certificate

## Status Values

Use these exact values in document columns (case-insensitive):

| Status | Meaning | Color in UI |
|--------|---------|-------------|
| **Submitted** | Document submitted, awaiting review | Blue |
| **Pending** | Under review/processing | Purple |
| **Approved** | Document verified and approved | Green |
| **Rejected** | Document rejected, needs resubmission | Red |
| **Not Submitted** | Not yet submitted (or leave blank) | Yellow |

## Tips for Managing Your Sheet

### 1. Freeze Header Row
- Select row 1
- Click View → Freeze → 1 row
- This keeps headers visible when scrolling

### 2. Use Data Validation
- Select document status columns (E:I)
- Click Data → Data validation
- Criteria: List of items
- Add: Submitted, Pending, Approved, Rejected, Not Submitted
- This prevents typos and ensures consistency

### 3. Conditional Formatting (Optional)
Make your sheet colorful:

**For "Approved":**
- Select range E2:I100
- Format → Conditional formatting
- Format cells if: Text contains "Approved"
- Background: Light green

**For "Rejected":**
- Text contains "Rejected"
- Background: Light red

**For "Pending":**
- Text contains "Pending"
- Background: Light yellow

### 4. Add Filters
- Select header row
- Click Data → Create a filter
- This allows you to filter by department, status, etc.

## Example: Creating Your Sheet

1. **Create new Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Click "+ Blank"

2. **Add headers** (Row 1):
   ```
   Registration Number | Student Name | Department | Program | Document 1 | Document 2 | ...
   ```

3. **Add student data** (Row 2 onwards):
   ```
   REG2025001 | John Doe | Computer Science | B.Tech | Submitted | Pending | ...
   ```

4. **Share with service account**:
   - Click "Share"
   - Add your service account email
   - Set to "Viewer"
   - Click "Share"

5. **Copy Sheet ID**:
   - From URL: `https://docs.google.com/spreadsheets/d/[COPY_THIS_ID]/edit`
   - Paste in `.env.local`

## Customizing Document Columns

If your documents are different, update `lib/googleSheets.ts`:

```typescript
const documentColumns = [
  { name: 'Degree Certificate', index: 4 },      // Column E
  { name: 'ID Proof', index: 5 },                // Column F
  { name: 'Passport Photo', index: 6 },          // Column G
  { name: 'No Dues Certificate', index: 7 },     // Column H
  { name: 'Application Form', index: 8 },        // Column I
  // Add more as needed
];
```

**Note**: Column indices are 0-based:
- Column A = 0
- Column B = 1
- Column C = 2
- Column D = 3
- Column E = 4 (first document)
- etc.

## Sample Data for Testing

Here's sample data you can use for testing:

```
REG2025001,John Doe,Computer Science,B.Tech,Submitted,Approved,Submitted,Pending,Not Submitted
REG2025002,Jane Smith,Electrical Engineering,B.Tech,Approved,Approved,Approved,Approved,Submitted
REG2025003,Mike Johnson,Mechanical Engineering,B.Tech,Pending,Submitted,Submitted,Submitted,Pending
REG2025004,Sarah Williams,Civil Engineering,B.Tech,Not Submitted,Not Submitted,Pending,Not Submitted,Not Submitted
REG2025005,David Brown,Information Technology,B.Tech,Submitted,Submitted,Approved,Submitted,Submitted
REG2025006,Emily Davis,Electronics,B.Tech,Approved,Approved,Approved,Approved,Approved
REG2025007,Robert Miller,Chemical Engineering,B.Tech,Pending,Pending,Submitted,Pending,Submitted
REG2025008,Lisa Anderson,Biotechnology,B.Tech,Submitted,Submitted,Submitted,Submitted,Not Submitted
```

Copy this into your sheet (File → Import → Upload → Replace data)

## Updating Data

The application automatically refreshes every 30 seconds. When you update your Google Sheet:

1. Edit any cell
2. Wait up to 30 seconds
3. Changes will appear on the website automatically
4. No need to refresh the page manually

---

**Your Google Sheet is now ready to use with the Convocation Status System!**
