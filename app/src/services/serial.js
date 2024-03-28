/*let donglePort
let reader
let inputDone
let outputDone
let inputStream
let outputStream
//let isScanning;

export const connect = async () => {
    new Promise(async (resolve, reject) => {
        console.log("connect")
        donglePort = await navigator.serial.requestPort()
        await donglePort.open({ baudRate: 57600 })
        resolve("Dongle connected")
        const encoder = new TextEncoderStream()
        outputDone = encoder.readable.pipeTo(donglePort.writable)
        outputStream = encoder.writable

        let decoder = new TextDecoderStream()
        inputDone = donglePort.readable.pipeTo(decoder.writable)
        inputStream = decoder.readable.pipeThrough(
                new TransformStream(new LineBreakTransformer())
        )

        reader = inputStream.getReader()
        readLoop().catch((error) => {
            donglePort = null
            console.log("Dongle disconnected")
        })
    })
}

const disconnect = async () => {
    if (reader) {
        await reader.cancel()
        await inputDone.catch(() => {
        })
        reader = null
        inputDone = null
    }

    if (outputStream) {
        await outputStream.getWriter().close()
        await outputDone
        outputStream = null
        outputDone = null
    }

    await donglePort.close()
    donglePort = null
    console.log("Dongle disconnected")
}

async function readLoop() {
    while (true) {
        const { value, done } = await reader.read();
        if (value) {
            console.log(value)
        }
        if (done) {
            console.log("[readLoop] DONE", done);
            reader.releaseLock();
            break;
        }
    }
}

export const writeCmd = (cmd) => {
    // Write to output stream
    const writer = outputStream.getWriter();
    console.log("[SEND]", cmd);

    writer.write(cmd);
    // Ignores sending carriage return if sending Ctrl+C
    if (cmd !== "\x03") {
        writer.write("\r"); // Important to send a carriage return after a command
    }
    writer.releaseLock();
}


class LineBreakTransformer {
    constructor() {
        // A container for holding stream data until a new line.
        this.container = "";
    }

    transform(chunk, controller) {
        // Handle incoming chunk
        this.container += chunk;
        const lines = this.container.split("\r\n");
        this.container = lines.pop();
        lines.forEach((line) => controller.enqueue(line));
    }

    flush(controller) {
        // Flush the stream.
        controller.enqueue(this.container);
    }
}
*/

