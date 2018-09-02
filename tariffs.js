
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

var BCN_price = {
    t1: {
        'start': 2.15,
        'km': 1.13,
        'hour': 22.1
    },
    t2: {
        'start': 2.15,
        'km': 1.34,
        'hour': 22.4
    },
    t3: {
        'start': 2.3,
        'km': 1.4,
        'hour': 22.4
    }
};

var TARIFFS = {
    'BCN': {
        'holidays': BCN_holidays,
        'weekdays': BCN_weekdays,
        'price': BCN_price
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


/*
    Returns duration of path in minutes.
 */
function get_duration(start_point, end_point) {
    // TODO: Call Google Maps API.
    return 10;
}

/*
    Returns distance in km.
 */
function get_distance(start_point, end_point) {
    return 10;
}

/*
    Returns the week day of a date. 0 and 7 are for Sunday, 1 to 6 are for Monday, Tuesday, etc.
 */
function get_week_day(start_date) {
    return start_date.getDay();
}

function get_cost(city, tariff, duration, distance) {
    var tariff_cost = TARIFFS[city]['price'][tariff];

    return 0.0 + tariff_cost['start'] + tariff_cost['km'] * distance + tariff_cost['hour'] * duration / 60 ;
}

function cost(city, start_date, is_holiday, start_point, end_point) {

    var distance = get_distance(start_point, end_point);
    var duration = get_duration(start_point, end_point);
    var week_day = get_week_day(start_date);

    var tariff = get_tariff(city, week_day, start_date.getHours(), is_holiday);

    var cost = get_cost(city, tariff, duration, distance);

    return cost;
}

console.log("tarif for monday at 7: %s", get_tariff('BCN', 1, 7, false));

var startDate = new Date(2018, 0, 2, 7);

console.log("cost for week_day %s on %s: %s", startDate.getDay(), startDate.toString(),
    cost('BCN', startDate, false, null, null));

console.log("tarif for monday at 19: %s", get_tariff('BCN', 1, 19, false));
console.log("cost for tuesday 2/1/2018 at 19: %s", cost('BCN', new Date(2018, 0, 2, 19), false, null, null));

console.log("tarif for friday at 10: %s", get_tariff('BCN', 5, 10, false));
console.log("tarif for friday at 20: %s", get_tariff('BCN', 5, 20, false));
console.log("tarif for saturday at 10: %s", get_tariff('BCN', 6, 10, false));
console.log("tarif for saturday at 20: %s", get_tariff('BCN', 6, 20, false));
console.log("tarif for sunday at 10: %s", get_tariff('BCN', 7, 10, false));
console.log("tarif for sunday at 20: %s", get_tariff('BCN', 7, 20, false));

startDate = new Date(2018, 1, 2, 19);
console.log("cost for week_day %s on %s at 19: %s", cost('BCN', startDate, false, null, null));
