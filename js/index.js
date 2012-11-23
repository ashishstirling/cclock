/**
 * Function to detect if the specified minutes are special minutes
 */
function isSpecialMinutes(minutes) {
    var minutesValue = parseInt(minutes, 10);
    if (minutesValue == 0
        || minutesValue == 1
        || minutesValue == 15
        || minutesValue == 30
        || minutesValue == 45
        || minutesValue == 59) {
        return true;
    }
    return false;
}

/**
 * We are dealing with special minutes
 */
function getSpecialMinutesConversationalValue(minutes) {
    var specialMinutes = new Array();
    specialMinutes["00"] = "";
    specialMinutes["01"] = "just past";
    specialMinutes["15"] = "quarter past";
    specialMinutes["30"] = "half past";
    specialMinutes["45"] = "quarter to";
    specialMinutes["59"] = "nearly";
    return specialMinutes[minutes];
}

/**
 * Function to get conversational value of minutes
 */
function getConversationalValueOfMinutes(minutes) {
    if (isSpecialMinutes(minutes)) {
        return getSpecialMinutesConversationalValue(minutes);
    }
    var minutesValue = parseInt(minutes, 10);
    var returnValue = "";
    
    var tensArray = new Array();
    tensArray[0] = "";
    tensArray[1] = "";
    tensArray[2] = "twenty ";
    tensArray[3] = "thirty ";
    tensArray[4] = "fourty ";
    tensArray[5] = "fifty ";
    var unitsArray = new Array();
    unitsArray[0] = "";
    unitsArray[1] = "one";
    unitsArray[2] = "two";
    unitsArray[3] = "three";
    unitsArray[4] = "four";
    unitsArray[5] = "five";
    unitsArray[6] = "six";
    unitsArray[7] = "seven";
    unitsArray[8] = "eight";
    unitsArray[9] = "nine";
    unitsArray[10] = "ten";
    unitsArray[11] = "eleven";
    unitsArray[12] = "twelve";
    unitsArray[13] = "thirteen";
    unitsArray[14] = "fourteen";
    unitsArray[15] = "fifteen";
    unitsArray[16] = "sixteen";
    unitsArray[17] = "seventeen";
    unitsArray[18] = "eighteen";
    unitsArray[19] = "nineteen";

    var tens = parseInt(minutesValue / 10);
    var units = parseInt(minutesValue % 10);
    if (minutesValue > 19) {
        returnValue = tensArray[tens] + unitsArray[units];
    }
    else {
        returnValue = unitsArray[minutesValue];
    }
    return returnValue;
}

/**
* Function to get conversational value of hours
*/
function getConversationalValueOfHours(hoursValue) {
    var hoursArray = new Array();
    hoursArray[0] = "midnight";
    hoursArray[1] = "one in the morning";
    hoursArray[2] = "two in the morning";
    hoursArray[3] = "three in the morning";
    hoursArray[4] = "four in the morning";
    hoursArray[5] = "five in the morning";
    hoursArray[6] = "six in the morning";
    hoursArray[7] = "seven in the morning";
    hoursArray[8] = "eight in the morning";
    hoursArray[9] = "nine in the morning";
    hoursArray[10] = "ten in the morning";
    hoursArray[11] = "eleven in the morning";
    hoursArray[12] = "twelve in the afternoon";
    hoursArray[13] = "one in the afternoon";
    hoursArray[14] = "two in the afternoon";
    hoursArray[15] = "three in the afternoon";
    hoursArray[16] = "four in the afternoon";
    hoursArray[17] = "five in the afternoon";
    hoursArray[18] = "six in the evening";
    hoursArray[19] = "seven in the evening";
    hoursArray[20] = "eight in the evening";
    hoursArray[21] = "nine in the evening";
    hoursArray[22] = "ten in the evening";
    hoursArray[23] = "eleven in the night";
    return hoursArray[hoursValue];
}

/**
* Function to get conversational value of input time
*/
function getConversationalValue(time) {
    var timeArray = time.split(":");
    var hours = timeArray[0];
    var hoursValue = parseInt(hours, 10);
    var minutes = timeArray[1];
    var minutesValue = parseInt(minutes, 10);
    var conversationalValue = "";
    if (minutesValue > 30 && isSpecialMinutes(minutes)) {
        conversationalValue = getConversationalValueOfMinutes(minutes)
            + " " + getConversationalValueOfHours((hoursValue + 1) % 24);
    }
    else if (isSpecialMinutes(minutesValue)) {
        conversationalValue = getConversationalValueOfMinutes(minutes)
            + " " + getConversationalValueOfHours(hoursValue);
    }
    else {
        conversationalValue = getConversationalValueOfMinutes(minutes)
            + " minutes past " + getConversationalValueOfHours(hoursValue);
    }
    return conversationalValue;
}

/**
 * Function to check if an input field is empty
 */
function isEmpty(input) {
    if (input == undefined || input == null || input == "") {
        return true;
    }
    return false;
}

/**
 * Function to check if an input field is a valid time
 */
function isValidTime(input) {
    if (/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(input)) {
        return true;
    }
    return false;
}

/**
 * Function to clear errors on the front-end
 */
function clearError() {
    $('#timeInputError').val("");
}

/**
 * Function to display errors
 * This function will also clear the output
 */
function displayError(errorMessage) {
    $('#timeInputError').html(errorMessage);
    $('#timeOutput').html("");
}

/**
 * Function to display output
 */
function displayOutput(outputMessage) {
    $('#timeOutput').html(outputMessage);
}

$(function(){

    $('#timeInput').keypress(function(e) {
        if(e.keyCode == 13) {
            $('#timeSubmit').click();
        }
    });

    $('#timeSubmit').click(function(e) {
        clearError();
        // Get the value of timeInput field
        var timeInput = $('#timeInput').val();
        // Validate required input
        if (isEmpty(timeInput)) {
            displayError("Time is a required field.");
        }
        else {
            // Validate format
            if (!isValidTime(timeInput)) {
                displayError("Time is invalid");
            }
            // Find and display conversational value of input time
            else {
                displayOutput(getConversationalValue(timeInput));
            }
        }
    });
    
    // Display field as time picker
    $('#timeInput').timePicker({
        show24Hours: true,
        step: 15
    });
 
});