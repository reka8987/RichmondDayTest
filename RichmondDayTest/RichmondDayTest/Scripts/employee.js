//Load Data in Table when documents is ready  
$(document).ready(function () {
    loadData();
});

//Load Data function  
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
               // html += '<td>' + item.id + '</td>';
                html += '<td>' + item.first_name + '</td>';
                html += '<td>' + item.last_name + '</td>';
                html += '<td>' + item.email + '</td>';
                html += '<td><a class="btn btn-primary btn-sm" onclick="return getbyID(' + item.id + ')"><i class="fa fa-pencil fa-lg"></i></a>  <a class="btn btn-danger btn-sm" onclick="Delele(' + item.id + ')"><i class="fa fa-trash fa-lg"></i></a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function   
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        id: $('#id').val(),
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        email: $('#email').val()
    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('.modal-backdrop.in').css('display', 'none');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Employee ID  
function getbyID(EmpID) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/getbyID/" + EmpID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#id').val(result.id);
            $('#first_name').val(result.first_name);
            $('#last_name').val(result.last_name);
            $('#email').val(result.email);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record  
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        id: $('#id').val(),
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        email: $('#email').val()
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#id').val("");
            $('#first_name').val("");
            $('#last_name').val("");
            $('#email').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record  
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes  
function clearTextBox() {
    $('#id').val("");
    $('#first_name').val("");
    $('#last_name').val("");
    $('#email').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#first_name').css('border-color', 'lightgrey');
    $('#last_name').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
}
//Valdidation using jquery  
function validate() {
    var isValid = true;
    if ($('#first_name').val().trim() == "") {
        $('#first_name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#first_name').css('border-color', 'lightgrey');
    }
    if ($('#last_name').val().trim() == "") {
        $('#last_name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#last_name').css('border-color', 'lightgrey');
    }
    if ($('#email').val().trim() == "") {
        $('#email').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#email').css('border-color', 'lightgrey');
    }
   return isValid;
}