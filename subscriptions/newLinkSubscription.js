// const newLinkSubscription =async  (parent, arguments, context, info) => {  
//     console.log("Inside sub")
//     const publisher =  await context 
//     console.log("Context received is", publisher);
//     return publisher;
// }


const resolvers = { 
    Subscription:{  
        newLinkSubscription:{ 
            subscribe: async (parent, arguments,context,info)=> {  
                const resolvedContext = await context; 
                console.log("Resolved Context is ", resolvedContext);
                return  resolvedContext.pubsub.asyncIterator("NEW_LINK") 
            },
            resolve:payload=> {return payload}
        }
    } 
} 

module.exports = {
    resolvers
}