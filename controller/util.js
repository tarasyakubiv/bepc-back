module.exports = {
    generateChildren: (number, lowerBound, uppperBound) => {
        let children = [];
        for(let i = 0; i < number; i++) {
            children.push(Math.floor(Math.random() * (uppperBound - lowerBound) 
                                + lowerBound));
        }
        return children
    },
    
    validateChildCount: (childCount) => {
        if(childCount < 0 || childCount > 15) {
            throw "Child Count value must be between 0 and 15!"
        }
        if(!Number.isInteger(childCount)) {
            throw "Child Count value must be Integer!"
        }
        return childCount;
    },
    
    validateName: (name) => {
        if(name === undefined || name.length === 0) {
            throw new Error("Factory needs a name!")
        }
        return name
    },
    
    validateBoundWithError: (bound) => {
        if(bound === undefined || Number.isNaN(bound)) {
            throw new Error("Bound must be Number")
        } else return bound;
    },
    
    compareBoundsWithError: (lower, upper) => {
        if(lower > upper) {
            throw new Error("Incorrect Bounds assignment!")
        }
    },
    
    compareBoundsWithBool: (lower, upper) => {
        let validateBound = (bound) => {
            if(bound === undefined || Number.isNaN(bound)) {
                return false
            } else return true;
        }
        if(validateBound(lower) && validateBound(upper)) {
            if(lower > upper) {
                return false;
            } else {
                return true
            }
        } else {
            return false;
        }
    }

}

