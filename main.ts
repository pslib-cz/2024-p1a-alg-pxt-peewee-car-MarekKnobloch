radio.setGroup(21)

function controlCar(xTilt: number, yTilt: number) {
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
        // Stop
        PCAmotor.MotorStopAll()
    }
}

radio.onReceivedString(function (received: string) {
    
    let values = received.split(":")
    if (values.length == 2) {
        let x = parseInt(values[0])
        let y = parseInt(values[1])
        controlCar(x, y)
    }
})
