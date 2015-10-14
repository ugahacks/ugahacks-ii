var Schedule = React.createClass({
  getInitialState: function(){
    return {
      "data": [
        {
          "name": "Start Check-In",
          "description": "Lamar Dodd School of Art",
          "time": "October 23, 2015 5:00 pm"
        },
        {
          "name": "Opening Ceremony Starts",
          "description": null,
          "time": "October 23, 2015 6:30 pm"
        },
        {
          "name": "End Check-in/End Ceremony/Start Hacking",
          "description": null,
          "time": "October 23, 2015 8:00 pm"
        },
        {
          "name": "Breakfast",
          "description": null,
          "time": "October 23, 2015 9:00 pm"
        },
        {
          "name": "Clarifai TechTalk",
          "description": "Learn about the basics of machine learning, and how you can apply them with Clarifai.",
          "time": "October 23, 2015 10:00 pm"
        },
        {
          "name": "Intro to Web Dev",
          "description": null,
          "time": "October 24, 2015 12:00 am"
        },
        {
          "name": "Super Smash Bros Tournament",
          "description": null,
          "time": "October 24, 2015 2:00 am"
        },
        {
          "name": "Snack",
          "description": null,
          "time": "October 24, 2015 3:00 am"
        },
        {
          "name": "Breakfast",
          "description": null,
          "time": "October 24, 2015 9:00 am"
        },
        {
          "name": "Tech Talk on Design Thinking",
          "description": null,
          "time": "October 24, 2015 12:00 pm"
        },
        {
          "name": "Lunch",
          "description": null,
          "time": "October 24, 2015 3:00 pm"
        },
        {
          "name": "Talk",
          "description": null,
          "time": "October 24, 2015 5:00 pm"
        },
        {
          "name": "Design Talk",
          "description": "By Matt Smith, local UI/UX designer.",
          "time": "October 24, 2015 6:00 pm"
        },
        {
          "name": "Dinner",
          "description": null,
          "time": "October 24, 2015 9:00 pm"
        },
        {
          "name": "Super Smash Bros Tournament",
          "description": null,
          "time": "October 25, 2015 2:00 am"
        },
        {
          "name": "Snack",
          "description": null,
          "time": "October 25, 2015 3:00 am"
        },
        {
          "name": "Breakfast + End of Hacking",
          "description": null,
          "time": "October 25, 2015 9:00 am"
        },
        {
          "name": "Closing Expo Starts",
          "description": null,
          "time": "October 25, 2015 10:00 am"
        },
        {
          "name": "End of Closing Expo",
          "description": null,
          "time": "October 25, 2015 11:30 am"
        },
        {
          "name": "Closing Ceremony",
          "description": null,
          "time": "October 25, 2015 12:00 pm"
        },
        {
          "name": "Buses Depart",
          "description": null,
          "time": "October 25, 2015 1:30 pm"
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
          if (a.time.isBefore(b)) {
            return 1;
          } else if (a.time.isAfter(b)) {
            return -1;
          } else {
            return 0;
          };
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
              <h4>{moment(key).format("dddd MM/DD")}</h4>
              <ul className="list-group">
                {
                  data.map(function(a) {
                    return (
                      <li className="list-group-item">
                        <span className="badge">{a.time.format("h:mm A")}</span>
                        <span className="event-heading">{a.name}</span>
                        {
                          a.description != null ? <div className="description">{a.description}</div> : null
                        }
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