# Book Rental App - Simple Structure

## 📁 Simple Project Structure

```
book/
├── app/                          # Next.js App Router
│   ├── api/                      # Backend API routes
│   │   ├── books/
│   │   │   └── route.ts          # GET, POST books
│   │   ├── rentals/
│   │   │   └── route.ts          # GET, POST rentals
│   │   └── seed/
│   │       └── route.ts          # Add dummy data
│   ├── books/
│   │   └── page.tsx              # Books listing page
│   ├── components/               # Simple UI components
│   │   ├── BookCard.tsx
│   │   └── BookList.tsx
│   ├── globals.css
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── lib/                          # Core utilities
│   └── mongodb.ts                # MongoDB connection
├── models/                       # Mongoose models
│   ├── Book.ts                   # Book schema
│   └── Rental.ts                 # Rental schema
└── data/                         # Dummy data
    └── books.ts                  # Sample books data
```

## 🎯 Core Features

### Book Management

- Display list of books
- Book details
- Rent/Return functionality

### Simple Rental System

- Track book rentals
- Basic rental status

## 📋 Implementation Steps

1. Install MongoDB & Mongoose
2. Create database models
3. Add dummy data
4. Build API endpoints
5. Create simple UI
