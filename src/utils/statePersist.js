class StateLoader {

    loadState() {
        try {
            let serializedState = localStorage.getItem("https://ereturns.bb.org.bd:state");

            if (serializedState === null) {
                return this.initializeState();
            }

            return JSON.parse(serializedState);
        }
        catch (err) {
            return this.initializeState();
        }
    }

    saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem("https://ereturns.bb.org.bd:state", serializedState);

        }
        catch (err) {
        }
    }

    initializeState() {
        return {
              //state object
            }
    };
}

export default StateLoader
