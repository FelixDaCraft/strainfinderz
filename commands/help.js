module.exports = {
    name: 'help',
    description: 'Search a strain on Seedfinder.com',
    execute(message) {
        message.channel.send(
            `Pour effectuer une recherche sur seedfinder :\n!search strain // breeder`
            )
    }
};