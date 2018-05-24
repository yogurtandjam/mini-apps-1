window.onload = function() {
  var init = {
    submit : document.getElementById("submit"),
    output : document.getElementById("output"),
    message : '',
    handleClicks: function(message) {
      var url = 'http://127.0.0.1:3000/messages';
      if(message[message.length - 1] === ';') {
        data = message.slice(0, message.length - 1);
      } else { data = message; }
      fetch(url, {
        method: 'POST',
        body: data,
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.text())
      .catch(error => console.log(error))
      .then(response => output.innerHTML = response)
      }
  }
  var search = {
    submit : document.getElementById("searchSubmit"),
    output : document.getElementById("searchInput"),
    message: '',
    handleClicks : function(input) {

    }
  }
  init.submit.onclick = function() {
    event.preventDefault();
    init.message = document.getElementById("input").value
    init.handleClicks(init.message)
  }

  search.submit.onclick = function() {
    event.preventDefault();
    search.message = document.getElementById("searchInput").value
    search.handleClicks(search.message)
  }

}
