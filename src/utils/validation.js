import { COLUMNS } from "./validationColumns";
import Papa from "papaparse";

export const dataValidation = async (
  user,
  _file,
  base_date,
  selected_rit,
  validation_data,
  callback
) => {
  let result = {};
  let is_valid = true;
  let error_list = [];

  Papa.parse(_file, {
    complete: function (results) {
      const data = results.data;

      let first_column_result = firstColumnValidate(
        user.financial_institute.id,
        user.branch.id,
        selected_rit,
        data[0]
      );
      if (!first_column_result.is_valid) {
        is_valid = false;
        error_list.push(...first_column_result.errors);
      }

      const columns = data[1];
      const validate_data = data.slice(2, data.length + 1);
      columns.forEach((element, index) => {
        let column = element.toString().trim();
        if (COLUMNS.DATE.includes(column)) {
          const date_result = checkDateFormat(
            column,
            base_date,
            index,
            validate_data
          );
          if (!date_result.is_valid) {
            is_valid = false;
            error_list.push(...date_result.errors);
          }
        } else if (COLUMNS.CCY.includes(column)) {
          const ccy_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["currency"]
          );
          if (!ccy_result.is_valid) {
            is_valid = false;
            error_list.push(...ccy_result.errors);
          }
        } else if (COLUMNS.FI.includes(column)) {
          const fi_result = checkFI(
            column,
            user.financial_institute.id,
            index,
            validate_data
          );
          if (!fi_result.is_valid) {
            is_valid = false;
            error_list.push(...fi_result.errors);
          }
        } else if (COLUMNS.FACILITY_TYPE.includes(column)) {
          const ccy_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["FACILITY_TYPE"]
          );
          if (!ccy_result.is_valid) {
            is_valid = false;
            error_list.push(...ccy_result.errors);
          }
        } else if (COLUMNS.COA.includes(column)) {
          const mecoa_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["coa"]
          );
          if (!mecoa_result.is_valid) {
            is_valid = false;
            error_list.push(...mecoa_result.errors);
          }
        } else if (COLUMNS.DECIMAL_EMPTY.includes(column)) {
          const decimal_empty_result = checkDecimalEmpty(
            column,
            index,
            validate_data
          );
          if (!decimal_empty_result.is_valid) {
            is_valid = false;
            error_list.push(...decimal_empty_result.errors);
          }
        } else if (COLUMNS.DECIMAL_NOT_EMPTY.includes(column)) {
          const decimal_not_empty_result = checkDecimalNotEmpty(
            column,
            index,
            validate_data
          );
          if (!decimal_not_empty_result.is_valid) {
            is_valid = false;
            error_list.push(...decimal_not_empty_result.errors);
          }
        } else if (COLUMNS.INTEGER_NOT_EMPTY.includes(column)) {
          const integer_not_empty_result = checkIntegerNotEmpty(
            column,
            index,
            validate_data
          );
          if (!integer_not_empty_result.is_valid) {
            is_valid = false;
            error_list.push(...integer_not_empty_result.errors);
          }
        } else {
          if (column.length !== 0) {
            is_valid = false;
            let error = column + " column not found in the validation list.";
            error_list.push(error);
          }
        }
      });
      result["is_valid"] = is_valid;
      result["errors"] = error_list;

      callback(result);
    },
  });
};

export const basicValidation = (fi, branch, rit, base_date, file) => {
  console.log("checking basic validation...");
  let is_valid = true;
  let data = {};
  let errors = [];
  let error_msg = "";

  const file_name = file?.name.toString();
  if (!file_name) {
    is_valid = false;
    error_msg = "The file is null";
    // data["not_file"] = error_msg
    errors.push(error_msg);
  }

  const rit_name = rit?.name.toString();
  if (!rit_name) {
    is_valid = false;
    error_msg = "RIT could not be loaded.";
    // data["not_rit"] = error_msg
    errors.push(error_msg);
  }

  const safe_file_format = checkFileFormat(file_name);
  if (!safe_file_format) {
    is_valid = false;
    error_msg = "File extension is not right.";
    // data["file_format"] = error_msg
    errors.push(error_msg);
  }

  const safe_file_name = checkFileName(
    fi,
    branch,
    rit_name,
    base_date,
    file_name
  );
  if (!safe_file_name) {
    is_valid = false;
    error_msg = "File name format is not right.";
    // data["file_name"] = error_msg
    errors.push(error_msg);
  }

  data["is_valid"] = is_valid;
  data["errors"] = errors;
  return data;
};

const checkFileFormat = (file_name) => {
  const name = file_name.toString().split(".");

  if (name && Array.isArray(name) && name.length > 0) {
    const ext = name.pop();
    return ext === "csv" ? true : false;
  }

  return false;
};

const checkFileName = (fi, branch, rit, base_date, name) => {
  const date = base_date.split("-").join("");
  const template =
    rit + "." + fi.toString() + "." + branch.toString() + "." + date;
  let formatted_name = name.toString().split(".");
  formatted_name.pop();
  const file_name = formatted_name.join(".");

  return file_name === template;
};

export const firstColumnValidate = (fi, branch, rit, data) => {
  console.log("checking First Column...");
  let result = {};
  let errors = [];
  let error_msg;
  let is_valid = true;

  const rit_code = data[1].toString() === rit.code.toString();
  if (!rit_code) {
    is_valid = false;
    error_msg = "Error at row 1. Wrong RIT code in the file.";
    result["rit_code"] = error_msg;
    errors.push(error_msg);
  }

  const rit_name = data[2].toString() === rit.name.toString();
  if (!rit_name) {
    is_valid = false;
    error_msg = "Error at row 1. Wrong RIT name in the file.";
    result["rit_name"] = error_msg;
    errors.push(error_msg);
  }

  const rit_version = data[3].toString() === rit.version.toString();
  if (!rit_version) {
    is_valid = false;
    error_msg = "Error at row 1. Wrong RIT version in the file.";
    result["rit_version"] = error_msg;
    errors.push(error_msg);
  }

  const rit_frequency = data[4].toString() === rit.frequency.toString()[0];
  if (!rit_frequency) {
    is_valid = false;
    error_msg = "Error at row 1. Wrong RIT frequency in the file.";
    result["rit_version"] = error_msg;
    errors.push(error_msg);
  }

  const fi_code = data[6].toString() === fi.toString();
  if (!fi_code) {
    is_valid = false;
    error_msg = "Error at row 1. Wrong financial institution code in the file.";
    result["fi_code"] = error_msg;
    errors.push(error_msg);
  }

  const branch_code = data[7].toString() === branch.toString();
  if (!branch_code) {
    is_valid = false;
    error_msg = "Error at row 1. Wrong branch code in the file.";
    result["branch_code"] = error_msg;
    errors.push(error_msg);
  }

  result["is_valid"] = is_valid;
  result["errors"] = errors;

  return result;
};

export const checkDecimalEmpty = (column, i, data) => {
  console.log("checking " + column + "...");
  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let errors = [];
  const format = new RegExp(/^-?\d+(\.\d{1,4})?$/);

  data.forEach((item, index) => {
    row = index + 3;
    if (item[i]) {
      if (!format.test(item[i].toString())) {
        is_valid = false;
        error_msg =
          "Error at row " + row + ". Please provide correct " + column + ".";
        errors.push(error_msg);
      }
    }
  });

  result["is_valid"] = is_valid;
  result["errors"] = errors;

  return result;
};

export const checkDecimalNotEmpty = (column, i, data) => {
  console.log("checking " + column + "...");
  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let errors = [];
  const format = new RegExp(/^\d+(\.\d{1,4})?$/);

  data.forEach((item, index) => {
    row = index + 3;
    if (item[i]) {
      if (!format.test(item[i].toString())) {
        is_valid = false;
        error_msg =
          "Error at row " + row + ". Please provide correct " + column + ".";
        errors.push(error_msg);
      }
    } else {
      if (item.length !== 1) {
        is_valid = false;
        error_msg = "Error at row " + row + ". Empty " + column + ".";
        errors.push(error_msg);
      }
    }
  });

  result["is_valid"] = is_valid;
  result["errors"] = errors;

  return result;
};

export const checkIntegerNotEmpty = (column, i, data) => {
  console.log("checking " + column + "...");
  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let errors = [];
  const format = new RegExp(/^\d+$/);

  data.forEach((item, index) => {
    row = index + 3;
    if (item[i]) {
      if (!format.test(item[i].toString())) {
        is_valid = false;
        error_msg =
          "Error at row " + row + ". Please provide correct " + column + ".";
        errors.push(error_msg);
      }
    } else {
      if (item.length !== 1) {
        is_valid = false;
        error_msg = "Error at row " + row + ". Empty " + column + ".";
        errors.push(error_msg);
      }
    }
  });

  result["is_valid"] = is_valid;
  result["errors"] = errors;

  return result;
};

export const checkDateFormat = (column, base_date, i, data) => {
  console.log("checking Date Format...");
  const date = new Date(base_date);
  const formatted_date =
    date.toLocaleDateString("en-US", { day: "2-digit" }) +
    "-" +
    date.toLocaleDateString("en-US", { month: "short" }) +
    "-" +
    date.toLocaleDateString("en-US", { year: "2-digit" });
  const format = new RegExp(
    /^\d?\d-(Jan|Feb|Mar|Apr|May|Jun|July|Aug|Sep|Oct|Nov|Dec)-\d/,
    "i"
  );
  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let errors = [];

  data.forEach((item, index) => {
    row = index + 3;
    if (item[i]) {
      if (!format.test(item[i])) {
        is_valid = false;
        error_msg = "Error at row " + row + ". Wrong " + column + " format.";
        errors.push(error_msg);
      }
      const item_date = new Date(item[i]);
      const item_formatted_date =
        item_date.toLocaleDateString("en-US", { day: "2-digit" }) +
        "-" +
        item_date.toLocaleDateString("en-US", { month: "short" }) +
        "-" +
        item_date.toLocaleDateString("en-US", { year: "2-digit" });
      if (formatted_date !== item_formatted_date) {
        is_valid = false;
        error_msg = "Error at row " + row + ". " + column + " is not matching.";
        errors.push(error_msg);
      }
    } else {
      if (item.length !== 1) {
        is_valid = false;
        error_msg = "Error at row " + row + ". Empty " + column + ".";
        errors.push(error_msg);
      }
    }
  });

  result["is_valid"] = is_valid;
  result["errors"] = errors;

  return result;
};

export const checkDynamicValidation = (column, i, data, validation_data) => {
  console.log("checking " + column + "...");
  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let errors = [];
  const format = new RegExp(/^\d+$/);

  data.forEach((item, index) => {
    row = index + 3;
    if (item[i]) {
      if (!format.test(item[i].toString())) {
        is_valid = false;
        error_msg =
          "Error at row " + row + ". Please provide correct " + column + ".";
        errors.push(error_msg);
      }
      if (validation_data.length > 0) {
        if (!validation_data.includes(parseInt(item[i]))) {
          is_valid = false;
          error_msg =
            "Error at row " + row + ". Please provide correct " + column + ".";
          errors.push(error_msg);
        }
      }
    } else {
      if (item.length !== 1) {
        is_valid = false;
        error_msg = "Error at row " + row + ". Empty " + column + ".";
        errors.push(error_msg);
      }
    }
  });

  result["is_valid"] = is_valid;
  result["errors"] = errors;

  return result;
};

export const checkFI = (column, fi, i, data) => {
  console.log("checking FI...");
  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let d_fi;
  let errors = [];
  const format = new RegExp(/^\d+$/);
  data.forEach((item, index) => {
    row = index + 3;
    d_fi = item[i];
    if (d_fi) {
      if (!format.test(d_fi.toString()) || d_fi.toString() !== fi.toString()) {
        is_valid = false;
        error_msg =
          "Error at row " + row + ". Please provide correct " + column + ".";
        errors.push(error_msg);
      }
    } else {
      if (item.length !== 1) {
        is_valid = false;
        error_msg = "Error at row " + row + ". Empty " + column + ".";
        errors.push(error_msg);
      }
    }
  });

  result["is_valid"] = is_valid;
  result["errors"] = errors;

  return result;
};
