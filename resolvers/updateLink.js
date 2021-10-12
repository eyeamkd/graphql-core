function updateLink(parent, arguments, context, info) {
    let resultIndex;
    let result = links.find((link, index) => {
        if (link.id == arguments.id) {
            resultIndex = index;
            return true;
        }
    });
    let link = {
        id: arguments.id,
        url: arguments.url,
        description: arguments.description
    };
    links[resultIndex] = link;
    return `Link ${result.id} successfully updated`
} 

module.exports = {updateLink}