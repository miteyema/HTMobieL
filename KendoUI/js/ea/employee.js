var Employee = kendo.data.Model.define( {
    id: "employeeId", // the identifier of the model
    fields: {
        "firstName": {
            type: "string"
        },
        "lastName": {
            type: "string"
        },
        "employeeNumber": {
            type: "number",
            validation: {
                required: true
            }
        },
        "unitId": {
            type: "number",
            validation: {
                required: true
            }
        },
        "email": {
            type: "string",
            validation: {
                required: true
            }
        },
        "password": {
            type: "string"
        }
    }
});

var employee = new Employee();
