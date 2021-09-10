/* Calculate difference between total xp needed and the xp a user currently has,
which will be inputted through an HTML form */
const calculateXpDifference = (xpTotal, xpHas) => xpTotal - xpHas;

class CogHQ {
    constructor(instanceName, xpName, xpAmount, maxNeeded) {
        this.instanceName = instanceName;
        this.xpName = xpName;
        this.xpAmount = xpAmount;
        this.maxNeeded = maxNeeded;
    }
    validateXpInput(xpNeeds) {
        return (xpNeeds > 0 && xpNeeds <= this.maxNeeded ? true : false);
    }
    calculateInstances(xpNeeds) {
        //TODO: add if statement to check if the instance's XP amount is an array (Cashbot only)
        
        // While xp needed is greater than what the second-highest instance rewards
        while (xpNeeds > Object.values(this.xpAmount.at(-2))[0]) {
            // do something
        }
    }
}

// Create an Instance object for each cog type
const Sellbot = new CogHQ('Factory', 'Merit', [{short: 480}, {long: 776}], 5500);
const Cashbot = new CogHQ('Mint', 'Cogbuck', [{Coin: [356, 544]}, {Dollar: [679, 1004]}, {Bullion: [1202, 1496]}], 8900);
const Lawbot = new CogHQ('Office', 'Jury Notice', [{A: 564}, {B: 944}, {C: 1370}, {D: 1842}], 14400);
const Bossbot = new CogHQ('golf course', 'Stock Option', [{'Front Three': 764}, {'Middle Six': 1984}, {'Back Nine': 3300}], 23300);

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