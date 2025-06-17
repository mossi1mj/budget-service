# budget-service
A personal budgeting app that connects to your real financial data

Here is a complete UI/UX architecture and design document for your finance budget application, written from the perspective of a senior UI/UX engineer. The focus is on clarity, ease of use, and seamless user flow.

⸻

FINANCE BUDGET APP — UI/UX DESIGN DOCUMENT

GOAL

Design a finance budget web app with an intuitive and frictionless experience. The application allows:
	•	Guest users to create and explore budgets
	•	Logged-in users to save and manage budgets
	•	Verified users (with Plaid integration) to receive personalized insights and recommendations

⸻

CORE FEATURES
	1.	Budget creation (custom or from templates)
	2.	Budget editing and management
	3.	Optional login/signup
	4.	Bank linking via Plaid
	5.	Transaction history and account overview
	6.	Financial recommendations based on spending
	7.	Personalized budget suggestions
	8.	Exporting budgets (PDF/CSV)
	9.	Real-time budget tracking
	10.	Dashboard overview (summary of budgets, alerts)

⸻

APPLICATION PAGES
	1.	Landing Page
	2.	Create Budget Page
	3.	Templates Page
	4.	Budget Detail Page
	5.	Dashboard (Post-login)
	6.	Transactions Page (Plaid users)
	7.	Recommendations Page
	8.	Login/Signup Modal
	9.	Bank Link (Plaid) Modal
	10.	Settings Page

⸻

USER TYPES
	1.	Guest User
	2.	Registered User (Logged In)
	3.	Linked User (Plaid Connected)

⸻

USER STORIES & FLOWS

1. Guest Creates a Custom Budget

User Story
As a guest, I want to create a custom budget without logging in so I can get started quickly.

Click-by-Click Flow (Playwright-style)

- User lands on Landing Page
- Clicks “Start a Custom Budget”
- Redirected to Create Budget Page
- Fills in budget name, monthly income
- Clicks “+ Add Category”
- Enters category (e.g., Rent), sets amount
- Repeats for all categories
- Clicks “Save Progress”
- Prompt: “Want to save and edit later? Create an account.”
- User clicks “Continue as Guest”
- Budget stored in local/session storage
- Redirected to Budget Detail Page (read-only warning)

UI Notes
	•	Minimal fields, auto-focus on first input
	•	Sticky “Save Progress” button
	•	Collapsible category list
	•	Progress bar shows budget completeness

⸻

2. Guest Uses Budget Template

User Story
As a guest, I want to pick a prebuilt template to save time and get started quickly.

Click-by-Click Flow

- User lands on Landing Page
- Clicks “Browse Templates”
- Redirected to Templates Page
- Scrolls through template cards
- Clicks “Use Template” on desired card
- Redirected to Budget Detail Page with pre-filled categories
- Can edit line items
- Clicks “Save Progress”
- Prompt for login
- Continues as Guest or Signs Up

UI Notes
	•	Templates shown as cards with category previews and estimated totals
	•	“Use This” call to action on each card
	•	Optional filters for lifestyle, income, family size

⸻

3. User Logs In to Save Budget

User Story
As a user, I want to log in to save and revisit my budget.

Click-by-Click Flow

- On any save attempt (custom or template), user clicks “Create Account” or “Log In”
- Login Modal appears
- User enters email and password (or OAuth option)
- Upon success, budget from session/local storage is saved to account
- Redirect to Dashboard Page

UI Notes
	•	Auth modal should appear without redirect
	•	Clearly state benefit: “Save and access your budgets anytime”
	•	Guest session merges with logged-in state after login

⸻

4. User Links Bank via Plaid

User Story
As a logged-in user, I want to link my bank to get transaction history and personalized suggestions.

Click-by-Click Flow

- From Dashboard, click “Link Bank Account”
- Modal launches Plaid Link flow
- User completes bank connection
- Redirect to Transactions Page
- First-time setup: loading spinner, then shows linked accounts and transactions

UI Notes
	•	Highlight security and privacy in the modal
	•	Confirm successful connection with badge
	•	Show bank logo and last 4 digits on success

⸻

5. User Views Dashboard

User Story
As a logged-in user, I want to see a summary of my budgets, recent activity, and account health.

Click-by-Click Flow

- After login or return visit, user lands on Dashboard
- Sees cards for each budget (name, progress bar, edit button)
- Top section: Account Balance Summary (if Plaid linked)
- Notifications: over budget alerts, suggestions, account changes

UI Notes
	•	Modular card layout
	•	“+ Create New Budget” button always visible
	•	Sidebar for quick nav to Budgets, Transactions, Recommendations

⸻

6. User Gets Budget Recommendations

User Story
As a Plaid-connected user, I want the app to recommend a budget based on income and expenses.

Click-by-Click Flow

- From Dashboard or Budget page, click “Get Budget Recommendation”
- App runs analysis on past 60 days’ transactions
- Suggests monthly income average and category splits
- User reviews suggestions
- Clicks “Use This” or “Edit Before Using”
- Redirect to editable Budget Detail Page

UI Notes
	•	Use pie and bar charts to show spending breakdown
	•	Show percentage of income per category
	•	Toggle between Recommended and Custom view

⸻

7. User Edits or Tracks a Budget

User Story
As a user, I want to edit my budget and track what I’ve spent to stay on track.

Click-by-Click Flow

- From Dashboard, click on budget card
- On Budget Detail Page:
    - Edit category amounts
    - Add notes
    - View transactions mapped to categories (if Plaid linked)
    - Click “Track Spending” to update actual vs planned
- Changes autosave or show “Save Changes” CTA

UI Notes
	•	Inline editable rows
	•	Toggle for planned vs actual view
	•	Visual alert if category goes over budget

⸻

8. User Views Transactions

User Story
As a Plaid-linked user, I want to see all my transactions and assign them to budget categories.

Click-by-Click Flow

- Click “Transactions” from sidebar
- Transactions Page loads
- Search bar and date filters available
- Each row has:
    - Vendor, date, amount
    - Dropdown to assign to a budget category
- Auto-suggestion based on past assignments

UI Notes
	•	Group by account or date
	•	Badge if unassigned
	•	Color-coded categories

⸻

UI OVERVIEW PER PAGE

Landing Page
	•	CTA buttons: “Start Custom Budget”, “Browse Templates”, “Log In”
	•	Brief explainer on 3-tier experience (guest, login, Plaid)
	•	Minimalist hero section

Create Budget Page
	•	Simple form inputs
	•	“Add Category” CTA
	•	Sticky total bar
	•	Option to save as guest or log in

Templates Page
	•	Card layout of templates
	•	Preview of categories and estimated income
	•	Filter/sort templates

Budget Detail Page
	•	Inline editing
	•	Actual vs Planned toggles
	•	Linked transaction assignment (if Plaid enabled)
	•	Save/Export options

Dashboard
	•	Grid of budget cards
	•	Notifications section
	•	Quick stats on total income, expenses, balance
	•	“Link Bank” banner if not connected

Transactions Page
	•	Table format with filters
	•	Category tagging
	•	Insights section (optional)

Recommendations Page
	•	Dynamic visualizations (pie/bar)
	•	Suggested budget layout
	•	Action buttons to accept or edit

Login/Signup Modal
	•	Slide-in modal
	•	Minimal fields
	•	Option for OAuth
	•	Return user merge logic

Bank Link Modal
	•	Embedded Plaid Link component
	•	Security reassurance section
	•	Visual confirmation of connected banks

⸻

UX PRINCIPLES FOLLOWED
	•	Progressive Disclosure: Show advanced features only when needed
	•	Frictionless Onboarding: Start budgeting without login
	•	Visual Hierarchy: Focus user attention using cards, sections, and CTA buttons
	•	Feedback Loops: Immediate visual response to actions (e.g., success toasts, alerts)
	•	Accessibility: Color contrast, keyboard navigation, clear labels

⸻

Would you like wireframe diagrams next? Or do you want this in Notion or Markdown format?