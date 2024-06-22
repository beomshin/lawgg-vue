class EnrollVideoDto {

    id
    playVideo
    replay

    constructor(id, playVideo, replay) {
        this.id = id;
        this.playVideo = playVideo;
        this.replay = replay;
    }

    setId(id) {
        this.id = id;
    }
}

export default EnrollVideoDto