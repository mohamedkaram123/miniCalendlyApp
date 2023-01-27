import { user } from '../../../helper';
import { check_branches } from '../../../helper';
export const roleses = [{
        "group_title": 'Employees Roles',
        "group_role": "1",
        "group_roles": [{
                "role": "2",
                "title": 'show Employee'
            },
            {
                "role": "3",
                "title": 'Add Employee'
            },

            {
                "role": "4",
                "title": 'Edit Employee'
            },
            {
                "role": "5",
                "title": 'delete Employee'
            },
        ],
    },
    {
        "group_title": 'Senders Roles',
        "group_role": "20",
        "group_roles": [{
                "role": "21",
                "title": 'show Sender'
            },
            {
                "role": "22",
                "title": 'Add Sender'
            },

            {
                "role": "23",
                "title": 'Edit Sender'
            },
            {
                "role": "24",
                "title": 'delete Sender'
            },
            {
                "role": "25",
                "title": 'show order sender'
            }
        ],
    },

    {
        "group_title": 'Reciepent Roles',
        "group_role": "30",
        "group_roles": [{
                "role": "31",
                "title": 'show Reciepent'
            },
            {
                "role": "32",
                "title": 'Add Reciepent'
            },

            {
                "role": "33",
                "title": 'Edit Reciepent'
            },
            {
                "role": "34",
                "title": 'delete Reciepent'
            },
        ],
    },
    {
        "group_title": 'Companies Roles',
        "group_role": "40",
        "group_roles": [{
                "role": "41",
                "title": 'show Company'
            },
            {
                "role": "42",
                "title": 'Add Company'
            },

            {
                "role": "43",
                "title": 'Edit Company'
            },
            {
                "role": "44",
                "title": 'delete Company'
            },
            {
                "role": "45",
                "title": 'show document company'
            },
            {
                "role": "46",
                "title": 'save data document company'
            },
        ],
    },
    {
        "group_title": 'Order Status Roles',
        "group_role": "50",
        "group_roles": [{
                "role": "51",
                "title": 'show Order Status'
            },
            {
                "role": "52",
                "title": 'Add Order Status'
            },

            {
                "role": "53",
                "title": 'Edit Order Status'
            },
            {
                "role": "54",
                "title": 'delete Order Status'
            },
        ],
    },
    {
        "group_title": 'Orders Roles',
        "group_role": "60",
        "group_roles": [{
                "role": "61",
                "title": 'show Order'
            },
            {
                "role": "62",
                "title": 'Add Order'
            },

            {
                "role": "63",
                "title": 'Edit Order'
            },
            {
                "role": "64",
                "title": 'delete Order'
            },
        ],
    },
    {
        "group_title": 'Center Orders Roles',
        "group_role": "70",
        "group_roles": [{
                "role": "71",
                "title": 'show center order'
            },

            {
                "role": "72",
                "title": 'update status center order'
            },
        ],
    },

    {
        "group_title": 'Reciepent Orders Roles',
        "group_role": "80",
        "group_roles": [{
                "role": "81",
                "title": 'show reciepent order'
            },

            {
                "role": "82",
                "title": 'update status reciepent order'
            },
        ],
    },
    {
        "group_title": 'export Orders Roles',
        "group_role": "90",
        "group_roles": [{
                "role": "91",
                "title": 'show export order'
            },

            {
                "role": "92",
                "title": 'update status export order'
            },
        ],
    },
    {
        "group_title": 'Orders Bill Roles',
        "group_role": "150",
        "group_roles": [{
                "role": "151",
                "title": 'show Order Bill'
            },
            {
                "role": "152",
                "title": 'Print Order Bill'
            },

            {
                "role": "153",
                "title": 'Pdf Order Bill'
            }
        ],
    },
    {
        "group_title": 'Transfer Require Amounts Roles',
        "group_role": "100",
        "group_roles": [{
                "role": "101",
                "title": 'Show Transfer Require Sender Company'
            },

            {
                "role": "102",
                "title": 'replay transfer'
            },
        ],
    },
    {
        "group_title": 'Due Amounts',
        "group_role": "110",
        "group_roles": [{
                "role": "111",
                "title": 'Show Due Amounts'
            },

            {
                "role": "112",
                "title": 'confirm'
            },
        ],
    },
    {
        "group_title": 'Transfer Require Amounts Center Roles',
        "group_role": "120",
        "group_roles": [{
                "role": "121",
                "title": 'Show Transfer Require Center'
            },

            {
                "role": "122",
                "title": 'replay transfer center'
            },
        ],
    },
    {
        "group_title": 'Due Amounts Center',
        "group_role": "130",
        "group_roles": [{
                "role": "131",
                "title": 'Show Due Amounts Center'
            },

            {
                "role": "132",
                "title": 'confirm center'
            },
        ],
    },
    {
        "group_title": 'Setting Order Bills Roles',
        "group_role": "170",
        "group_roles": [{
            "role": "171",
            "title": 'Show Setting Order Bills'
        }],
    },
];


export const checkRole = (permission) => {

    if (user().type !== "admin") {
        if (permission == 0) {
            return true
        } else if (permission == "01" && user().type == "admin") {
            return true
        } else {
            if (Array.isArray(permission)) {

                let check_permsion = true;

                for (let index = 0; index < permission.length; index++) {
                    check_permsion = user().permissions.includes(permission[index]);
                    if (check_permsion === true) {
                        return true
                    }
                }

                return check_permsion;
            } else {
                return user().permissions.includes(permission)

            }
        }
    } else {
        return true
    }

}