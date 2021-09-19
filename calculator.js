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
                console.log(this.xpAmountArray);
                this.xpAmountArray.forEach((element, index) => {
                    // Object that will be returned
                    let facilitiesNeeds = [];
                    // If this facility is anything BUT the least XP-rewarding for this Cog HQ...
                    if (index < this.xpAmountArray.length -1) {
                        // Check that xp needed is greater than what the next in the array rewards
                        while (xpNeeds > this.getXpAmountByIndex(index + 1)) {
                            console.log('We need a ' + this.getFacilityNameByIndex(index));
                            xpNeeds -= this.getXpAmountByIndex(index);
                            console.log('New xp needed: ' + xpNeeds)
                        }
                    // If this facility is the least xp-rewarding for this Cog HQ, just check that we need > 0 xp
                    } else {
                        while (xpNeeds > 0) {
                            console.log('We need a ' + this.getFacilityNameByIndex(index));
                            xpNeeds -= this.getXpAmountByIndex(index);
                            console.log('New xp needed: ' + xpNeeds);
                        }
                    }
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