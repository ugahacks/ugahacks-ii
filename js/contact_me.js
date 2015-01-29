
// Code for T-Shirt selection
$(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
});

$("#btnSearch").click(function(){
	alert($('.btn-select').text()+", "+$('.btn-select2').text());
});

$(function() {

    //initialize parse
    Parse.initialize("F0G92RCCmfXIa2Ab4CWI6s0Hc9YpRxLUVce7VyJc", "BSfMeZ6LsALrOLRkcoBEllTWECd6iil3fUAuebhH");
    $("input,textarea").jqBootstrapValidation({
	preventSubmit: true,
	submitError: function($form, event, errors) {
	    // additional error messages or events
	},
	submitSuccess: function($form, event) {
	    event.preventDefault(); // prevent default submit behaviour
	    // get values from FORM
	    var name = $("input#name").val();
	    var email = $("input#email").val();
	    var phone = $("input#phone").val();
	    var tee = $("#tee").text();
	    var school = $("input#school").val();
	    var graduate = $("#graduate").text();
	    var team = $("#team").text();
	    var github = $("input#github").val();
	    var linkedin = $("input#linkedin").val();
	    var diet = $("input#diet").val();
        var extrainfo = $("input#extrainfo").val();
        var resume = $("#resume").files;

	    var firstName = name; // For Success/Failure Message
	    // Check for white space in name for Success/Fail message
	    if (firstName.indexOf(' ') >= 0) {
		  firstName = name.split(' ').slice(0, -1).join(' ');
	    }
	    //upload user information to parse database
	    var UserInfo = Parse.Object.extend("UserInfo");
	    var userInfo = new UserInfo();
	    
	    var parseFile;
		var fileUploadControl = $("#resume")[0];
		if (fileUploadControl.files.length > 0) {
		 	var file = fileUploadControl.files[0];
		  	var name = "resume.pdf";
		 
		  	parseFile = new Parse.File(name, file);
		  	parseFile.save().then(function() {
		  		// The file has been saved to Parse.
			}, function(error) {
		  		// The file either could not be read, or could not be saved to Parse.
			});
		}
		
	    
	    userInfo.set("name", name);
	    userInfo.set("email", email);
	    userInfo.set("phone", phone);
	    userInfo.set("shirtsize", tee);
	    userInfo.set("team", team);
	    userInfo.set("school", school);
	    userInfo.set("graduationyear", graduate);
	    userInfo.set("github", github);
	    userInfo.set("linkedin", linkedin);
	    userInfo.set("dietrestrictions", diet);
        userInfo.set("extrainformation", extrainfo);
       	userInfo.set("resume", parseFile);

	    userInfo.save(null, {
		success: function(userInfo) {
		    // Execute any logic that should take place after the object is saved.
		    //alert('New object created with objectId: ' + userInfo.id);
		},
		error: function(userInfo, error) {
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and message.
		    //alert('Failed to create new object, with error code: ' + error.message);
		}
	    });
	    $.ajax({
		url: "././mail/contact_me.php",
		type: "POST",
		data: {
		    name: name,
		    phone: phone,
		    email: email,
		    extrainfo: extrainfo,
		},
		cache: false,
		success: function() {
		    // Success message
		    $('#success').html("<div class='alert alert-success'>");
		    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
			.append("</button>");
		    $('#success > .alert-success')
			.append("<strong>You have successfully registered. </strong>");
		    $('#success > .alert-success')
			.append('</div>');
		    //clear all fields
		    $('#contactForm').trigger("reset");
		},
		error: function() {
		    // Fail message
		    $('#success').html("<div class='alert alert-danger'>");
		    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
			.append("</button>");
		    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
		    $('#success > .alert-danger').append('</div>');
		    //clear all fields
		    $('#contactForm').trigger("reset");
		},
	    })
	},
	filter: function() {
	    return $(this).is(":visible");
	},
    });
    $("a[data-toggle=\"tab\"]").click(function(e) {
	e.preventDefault();
	$(this).tab("show");
    });
});
/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
