var usersData;
$( document ).ready(function() {
    getData();
    $('.create').submit(function(e) {
        var data = {
            name: $(e.target).find("[name=name]").val(),
            email: $(e.target).find("[name=email]").val(),
            phone: $(e.target).find("[name=phone]").val()
        };
        usersData.users.push(data);
        $.ajax('/save', {method:'POST', json: true, data:JSON.stringify(usersData)});
        return false;
    });
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
        var elementIndex = 0;
        $('.modal-trigger').leanModal();
        $('.edit-user-button').click(function (e) {
            var fields = [], userData = [], index, element, user, formFields;

            index = $('.edit-user-button').index(this);
            elementIndex = index;
            element = $('.edit-user-button').parent().parent()[index];
            user = $(element).context.children;
            formFields = $('.edit-user input');

            for(var i = 0; i < formFields.length; i++){
                fields.push(formFields[i].name);
            }
            for (var props in user) {
                if (user[props].textContent) {
                    userData.push(user[props].textContent);
                }
            }

            fields.forEach(function(el, index) {
                $('.edit-user').find('[name=' + el + ']').attr('value', userData[index]);
            });
        });

        $('.accept-edit-user').click(function (e) {
            var data = {
                name: $('.edit-user input')[0].value,
                email: $('.edit-user input')[1].value,
                phone: $('.edit-user input')[2].value
            };
            usersData.users[elementIndex] = data;
            $.ajax('/save', {method:'POST', json: true, data:JSON.stringify(usersData)});
        })
      });
}