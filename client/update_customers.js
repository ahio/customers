function updateCustomer() {
    var fields = [];
    $('.edit-user-button').click(function (e) {
        var userData = [], index, element, user, formFields;

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
    $('.confirm-edit-user').click(function (e) {
        var data = {};
        fields.forEach(function(el) {
            data[el] = $('.edit-user input[name=' + el + ']').val()
        });
        usersData.users[elementIndex] = data;
        $.ajax('/save', {type: 'POST', json: true, data: JSON.stringify(usersData)});
        elementIndex = null;
        fields = null;
    });
}
