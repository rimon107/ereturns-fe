import { 
DATE,
CCY_ID,
FI_ID,
ME_COA,
AMOUNT,
EXCHANGE_RATE,
OPEN_POSITION_LIMIT
} from "./validationColumns";


const checkFileFormat = (file_name) =>{

    const name = file_name.toString().split(".")
    
    if (name && Array.isArray(name) && name.length>0) {
        const ext = name.pop()
        return ext==="csv"? true: false;
    }

    return false
}

const checkFileName = (fi, branch, rit, base_date, name) =>{
    const date = base_date.split("-").join("")
    const template = rit + "." + fi.toString() + "." + branch.toString() + "." + date
    let formatted_name = name.toString().split(".")
    formatted_name.pop()
    const file_name = formatted_name.join(".")

    return file_name===template;
}

export const firstColumnValidate = (fi, branch, rit, data) => {
    let result = {}
    let errors = []
    let error_msg;
    let is_valid = true

    const rit_code = data[1].toString()===rit.code.toString()
    if(!rit_code) {
        is_valid = false
        error_msg = "Error at row 1. Wrong RIT code in the file."
        result["rit_code"] = error_msg
        errors.push(error_msg)
    }

    const rit_name = data[2].toString()===rit.name.toString()
    if(!rit_name) {
        is_valid = false
        error_msg = "Error at row 1. Wrong RIT name in the file."
        result["rit_name"] = error_msg
        errors.push(error_msg)
    }

    const rit_version = data[3].toString()===rit.version.toString()
    if(!rit_version) {
        is_valid = false
        error_msg = "Error at row 1. Wrong RIT version in the file."
        result["rit_version"] = error_msg
        errors.push(error_msg)
    }

    const rit_frequency = data[4].toString()===rit.frequency.toString()[0]
    if(!rit_frequency) {
        is_valid = false
        error_msg = "Error at row 1. Wrong RIT frequency in the file."
        result["rit_version"] = error_msg
        errors.push(error_msg)
    }

    const fi_code = data[6].toString()===fi.toString()
    if(!fi_code) {
        is_valid = false
        error_msg = "Error at row 1. Wrong financial institution code in the file."
        result["fi_code"] = error_msg
        errors.push(error_msg)
    }

    const branch_code = data[7].toString()===branch.toString()
    if(!branch_code) {
        is_valid = false
        error_msg = "Error at row 1. Wrong branch code in the file."
        result["branch_code"] = error_msg
        errors.push(error_msg)
    }

    result["is_valid"] = is_valid
    result["errors"] = errors

    return result
}

export const checkDateFormat = (base_date, i, data) => {
    const date = new Date(base_date);
    const formatted_date =  date.toLocaleDateString("en-US", { day: '2-digit' })+ "-"+
                            date.toLocaleDateString("en-US", { month: 'short' })+ "-" + 
                            date.toLocaleDateString("en-US", { year: '2-digit' })
    const format = new RegExp(/^\d\d-(Jan|Feb|Mar|Apr|May|Jun|July|Aug|Sep|Oct|Nov|Dec)-\d/, 'i')
    let result = {}
    let is_valid = true
    let error_msg;
    let row;
    let errors = []

    data.forEach((item, index) => {
        row = index+3
        if(item[i]){
            if(!format.test(item[i])){
                is_valid = false
                error_msg = "Error at row "+row+". Wrong "+DATE+" format."
                errors.push(error_msg)
            }
            if(item[i].toString()!==formatted_date){
                is_valid = false
                error_msg = "Error at row "+row+". Reporting "+DATE+" is not matching."
                errors.push(error_msg)
            }
        } else {
            if(item.length!==1) {
                is_valid = false
                error_msg = "Error at row "+row+". Empty "+DATE+"."
                errors.push(error_msg)
            }
        }
    })

    result["is_valid"] = is_valid
    result["errors"] = errors

    return result

}

export const checkCCY = (i, data) => {

    let result = {}
    let is_valid = true
    let error_msg;
    let row;
    let errors = []
    const format = new RegExp(/^\d+$/)
    
    data.forEach((item, index) => {
        row = index+3
        if(item[i]){
            if(!format.test(item[i].toString())){
                is_valid = false
                error_msg = "Error at row "+row+". Please provide correct "+CCY_ID+"."
                errors.push(error_msg)
            }
        } else {
            if(item.length!==1) {
                is_valid = false
                error_msg = "Error at row "+row+". Empty "+CCY_ID+"."
                errors.push(error_msg)
            }
        }
    })

    result["is_valid"] = is_valid
    result["errors"] = errors

    return result
}

export const checkFI = (fi, i, data) => {

    let result = {}
    let is_valid = true
    let error_msg;
    let row;
    let errors = []
    const format = new RegExp(/^\d+$/)
    
    data.forEach((item, index) => {
        row = index+3
        if(item[i]){
            if(!format.test(item[i].toString()) || item[i].toString()!==fi){
                is_valid = false
                error_msg = "Error at row "+row+". Please provide correct "+FI_ID+"."
                errors.push(error_msg)
            }
        } else {
            if(item.length!==1) {
                is_valid = false
                error_msg = "Error at row "+row+". Empty "+FI_ID+"."
                errors.push(error_msg)
            }
        }
    })

    result["is_valid"] = is_valid
    result["errors"] = errors

    return result
}

export const checkMeCoa = (i, data) => {

    let result = {}
    let is_valid = true
    let error_msg;
    let row;
    let errors = []
    const format = new RegExp(/^\d+$/)
    
    data.forEach((item, index) => {
        row = index+3
        if(item[i]){
            if(!format.test(item[i].toString())){
                is_valid = false
                error_msg = "Error at row "+row+". Please provide correct "+ME_COA+"."
                errors.push(error_msg)
            }
        } else {
            if(item.length!==1) {
                is_valid = false
                error_msg = "Error at row "+row+". Empty "+ME_COA+"."
                errors.push(error_msg)
            }
        }
    })

    result["is_valid"] = is_valid
    result["errors"] = errors

    return result
}

export const checkAmount = (i, data) => {

    let result = {}
    let is_valid = true
    let error_msg;
    let row;
    let errors = []
    const format = new RegExp(/^-?\d+(\.\d{1,4})?$/)
    
    data.forEach((item, index) => {
        row = index+3
        if(item[i]){
            if(!format.test(item[i].toString())){
                is_valid = false
                error_msg = "Error at row "+row+". Please provide correct "+AMOUNT+"."
                errors.push(error_msg)
            }
        }
    })

    result["is_valid"] = is_valid
    result["errors"] = errors

    return result
}

export const checkExchangeRate = (i, data) => {

    let result = {}
    let is_valid = true
    let error_msg;
    let row;
    let errors = []
    const format = new RegExp(/^\d+(\.\d{1,4})?$/)
    
    data.forEach((item, index) => {
        row = index+3
        if(item[i]){
            if(!format.test(item[i].toString())){
                is_valid = false
                error_msg = "Error at row "+row+". Please provide correct "+EXCHANGE_RATE+"."
                errors.push(error_msg)
            }
        } else {
            if(item.length!==1) {
                is_valid = false
                error_msg = "Error at row "+row+". Empty "+EXCHANGE_RATE+"."
                errors.push(error_msg)
            }
        }
    })

    result["is_valid"] = is_valid
    result["errors"] = errors

    return result
}

export const checkOpenPositionLimit = (i, data) => {

    let result = {}
    let is_valid = true
    let error_msg;
    let row;
    let errors = []
    const format = new RegExp(/^\d+$/)
    
    data.forEach((item, index) => {
        row = index+3
        if(item[i]){
            if(!format.test(item[i].toString())){
                is_valid = false
                error_msg = "Error at row "+row+". Please provide correct "+OPEN_POSITION_LIMIT+"."
                errors.push(error_msg)
            }
        } else {
            if(item.length!==1) {
                is_valid = false
                error_msg = "Error at row "+row+". Empty "+OPEN_POSITION_LIMIT+"."
                errors.push(error_msg)
            }
        }
    })

    result["is_valid"] = is_valid
    result["errors"] = errors

    return result
}

export const basicValidation = (fi, branch, rit, base_date, file) => {

    let is_valid = true
    let data = {}
    let errors = []
    let error_msg = ""

    const file_name = file?.name.toString()
    if(!file_name) {
        is_valid = false
        error_msg = "The file is null"
        // data["not_file"] = error_msg
        errors.push(error_msg)
    }

    const rit_name = rit?.name.toString()
    if(!rit_name) {
        is_valid = false
        error_msg = "RIT could not be loaded."
        // data["not_rit"] = error_msg
        errors.push(error_msg)
    }
    
    const safe_file_format = checkFileFormat(file_name)
    if(!safe_file_format){
        is_valid = false
        error_msg = "File extension is not right."
        // data["file_format"] = error_msg
        errors.push(error_msg)
    }

    const safe_file_name = checkFileName(fi, branch, rit_name, base_date, file_name)
    if(!safe_file_name){
        is_valid = false
        error_msg = "File name format is not right."
        // data["file_name"] = error_msg
        errors.push(error_msg)
    }

    data["is_valid"] = is_valid
    data["errors"] = errors
    return data
    
};