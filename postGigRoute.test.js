const request = require("supertest");
const { app, repopulateGigs } = require("./app.js"); 

describe("/gigs", () => {
    beforeEach(() => {
    repopulateGigs(); // Reset data before each test
  });
  test("POST - the new gig is included in the gigs list", async() => {
    const initialResponse= await request(app).get("/gigs");
    const initialLength = initialResponse.body.length;
    
    const postResponse = await request(app)
    .post("/gigs")
    .send({
        id: 4,
        name: "Amaya and the Echoes Live",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
        description: "Experience the mystical sounds of Amaya and the Echoes as they bring their ethereal indie folk music to life with haunting vocals and atmospheric melodies.",
        date: "2025-11-20",
        location: "The Fillmore, San Francisco"
      });
        expect(postResponse.status).toBe(200);
    const gigsResponse = await request(app).get("/gigs");
    const finalLength = gigsResponse.body.length;
  
    
    
    expect(gigsResponse.body).toEqual([      {
        id: 1,
        name: "The Arctic Monkeys Live",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        description: "Join us for an electrifying night with the Arctic Monkeys as they perform their greatest hits and new material from their latest album.",
        date: "2025-08-15",
        location: "Madison Square Garden, New York"
      },
      {
        id: 2,
        name: "Jazz Night at Blue Note",
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400",
        description: "An intimate evening of smooth jazz featuring local and international artists in the legendary Blue Note venue.",
        date: "2025-09-03",
        location: "Blue Note Jazz Club, Greenwich Village"
      },
      {
        id: 3,
        name: "Electronic Dreams Festival",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
        description: "A three-day electronic music festival featuring top DJs and producers from around the world with stunning light shows.",
        date: "2025-10-12",
        location: "Central Park, New York"
      },
    {
        id: 4,
        name: "Amaya and the Echoes Live",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
        description: "Experience the mystical sounds of Amaya and the Echoes as they bring their ethereal indie folk music to life with haunting vocals and atmospheric melodies.",
        date: "2025-11-20",
        location: "The Fillmore, San Francisco"
      }
    ]
    );
    expect(finalLength).toEqual(initialLength+1);
})
})