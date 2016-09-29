var Schedule = React.createClass({
  getInitialState: function(){
    return {
      "data": [
        {
          "name": "Check-In",
          "description": null,
          "time": "November 4, 2016 6:00 pm",
          "location": "Thinc Studios"
        },
        {
          "name": "Opening Ceremony",
          "description": null,
          "time": "November 4, 2016 8:00 pm"
        },
	{
	  "name": "Dinner/Hacking Starts",
	  "description": null,
	  "time": "November 4, 2016 9:00 pm"
	},
        {
          "name": "Team Building Exercise",
          "description": "If you haven't found a team or are looking to build your team, then come to the mixer to find awesome hackers.",
          "time": "November 4, 2016 9:15 pm"
        },
        {
          "name": "Snacks",
          "description": null,
          "time": "November 5, 2016 12:00 am"
        },
        {
          "name": "Breakfast",
          "description": null,
          "time": "November 5, 2016 8:00 am"
        },
        {
          "name": "Seminar/Workshop",
          "description": null,
          "time": "November 5, 2016 11:00 am"
        },
        {
          "name": "Lunch",
          "description": null,
          "time": "November 5, 2016 12:00 pm"
        },
        {
          "name": "Seminar/Workshop",
          "description": null,
          "time": "November 5, 2016 2:00 pm"
        },
        {
          "name": "Dinner",
          "description": null,
          "time": "November 5, 2016 8:00 pm"
        },
        {
          "name": "Breakfast",
          "description": null,
          "time": "November 6, 2016 8:00 am"
        },
        {
          "name": "Deadline to Submit",
          "description": null,
          "time": "November 6, 2016 10:00 am"
        },
        {
          "name": "Showcase/Expo",
          "description": null,
          "time": "November 6, 2016 11:00 am"
        },
        {
          "name": "Closing Ceremony",
          "description": null,
          "time": "November 6, 2016 11:00 am"
        },
        {
          "name": "Buses depart",
          "description": null,
          "time": "November 6, 2015 1:00 pm"
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
                        { a.description && <div className="description" dangerouslySetInnerHTML={{__html: a.description}}></div> }
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
