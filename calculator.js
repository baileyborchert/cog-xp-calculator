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
    validateXpInput(xpNeeded) {
        return (xpNeeded > 0 && xpNeeded <= this._maxNeeded ? true : false);
    }

    /* Takes needed xp (input by user) and returns how
    many of each facility they need to grind the xp */
    calculateFacilities(xpNeeded) {
        if (this.validateXpInput(xpNeeded) == true) {
            // Array that will be returned:
            let facilitiesNeeded = [];
            if (this.checkIfStaticXpAmount() == true) {
                this.xpAmountArray.forEach((element, index) => {
                    let thisFacilityNeeded = 0;
                    // If this facility is anything BUT the least XP-rewarding for this Cog HQ...
                    if (index < this.xpAmountArray.length -1) {
                        // Check that xp needed is greater than what the next in the array rewards
                        while (xpNeeded > this.getXpAmountByIndex(index + 1)) {
                            thisFacilityNeeded += 1;
                            xpNeeded -= this.getXpAmountByIndex(index);
                        }
                    // If this facility is the least xp-rewarding for this Cog HQ, just check that we need > 0 xp
                    } else {
                        while (xpNeeded > 0) {
                            thisFacilityNeeded += 1;
                            xpNeeded -= this.getXpAmountByIndex(index);
                        }
                    }
                    let thisFacilityName = this.getFacilityNameByIndex(index);
                    facilitiesNeeded.push({[thisFacilityName]: thisFacilityNeeded});
                });
                return facilitiesNeeded;
            } else {
                let minFacilitiesNeeded = [];
                let maxFacilitiesNeeded = [];

                // Calculate the array of the MIN number of each facility needed
                this.xpAmountArray.forEach((element, index) => {
                    let thisFacilityNeeded = 0;
                    // If this facility is anything BUT the least XP-rewarding for this Cog HQ...
                    if (index < this.xpAmountArray.length -1) {
                        // Check that xp needed is greater than what the next in the array rewards
                        while (xpNeeded > this.getXpAmountByIndex(index + 1)[0]) {
                            thisFacilityNeeded += 1;
                            xpNeeded -= this.getXpAmountByIndex(index)[0];
                            console.log('Now we need ' + thisFacilityNeeded + ' of ' + this.getFacilityNameByIndex(index));
                        }
                    // If this facility is the least xp-rewarding for this Cog HQ, just check that we need > 0 xp
                    } else {
                        while (xpNeeded > 0) {
                            thisFacilityNeeded += 1;
                            xpNeeded -= this.getXpAmountByIndex(index[0]);
                        }
                    }
                    let thisFacilityName = this.getFacilityNameByIndex(index);
                    minFacilitiesNeeded.push({[thisFacilityName]: thisFacilityNeeded});
                    
                });

                // Calculate the array of the MAX number of each facility needed
                this.xpAmountArray.forEach((element, index) => {
                    let thisFacilityNeeded = 0;
                    // If this facility is anything BUT the least XP-rewarding for this Cog HQ...
                    if (index < this.xpAmountArray.length -1) {
                        // Check that xp needed is greater than what the next in the array rewards
                        while (xpNeeded > this.getXpAmountByIndex(index + 1)[1]) {
                            thisFacilityNeeded += 1;
                            xpNeeded -= this.getXpAmountByIndex(index)[1];
                        }
                    // If this facility is the least xp-rewarding for this Cog HQ, just check that we need > 0 xp
                    } else {
                        while (xpNeeded > 0) {
                            thisFacilityNeeded += 1;
                            xpNeeded -= this.getXpAmountByIndex(index)[1];
                        }
                    }
                    let thisFacilityName = this.getFacilityNameByIndex(index);
                    maxFacilitiesNeeded.push({[thisFacilityName]: thisFacilityNeeded});
                });
                
                let facilitiesNeeded = [maxFacilitiesNeeded, minFacilitiesNeeded];
                return facilitiesNeeded;
            }
        }
        else {
            throw new Error('Your input is invalid. Don\'t be a turkey!');
        }
    }

}

// Create an CogHQ object for each Cog type
const Sellbot = new CogHQ('Factory', 'Merit', [{long: 776}, {short: 480}], 5500);
const Cashbot = new CogHQ('Mint', 'Cogbuck', [{Bullion: [1496, 1202]}, {Dollar: [1004, 679]}, {Coin: [544, 356]}], 8900);
const Lawbot = new CogHQ('Office', 'Jury Notice', [{D: 1842}, {C: 1370}, {B: 944}, {A: 564}], 14400);
const Bossbot = new CogHQ('golf course', 'Stock Option', [{'Back Nine': 3300}, {'Middle Six': 1984}, {'Front Three': 764}], 23300);