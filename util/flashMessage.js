module.exports = (flashMessage) => {
    const message = flashMessage;
    if (message.length > 0) {
        return message[0];
    } else {
        return null;
    }
}