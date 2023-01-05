function body_load(){
    const url = "http://localhost:3000/history";

    $.ajax({
    url: url,
    type: 'GET',
    success: function(res) {
        var table = $('#tblData');
        table.empty();

        for (var i = 0; i < res.length; i++) {
        var item = res[i];
        var row = $('<tr></tr>');
        row.append($('<td>' + item.id + '</td>'));
        row.append($('<td>' + item.camp + '</td>'));
        row.append($('<td>' + item.start_date + '</td>'));
        row.append($('<td>' + item.end_date + '</td>'));
        row.append($('<td>' + item.guest_total + '</td>'));
        row.append($('<td>' + item.guest_name + '</td>'));
        row.append($('<td>' + item.tel + '</td>'));
        row.append($("<td><button class='btn btn-danger' onclick='item_dele(" + item.id + ")'style='padding-left: 17px ;padding-right: 17px;float: right;'><span class='far fa-trash-alt'></span></button> <button class='btn btn-secondary' onclick='item_edit(" + item.id + ")'style='padding-left: 16px ;padding-right: 16px;padding-top: 15px ;padding-bottom: 15px ;float: right;'><span class='fas fa-edit'></span></button> <button class='btn btn-success' onclick='btn_save_click()(" + item.id + ")'style='padding-left: 17px ;padding-right: 17px;float: right;'><span class='fas fa-save'></span></button></td>"));
        table.append(row);
        }
    }
    });
}

    function btn_add_click() {
    const data = {
        camp: $("#camp").val(),
        start_date: $("#start_date").val(),
        end_date: $("#end_date").val(),
        guest_total: $("#guest_total").val(),
        guest_name: $("#guest_name").val(),
        tel: $("#tel").val()
    };
    const url = "http://localhost:3000/history";
    $.ajax({
        url: url,
        method: "POST",
        headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
        },
        data: JSON.stringify(data)
    }).done(function(res) {
        console.log(res);
        body_load();
    });
    }

    function item_dele(uid) {
    var x = confirm("ยืนยันที่จะลบใช่ไหม?");
    if (x) {
        const url = "http://localhost:3000/history/" + uid;
        $.ajax({
        url: url,
        method: "DELETE"
        }).done(function(res) {
        console.log(res);
        body_load();
        });
    }
    }

    function item_edit(uid) {
    const url = "http://localhost:3000/history/" + uid;
    $.ajax({
        url: url,
        method: "GET"
    }).done(function(res) {
        $("#uid").val(res.id);
        $("#camp").val(res.camp);
        $("#start_date").val(res.start_date);
        $("#end_date").val(res.end_date);
        $("#guest_total").val(res.guest_total);
        $("#guest_name").val(res.guest_name);
        $("#tel").val(res.tel);
    });
    }

    function btn_save_click() {
    var uid = $("#uid").val();
    const data = {
        camp: $("#camp").val(),
        start_date: $("#start_date").val(),
        end_date: $("#end_date").val(),
        guest_total: $("#guest_total").val(),
        guest_name: $("#guest_name").val(),
        tel: $("#tel").val()
    };
    const url = "http://localhost:3000/history/" + uid;
    console.log(url);
    $.ajax({
        url: url,
        method: "PUT",
        headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
        },
        data: JSON.stringify(data)
    }).done(function(res) {
        console.log(JSON.stringify(data));
        body_load();
    });
    }
