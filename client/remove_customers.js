function userRemove() {
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
}