export const formDifference = (form1, form2) => {
    let changes = ""
    for (let key in form1) {
        if (form1[key] !== form2[key]) {
            changes += `${key} changed from ${form1[key]} to ${form2[key]}\n`
        }
    }
    return changes
}