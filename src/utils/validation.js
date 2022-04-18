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
        let check_result;
        if (COLUMNS.DATE.includes(column)) {
          check_result = checkReportingDate(
            column,
            base_date,
            index,
            validate_data
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.OTHER_DATE_NOT_EMPTY.includes(column)) {
          check_result = checkDateNotEmpty(column, index, validate_data);
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.OTHER_DATE_EMPTY.includes(column)) {
          check_result = checkDateEmpty(column, index, validate_data);
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.CCY.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["currency"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.FI.includes(column)) {
          check_result = checkFI(
            column,
            user.financial_institute.id,
            index,
            validate_data
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.FI_BRANCH.includes(column)) {
          check_result = checkFiBranch(
            column,
            index,
            validate_data,
            validation_data["branches"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.FACILITY_TYPE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["FACILITY_TYPE"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.COA.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["coa"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.DECIMAL_EMPTY.includes(column)) {
          check_result = checkDecimalEmpty(column, index, validate_data);
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.DECIMAL_NOT_EMPTY.includes(column)) {
          check_result = checkDecimalNotEmpty(column, index, validate_data);
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.INTEGER_EMPTY.includes(column)) {
          check_result = checkIntegerEmpty(column, index, validate_data);
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.INTEGER_NOT_EMPTY.includes(column)) {
          check_result = checkIntegerNotEmpty(column, index, validate_data);
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.TEXT_EMPTY.includes(column)) {
          check_result = checkTextEmpty(column, index, validate_data);
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.TEXT_NOT_EMPTY.includes(column)) {
          check_result = checkTextNotEmpty(column, index, validate_data);
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.ECO_SECTOR.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["eco_sector"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.ECO_PURPOSE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["eco_purpose"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.PRODUCT_TYPE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["product_type"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.INSTRUMENT_TYPE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["instrument_type"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.INVESTOR_ID.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["investor"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.SECURITY_CODE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["security_code"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.INVESTOR_CHANNEL.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["investor_channel"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.COMPANY.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["company"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.ENTERPRISE_TYPE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["enterprise_type"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.SECTOR_MAJOR_ACTIVITIES.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["sector_major_activities"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.COUNTRY.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["country"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.PRODUCT_CODE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["product_code"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.PAYREC_PURPOSE.includes(column)) {
          check_result = checkDynamicEmptyValidation(
            column,
            index,
            validate_data,
            validation_data["payrec_purpose"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.UNIT_OF_MEASURE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["unit_of_measure"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.REP_TYPE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["rep_type"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.SCHEDULED_CODE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["scheduled_code"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.TYPE_CODE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["type_code"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.COMMODITY.includes(column)) {
          check_result = checkDynamicEmptyValidation(
            column,
            index,
            validate_data,
            validation_data["commodity"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.LEGAL_FORM_OF_ENTERPRISE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["legal_form_of_enterprise"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.ENTERPRISE_LOCATION.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["enterprise_location"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.FELLOW_ENTERPRISE_LOCATION.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["fellow_enterprise_location"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.COMMON_PARENT_LOCATION.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["common_parent_location"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.INSTRUMENT_CLASSIFICATION.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["instrument_classification"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.CREDITOR_TYPE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["creditor_type"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.SME_CATEGORY.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["sme_category"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.SME_SUB_CATEGORY.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["sme_sub_category"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.LOAN_SEGREGATION.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["loan_segregation"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.ACCOUNT_NUMBER.includes(column)) {
          check_result = checkDynamicTextValidation(
            column,
            index,
            validate_data,
            validation_data["account_number"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.GENDER_CODE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["gender_code"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.INDUSTRY_SCALE_ID.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["industry_scale_id"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.COLLATERAL_ID.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["collateral_id"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.LOAN_CLASS_ID.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["loan_class_id"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.FREQUENCY_INDICATOR_CODE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["freq_ind_code"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.DEBIT_CREDIT_INDICATOR_CODE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["debit_card_ind_code"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.BANKING_CLASS.includes(column)) {
          check_result = checkDynamicTextValidation(
            column,
            index,
            validate_data,
            validation_data["banking_class"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.AGING_RANGE_ID.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["aging_range_id"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.ACCOUNT_TYPE_CODE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["account_type_code"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.REPORTING_AREA.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["reporting_area"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.LAWSUIT_TYPE_CODE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["lawsuit_type_code"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.CASE_TYPE_CODE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["case_type_code"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.FI_LIST.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["fis"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.PERSPECTIVE_CODE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["perspective_code"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.TRANSACTION_TYPE.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["transaction_type"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else if (COLUMNS.LOAN_STATUS.includes(column)) {
          check_result = checkDynamicValidation(
            column,
            index,
            validate_data,
            validation_data["loan_status"]
          );
          if (!check_result.is_valid) {
            is_valid = false;
            error_list.push(...check_result.errors);
          }
        } else {
          if (column.length !== 0) {
            const except_list = [
              "Figure indication",
              "Data category",
              "Field Description",
              "ISLAMIC",
            ];
            if (!except_list.includes(column)) {
              is_valid = false;
              let error = column + " column not found in the validation list.";
              error_list.push(error);
            }
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

export const getDecimalRegex = () => new RegExp(/^-?\d+(\.\d{1,16})?$/);
export const getIntegerRegex = () => new RegExp(/^\d+$/);
export const getTextRegex = () => new RegExp(/\w/g, "i");
export const getDateRegex = () =>
  new RegExp(
    /^\d?\d-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d/,
    "i"
  );

export const checkDecimalEmpty = (column, i, data) => {
  console.log("checking " + column + "...");
  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let errors = [];
  // const format = new RegExp(/^-?\d+(\.\d{1,6})?$/);
  const format = getDecimalRegex();

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
  // const format = new RegExp(/^\d+(\.\d{1,6})?$/);
  const format = getDecimalRegex();

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

export const checkIntegerEmpty = (column, i, data) => {
  console.log("checking " + column + "...");
  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let errors = [];
  // const format = new RegExp(/^\d+$/);
  const format = getIntegerRegex();

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

export const checkIntegerNotEmpty = (column, i, data) => {
  console.log("checking " + column + "...");
  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let errors = [];
  // const format = new RegExp(/^\d+$/);
  const format = getIntegerRegex();

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

export const checkTextEmpty = (column, i, data) => {
  console.log("checking " + column + "...");
  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let errors = [];
  // const format = new RegExp(/\w/g, "i");
  const format = getTextRegex();

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

export const checkTextNotEmpty = (column, i, data) => {
  console.log("checking " + column + "...");
  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let errors = [];
  // const format = new RegExp(/\w/g, "i");
  const format = getTextRegex();

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

export const checkReportingDate = (column, base_date, i, data) => {
  console.log("checking " + column + "...");
  const date = new Date(base_date);
  const formatted_date =
    date.toLocaleDateString("en-US", { day: "2-digit" }) +
    "-" +
    date.toLocaleDateString("en-US", { month: "short" }) +
    "-" +
    date.toLocaleDateString("en-US", { year: "2-digit" });
  // const format = new RegExp(
  //   /^\d?\d-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d/,
  //   "i"
  // );
  const format = getDateRegex();

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

export const checkDateNotEmpty = (column, i, data) => {
  console.log("checking " + column + "...");

  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let errors = [];

  // const format = new RegExp(
  //   /^\d?\d-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d/,
  //   "i"
  // );

  const format = getDateRegex();

  data.forEach((item, index) => {
    row = index + 3;
    if (item[i]) {
      if (!format.test(item[i])) {
        is_valid = false;
        error_msg = "Error at row " + row + ". Wrong " + column + " format.";
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

export const checkDateEmpty = (column, i, data) => {
  console.log("checking " + column + "...");

  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let errors = [];

  // const format = new RegExp(
  //   /^\d?\d-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d/,
  //   "i"
  // );

  const format = getDateRegex();

  data.forEach((item, index) => {
    row = index + 3;
    if (item[i]) {
      if (!format.test(item[i])) {
        is_valid = false;
        error_msg = "Error at row " + row + ". Wrong " + column + " format.";
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
  const format = getIntegerRegex();

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

export const checkDynamicEmptyValidation = (
  column,
  i,
  data,
  validation_data
) => {
  console.log("checking " + column + "...");
  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let errors = [];
  const format = getIntegerRegex();

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
    }
  });

  result["is_valid"] = is_valid;
  result["errors"] = errors;

  return result;
};

export const checkDynamicTextValidation = (
  column,
  i,
  data,
  validation_data
) => {
  console.log("checking " + column + "...");
  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let errors = [];
  const format = getTextRegex();

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

  const format = getIntegerRegex();

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

export const checkFiBranch = (column, i, data, validation_data) => {
  console.log("checking " + column + "...");
  let result = {};
  let is_valid = true;
  let error_msg;
  let row;
  let errors = [];
  validation_data.push(9999);
  const format = getIntegerRegex();

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
