var Schedule = React.createClass({
  getInitialState: function(){
    return {
      "data": [
        {
          "name": "Start Check-In",
          "description": null,
          "time": "October 23, 2015 5:00 pm",
          "location": "Lamar Dodd School of Art"
        },
        {
          "name": "Opening Ceremony Starts",
          "description": null,
          "time": "October 23, 2015 6:30 pm",
          "location": "S151 Auditorium"
        },
        {
          "name": "Teambuilding Mixer",
          "description": "If you haven't find a team or are looking to build your team, then come to the mixer to find awesome hackers.",
          "time": "October 23, 2015 8:00 pm",
          "location": "S151 Auditorium"
        },
        {
          "name": "Hacking Begins",
          "description": null,
          "time": "October 23, 2015 8:00 pm"
        },
        {
          "name": "Dinner",
          "description": null,
          "time": "October 23, 2015 9:00 pm",
          "location": "Courtyard"
        },
        {
          "name": "Clarifai TechTalk",
          "description": "Learn about the basics of machine learning, and how you can apply them with Clarifai.",
          "time": "October 24, 2015 12:00 am",
          "location": "Room 104"
        },
        {
          "name": "Breakfast",
          "description": null,
          "time": "October 24, 2015 9:00 am",
          "location": "Courtyard"
        },
        {
          "name": "Lunch",
          "description": null,
          "time": "October 24, 2015 3:00 pm",
          "location": "Courtyard"
        },
        {
          "name": "Design Thinking Talk",
          "description": "Come learn about the stages of design thinking, a methodology used by designers to solve complex problems, and how you can use it to improve your hack.",
          "time": "October 24, 2015 12:00 pm",
          "location": "Room 104"
        },
        {
          "name": "Dinner",
          "description": null,
          "time": "October 24, 2015 9:00 pm",
          "location": "Courtyard"
        },
        {
          "name": "Super Smash Bros Tournament",
          "description": "Sign up starts at 11pm at the Second Floor Lobby.",
          "time": "October 25, 2015 2:00 am",
          "location": "Second Floor Lobby"
        },
        {
          "name": "Hacking Ends",
          "description": "Submit your hacks to DevPost. Provide a brief description and list your team members.",
          "time": "October 25, 2015 8:00 am"
        },
        {
          "name": "Breakfast",
          "description": null,
          "time": "October 25, 2015 8:30 am",
          "location": "Courtyard"
        },
        {
          "name": "Closing Expo Starts",
          "description": null,
          "time": "October 25, 2015 10:00 am",
          "location": "First Floor Lobby"
        },
        {
          "name": "End of Closing Expo",
          "description": null,
          "time": "October 25, 2015 11:30 am"
        },
        {
          "name": "Closing Ceremony",
          "description": null,
          "time": "October 25, 2015 12:00 pm",
          "location": "S151 Auditorium"
        },
        {
          "name": "Insomnia Cookies",
          "description": null,
          "time": "October 24, 2015 1:00 am",
          "location": "Snack Table"
        },
        {
          "name": "Design Talk",
          "description": null,
          "time": "October 23, 2015 10:00 pm",
          "location": "Room 104"
        },
        {
          "name": "Intro to Coding",
          "description": null,
          "time": "October 24, 2015 4:00 pm",
          "location": "Room 104"
        }
      ].map(function(a) {
        a.time = moment.utc(a.time);
        return a;
      }).reduce(function(finalHash, partial) {
        var day = partial.time.format("MM-DD-YYYY");
        if (finalHash[day]) {
          finalHash[day].push(partial);
        } else {
          finalHash[day] = [partial];
        };

        finalHash[day] = finalHash[day].sort(function(a, b) {
          return a.time.unix() - b.time.unix()
        })

        return finalHash;
      }, {})
    };
  },

  render() {
    return (
      <div>
      {
        Object.keys(this.state.data).map(function(key){
          data = this.state.data[key];
          return (
            <div className="col-md-4">
              <h4>{moment(key, "MM-DD-YYYY").format("dddd MM/DD")}</h4>
              <ul className="list-group">
                {
                  data.map(function(a) {
                    return (
                      <li className="list-group-item">
                        <span className={a.time.isBefore(moment().subtract(4, 'h')) ? "badge done" : "badge"}>{a.time.format("h:mm A")}</span>
                        <span className="event-heading">{a.name}</span>
                        { a.location && <span className="location">{a.location}</span> }
                        { a.description && <div className="description">{a.description}</div> }
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          );
        }.bind(this))
      }
      </div>
    ); // return
  } // render
})
