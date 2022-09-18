function reverseDate(date) {
    return date.split("").reverse().join("")
}

function palidromeChecker(str) {

    var reverse = reverseDate(str)
    if (str == reverse) {
        return true;
    }
    return false
}

function dateToString(date) {

    var dateStr = {
        day: "",
        month: "",
        year: ""
    }
    if (date.day < 10) {
        dateStr.day = '0' + date.day
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllFormatDates(date) {
    var dateStr = dateToString(date)

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2)
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]

}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllFormatDates(date)
    var isPalindrome = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (palidromeChecker(listOfPalindromes[i])) {

            isPalindrome = true;
            break;
        }
    }
    return isPalindrome;
}

function isLeapYear(year) {
    if ((year % 400 === 0) || ((year % 100 != 0) && (year % 4 === 0))) {


        return true
    }
    return false
}


function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;


    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;

                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++
            }
        }
    } else {
        if (day > daysInMonths[month - 1]) {
            day = 1;
            month = month + 1;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getPrevDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;


    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (month === 3) {
        if (isLeapYear(year)) {
            if (day === 0) {
                day = 29;

                month--;
            }
        } else {
            if (day === 0) {
                day = 28;
                month--
            }
        }
    } else {
        if (day === 0) {
            month--;
            day = daysInMonths[month - 1]
        }
    }
    if (month === 0) {
        month = 12;
        year--;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;

        }
        nextDate = getNextDate(nextDate)


    }
    return [ctr, nextDate];
}

function getPreviousPalindromeDate(date) {
    var ctr = 0;
    var prevDate = getPrevDate(date);
    while (1) {
        ctr--;
        var isPalindrome = checkPalindromeForAllDateFormats(prevDate);
        if (isPalindrome) {
            break;
        }
        prevDate = getPrevDate(prevDate);
    }
    return [ctr, prevDate];
}

function getNearestDate(nextDate, prevDate) {
    if (nextDate[0] < Math.abs(prevDate[0])) {
        return nextDate;
    }
    return prevDate;
}
var dateInput = document.querySelector(".date-input")
var showBtn = document.querySelector("#date-btn")
var output = document.querySelector("#output")

function clickHandler(e) {

    var bdayStr = dateInput.value;
    if (bdayStr !== '') {
        var listOfDate = bdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])

        }
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if (isPalindrome) {
            output.innerText = "Yesss!! It is a Palindrome"
        } else {
            var [ctr, palindromeDate] = getNearestDate(getNextPalindromeDate(date), getPreviousPalindromeDate(date));
            if (ctr < 0) {
                output.innerText=`Nooo!!! 🙄 Your birthday is not a palindrome. The nearest palindrome date is ${palindromeDate.day}-${palindromeDate.month}-${palindromeDate.year}, which is  ${Math.abs(ctr)} days before your birthday`
            } else {
                output.innerText=`Nooo!!! 🙄 Your birthday is not a palindrome. The nearest palindrome date is ${palindromeDate.day}-${palindromeDate.month}-${palindromeDate.year}, which is ${Math.abs(ctr)} days after your birthday`
            }

        }
    } else {
        output.innerText=`Please enter your date of birth`
    }
}


showBtn.addEventListener("click", clickHandler)


