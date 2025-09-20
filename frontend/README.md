# Asset Check
A material inventory tracking application designed for construction enterprises and related industries. The app helps you manage your equipment and materials,track who has borrowed which device, monitor availability, and plan returns.

## Features
- **Stock Management**: Track all materials and devices with unique stock numbers.
- **Borrowed Materials**: See which items are currently borrowed and by whom.
- **Availability Status**: Instantly view "X of Y devices available" for each item.
- **Return Planning**: Know who has what, and when items are expected to be returned.
- **QR Code Scanning**: Quickly check in/out devices using QR codes for fast, error-free inventory management.
## MVP Scope
- List of all stock items with their numbers.
- Borrowed items and borrower details.
- Real-time status of available vs. total devices.
- Overview of current loans and expected return dates.
## Target Users
- Construction companies
- Equipment rental businesses
- Any organization needing material tracking and accountability
## Tech Stack
- Frontend: React, TypeScript, Vite
- State Management: TanStack Query
- Styling: Tailwind CSS
- Forms: React Hook Form, Zod
- Testing/Mocking: MSW (Mock Service Worker)
- Routing: React Router
## Getting Started
1. Install dependencies:
```shell
yarn install
```
2. Start development server:
```shell
yarn dev
```
3. Build for production:
```shell
yarn build
```
4. Preview production build:
```shell
yarn preview
```
## Folder Structure
- src – Main source code
  - components/ – UI components
  - features/ – Feature modules (dashboard, device, inventory, loans, scan, user)
   - hooks/ – Custom React hooks
  - lib/ – Utility libraries
  - mocks/ – Mock data and service worker handlers
  - routes/ – Routing and error boundaries
- public – Static assets and service worker