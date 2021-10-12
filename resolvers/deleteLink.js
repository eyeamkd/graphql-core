function deleteLink(parent,arguments, context, info){
    let newLinks = links.filter(link => link.id != arguments.id)
    links = newLinks;
    return `Link ${arguments.id} successfully deleted`
} 

module.exports = {deleteLink}