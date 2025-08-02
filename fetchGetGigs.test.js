const {fetchGigsData} = require("./fetchGigFunctions");

describe("fetchGigsData", () => {
    it("returns a promise with a list of gigs", async () => {
        const Data = await fetchGigsData();
        expect(Data).toEqual([{
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
      }]);
    });

it("returns an array", async ()=> {
    const data = await fetchGigsData();  
    expect(Array.isArray(data)).toBe(true);
});

it("returns exactly 3 gigs", async () =>{
    const data = await fetchGigsData();
    expect(data.length).toEqual(3);
});

it("each gig has all required properties", async ()=>{
   const data = await fetchGigsData();
   data.forEach(gig => {
    expect(gig).toHaveProperty('id');
    expect(gig).toHaveProperty('name');
    expect(gig).toHaveProperty('image');
    expect(gig).toHaveProperty('description');
    expect(gig).toHaveProperty('date');
    expect(gig).toHaveProperty('location');  
   }); 
});

it("each gig has correct datatypes", async ()=> {
   const data = await fetchGigsData();
   data.forEach(gig => {
    expect(typeof gig.id).toBe('number');
    expect(typeof gig.name).toBe('string');
    expect(typeof gig.image).toBe('string');
    expect(typeof gig.description).toBe('string');
    expect(typeof gig.date).toBe('string');    
    expect(typeof gig.location).toBe('string');
   });
});
})
