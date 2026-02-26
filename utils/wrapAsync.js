module.exports = (fn) => {
    return function(req,res,next) {
        fn(req,res,next).catch(next);         // if error then automatically it forward  to next error handling middleware
    }
};