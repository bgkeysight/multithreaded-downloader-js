class MultiThreadedDownloader {
  // constructor () {
  // }

  supported () {
    try {
      // Some browser has it but ain't allowed to construct a stream yet
      return 'serviceWorker' in navigator && !!new window.ReadableStream() && !!new window.WritableStream()
    } catch (err) {
      // if you are running chrome < 52 then you can enable it
      // `chrome://flags/#enable-experimental-web-platform-features`
      return false
    }
  }

  createWriteStream (fileName, queuingStrategy, fileSize) {
    // normalize arguments
    if (Number.isFinite(queuingStrategy)) {
      [fileSize, queuingStrategy] = [queuingStrategy, fileSize]
    }

    this.fileName = fileName
    this.fileSize = fileSize
    this.queuingStrategy = queuingStrategy

    const that = this
    return new window.WritableStream({
      start (controller) {
        // is called immediately, and should perform any actions
        // necessary to acquire access to the underlying sink.
        // If this process is asynchronous, it can return a promise
        // to signal success or failure.
        // return that.setupMessageChannel()
      },
      write (chunk) {
        // is called when a new chunk of data is ready to be written
        // to the underlying sink. It can return a promise to signal
        // success or failure of the write operation. The stream
        // implementation guarantees that this method will be called
        // only after previous writes have succeeded, and never after
        // close or abort is called.

        // TODO: Kind of important that service worker respond back when
        // it has been written. Otherwise we can't handle backpressure
        // that.messageChannel.port1.postMessage(chunk)
      },
      close () {
        // that.messageChannel.port1.postMessage('end')
        console.log('All data successfully written!')
      },
      abort () {
        // that.messageChannel.port1.postMessage('abort')
      }
    }, queuingStrategy)
  }
}