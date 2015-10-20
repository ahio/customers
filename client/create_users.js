var usersData;
var elementIndex = 0;
$( document ).ready(function() {
    getData();
    usersList();
});

function getData() {
    $.getJSON("/users", function(data) {
        usersData = data;
        data.users.forEach(function(el) {
            $('#users tbody').append("<tr class='user'>" +
                "<td><a class='waves-effect waves-light btn modal-trigger fa fa-pencil edit-user-button' " +
                    "href='#edit'></a>" +
                "<a class='waves-effect waves-light btn modal-trigger fa fa-trash remove-user-button' " +
                "href='#remove'></a></td>" +
                "<td>" + el.name + "</td>" +
                "<td>" + el.email + "</td>" +
                "<td>" + el.phone + "</td>" +
                "</tr>");
        });
    })
      .done(function() {
        $('.modal-trigger').leanModal();
        userUpdate();
        userRemove();
        elementIndex = null;
      });
}