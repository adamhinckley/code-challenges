// Write a class TempTracker that tracks the max, min, mean, and mode of temperature values as they are inserted into the tracker.
//This class should have the following methods:

// insert() - records a new temperature.
// getMax() - returns the highest temperature we've seen so far.
// getMin() - returns the lowest temperature we've seen so far.
// getMean() - returns the mean of all temperatures we've seen so far.
// getMode() - returns a mode of all temperatures we've seen so far.
// Favor speeding up the get methods over the insert method. Aim to get each of the get methods down to constant runtime.

// getMean() should return a float. The rest of the methods can return integers.
// Temperatures should be recorded in Fahrenheit, so we can assume a range of 0 to 140.

// If there is more than one mode, return any of the modes.

class TempTracker {
    constructor() {
        // mode
        this.occurrences = Array(140).fill(0)
        this.mode = 0
        this.maxOccurrences = 0
        // mean
        this.numberOfReadings = 0
        this.sumOfReadings = 0
        this.mean = 0
        // min & max
        this.minTemp = 0
        this.maxTemp = 0
    }
    insert(temp) {
        // mode
        // increment the number of times this temp has appeared
        this.occurrences[temp]++
        // update our maxOccurrences and mode variables if necessary
        if (this.occurrences[temp] > this.maxOccurrences) {
            this.mode = temp
            this.maxOccurrences = this.occurrences[temp]
        }
        // mean
        this.numberOfReadings++
        this.sumOfReadings += temp
        this.mean = this.sumOfReadings / this.numberOfReadings

        // min & max
        if (this.minTemp > temp || this.minTemp === 0) {
            this.minTemp = temp
        }
        if (this.maxTemp < temp) {
            this.maxTemp = temp
        }
    }
    getMax() {
        return this.maxTemp
    }
    getMin() {
        return this.minTemp
    }
    getMean() {
        return this.mean
    }
    getMode() {
        return this.mode
    }
}
const tracker = new TempTracker()
tracker.insert(32)

console.log("mean: ", tracker.getMean()) // should print 32
console.log("min: ", tracker.getMin()) // should print 32
console.log("max: ", tracker.getMax()) // should print 32
console.log("mode: ", tracker.getMode()) // should print 32

tracker.insert(135)

console.log("mean: ", tracker.getMean()) // should print 83.5
console.log("min: ", tracker.getMin()) // should print 32
console.log("max: ", tracker.getMax()) // should print 135

tracker.insert(135)

console.log("mean: ", tracker.getMean()) // should print 100.66666666666667
console.log("min: ", tracker.getMin()) // should print 32
console.log("max: ", tracker.getMax()) // should print 135
console.log("mode: ", tracker.getMode()) // should print 135
