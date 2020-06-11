class Db {
    /**
     * Constructors an object for accessing kittens in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store question in MongoDB
        const suggestionSchema = new mongoose.Schema({
            title:String,
            description:String,
            suggestion: String,
            date: Date,
            username: String,
            signatures : Number,
            usersignature: [{user:String, userdate:Date}]
        });

        // This model is used in the methods of this class to access kittens
        this.suggestionModel = mongoose.model('suggestion', suggestionSchema);
    }

    async getData() {
        try {
            return await this.suggestionModel.find({});
        } catch (error) {
            console.error("getData:", error.message);
            return {};
        }
    }

    async getSuggestion(id) {
        try {
            return await this.suggestionModel.findById(id);
        } catch (error) {
            console.error("getSuggestionByID:", error.message);
            return {};
        }
    }

    async CreateSuggestion(newSuggestion) {
        try {
            let sugg = new this.suggestionModel(newSuggestion);
            return await sugg.save();
        }
        catch (error) {
            console.error("You didnt add suggestion:", error.message);
            return {};
        }

    }

    async addSignatures(id, usersignature) {
        try  {
            const suggestion = await this.getSuggestion(id);
            suggestion.usersignature.push(usersignature);
            suggestion.signatures++;
            return await suggestion.save();
        }
        catch (error) {
            console.error("You didnt add a signature:", error.message);
            return {};
        }
    }


    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of question to add...
     * @returns {Promise} Resolves when everything has been saved.
     */
    async bootstrap(count = 10) {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        function getTitle() {
            return ['What is React?', 'How do you fetch?', 'What is a REST API?', 'What is a full stacker?'][getRandomInt(0,3)]
        }
        function getDescription() {
            return ['What is React?', 'How do you fetch?', 'What is a REST API?', 'What is a full stacker?'][getRandomInt(0,3)]
        }

        function getSuggestion() {
            return ['What is React?', 'How do you fetch?', 'What is a REST API?', 'What is a full stacker?'][getRandomInt(0,3)]
        }

        function getUsername() {
            return ['tom', 'jane', 'svend', 'valdemar'][getRandomInt(0,3)]
        }



        let l = (await this.getData()).length;
        console.log("Suggestion collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let suggestion = new this.suggestionModel({
                    title:getTitle(),
                    description:getDescription(),
                    suggestion: getSuggestion(),
                    date: Date.now(),
                    username: getUsername(),
                    signatures: 1,
                    usersignature: [{user:getUsername(), userdate: Date.now()}]

                });
                promises.push(suggestion.save());
            }

            return Promise.all(promises);
        }
    }

}

// We export the object used to access the suggestion in the database
module.exports = mongoose => new Db(mongoose);