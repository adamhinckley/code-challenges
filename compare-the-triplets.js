// Complete the function compareTriplets in the editor below. It must return an array of two integers, the first being Alice's score and the second being Bob's.

// compareTriplets has the following parameter(s):

// a: an array of integers representing Alice's challenge rating
// b: an array of integers representing Bob's challenge rating

const a = [1, 2, 3]
const b = [3, 2, 1]

function compareTriplets(a, b) {
    let scoreA = 0
    let scoreB = 0
    for (let i = 0; i < a.length; i++) {
        if (a[i] > b[i]) {
            scoreA++
        } else if (a[i] < b[i]) {
            scoreB++
        }
    }
    return [scoreA, scoreB]
}

console.log(compareTriplets(a, b))
