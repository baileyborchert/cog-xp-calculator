/* Calculate difference between total xp needed and the xp a user currently has,
which will be inputted through an HTML form */
const calculateXpDifference = (xpTotal, xpHas) => xpTotal - xpHas;

class CogHQ {
    constructor(facilityName, xpName, xpAmount, maxNeeded) {
        this._facilityName = facilityName;
        this._xpName = xpName;
        this._xpAmount = xpAmount;
        this._maxNeeded = maxNeeded;
    }

    // Returns an array of objects that each represent a facility of the Cog HQ
    get xpAmountArray() {
        return Object.values(this._xpAmount);
    }

    /* Gets a specific xp amount based on index in xpAmountArray.
    This will return a number if the xp amount is static,
    and an array of a min & max number otherwise. */
    getXpAmountByIndex(index) {
        return Object.values(this._xpAmount[index])[0];
    }

    getFacilityNameByIndex(index) {
        return Object.keys(this._xpAmount[index])[0];
    }

    /* Uses getXpAmountByIndex() to see if this Cog HQ rewards
    a static xp amount (number value) for each facility */
    checkIfStaticXpAmount() {
        return (typeof this.getXpAmountByIndex(0) == 'number' ? true : false);
    }

    // Validates user input for XP needed, which should be greater than 0 and less than the Cog HQ's max
    validateXpInput(xpNeeds) {
        return (xpNeeds > 0 && xpNeeds <= this._maxNeeded ? true : false);
    }

    /* Takes needed xp (input by user) and returns how
    many of each facility they need to grind the xp */
    calculateFacilities(xpNeeds) {
        if (this.validateXpInput(xpNeeds) == true) {
            if (this.checkIfStaticXpAmount() == true) {
                // While xp needed is greater than what the second-highest facility rewards
                this.xpAmountArray.map((element, index) => {
                    // not currently working:
                    // while (xpNeeds > this.getXpAmountByIndex(index + 1)) {
                    //     element += 1;
                    //     xpNeeds -= this.getXpAmountByIndex(index);
                    //    return console.log(this.getXpAmountByIndex(index + 1));
                    // }
                    console.log('Yay static xp');
                });
            } else {
                // Cashbot logic goes here
                console.log('Yay Cashbot HQ');
            }
        }
        else {
            throw new Error('Your input is invalid. Don\'t be a turkey!');
        }
    }
}

// Create an CogHQ object for each Cog type
const Sellbot = new CogHQ('Factory', 'Merit', [{long: 776}, {short: 480}], 5500);
const Cashbot = new CogHQ('Mint', 'Cogbuck', [{Bullion: [1202, 1496]}, {Dollar: [679, 1004]}, {Coin: [356, 544]}], 8900);
const Lawbot = new CogHQ('Office', 'Jury Notice', [{D: 1842}, {C: 1370}, {B: 944}, {A: 564}], 14400);
const Bossbot = new CogHQ('golf course', 'Stock Option', [{'Back Nine': 3300}, {'Middle Six': 1984}, {'Front Three': 764}], 23300);

// Old code below this line
// --------------------------------------------------------------------------
function calculateInstances (cog_type, xpNeeds) {
    if (cog_type == "sellbot") {
        var longs = 0;
        var shorts = 0;

        while (xpNeeds > 480) {
            longs += 1;
            xpNeeds -= 776;
        }
        if (xpNeeds > 0) {
            shorts = 1;
            xpNeeds -= 480;
        }

        return [longs, shorts];
    }
    /* Cashbot is a special case, due to the instances not rewarding a consistent amount of xp each run.
    Because of this, the program cannot guarantee an exact # and uses the given xp range to offer both min and max possibly needed. */
    else if (cog_type == "cashbot") {
        /* Storing the original value of needed XP so we can use it again later */
        xpNeedsCopy = xpNeeds;

        /* Calculating the MIN # of instances needed by using the MAX # of xp per instance */
        var bullionsMin = 0;
        var dollarsMin = 0;
        var coinsMin = 0;


        while (xpNeeds > 1004) {
            bullionsMin += 1;
            xpNeeds -= 1496;
        }
        if (xpNeeds > 544) {
            dollarsMin = 1;
            xpNeeds -= 1004;
        }
        else if (xpNeeds > 0) {
            coinsMin = 1;
            xpNeeds -= 544;
        }

        /* Changing the value of needed XP back to the original parameter passed into the function */
        xpNeeds = xpNeedsCopy;

        /* Calculating the MAX # of instances needed by using the MIN # of xp per instance */
        var bullionsMax = 0;
        var dollarsMax = 0;
        var coinsMax = 0;
        
        while (xpNeeds > 679) {
            bullionsMax += 1;
            xpNeeds -= 1202;
        }
        if (xpNeeds > 356) {
            dollarsMax = 1;
            xpNeeds -= 679;
        }
        else if (xpNeeds > 0) {
            coinsMax = 1;
            xpNeeds -= 356;
        }

        return [bullionsMin, bullionsMax, dollarsMin, dollarsMax, coinsMin, coinsMax];
    }
    else if (cog_type == "lawbot") {
        var officeD = 0;
        var officeC = 0;
        var officeB = 0;
        var officeA = 0;

        while (xpNeeds > 1370) {
            officeD += 1;
            xpNeeds -= 1842;
        }
        if (xpNeeds > 944) {
            officeC = 1;
            xpNeeds -= 1370;
        }
        else if (xpNeeds > 564) {
            officeB = 1;
            xpNeeds -= 944;
        }
        else if (xpNeeds > 0) {
            officeA = 1;
            xpNeeds -= 564;
        }

        return [officeD, officeC, officeB, officeA];
    }
    else if (cog_type == "bossbot") {
        var backNines = 0;
        var middleSixes = 0;
        var frontThrees = 0;

        while (xpNeeds > 1874) {
            backNines += 1;
            xpNeeds -= 3350;
        }
        if (xpNeeds > 764) {
            middleSixes = 1;
            xpNeeds -= 1874;
        }
        else if (xpNeeds > 0) {
            frontThrees = 1;
            xpNeeds -= 764;
        }

        return [backNines, middleSixes, frontThrees];
    }
}