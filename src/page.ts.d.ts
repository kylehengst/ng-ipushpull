declare namespace ipushpull {
    interface IIPushPullPageService {
        start: () => void;
        stop: () => void;
        push: () => void;
        destroy: () => void;
    }
}
