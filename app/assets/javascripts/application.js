//= require jquery
//= require turbolinks
//= require scrollReveal.js/dist/scrollReveal.min.js
//= require bootstrap/dist/js/bootstrap.js
//= require moment
//= require sweetalert
//= require waypoints
//= require_tree .

$(document).ready(function() {

  var VOLUNTEER_LINK = "";

  // indicate active section in navbar
  $(window).scroll(function () {
        var y = $(this).scrollTop();

        $('nav li a').each(function (event) {
            if (y >= $($(this).attr('href')).offset().top - 150) {
                $('nav li a').not(this).removeClass('active');
                $(this).addClass('active');
            }
        });
    });


  // smoothly scroll when clicking on anchor links
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 100
          }, 1500);
          return false;
        }
      }
    });
  });

  var timelineMilestones = [
    {
      time: "September 3, 2015",
      name:  "Applications Open"
    },
    {
      time: "October 6, 2015",
      name:  "Applications Close"
    },
    {
      time: "October 8, 2015",
      name:  "Decisions Released"
    },
    {
      time: "October 23, 2015",
      name:  "UGA Hacks Begins"
    }
  ].map(function (milestone) {
    return {
      time: moment(milestone.time),
      name: milestone.name
    };
  });

  var now = moment();

  var timelineItems = $(".col-md-3.timeline-item");

  var index = 0;
  timelineMilestones.forEach(function (milestone) {
    var element = timelineItems[index];
    var content = "";
    var description = "<br><br>" + milestone.time.format("MMMM Do") + "<br>" + milestone.name;
    var milestonePassed = milestone.time.isBefore(now, 'd')
    if (milestonePassed) {
      content = "✓" + description;
    } else {
      content = "…" + description;
    }

    element.querySelector("p").innerHTML = content;
    index++;
  })

  window.initTimelineAnimation = initTimelineAnimation;

  function initTimelineAnimation (index) {
    var index = index || 0;
    var milestone = timelineMilestones[index];
    var element = timelineItems[index];
    var content = "";
    var milestonePassed = milestone.time.isBefore(now);
    if (milestonePassed) {
      $(timelineItems[index]).find(".progress-fill").addClass("active");
    }
    index++;

    if (index >= timelineMilestones.length) {
      return;
    };

    setTimeout(function(){
      initTimelineAnimation(index);
    }, 1150);
  }

  // animates elements to scroll into view when viewport shifts
  var config = {
    complete: function( el ) {
      if (el.id == "about-info") {
        initTimelineAnimation()
      };
    }
  }
  window.sr = new scrollReveal(config);

  var hideRegistration = function () {
    $("#register-fade, #register").remove();
  };

  // redirects to typeform directly if on mobile
  isMobile = /iphone|ipod|ipad|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase());
  if (isMobile) {
    hideRegistration();
    $("#mlh-trust-badge").remove();

    var waypoint = new Waypoint({
      element: document.querySelector("#about-info"),
      handler: function(direction) {
        initTimelineAnimation();
      }
    })
  };

  var closingTime = timelineMilestones.filter(function (milestone) {
    return milestone.name == "Applications Close"
  })[0].time;
  var applicationsClosed = closingTime.isBefore(now, 'd')

  var callToActionText, callToActionLink;

  if (applicationsClosed) {
    // volunteering
    callToActionText = "Volunteer";
    callToActionLink = VOLUNTEER_LINK || "javascript:swal('Send us an email mason@ugahacks.com');";
    hideRegistration();
  } else {
    // registration
    callToActionText = "Register";
    callToActionLink = isMobile ? "https://ugahacks.typeform.com/to/rXE0ra" : "#register";
  };

  $("li a[href='#register'], a[href='#register'] *").text(callToActionText);
  $("a[href='#register']").attr("href", callToActionLink);

});