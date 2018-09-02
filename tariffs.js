
var BCN_holidays = {
    t1: null,
    t2: [[6, 19]],
    t3: [[0, 5], [20, 23]]
};


var BCN_weekdays = {
    1: {
        t1: [[8, 19]],
        t2: [[0, 7], [20, 23]],
        t3: null
    },
    2: {
        t1: [[8, 19]],
        t2: [[0, 7], [20, 23]],
        t3: null
    },
    3: {
        t1: [[8, 19]],
        t2: [[0, 7], [20, 23]],
        t3: null
    },
    4: {
        t1: [[8, 19]],
        t2: [[0, 7], [20, 23]],
        t3: null
    },
    5: {
        t1: [[8, 19]],
        t2: [[0, 7], [20, 23]],
        t3: null
    },
    6: {
        t1: null,
        t2: [[6, 19]],
        t3: [[0, 5], [20, 23]]
    },
    7: {
        t1: null,
        t2: [[6, 19]],
        t3: [[0, 5], [20, 23]]
    }
};

var TARIFFS = {
    'BCN': {
        'holidays': BCN_holidays,
        'weekdays': BCN_weekdays
    },
    'MAD': {
        'holidays': null,
        'weekdays': null
    }
};


function get_tariff(city, week_day, start_time, is_holiday) {

    var tariffs = [], result_tariff = -1;

    if (TARIFFS.hasOwnProperty(city)){
        tariffs = TARIFFS[city];
    } else {
        return 0;
    }
    if (is_holiday) {
        tariffs = tariffs['holidays'];
    } else {
        tariffs = tariffs['weekdays'][week_day];
    }
    // console.log("Applying tariffs ", tariffs);

    var found;
    for (var tariff in tariffs) {

        if (!tariffs.hasOwnProperty(tariff)) {
            continue;
        }
        var time_ranges = tariffs[tariff];
        if (time_ranges !== null) {
            found = false;
            for (var j = 0; !found && j < time_ranges.length; j++) {
                found = (start_time >= time_ranges[j][0] && start_time <= time_ranges[j][1]);
            }
            if (found) {
                result_tariff = tariff;
                break;
            } else {
                // console.log("No match found in tariff %s for week_day %s at %s", tariff, week_day, start_time);
            }
        }
    }

    return result_tariff;
}


console.log("tarif for monday at 7: %s", get_tariff('BCN', 1, 7, false));
console.log("tarif for monday at 10: %s", get_tariff('BCN', 1, 10, false));
console.log("tarif for friday at 10: %s", get_tariff('BCN', 5, 10, false));
console.log("tarif for friday at 20: %s", get_tariff('BCN', 5, 20, false));
console.log("tarif for saturday at 10: %s", get_tariff('BCN', 6, 10, false));
console.log("tarif for saturday at 20: %s", get_tariff('BCN', 6, 20, false));
console.log("tarif for sunday at 10: %s", get_tariff('BCN', 7, 10, false));
console.log("tarif for sunday at 20: %s", get_tariff('BCN', 7, 20, false));