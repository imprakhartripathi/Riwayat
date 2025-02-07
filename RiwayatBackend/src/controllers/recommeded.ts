
import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';


interface EventPlanner {
    name: string;
    username: string;
    password: string;
    phone: string;
    email: string;
    orderCompletionPercentage: number;
    rating: number;
    bio: string;
    specialty: string;
    experience: number;
    plannerFare: string;
    tiers: {
      name: string;
      fare: string;
      services: string;
      image: string;
    }[];
    image: string;
    type: string;
  }

interface RecommendationRequest {
  budget: number;
  eventType: string;
  description: string;
}

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyAHfE5KMcvC5iuWwro7yjhHoBwv3PD0SxU" as string);

// Event planners data
let eventPlanners = [
    {
      "name": "Harvey Specter",
      "username": "harveyspecter",
      "password": "mikeismyboy",
      "phone": "9876543210",
      "email": "harveyspecter@riwayatservices.in",
      "orderCompletionPercentage": 89,
      "rating": 4.7,
      "bio": "Hot-Shot Lawyer who likes to plan events nowadays, best for Law-related Events",
      "specialty": "Corporate Events",
      "experience": 50,
      "plannerFare": "₹10,000",
      "tiers": [
        {
          "name": "Basic",
          "fare": "$1000",
          "services": "Venue & Catering",
          "image": "assets/basictier.png"
        },
        {
          "name": "Standard",
          "fare": "$1900",
          "services": "Venue, Catering & Decorations",
          "image": "assets/stdtier.png"
        },
        {
          "name": "Premium",
          "fare": "$2500",
          "services": "Venue, Catering, Decorations, Entertainment & Waiter/Staff",
          "image": "assets/premtier.png"
        }
      ],
      "image": "assets/harvey.jpg",
      "type": "planner"
    },
    {
      "name": "Dr. House",
      "username": "houseofgreg",
      "password": "wilsoniscrazy",
      "phone": "6969696969",
      "email": "houseofgreg@riwayatservices.in",
      "orderCompletionPercentage": 90,
      "rating": 4.5,
      "bio": "Crazy but Genius Doctor, Side Musician, Faked his Death for his friend, best suited for Parties and Fun Events",
      "specialty": "Parties & Birthdays",
      "experience": 30,
      "plannerFare": "₹10,000",
      "tiers": [
        {
          "name": "Basic",
          "fare": "$1000",
          "services": "Venue & Catering",
          "image": "assets/basictier.png"
        },
        {
          "name": "Standard",
          "fare": "$1900",
          "services": "Venue, Catering & Decorations",
          "image": "assets/stdtier.png"
        },
        {
          "name": "Premium",
          "fare": "$2500",
          "services": "Venue, Catering, Decorations, Entertainment & Waiter/Staff",
          "image": "assets/premtier.png"
        }
      ],
      "image": "assets/dr-house2.jpg",
      "type": "planner"
    },
    {
      "name": "Donna",
      "username": "imdonna",
      "password": "icandoanything",
      "phone": "1234567890",
      "email": "imdonna@riwayatservices.in",
      "orderCompletionPercentage": 100,
      "rating": 5,
      "bio": "Amazing and Confident, can do Anything because She is Donna!!",
      "specialty": "Creative Events, Themed Parties",
      "experience": 40,
      "plannerFare": "₹10,000",
      "tiers": [
        {
          "name": "Basic",
          "fare": "$1000",
          "services": "Venue & Catering",
          "image": "assets/basictier.png"
        },
        {
          "name": "Standard",
          "fare": "$1900",
          "services": "Venue, Catering & Decorations",
          "image": "assets/stdtier.png"
        },
        {
          "name": "Premium",
          "fare": "$2500",
          "services": "Venue, Catering, Decorations, Entertainment & Waiter/Staff",
          "image": "assets/premtier.png"
        }
      ],
      "image": "assets/donna.jpg",
      "type": "planner"
    },
    {
      "name": "Rachel Green",
      "username": "rachelgreen",
      "password": "fashionista123",
      "phone": "9874561230",
      "email": "rachel@eventworld.com",
      "orderCompletionPercentage": 95,
      "rating": 4.8,
      "bio": "Passionate about fashion and event decor, best suited for luxury weddings and fashion shows.",
      "specialty": "Luxury Weddings, Fashion Events",
      "experience": 35,
      "plannerFare": "₹15,000",
      "tiers": [
        {
          "name": "Basic",
          "fare": "$1500",
          "services": "Venue & Decorations",
          "image": "assets/basictier.png"
        },
        {
          "name": "Standard",
          "fare": "$2500",
          "services": "Venue, Decorations & Catering",
          "image": "assets/stdtier.png"
        }
      ],
      "image": "assets/rachel.jpg",
      "type": "planner"
    },
    {
      "name": "Monica Geller",
      "username": "monicageller",
      "password": "cleanfreak1",
      "phone": "9541236987",
      "email": "monica@perfectevents.com",
      "orderCompletionPercentage": 98,
      "rating": 4.9,
      "bio": "Perfectionist when it comes to organizing events. Best for weddings and fine dining events.",
      "specialty": "Weddings, Fine Dining Events",
      "experience": 45,
      "plannerFare": "₹18,000",
      "tiers": [
        {
          "name": "Premium",
          "fare": "$3000",
          "services": "Full Wedding Package",
          "image": "assets/premtier.png"
        }
      ],
      "image": "assets/monica.jpg",
      "type": "planner"
    },
    {
      "name": "Ted Mosby",
      "username": "tedmosby",
      "password": "architecture101",
      "phone": "9123456789",
      "email": "ted@dreamweddings.com",
      "orderCompletionPercentage": 85,
      "rating": 4.4,
      "bio": "Architect and hopeless romantic, specializes in designing and executing dream weddings.",
      "specialty": "Wedding Planning",
      "experience": 25,
      "plannerFare": "₹12,000",
      "tiers": [
        {
          "name": "Standard",
          "fare": "$2000",
          "services": "Venue, Decorations & Music",
          "image": "assets/stdtier.png"
        }
      ],
      "image": "assets/ted.jpg",
      "type": "planner"
    },
    {
      "name": "Barney Stinson",
      "username": "legendary",
      "password": "suitup",
      "phone": "9870001234",
      "email": "barney@partymasters.com",
      "orderCompletionPercentage": 99,
      "rating": 5,
      "bio": "The ultimate party planner. Best for high-energy corporate parties and bachelor parties.",
      "specialty": "Corporate Parties, Bachelor Parties",
      "experience": 20,
      "plannerFare": "₹20,000",
      "tiers": [
        {
          "name": "Premium",
          "fare": "$5000",
          "services": "VIP Lounge, DJ, Entertainment",
          "image": "assets/premtier.png"
        }
      ],
      "image": "assets/barney.jpg",
      "type": "planner"
    },
    {
      "name": "Leslie Knope",
      "username": "leslieknope",
      "password": "parksandrec",
      "phone": "9998887777",
      "email": "leslie@communityevents.com",
      "orderCompletionPercentage": 92,
      "rating": 4.6,
      "bio": "Government official turned event planner, specializes in community gatherings and town events.",
      "specialty": "Community Events, Public Gatherings",
      "experience": 38,
      "plannerFare": "₹8,000",
      "tiers": [
        {
          "name": "Basic",
          "fare": "$500",
          "services": "Venue & Speaker Management",
          "image": "assets/basictier.png"
        }
      ],
      "image": "assets/leslie.jpg",
      "type": "planner"
    }
  ]
async function handler(
  req: Request,
  res: Response
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const budget = 12000;
    const eventType = "Party";
    const description = "Birthday Party";
    
    // Create prompt for Gemini
    const prompt = `Based on the following criteria:
    - Budget: ₹${budget}
    - Event Type: ${eventType}
    - Description: ${description}

    Analyze these event planners and recommend the best matches:
    ${JSON.stringify(eventPlanners, null, 2)}

    Consider factors like:
    1. Whether their specialty matches the event type
    2. If their pricing (plannerFare and tiers) fits within the budget
    3. Their experience and ratings
    4. The relevance of their bio to the event requirements

    Return only the usernames and phone number of the top 3 most suitable planners in order of best match, one username per line.`;

    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const recommendedUsernames = response.text().trim().split('\n');

    // Filter and sort planners based on Gemini's recommendations
    const recommendations = recommendedUsernames
      .map(username => eventPlanners.find(planner => 
        planner.username.toLowerCase() === username.toLowerCase().trim()))
      .filter((planner): planner is EventPlanner => planner !== undefined);

    return res.status(200).json({
      recommendations,
    });
  } catch (error) {
    console.error('Error in recommendation:', error);
    return res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Error generating recommendations'
    });
  }
}

export default handler