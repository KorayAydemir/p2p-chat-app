export const getLocalStream = async () => {
    try {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true,
        });

        window.localStream = userMediaStream;
        window.localAudio.srcObject = userMediaStream;
        window.localAudio.autoplay = true;
    } catch (err) {
        console.warn('Something went wrong', err.message);
    }
};
