/* Calculate difference between total xp needed and the xp a user currently has,
which will be inputted through an HTML form */
function calculateXpDifference (xpTotal, xpHas) {
    var xpNeeds = xpTotal - xpHas;
    return xpNeeds;
}

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
            middleSixes += 1;
            xpNeeds -= 1874;
        }
        else if (xpNeeds > 0) {
            frontThrees += 1;
            xpNeeds -= 764;
        }

        return [backNines, middleSixes, frontThrees];
    }
}