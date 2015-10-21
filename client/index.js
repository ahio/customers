var usersData;
var elementIndex = 0;
$( document ).ready(function() {
    createCustomer();
    $.getJSON("./users", function(data) {
        usersData = data;
    })
      .done(function() {
        listCustomers();
        $('.modal-trigger').leanModal();
        updateCustomer();
        removeCustomer();
      });
});