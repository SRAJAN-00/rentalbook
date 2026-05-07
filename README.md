# 📚 RentalBook - Book Rental Management System

A modern, full-stack book rental management system built with Next.js 15, TypeScript, MongoDB, and NextAuth. This application allows users to browse books, rent them, write reviews, and manage their rental history.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ Features

### 📖 Book Management
- Browse comprehensive book catalog with search and filter capabilities
- View detailed book information (author, ISBN, genre, description, availability)
- Real-time availability tracking
- Book cover images and ratings

### 🔐 User Authentication
- Secure user registration and login
- NextAuth integration for authentication
- Protected routes and user sessions
- Google OAuth support (optional)

### 📝 Rental System
- Rent books with automatic availability updates
- Return books functionality
- Rental history tracking
- Check current rental status
- Daily rental pricing system

### ⭐ Reviews & Ratings
- Write and submit book reviews
- Rate books on a 5-star scale
- View reviews from other users
- Average rating calculation

### ❤️ Favorites
- Add books to favorites list
- Quick access to favorite books
- Persistent favorites across sessions

### 📊 Dashboard
- User dashboard with personalized information
- Current rentals overview
- Rental history
- Favorites management
- Activity tracking

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Hot Toast** - Beautiful notifications

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **NextAuth** - Authentication solution
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 20.x or higher
- npm, yarn, pnpm, or bun
- MongoDB Atlas account (or local MongoDB instance)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SRAJAN-00/rentalbook.git
   cd rentalbook
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Update the following variables in `.env.local`:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookrental?retryWrites=true&w=majority
   
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-nextauth-key-here
   
   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Generate NextAuth secret**
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and use it as your `NEXTAUTH_SECRET`.

## 🎯 Getting Started

1. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

2. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Seed the database (optional)**
   
   To populate the database with sample books, navigate to:
   ```
   http://localhost:3000/api/seed
   ```

## 📁 Project Structure

```
rentalbook/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── books/                # Book management
│   │   ├── rentals/              # Rental operations
│   │   ├── reviews/              # Review system
│   │   ├── fav/                  # Favorites management
│   │   └── seed/                 # Database seeding
│   ├── auth/                     # Authentication pages
│   ├── books/                    # Book pages
│   ├── dashboard/                # User dashboard
│   ├── components/               # React components
│   └── layout.tsx                # Root layout
├── models/                       # Mongoose models
│   ├── Book.ts                   # Book schema
│   ├── User.ts                   # User schema
│   ├── Rental.ts                 # Rental schema
│   ├── Review.ts                 # Review schema
│   └── Fav.ts                    # Favorites schema
├── lib/                          # Utility libraries
│   └── mongodb.ts                # MongoDB connection
├── types/                        # TypeScript type definitions
├── middleware.ts                 # Next.js middleware
└── public/                       # Static assets
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/signout` - Sign out user

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Create new book (admin)

### Rentals
- `GET /api/rentals` - Get user rentals
- `POST /api/rentals` - Create new rental
- `POST /api/rentals/return` - Return a book
- `GET /api/rentals/check` - Check rental status

### Reviews
- `GET /api/reviews?bookId={id}` - Get book reviews
- `POST /api/reviews` - Submit a review

### Favorites
- `GET /api/fav` - Get user favorites
- `POST /api/fav` - Add/remove favorite

### User
- `GET /api/user/rentals` - Get user rental history

## 🧪 Development

### Running linter
```bash
npm run lint
```

### Building for production
```bash
npm run build
```

### Starting production server
```bash
npm run start
```

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Configure environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SRAJAN-00/rentalbook)

### Other Platforms
- **Railway**: Connect MongoDB and deploy
- **Netlify**: Configure build settings
- **AWS/Google Cloud**: Use containerization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**SRAJAN-00**
- GitHub: [@SRAJAN-00](https://github.com/SRAJAN-00)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- All contributors who help improve this project

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check existing documentation
- Review the [STRUCTURE_GUIDE.md](STRUCTURE_GUIDE.md) for project architecture

---

Made with ❤️ by SRAJAN-00
