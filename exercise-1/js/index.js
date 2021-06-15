$(document).ready(function () {
  // Retrieve the template data from the HTML.
  var template = $('#handlebars-section').html();
  // Compile the template data into a function
  var templateScript = Handlebars.compile(template);
  // Fetch data in JSON format.
  $.get("https://5dc588200bbd050014fb8ae1.mockapi.io/assessment", function (data) {
    var context = {
      "rows": data,
    };
    // Pass Data to template script.
    var html = templateScript(context);
    // Insert the HTML code into the page
    $(document.body).append(html);       
  });
});

$(document).on('click', '#btn-toggle-show', function () {
  $('#table-profiles').toggleClass('hide');
  if ($('#table-profiles').is(".hide") ) {
    $('#btn-toggle-show').text('Show');
  } else {
    $('#btn-toggle-show').text('Hide');
  }
})
