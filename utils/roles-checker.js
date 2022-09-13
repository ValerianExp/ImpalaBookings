const rolesChecker = user => {
    return {
        //now works with node versions older than 14.0.0 (i have 12.0)
        isUSER: user ? user.role === 'USER' : false,
        isCOMPANY: user ? user.role === 'COMPANY' : false,
        isPA: user ? user.role === 'PA' : false,
        isCLIENT: user ? user.role === 'CLIENT' : false



        // isStudent: user?.role === 'STUDENT',
        // isDEV: user?.role === 'DEV',
        // isPM: user?.role === 'PM',
        // isTA: user?.role === 'TA'
    }
}

module.exports = { rolesChecker }