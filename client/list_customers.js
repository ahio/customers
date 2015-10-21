function listCustomers() {
  usersData.users.forEach(function(el) {
    $('#users tbody').append("<tr class='user'>" +
      "<td><a class='waves-effect waves-light btn modal-trigger fa fa-pencil edit-user-button' " +
        "href='#edit'></a>" +
        "<a class='waves-effect waves-light btn modal-trigger fa fa-trash red darken-4 remove-user-button' " +
        "href='#remove'></a></td>" +
        "<td>" + el.name + "</td>" +
        "<td>" + el.email + "</td>" +
        "<td>" + el.phone + "</td>" +
        "<td>" + el.address + "</td>" +
        "<td>" + el.street + "</td>" +
        "<td>" + el.city + "</td>" +
        "<td>" + el.state + "</td>" +
        "<td>" + el.zip + "</td>" +
        "</tr>");
    });
}