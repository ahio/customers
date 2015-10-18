var usersData;
$( document ).ready(function() {
    getData();
    $('.create').submit(function(e) {
        var id = Math.random().toString().slice(2);
        //console.log(id);
        var data = {
            _id: id,
            name: $(e.target).find("[name=name]").val(),
            email: $(e.target).find("[name=email]").val(),
            phone: $(e.target).find("[name=phone]").val()
        };
        usersData.users.push(data);
        console.log(usersData);
        $.ajax('/save', {method:'POST', json: true, data:JSON.stringify(usersData)});
        return false;
    });
});

function getData() {
    $.getJSON("/users", function(data) {
        usersData = data;
        data.users.forEach(function(el) {
            $('#users tbody').append("<tr id=" + el._id + ">" +
                "<td><button class='fa fa-pencil edit'/> " +
                "<button class='fa fa-trash remove'/></td>" +
                "<td>" + el.name + "</td>" +
                "<td>" + el.email + "</td>" +
                "<td>" + el.phone + "</td>" +
                "</tr>");
        });
    })
      .done(function() {
        $('.edit').click(function (e) {
            console.log($(e.target));
        })
      });
}