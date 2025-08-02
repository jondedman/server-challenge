const request = require("supertest");
const { app } = require("./app.js"); 

describe("/gigs", () => {

  test("GET - it responds with an array of gig objects", async() => {
    const response = await request(app).get("/gigs");

    expect(response.body).toEqual([      {
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
      }]
    );
    expect(response.status).toBe(200);
  })
})

 test("GET - it responds with correct Content-Type header", async() => {
    const response = await request(app).get("/gigs");
    
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });

  test("GET - it returns an array with exactly 3 gigs", async() => {
    const response = await request(app).get("/gigs");
    
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(3);
  });

  test("GET - each gig has all required properties", async() => {
    const response = await request(app).get("/gigs");
    
    response.body.forEach(gig => {
      expect(gig).toHaveProperty('id');
      expect(gig).toHaveProperty('name');
      expect(gig).toHaveProperty('image');
      expect(gig).toHaveProperty('description');
      expect(gig).toHaveProperty('date');
      expect(gig).toHaveProperty('location');
    });
  });

  test("GET - each gig has correct data types", async() => {
    const response = await request(app).get("/gigs");
    
    response.body.forEach(gig => {
      expect(typeof gig.id).toBe('number');
      expect(typeof gig.name).toBe('string');
      expect(typeof gig.image).toBe('string');
      expect(typeof gig.description).toBe('string');
      expect(typeof gig.date).toBe('string');
      expect(typeof gig.location).toBe('string');
    });
  });

  test("GET - invalid route returns 404", async() => {
    const response = await request(app).get("/invalid-route");
    
    expect(response.status).toBe(404);
  });



