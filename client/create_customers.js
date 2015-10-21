function createCustomer() {
    $('.confirm-create-user').click(function(e) {
        var tempData = [], data = {};
        var content = $(e.target.parentNode).siblings('.modal-content');
        var userData = $(content).find('.create');
        for(var i = 0; i < userData[0].children.length; i++) {
            tempData.push(userData[0].children[i].name);
        }
        tempData.forEach(function(el) {
            var val = $(userData).find("[name=" + el + "]").val();
            data[el] = val;
        });
        usersData.users.push(data);
        $.ajax('/save', {type:'POST', json: true, data:JSON.stringify(usersData)});
    });
}