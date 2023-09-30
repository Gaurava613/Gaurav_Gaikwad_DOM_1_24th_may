
function resetData(){
    localStorage.clear()
}
function handleImageClicks(imageId) {
    let userJourney;
    if (localStorage.getItem("userJourney")) {
        userJourney = JSON.parse(localStorage.getItem("userJourney"));
    } else {
        let userJourney = { firstImage: 0, secondImage: 0, thirdImage: { attempt: 0, rollNo: 0, success: -1, rollValues: [{ '0': 0, '1': 0, '2': 0 }, { '0': 0, '1': 0, '2': 0 }] }, fourthImage: 0 };
        localStorage.setItem("userJourney", JSON.stringify(userJourney));
    }
    if (imageId === 1) {
        userJourney.firstImage = 1;
        localStorage.setItem("userJourney", JSON.stringify(userJourney));
        window.location.href = "/form.html";
    }
    else if (imageId === 2) {
        if (userJourney && userJourney.firstImage) {
            userJourney.secondImage = 1;
            localStorage.setItem("userJourney", JSON.stringify(userJourney));
            window.location.href = "/showData.html";
        }
        else
            alert("first click the first image");
    }
    else if (imageId === 3) {
        if (userJourney && userJourney.firstImage && userJourney.secondImage) {
            userJourney.thirdImage = handleDice(userJourney.thirdImage);
            localStorage.setItem("userJourney", JSON.stringify(userJourney));
        }
        else
            alert("first click the preceding image");
    }
    else {
        window.location.href = "/coupon.html";
    }
}

function handleDice(rollData) {

    if (rollData.success === 1) {
        alert("You have already scored above 10, please click on fourth image");

        return rollData;
    }
    else if (rollData.success === 0) {
        alert("You have exhauted all the attmepts");

        return rollData;
    }
    let num = randomIntFromInterval(1, 6);
    rollData.rollValues[rollData.attempt][rollData.rollNo] = num;

    // if (rollData.attempt === 0 && rollData.rollNo < 2) {
    //     rollData.rollNo += 1;
    // } else if (rollData.attempt === 1 && rollData.rollNo < 2) {
    // rollData.rollNo = 0;
    // rollData.attempt = 1;
    // } else {
    //     alert("Back Luck, better luck next time");
    // }

    if (rollData.attempt === 0) {
        if (rollData.rollNo < 3) {
            rollData.rollNo += 1;
        } else {
            let totalSum = rollData.rollValues[0]['0'] + rollData.rollValues[0]['1'] + rollData.rollValues[0]['2'];
            if (totalSum >= 10) {
                rollData.success = 1;
                alert("Success ! Redirecting to Fourth Image");
                window.location.href='/coupon.html'

                return rollData;
            } else {
                rollData.rollNo = 0;
                rollData.attempt = 1;
            }
        }
    } else if (rollData.attempt === 1) {
        if (rollData.rollNo < 3) {
            rollData.rollNo += 1;
        } else {
            alert("Back Luck, better luck next time");
        }

    }

    document.getElementById('diceNumber').innerHTML = ` Dice Number : ${num}`;

    return rollData;
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
