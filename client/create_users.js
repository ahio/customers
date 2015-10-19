var usersData;
$( document ).ready(function() {
    getData();
    $('.accept-create-user').click(function(e) {
        var tempData = [], data = {};
        var content = $(e.target.parentNode).siblings('.modal-content');
        var userData = $(content).find('.create');
        for(var i = 0; i < userData[0].children.length; i++) {
            tempData.push(userData[0].children[i].name);
        }
        tempData.forEach(function(el) {
            var val = $(userData).find("[name=" + el + "]").val();
            Object.defineProperty(data, el, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: val});
        });
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
            console.log(index);
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
                name: $('.edit-user input[name="name"]').value,
                email: $('.edit-user input[name="email"]').value,
                phone: $('.edit-user input[name="phone"]').value
            };
            usersData.users[elementIndex] = data;
            $.ajax('/save', {method:'POST', json: true, data:JSON.stringify(usersData)});
            elementIndex = null;
        });

        $('.remove-user-button').click(function (e) {
            var index = $('.remove-user-button').index(this);
            elementIndex = index;
        });

        $('.accept-remove-user').click(function (e) {
            var el = $('#users tbody tr')[elementIndex];
            usersData.users.splice(elementIndex, 1);
            el.remove();
            $.ajax('/save', {method:'POST', json: true, data:JSON.stringify(usersData)});
            elementIndex = null;

        })
      });
}