radio.setGroup(21)

let x = 0
let y = 0

function controlCar(xTilt: number, yTilt: number) {
    // Omez hodnoty, aby se dalo dobře řídit
    let speed = Math.map(yTilt, -1023, 1023, -200, 200)
    speed = Math.constrain(speed, -200, 200)

    let turn = Math.map(xTilt, -1023, 1023, -100, 100)
    turn = Math.constrain(turn, -100, 100)

    if (speed > 10) {
        // Dopředu
        PCAmotor.MotorRun(PCAmotor.Motors.M1, speed - turn)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, speed + turn)
    } else if (speed < -10) {
        // Dozadu
        PCAmotor.MotorRun(PCAmotor.Motors.M1, speed + turn)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, speed - turn)
    } else {
        // Stojí
        PCAmotor.MotorStopAll()
    }
}

radio.onReceivedValue(function (name, value) {
    if (name == "x") {
        x = value
    } else if (name == "y") {
        y = value
    }
    controlCar(x, y)
})

radio.onReceivedString(function (str) {
    if (str == "Stop") {
        PCAmotor.MotorStopAll()
    }
})
