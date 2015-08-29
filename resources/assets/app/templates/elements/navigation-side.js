export class NavigationSide {
    constructor() {
        this.inactive = false;
    }

    toggle() {
        this.inactive = !this.inactive;
    }
}