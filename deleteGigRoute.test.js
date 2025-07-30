const request = require("supertest");
const app = require("./app.js");

describe("/gigs/:id", () => {
  test("DELETE - it moves the corresponding gig object from the data", async() => {
    const deleteResponse = await request(app).delete("/gigs/2");
    expect(deleteResponse.status).toBe(200);
    const getResponse = await request(app).get("/gigs");
    expect(getResponse.body).toEqual([{
        id: 1,
        name: "The Arctic Monkeys Live",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        description: "Join us for an electrifying night with the Arctic Monkeys as they perform their greatest hits and new material from their latest album.",
        date: "2025-08-15",
        location: "Madison Square Garden, New York"
      },
      {
        id: 3,
        name: "Electronic Dreams Festival",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
        description: "A three-day electronic music festival featuring top DJs and producers from around the world with stunning light shows.",
        date: "2025-10-12",
        location: "Central Park, New York"
      }]);
});
})