import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';

async function initializeAdmin() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@shuddhi.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'shuddhi123';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create new admin
    const admin = await Admin.create({
      email: adminEmail,
      password: adminPassword,
    });

    console.log('Admin user created successfully');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('Please change your password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error initializing admin:', error);
    process.exit(1);
  }
}

initializeAdmin();
