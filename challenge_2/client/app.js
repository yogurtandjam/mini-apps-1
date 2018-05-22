window.onload = function() {
  var init = {
    submit : document.getElementById("submit"),
    output : document.getElementById("output"),
    message : '',
    handleClicks : function(message) {
      if(message[message.length - 1] === ';') {
        data = message.slice(0, message.length - 1);
      } else { data = message; }
      $.ajax({
        type:'POST',
        url:'http://127.0.0.1:3000/messages',
        data:data,
        contentType: 'application/json',
        success: function(data) {
          console.log('Success, message sent')
          output.innerHTML = data;
        },
        error: function(data) {
          console.log('Failed to send', data)
        }
      })
    }
  }
  init.submit.onclick = function() {
    event.preventDefault();
    init.message = document.getElementById("input").value
    init.handleClicks(init.message)
  }
}
