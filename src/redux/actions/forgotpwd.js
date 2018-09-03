
/*action*/

export const SENDSMS = "FORGOTPWD/SENDSMS";
export const CHANGEPASSWORD = "FORGOTPWD/CHANGEPASSWORD";


export function sendsms(data) {
    return {
            type: [SENDSMS],
            promise: client => client.post('/api/customer/sendsms',data)
        }
}

export function changepassword(data) {
    return {
        type: [CHANGEPASSWORD],
        promise: client => client.post('/api/customer/changepassword',data)
    }
}


// api/customer/sendsms
// api/customer/changepassword
