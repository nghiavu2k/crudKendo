let selectedRow = null;

// function onFormSubmit() {
//     const formData = read();
//     if (selectedRow == null)
//         create(formData);
//     else
//         update(formData);
//     getList();
// }
//
// function read() {
//     const formData = {};
//     formData["fullName"] = document.getElementById("fullName").value;
//     formData["email"] = document.getElementById("email").value;
//     formData["dob"] = document.getElementById("dob").value;
//     formData["gender"] = document.getElementById("gender").value;
//     return formData;
// }
//
// function create(data) {
//     const table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
//     const newRow = table.insertRow(table.length);
//     let cell1 = newRow.insertCell(0);
//     cell1.innerHTML = data.fullName;
//     let cell2 = newRow.insertCell(1);
//     cell2.innerHTML = data.email;
//     let cell3 = newRow.insertCell(2);
//     cell3.innerHTML = data.dob;
//     let cell4 = newRow.insertCell(3);
//     cell4.innerHTML = data.gender;
//     // let cell5 = newRow.insertCell(4);
//     // cell5.innerHTML = `<a onClick="onUpdate(this)">Edit</a>
//     //                    <a onClick="onDelete(this)">Delete</a>`;
// }
//
// function getList() {
//     document.getElementById("fullName").value = "";
//     document.getElementById("email").value = "";
//     document.getElementById("dob").value = "";
//     document.getElementById("gender").value = "";
//     selectedRow = null;
// }
//
// function onUpdate(td) {
//     selectedRow = td.parentElement.parentElement;
//     document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
//     document.getElementById("email").value = selectedRow.cells[1].innerHTML;
//     document.getElementById("dob").value = selectedRow.cells[2].innerHTML;
//     document.getElementById("gender").value = selectedRow.cells[3].innerHTML;
// }
//
// function update(formData) {
//     selectedRow.cells[0].innerHTML = formData.fullName;
//     selectedRow.cells[1].innerHTML = formData.email;
//     selectedRow.cells[2].innerHTML = formData.dob;
//     selectedRow.cells[3].innerHTML = formData.gender;
// }
//
// function onDelete(td) {
//     let row;
//     if (confirm('Are you sure to delete this record ?')) {
//         row = td.parentElement.parentElement;
//         document.getElementById("employeeList").deleteRow(row.rowIndex);
//         getList();
//     }
// }

// $(document).ready( function () {
//     $('#employeeList').DataTable();
// } );

// $(document).ready(function (){
//     $("#employeeList").kendoGrid({
//         dataSource: list,
//         pageable: true,
//         columns: [
//             {field: "fullName"},
//             {field: "email"},
//             {field: "dob"},
//             {field: "gender"},
//             {command: ["edit","destroy"]},
//         ],
//         sortable: true,
//         editable: "inline"
//     });
// })

const list = [];

function create() {
    let employee = {
        id: list.length + 1,
        fullName: this.fullName.value,
        email: this.email.value,
        dob: this.dob.value,
        gender: this.gender.value,
        payment: getPayment()
    }
    list.push(employee);
    $("#employeeList").data("kendoGrid").setDataSource(list)
}

let chose = 0;

function chose1() {
    chose = 1
}
function chose2() {
    chose = 2
}

function getPayment() {
    if (chose === 1) return "Credit"
    if (chose === 2) return "Paypal"
    else return ""
}


let listNextID = list.length + 1;

function getIndexById(id) {
    const l = list.length;

    for (let j = 0; j < l; j++) {
        if (list[j].ProductID === id) {
            return j;
        }
    }
    return null;
}

$(document).ready(function () {
    const dataSource = new kendo.data.DataSource({
        pageSize: 10,
        batch: false,
        schema: {
            model: {
                id: getIndexById(listNextID),
                fields: {
                    ProductID: {editable: false, nullable: true},
                    fullName: {type: "text"},
                    email: {type: "text"},
                    dob: {type: "Date"},
                    gender: {type: "text"},
                    payment: {type: "text"}
                }
            }
        }
    });

    $("#employeeList").kendoGrid({
        dataSource: dataSource,
        pageable: true,
        columns: [
            {field: "fullName", title: "Full Name"},
            {field: "email", title: "Email Address"},
            {
                field: "dob", title: "Date of birth", format: "{0:MM/dd/yyyy}",
                editor: function (container, options) {
                    $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                        .appendTo(container)
                        .kendoDatePicker();
                },
            },
            {field: "gender", title: "Gender", editor: DropDownEditor},
            {field: "payment", title: "Payment", editor: DropDownEditorCredit},
            {command: ["edit", "destroy"], title: "&nbsp;", width: "250px"},
        ],
        scrollable: true,
        sortable: true,
        filterable: true,
        editable: {mode: "popup"},
        save: function (p) {
            if (p.model.id !== "") {
                let newEl = list.find((e) => e.id === p.model.id);
                if (p.model.id === newEl.id) {
                    newEl.fullName = p.model.fullName;
                    newEl.email = p.model.email
                    newEl.dob = p.model.dob
                    newEl.gender = p.model.gender
                    newEl.payment = p.model.payment
                    $("#employeeList").data("kendoGrid").setDataSource(list);
                    preventCloseOnSave = true
                }
            } else {
                p.preventDefault();
            }
        }
    })
})

function DropDownEditor(container, options) {
    $('<select data-bind="value:' + options.field + '"><option>Male</option><option>Female</option></select>')
        .appendTo(container)
        .kendoDropDownList();
}

function DropDownEditorCredit(container, options) {
    $('<select data-bind="value:' + options.field + '"><option>Credit</option><option>Paypal</option></select>')
        .appendTo(container)
        .kendoDropDownList();
}