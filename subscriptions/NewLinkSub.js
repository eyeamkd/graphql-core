const newLinkSubscribe = (parent, arguments, context, info) => {
    return context.pubsub.asyncIterator("NEW_LINK");
}


const newLinkSub = { 
    subscribe:newLinkSubscribe,
    resolve:(payload)=> payload
} 

module.exports = {
    newLinkSub
}