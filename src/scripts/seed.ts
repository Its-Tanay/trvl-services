import mongoose from 'mongoose';
import 'dotenv/config';
import { Admin } from '../models/admin';
import { User } from '../models/user';
import Hotel from '../models/hotels';

const hotelData = [
  {
    name: 'Grand Palace Hotel',
    city: 'Paris',
    country: 'France',
    description: 'Luxurious 5-star hotel in the heart of Paris with stunning views of the Eiffel Tower',
    type: 'Luxury',
    adultCount: 4,
    childCount: 2,
    facilities: ['Free WiFi', 'Parking', 'Airport Shuttle', 'Family Rooms', 'Spa', 'Fitness Center'],
    pricePerNight: 350,
    starRating: 5,
    imageUrls: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
    ]
  },
  {
    name: 'Seaside Resort',
    city: 'Miami',
    country: 'USA',
    description: 'Beachfront resort with direct ocean access and modern amenities',
    type: 'Resort',
    adultCount: 6,
    childCount: 3,
    facilities: ['Free WiFi', 'Parking', 'Pool', 'Beach Access', 'Spa', 'Restaurant'],
    pricePerNight: 280,
    starRating: 4,
    imageUrls: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
    ]
  },
  {
    name: 'Budget Inn Downtown',
    city: 'New York',
    country: 'USA',
    description: 'Affordable accommodation in Manhattan with easy access to subway',
    type: 'Budget',
    adultCount: 2,
    childCount: 1,
    facilities: ['Free WiFi', 'Non-Smoking Rooms'],
    pricePerNight: 95,
    starRating: 2,
    imageUrls: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'
    ]
  },
  {
    name: 'Mountain Lodge',
    city: 'Aspen',
    country: 'USA',
    description: 'Cozy ski lodge with fireplace and mountain views',
    type: 'Cabin',
    adultCount: 4,
    childCount: 2,
    facilities: ['Free WiFi', 'Parking', 'Ski Storage', 'Restaurant', 'Fireplace'],
    pricePerNight: 220,
    starRating: 4,
    imageUrls: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800'
    ]
  },
  {
    name: 'Tokyo Business Hotel',
    city: 'Tokyo',
    country: 'Japan',
    description: 'Modern business hotel near Shibuya with excellent transport links',
    type: 'Business',
    adultCount: 2,
    childCount: 0,
    facilities: ['Free WiFi', 'Fitness Center', 'Non-Smoking Rooms', 'Conference Rooms'],
    pricePerNight: 180,
    starRating: 3,
    imageUrls: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
    ]
  },
  {
    name: 'Romantic Boutique Hotel',
    city: 'Venice',
    country: 'Italy',
    description: 'Intimate boutique hotel in historic Venice with canal views',
    type: 'Boutique',
    adultCount: 2,
    childCount: 0,
    facilities: ['Free WiFi', 'Restaurant', 'Spa', 'Romantic Setting'],
    pricePerNight: 320,
    starRating: 5,
    imageUrls: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800'
    ]
  },
  {
    name: 'Family Fun Resort',
    city: 'Orlando',
    country: 'USA',
    description: 'Family-friendly resort near theme parks with kids club and pools',
    type: 'Resort',
    adultCount: 6,
    childCount: 4,
    facilities: ['Free WiFi', 'Parking', 'Pool', 'Family Rooms', 'Kids Club', 'Restaurant'],
    pricePerNight: 195,
    starRating: 4,
    imageUrls: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800'
    ]
  },
  {
    name: 'Historic Manor House',
    city: 'Bath',
    country: 'United Kingdom',
    description: 'Converted Georgian manor with period features and modern comforts',
    type: 'Historic',
    adultCount: 4,
    childCount: 2,
    facilities: ['Free WiFi', 'Parking', 'Restaurant', 'Garden', 'Bar'],
    pricePerNight: 245,
    starRating: 4,
    imageUrls: [
      'https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=800'
    ]
  },
  {
    name: 'Modern City Suites',
    city: 'Singapore',
    country: 'Singapore',
    description: 'Contemporary serviced apartments in financial district',
    type: 'Apartment',
    adultCount: 4,
    childCount: 2,
    facilities: ['Free WiFi', 'Fitness Center', 'Kitchen', 'Laundry', 'Pool'],
    pricePerNight: 210,
    starRating: 4,
    imageUrls: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ]
  },
  {
    name: 'Backpacker Hostel',
    city: 'Barcelona',
    country: 'Spain',
    description: 'Social hostel with shared kitchen and organized activities',
    type: 'Hostel',
    adultCount: 1,
    childCount: 0,
    facilities: ['Free WiFi', 'Shared Kitchen', 'Common Room', 'Lockers'],
    pricePerNight: 35,
    starRating: 3,
    imageUrls: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'
    ]
  },
  {
    name: 'Desert Oasis Resort',
    city: 'Dubai',
    country: 'UAE',
    description: 'Luxury resort with private beach and world-class spa',
    type: 'Luxury',
    adultCount: 4,
    childCount: 2,
    facilities: ['Free WiFi', 'Parking', 'Pool', 'Beach Access', 'Spa', 'Restaurant', 'Fitness Center'],
    pricePerNight: 450,
    starRating: 5,
    imageUrls: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800'
    ]
  },
  {
    name: 'Countryside B&B',
    city: 'Tuscany',
    country: 'Italy',
    description: 'Charming bed and breakfast in rolling Tuscan hills',
    type: 'Bed and Breakfast',
    adultCount: 2,
    childCount: 1,
    facilities: ['Free WiFi', 'Parking', 'Garden', 'Breakfast Included'],
    pricePerNight: 125,
    starRating: 3,
    imageUrls: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    ]
  },
  {
    name: 'Airport Express Hotel',
    city: 'London',
    country: 'United Kingdom',
    description: 'Convenient hotel with 24-hour airport shuttle service',
    type: 'Business',
    adultCount: 2,
    childCount: 1,
    facilities: ['Free WiFi', 'Airport Shuttle', 'Non-Smoking Rooms'],
    pricePerNight: 110,
    starRating: 3,
    imageUrls: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
    ]
  },
  {
    name: 'Eco Jungle Lodge',
    city: 'Costa Rica',
    country: 'Costa Rica',
    description: 'Sustainable eco-lodge in rainforest with wildlife tours',
    type: 'Eco-Friendly',
    adultCount: 4,
    childCount: 2,
    facilities: ['Free WiFi', 'Restaurant', 'Nature Tours', 'Outdoor Pool'],
    pricePerNight: 175,
    starRating: 4,
    imageUrls: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
    ]
  },
  {
    name: 'Casino Resort Hotel',
    city: 'Las Vegas',
    country: 'USA',
    description: 'Entertainment complex with casino, shows, and fine dining',
    type: 'Resort',
    adultCount: 4,
    childCount: 0,
    facilities: ['Free WiFi', 'Parking', 'Pool', 'Casino', 'Restaurant', 'Spa', 'Fitness Center'],
    pricePerNight: 265,
    starRating: 4,
    imageUrls: [
      'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'
    ]
  }
];

async function seed() {
  try {
    const shouldClean = process.argv.includes('--clean');

    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log('Connected to MongoDB');

    if (shouldClean) {
      console.log('Cleaning database...');
      await Admin.deleteMany({});
      await User.deleteMany({});
      await Hotel.deleteMany({});
      console.log('Database cleaned\n');
    }

    console.log('Creating admin accounts...');

    let admin1 = await Admin.findOne({ email: 'admin1@test.com' });
    if (!admin1) {
      admin1 = await Admin.create({
        email: 'admin1@test.com',
        username: 'admin1',
        password: 'password123',
        businessName: 'Luxury Hotels Group',
        ownerName: 'John Admin'
      });
      console.log('Created admin1');
    } else {
      console.log('Admin1 already exists');
    }

    let admin2 = await Admin.findOne({ email: 'admin2@test.com' });
    if (!admin2) {
      admin2 = await Admin.create({
        email: 'admin2@test.com',
        username: 'admin2',
        password: 'password123',
        businessName: 'Budget Stay Network',
        ownerName: 'Jane Manager'
      });
      console.log('Created admin2');
    } else {
      console.log('Admin2 already exists');
    }

    console.log('Admin accounts check complete');

    console.log('Creating user accounts...');

    let user1 = await User.findOne({ email: 'user1@test.com' });
    if (!user1) {
      user1 = await User.create({
        email: 'user1@test.com',
        password: 'password123',
        firstName: 'Alice',
        lastName: 'Smith'
      });
      console.log('Created user1');
    } else {
      console.log('User1 already exists');
    }

    let user2 = await User.findOne({ email: 'user2@test.com' });
    if (!user2) {
      user2 = await User.create({
        email: 'user2@test.com',
        password: 'password123',
        firstName: 'Bob',
        lastName: 'Johnson'
      });
      console.log('Created user2');
    } else {
      console.log('User2 already exists');
    }

    let user3 = await User.findOne({ email: 'user3@test.com' });
    if (!user3) {
      user3 = await User.create({
        email: 'user3@test.com',
        password: 'password123',
        firstName: 'Carol',
        lastName: 'Williams'
      });
      console.log('Created user3');
    } else {
      console.log('User3 already exists');
    }

    console.log('User accounts check complete');

    console.log('Creating hotels...');
    const hotels = [];
    for (let i = 0; i < hotelData.length; i++) {
      // Safe check operators
      if (!admin1 || !admin2) {
        throw new Error('Admins not found or created properly');
      }

      const adminId = i % 2 === 0 ? admin1._id.toString() : admin2._id.toString();

      let hotel = await Hotel.findOne({ name: hotelData[i].name });
      if (!hotel) {
        hotel = await Hotel.create({
          ...hotelData[i],
          adminId,
          lastUpdated: new Date(),
          bookings: []
        });
        console.log(`Created hotel: ${hotelData[i].name}`);
      } else {
        // Ensure adminId matches if it already exists (optional but good for consistency)
        // If we wanted to update:
        // hotel.adminId = adminId;
        // await hotel.save();
      }
      hotels.push(hotel);
    }
    console.log(`Processed ${hotels.length} hotels`);

    console.log('Creating sample bookings...');
    // Ensure users are available
    if (!user1 || !user2 || !user3) {
      throw new Error('Users not found or created properly');
    }

    const bookings = [
      {
        hotelIndex: 0,
        user: user1,
        checkIn: new Date('2024-09-01'),
        checkOut: new Date('2024-09-05'),
        adultCount: 2,
        childCount: 0
      },
      {
        hotelIndex: 1,
        user: user2,
        checkIn: new Date('2024-08-15'),
        checkOut: new Date('2024-08-20'),
        adultCount: 2,
        childCount: 2
      },
      {
        hotelIndex: 4,
        user: user3,
        checkIn: new Date('2024-10-01'),
        checkOut: new Date('2024-10-03'),
        adultCount: 1,
        childCount: 0
      },
      {
        hotelIndex: 6,
        user: user1,
        checkIn: new Date('2024-12-20'),
        checkOut: new Date('2024-12-27'),
        adultCount: 2,
        childCount: 2
      },
      {
        hotelIndex: 10,
        user: user2,
        checkIn: new Date('2024-11-10'),
        checkOut: new Date('2024-11-15'),
        adultCount: 2,
        childCount: 1
      }
    ];

    let createdBookingsCount = 0;
    for (const booking of bookings) {
      const hotel = hotels[booking.hotelIndex];
      if (!hotel) continue;

      // Check if this specific booking already exists in the hotel's bookings array
      // We'll check by matching user email, checkIn, and checkOut
      // Since 'bookings' is a subdocument array, we can't query it easily with findOne here 
      // because we're iterating. easier to check the loaded hotel object if it was fully loaded, 
      // but we pushed newly created hotels or found hotels. 
      // We should re-fetch or trust the array if we didn't populate it deeply.
      // Actually 'hotel' is a mongoose document.

      const existingBooking = hotel.bookings.find((b: any) =>
        b.email === booking.user.email &&
        new Date(b.checkIn).getTime() === booking.checkIn.getTime() &&
        new Date(b.checkOut).getTime() === booking.checkOut.getTime()
      );

      if (existingBooking) {
        continue;
      }

      const nights = Math.ceil(
        (booking.checkOut.getTime() - booking.checkIn.getTime()) / (1000 * 60 * 60 * 24)
      );
      const totalCost = hotel.pricePerNight * nights;

      await Hotel.findByIdAndUpdate(hotel._id, {
        $push: {
          bookings: {
            firstName: booking.user.firstName,
            lastName: booking.user.lastName,
            email: booking.user.email,
            adultCount: booking.adultCount,
            childCount: booking.childCount,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            userId: booking.user._id.toString(),
            totalCost
          }
        }
      });
      createdBookingsCount++;
    }
    console.log(`Created ${createdBookingsCount} new sample bookings (skipped ${bookings.length - createdBookingsCount} existing)\n`);

    console.log('Database seeded/verified successfully!\n');
    console.log('ADMIN ACCOUNTS (password: password123)');
    console.log('-------------------------------------------------------');
    console.log('  admin1@test.com  | Luxury Hotels Group');
    console.log('  admin2@test.com  | Budget Stay Network');
    console.log('');
    console.log('USER ACCOUNTS (password: password123)');
    console.log('-------------------------------------------------------');
    console.log('  user1@test.com   | Alice Smith');
    console.log('  user2@test.com   | Bob Johnson');
    console.log('  user3@test.com   | Carol Williams');
    console.log('');
    console.log('DATABASE STATISTICS');
    console.log('-------------------------------------------------------');
    console.log(`  Admins:   ${await Admin.countDocuments()}`);
    console.log(`  Users:    ${await User.countDocuments()}`);
    console.log(`  Hotels:   ${await Hotel.countDocuments()}`);
    console.log(`  Bookings: ${bookings.length} (Sample set size)`); // Just showing sample size, exact count is harder to verify quickly without query
    console.log('');
    console.log('API available at: http://localhost:9000');
    console.log('MongoDB UI at:   http://localhost:8081');
    console.log('-------------------------------------------------------\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    // process.exit(1); 
    // Actually if we want to be more robust, we might want to log it but not fail hard if it's just a verification step. 
    // But for now fail hard is fine. 
    process.exit(1);
  }
}

seed();
