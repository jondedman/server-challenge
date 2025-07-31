const request = require("supertest");
const {app} = require("./app.js");

describe("/gigs/:id", () => {
  test("GET - it responds with a single gig objects", async() => {
    const response = await request(app).get("/gigs/2");

    expect(response.body).toEqual(
        [{
        id: 2,
        name: "Jazz Night at Blue Note",
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400",
        description: "An intimate evening of smooth jazz featuring local and international artists in the legendary Blue Note venue.",
        date: "2025-09-03",
        location: "Blue Note Jazz Club, Greenwich Village"
      }]
    )
});
})