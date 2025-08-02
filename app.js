const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json())

app.use(cors());

let gigs = [{
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
      }];

      const repopulateGigs = () => {
        // console.log("repop called");
        
        gigs = [{
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
            }];
      }

app.get("/gigs", (req, res) => {
  console.log("gigs endpoint");
  console.log(gigs.length);
  
  
  res.send(gigs);
});

app.get("/gigs/:id", (req, res) => {
  let paramId = parseInt(req.params.id);
  let gig = gigs.find((item) => {
    return item.id === paramId;
  });
  // console.log("gig", gig);
  
  if (!gig) {
    return res.status(404).json({error: "Gig not found"});
  }
// console.log("gig", gig);
  res.status(200).json(gig);
});

app.delete("/gigs/:id", (req, res) =>{
  // console.log("delete route");
  
  let paramId = parseInt(req.params.id);

  // Check if gig exists first
  const gigToDelete = gigs.find(item => item.id === paramId);
  
  if (!gigToDelete) {
    return res.status(404).json({error: "Gig not found"});
  }
  gigs = gigs.filter((item) => {
    return item.id !== paramId;
  });
  res.status(200).json({message: "Gig deleted succesfully"});
  
})

app.post("/gigs", (req, res) => {
newGig = req.body;
gigs.push({id: newGig.id, name: newGig.name, image: newGig.image, description: newGig.description, date: newGig.date, location: newGig.location})
res.sendStatus(200);
})

module.exports = {app, repopulateGigs};