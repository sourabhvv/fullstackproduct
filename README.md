# Shuddhi Ayurveda - Next.js E-Commerce Platform

A full-stack Next.js application for managing Ayurvedic wellness products with an admin panel, product showcase, and customer inquiry system.

## Features

### Public Frontend
- **Product Showcase**: Browse all wellness products with detailed information
- **Product Details**: View complete product information including benefits and ingredients
- **Contact Form**: Submit general inquiries and questions
- **Product Inquiries**: Request information about specific products
- **Responsive Design**: Mobile-first design that works on all devices

### Admin Panel
- **Authentication**: Secure login system for administrators
- **Product Management**: Create, read, update, and delete products
- **Inquiry Dashboard**: View all customer product inquiries
- **Contact Messages**: View all messages from the contact form
- **Statistics**: Overview of products, inquiries, and messages

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT with bcryptjs
- **UI Components**: shadcn/ui

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB Atlas account with a database

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd shuddhi
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update the MongoDB URI with your connection string
   - Set a strong JWT_SECRET
   - Configure admin credentials

4. Initialize the admin user:
\`\`\`bash
npm run init-admin
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
shuddhi/
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── login/          # Admin login
│   │   └── dashboard/      # Product management & statistics
│   ├── api/                # API routes
│   │   ├── products/       # Product CRUD endpoints
│   │   ├── inquiries/      # Inquiry endpoints
│   │   ├── contact/        # Contact form endpoint
│   │   └── admin/          # Admin auth endpoints
│   ├── product/            # Product detail page
│   ├── contact/            # Contact page
│   └── page.tsx            # Home page with product showcase
├── components/
│   ├── admin/              # Admin-specific components
│   ├── ui/                 # shadcn/ui components
│   ├── product-card.tsx    # Product card component
│   └── inquiry-form.tsx    # Inquiry form component
├── models/                 # MongoDB schemas
│   ├── Product.ts
│   ├── Inquiry.ts
│   ├── Contact.ts
│   └── Admin.ts
├── lib/
│   ├── db.ts               # MongoDB connection
│   └── auth.ts             # JWT utilities
└── middleware.ts           # Next.js middleware for auth
\`\`\`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin)
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Inquiries
- `GET /api/inquiries` - Get all inquiries (admin)
- `POST /api/inquiries` - Submit product inquiry

### Contact
- `GET /api/contact` - Get all messages (admin)
- `POST /api/contact` - Submit contact form

### Admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Admin registration

## Default Admin Credentials

After running `npm run init-admin`:
- **Email**: admin@shuddhi.com (or your configured email)
- **Password**: shuddhi123 (or your configured password)

⚠️ **Important**: Change these credentials after your first login!

## Database Schema

### Product
- name: String (required)
- description: String (required)
- price: Number (required)
- image: String
- category: String (enum: Immunity, Digestion, Detox, Balance, Other)
- benefits: [String]
- ingredients: [String]
- dosage: String
- timestamps

### Inquiry
- productId: ObjectId (ref: Product)
- productName: String
- name: String (required)
- email: String (required, validated)
- phone: String (required)
- message: String (required)
- timestamps

### Contact
- name: String (required)
- email: String (required, validated)
- phone: String (required)
- subject: String (required)
- message: String (required)
- timestamps

### Admin
- email: String (required, unique)
- password: String (hashed, required)

## Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT-based authentication
- ✅ Protected admin routes with middleware
- ✅ Input validation on all forms
- ✅ Email validation
- ✅ CORS-ready API structure

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

### Other Platforms
Ensure your hosting supports:
- Node.js runtime
- Environment variables
- MongoDB connectivity

## Environment Variables

\`\`\`
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@shuddhi.com
ADMIN_PASSWORD=your_secure_password
\`\`\`

## Contributing

Contributions are welcome! Please create a pull request with your changes.

## License

This project is private and proprietary to Shuddhi Ayurveda.

## Support

For support, please contact: support@shuddhi.com
