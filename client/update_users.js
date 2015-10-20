function userUpdate() {
    $('.edit-user-button').click(function (e) {
        var fields = [], userData = [], index, element, user, formFields;

        index = $('.edit-user-button').index(this);
        elementIndex = index;
        element = $('.edit-user-button').parent().parent()[index];
        user = $(element).context.children;
        formFields = $('.edit-user input');

        for (var i = 0; i < formFields.length; i++) {
            fields.push(formFields[i].name);
        }
        for (var props in user) {
            if (user[props].textContent) {
                userData.push(user[props].textContent);
            }
        }

        fields.forEach(function (el, index) {
            $('.edit-user').find('[name=' + el + ']').attr('value', userData[index]);
        });
    });

    $('.accept-edit-user').click(function (e) {
        var data = {
            name: $('.edit-user input[name="name"]').val(),
            email: $('.edit-user input[name="email"]').val(),
            phone: $('.edit-user input[name="phone"]').val()
        };
        usersData.users[elementIndex] = data;
        $.ajax('/save', {method: 'POST', json: true, data: JSON.stringify(usersData)});
        elementIndex = null;
    });
}
