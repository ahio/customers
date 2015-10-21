function removeCustomer() {
    $('.remove-user-button').click(function (e) {
        elementIndex = $('.remove-user-button').index(this);
    });

    $('.confirm-remove-user').click(function (e) {
        usersData.users.splice(elementIndex, 1);
        $.ajax('/save', {type:'POST', json: true, data:JSON.stringify(usersData)});
        elementIndex = null;
    })
}